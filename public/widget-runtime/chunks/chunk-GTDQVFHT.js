/* ikas Reviews Widget ESM runtime | theme: default */
import{b as Ve}from"./chunk-Z7432DLE.js";import{a as he,b as jr,c as je,d as Dr}from"./chunk-HEKEBJUA.js";import{$ as Or,A as Ir,B as We,C as qe,D as Ke,J as Oe,K as Br,M as Mr,N as se,O as ve,P as Fr,Q as ce,R as Hr,S as _r,T as ge,U as Ue,V,W as Xe,X as Je,Y as lr,Z as dr,_ as ee,a as ue,aa as re,b as fe,ba as Yr,c as ke,ca as Ye,d as de,e as zr,f as Ce,g as Se,ga as Vr,h as Q,i as A,j as ar,k as Pe,m as nr,n as Cr,o as Re,p as Ee,q as Ge,r as or,s as Sr,t as Er,u as Tr,v as Lr,w as Nr,x as Ar,y as Pr,z as Rr}from"./chunk-B6GLB6KJ.js";var Ci=15,Si=60*1e3,Gr="__ikrReviewsFetchError",sr={};function Ze(e){return{type:Gr,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function cr(e){return!!(e&&e.type===Gr)}async function Te(e,r,i,t,n,l){if(window.__ikasPreviewMode){try{var c=window.__ikasPreviewBaseUrl||ke,o=c+"/api/preview/reviews?page="+encodeURIComponent(i||1),d=await he(o);if(d.ok)return await d.json()}catch(b){}return Ze()}r=r||"newest",i=i||1;var u=l?"_l"+l:"",k="ikr_reviews_"+fe+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(n?"1":"0")+u,s=null,a=Yr(k);if(a)try{var p=JSON.parse(a);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<Si)return p.v;s=p.v,Ye(k,"")}else Ye(k,"")}catch(b){Ye(k,"")}try{var f=ke+"/api/public/reviews?storeId="+encodeURIComponent(fe)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(n?"&hasImages=true":"")+(l?"&limit="+encodeURIComponent(l):""),v=await he(f);if(!v.ok)return s||Ze();var m=await v.json();return Ye(k,JSON.stringify({t:Date.now(),v:m})),m}catch(b){return console.error("[ikr] fetchReviews error:",b),s||Ze()}}async function Ei(e){var r=await Te(e,"newest",1,null,!0,Ci);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Lt(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!sr[e]){sr[e]=!0;var n={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},l={enabled:!0,size:"medium"};try{var c=await jr();if(!c)return;var o=c.widgets&&c.widgets.reviews||n,d=c.widgets&&c.widgets.badge||l;if(o.enabled===!1)return;Re("newest"),Ee(1),Ge(null);var u=await Promise.all([Te(e,"newest",1,null),Ei(e)]),k=u[0];Ar(u[1]),await be(e,o,k,r,"newest",1,d)}catch(s){console.error("[ikr] bootstrap error:",s),await be(e,n,Ze(),r,void 0,void 0,l)}finally{delete sr[e]}}}function Ie(e){return ge(e)}function Ti(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ie(e,r,i,t){i?e.setProperty(r,i,t||""):e.removeProperty(r)}function Li(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",i=navigator.maxTouchPoints||0,t=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&i>1;return t&&/AppleWebKit/i.test(r)}function Ni(){var e=Ti(),r=document.body.style,i=document.documentElement.style,t=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",l=Li()&&!n;if(t>0){var c=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",c+t+"px","important")}return i.setProperty("overflow","hidden","important"),i.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),l&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Ai(e){if(e){var r=document.body.style,i=document.documentElement.style;ie(i,"overflow",e.rootOverflow,e.rootOverflowPriority),ie(i,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ie(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ie(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ie(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ie(r,"position",e.bodyPosition,e.bodyPositionPriority),ie(r,"top",e.bodyTop,e.bodyTopPriority),ie(r,"left",e.bodyLeft,e.bodyLeftPriority),ie(r,"right",e.bodyRight,e.bodyRightPriority),ie(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Pi(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Be(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(i){}}}function Ri(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function qr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Ri)}function Kr(e){var r=qr(e),i=r[0]||e.querySelector('[role="dialog"]')||e;Be(i)}function Ii(e,r){if(e.key==="Tab"){var i=qr(r);if(!i.length){e.preventDefault(),Kr(r);return}var t=i[0],n=i[i.length-1],l=document.activeElement;if(!r.contains(l)){e.preventDefault(),Be(t);return}e.shiftKey&&l===t?(e.preventDefault(),Be(n)):!e.shiftKey&&l===n&&(e.preventDefault(),Be(t))}}function Bi(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function Mi(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function Fi(e){if(Mi(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Wr(e,r,i,t,n){Ai(t),document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e),Be(n)}function Hi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var n=document.createElement("div");n.className="ikr-modal-stars",n.innerHTML=se(e.rating,A);var l=document.createElement("span");l.className="ikr-modal-date",l.textContent=ce(e.createdAt),t.appendChild(n),t.appendChild(l),i.appendChild(t);var c=document.createElement("div");c.className="ikr-modal-title",c.textContent=e.title||"",c.style.display=e.title?"":"none",i.appendChild(c);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(d);var u=document.createElement("div");u.className="ikr-modal-reply";var k=document.createElement("div");k.className="ikr-modal-reply-label",k.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi";var s=document.createElement("div");return s.className="ikr-modal-reply-text",s.textContent=e.merchantReply||"",u.appendChild(k),u.appendChild(s),u.style.display=e.merchantReply?"":"none",i.appendChild(u),r.appendChild(i),r}function Ur(e,r,i){var t=i||A,n=e.querySelector(".ikr-modal-scroll-content"),l=n.querySelector(".ikr-modal-stars");l.innerHTML=se(r.rating,t),n.querySelector(".ikr-modal-date").textContent=ce(r.createdAt);var c=n.querySelector(".ikr-modal-title");c.textContent=r.title||"",c.style.display=r.title?"":"none",n.querySelector(".ikr-modal-author").textContent=r.author||"";var o=n.querySelector(".ikr-modal-body");o.textContent=(r.comment||"").trim(),o.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".ikr-modal-reply");d.querySelector(".ikr-modal-reply-label").textContent=t&&t.merchantReplyLabel||"Ma\u011Faza Sahibi",d.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function mr(e,r,i,t,n,l,c,o,d){var u=Ie(e),k=Math.max(0,Math.min(i||0,u.length-1)),s=document.createElement("div");s.className="ikr-modal-left";var a=document.createElement("img"),p=c==="next"?"ikr-modal-img-enter-right":c==="prev"?"ikr-modal-img-enter-left":"";a.className="ikr-modal-main-img"+(p?" "+p:""),a.src=dr(u[k]||""),a.decoding="async",a.width=lr,a.height=Math.round(lr*4/3),a.alt="Yorum foto\u011Fraf\u0131",Or(a,function(E){if(E.style.display="none",!s.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(T,E)}}),s.appendChild(a);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(E){E.stopPropagation(),l()},s.appendChild(f);var v=0;if(s.addEventListener("touchstart",function(E){v=E.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(E){var T=v-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(x)pe(e,r,k+1,t,n,l,!0,"next",o,d);else if(g){var h=t[r+1];pe(h,r+1,0,t,n,l,!1,"next",o,d)}}else if(b)pe(e,r,k-1,t,n,l,!0,"prev",o,d);else if(y){var N=t[r-1],L=Ie(N);pe(N,r-1,L.length-1,t,n,l,!1,"prev",o,d)}}},{passive:!0}),u.length>1){var m=document.createElement("div");m.className="ikr-modal-thumbs",u.forEach(function(E,T){var h=document.createElement("img"),N=ee(E,Je);h.src=N.src,h.srcset=N.srcset,h.loading="lazy",h.decoding="async",h.width=Je,h.height=Je,h.className="ikr-modal-thumb"+(T===k?" ikr-modal-thumb-active":""),h.alt="K\xFC\xE7\xFCk resim "+(T+1),re(h),h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===k&&h.setAttribute("aria-current","true"),(function(L){function B(){pe(e,r,L,t,n,l,!0,null,o,d)}h.onclick=B,h.onkeydown=function(H){(H.key==="Enter"||H.key===" ")&&(H.preventDefault(),B())}})(T),m.appendChild(h)}),s.appendChild(m)}var b=k>0,x=k<u.length-1,y=r>0,g=r<t.length-1,S=b||y,z=x||g;if(S){var C=document.createElement("button");C.className="ikr-modal-nav ikr-modal-nav-prev",C.innerHTML="&#8249;",C.setAttribute("aria-label","\xD6nceki"),C.onclick=function(E){if(E.stopPropagation(),b)pe(e,r,k-1,t,n,l,!0,"prev",o,d);else if(y){var T=t[r-1],h=Ie(T);pe(T,r-1,h.length-1,t,n,l,!1,"prev",o,d)}},s.appendChild(C)}if(z){var w=document.createElement("button");w.className="ikr-modal-nav ikr-modal-nav-next",w.innerHTML="&#8250;",w.setAttribute("aria-label","Sonraki"),w.onclick=function(E){if(E.stopPropagation(),x)pe(e,r,k+1,t,n,l,!0,"next",o,d);else if(g){var T=t[r+1];pe(T,r+1,0,t,n,l,!1,"next",o,d)}},s.appendChild(w)}return s}function Xr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var n=Ie(t);n[0]&&(new Image().src=dr(n[0]))}})}function pr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function _i(e,r){var i=e&&e.querySelector(".ikr-modal-wrap"),t=r&&r.querySelector(".ikr-modal-right"),n=r&&r.querySelector(".ikr-modal-scroll-content");function l(){pr(i),pr(t),pr(n)}l(),i&&Be(i),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){l(),requestAnimationFrame(l)}):setTimeout(l,0)}function pe(e,r,i,t,n,l,c,o,d,u){if(u&&(u.currentReview=e),c){var k=mr(e,r,i,t,n,l,o,d,u);n.firstChild&&n.replaceChild(k,n.firstChild)}else{var k=mr(e,r,i,t,n,l,o,d,u),s=n.querySelector(".ikr-modal-right");n.firstChild&&n.replaceChild(k,n.firstChild),s&&Ur(s,e,u&&u.currentSettings),_i(d,n)}Xr(r,t)}function te(e,r,i){var t=Ie(e);if(!t.length)return;var n=(i||[]).filter(function(g){return Ie(g).length>0}),l=n.findIndex(function(g){return g===e||g.id===e.id});l===-1&&(n.unshift(e),l=0);var c=t.indexOf(r);c<0&&(c=0);var o=document.createElement("div");o.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var u=!1,k=Pi(),s=Ni(),a=Bi(),p={currentReview:e,currentSettings:A};function f(g){var S=g&&g.detail&&g.detail.settings;p.currentSettings=S||A;var z=d.querySelector(".ikr-modal-right");!z||!p.currentReview||Ur(z,p.currentReview,p.currentSettings)}function v(){u||(u=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Wr(o,m,v,s,k))}function m(g){if(g.key==="Escape"){b();return}Ii(g,o)}function b(){u||(u=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Wr(o,m,v,s,k),Fi(a))}document.addEventListener("keydown",m),window.addEventListener("popstate",v),window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),o.onclick=function(){b()},d.onclick=function(g){g.stopPropagation()},d.appendChild(mr(e,l,c,n,d,b,null,o,p)),d.appendChild(Hi(e)),Xr(l,n);var x=document.createElement("div");x.className="ikr-modal-wrap",x.tabIndex=-1,x.setAttribute("role","dialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),x.appendChild(d);var y=document.createElement("button");y.className="ikr-modal-close",y.textContent="\u2715",y.setAttribute("aria-label","Kapat"),y.onclick=function(g){g.stopPropagation(),b()},x.appendChild(y),o.appendChild(x),document.body.appendChild(o),Kr(o)}function Jr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}function Oi(e,r){return ve(e,r)}function Zr(e,r,i,t,n){var l=document.getElementById("ikr-rating-badge");if(l&&l.remove(),!!e&&!(t&&t.enabled===!1)){var c=document.getElementById("ikr-jsonld");c&&c.remove();var o=document.createElement("script");o.id="ikr-jsonld",o.type="application/ld+json",o.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(o);var d=Jr(i);if(!(!d||!d.parentNode)){var u=t&&t.size||"medium",k=je[u]||je.medium,s=null;if(t&&t.mobileOverride===!0){var a=t.mobileSize||"small";s=je[a]||je.small}Dr(k,s);var p=document.createElement("a");p.id="ikr-rating-badge",p.className="ikr-rating-badge ikr-rating-badge--pdp",p.href="#ikas-reviews",p.setAttribute("role","figure"),p.setAttribute("aria-label",e+" \xFCzerinden 5 y\u0131ld\u0131z, "+r+" yorum"),p.setAttribute("data-ikr-surface","pdp"),p.setAttribute("data-ikr-rating",String(e)),p.setAttribute("data-ikr-count",String(r));var f=window.getComputedStyle(d).textAlign,v=f==="center"?"center":f==="right"?"flex-end":"flex-start";p.style.cssText="justify-content:"+v+";",p.insertAdjacentHTML("beforeend",Oi(e,n));var m=document.createElement("span");m.className="ikr-rating-badge__label",m.textContent=e+" ("+r+" yorum)",p.appendChild(m),p.onclick=function(b){b.preventDefault();var x=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(x){var y=document.querySelector("header"),g=y?y.getBoundingClientRect().height:0,S=x.getBoundingClientRect().top+window.pageYOffset-g-16;window.scrollTo({top:S,behavior:"smooth"})}},d.parentNode.insertBefore(p,d.nextSibling)}}}var $r=`
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

${Fr}

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
`;var kr={};ue(kr,{meta:()=>Xi,render:()=>Ji});function Me(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,n=e.currentRatingFilter,l=e.onFilterChange,c=document.createElement("div");c.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var d=r[o-1]||0,u=i>0?Math.round(d/i*100):0,k=n===o,s=document.createElement("div");s.className="ikr-bar-row"+(k?" ikr-bar-active":""),n&&!k&&(s.style.opacity="0.35");for(var a="",p=1;p<=5;p++){var f=p<=o;a+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?t.filled:t.empty)+"</span>"}s.innerHTML='<span class="ikr-bar-label">'+a+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+u+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(v){s.onclick=function(){l(v)}})(o),c.appendChild(s)}return c}var ae=[],Qr=!1;function Yi(e){for(var r=ae.length-1;r>=0;r--){var i=ae[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function ji(e){if(e.key==="Escape")for(var r=ae.length-1;r>=0;r--)ae[r].close()}function Di(){Qr||typeof document=="undefined"||(document.addEventListener("click",Yi,!0),document.addEventListener("keydown",ji),Qr=!0)}function $e(e){for(var r=0;r<ae.length;r++)ae[r]!==e&&ae[r].close()}function Qe(e){Di();var r={trigger:e.trigger,element:e.element,close:e.close};return ae.push(r),function(){var t=ae.indexOf(r);t!==-1&&ae.splice(t,1)}}function U(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,n=e.onWriteClick,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent=A&&A.writeButtonText||"Yorum Yap",o.onclick=n,c.appendChild(o);var d=document.createElement("div");d.className="ikr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="ikr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var k=A&&A.filterIcon||"lines";u.innerHTML=Br(k);var s=document.createElement("div");s.className="ikr-filter-menu",s.setAttribute("role","menu");var a=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function p(m){var b=s.classList.contains("ikr-open");s.classList.remove("ikr-open"),u.classList.remove("ikr-filter-btn-active"),u.setAttribute("aria-expanded","false");var x=m&&(m.restoreFocus===!0||m.restoreFocus==="auto"&&Ve());if(b&&x)try{u.focus({preventScroll:!0})}catch(y){try{u.focus()}catch(g){}}}function f(){$e(v),s.classList.add("ikr-open"),u.classList.add("ikr-filter-btn-active"),u.setAttribute("aria-expanded","true");var m=s.querySelector(".ikr-filter-item-active")||s.querySelector(".ikr-filter-item");m&&requestAnimationFrame(function(){try{m.focus({preventScroll:!0})}catch(b){try{m.focus()}catch(x){}}})}a.forEach(function(m){var b=m[2],x=b?t:!t&&(i||"newest")===m[0],y=document.createElement("button");y.type="button",y.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),y.setAttribute("role","menuitem"),y.textContent=m[1],y.onclick=function(){p({restoreFocus:"auto"}),l(m[0],b)},s.appendChild(y)}),u.onclick=function(){s.classList.contains("ikr-open")?p({restoreFocus:"auto"}):f()},d.addEventListener("keydown",function(m){m.key==="Escape"&&s.classList.contains("ikr-open")&&(m.stopPropagation(),p({restoreFocus:!0}))}),d.addEventListener("focusout",function(m){if(s.classList.contains("ikr-open")){var b=m.relatedTarget;b&&d.contains(b)||p()}});var v=Qe({trigger:d,element:s,close:p});return d.appendChild(u),d.appendChild(s),c.appendChild(d),c}function ei(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="ikr-fwizard",t.appendChild(n);var l=document.createElement("button");l.className="ikr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat"),l.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',n.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-content",n.appendChild(c);var o=!1,d=null,u=!1,k="",s="";function a(){var h=document.activeElement;return!h||h===document.body||h===document.documentElement?null:h}function p(h){if(!(!h||!document.contains(h)||typeof h.focus!="function"))try{h.focus({preventScroll:!0})}catch(N){try{h.focus()}catch(L){}}}function f(h){if(!h||h.disabled||h.getAttribute("aria-hidden")==="true")return!1;var N=window.getComputedStyle?window.getComputedStyle(h):null;return N&&(N.display==="none"||N.visibility==="hidden")?!1:!!(h.offsetWidth||h.offsetHeight||h.getClientRects().length)}function v(h){var N=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(h.querySelectorAll(N)).filter(f)}function m(){var h=v(c),N=v(t),L=h[0]||N[0]||t;p(L)}function b(h){if(h.key==="Tab"){var N=v(t);if(!N.length){h.preventDefault(),p(t);return}var L=N[0],B=N[N.length-1],H=document.activeElement;if(!t.contains(H)){h.preventDefault(),p(L);return}h.shiftKey&&H===L?(h.preventDefault(),p(B)):!h.shiftKey&&H===B&&(h.preventDefault(),p(L))}}function x(){var h=window.innerWidth-document.documentElement.clientWidth;k=document.body.style.overflow,s=document.body.style.paddingRight,document.body.style.overflow="hidden",h>0&&(document.body.style.paddingRight=h+"px")}function y(){document.body.style.overflow=k,document.body.style.paddingRight=s}function g(){o||(o=!0,document.removeEventListener("keydown",S),t.removeEventListener("click",z),l.removeEventListener("click",g),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),y(),u&&p(d);try{r()}catch(h){}},200))}function S(h){if(h.key==="Escape"){g();return}b(h)}function z(h){h.target===t&&i&&g()}document.addEventListener("keydown",S),t.addEventListener("click",z),l.addEventListener("click",g);function C(h){d=a(),u=Ve(),h&&c.appendChild(h),document.body.appendChild(t),x(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open"),m()})}var w=null,E=null;function T(h,N){if(N=N||"error",w){try{w.remove()}catch(L){}w=null}E&&(clearTimeout(E),E=null),w=document.createElement("div"),w.className="ikr-fwizard-toast ikr-fwizard-toast--"+N,w.textContent=h,n.appendChild(w),E=setTimeout(function(){w&&(w.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(w){try{w.remove()}catch(L){}w=null}},300))},4e3)}return{open:C,close:g,content:c,setAllowOutsideClose:function(h){i=!!h},setStepAttr:function(h){n.setAttribute("data-step",String(h))},focusFirstControl:m,showToast:T}}var ri=`
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
`;var ur=4;function Fe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function ii(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(n){try{n(i)}catch(l){}})}return{get:function(){return i},set:function(n){Object.assign(i,n),t()},goNext:function(){i.currentStep<ur&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(n){return r.push(n),function(){r=r.filter(function(l){return l!==n})}}}}var Vi='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function ti(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},n=e.onSkip||function(){},l=e.onNext||function(){},c=document.createElement("div");c.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=Vi+"<span>Geri</span>",o.addEventListener("click",function(){t()}),c.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var u=[],k=0;k<ur;k++){var s=document.createElement("span");s.className="ikr-fwizard-progress-seg",d.appendChild(s),u.push(s)}c.appendChild(d);var a=document.createElement("button");a.type="button";var p=null;function f(m){p&&a.removeEventListener("click",p),p=m,m&&a.addEventListener("click",m)}c.appendChild(a);function v(m,b){var x=r.indexOf(m)!==-1,y=i.indexOf(m)!==-1,g=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0);if(x)m===2&&g?(a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Devam Et"),a.innerHTML="Devam Et",f(function(){l()})):(a.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",a.setAttribute("aria-label","Atla"),a.innerHTML="<span>Atla</span>",f(function(){n()})),a.disabled=!1,a.classList.remove("ikr-fwizard-cta-btn--disabled"),a.style.visibility="",a.tabIndex=0;else if(y){a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Sonraki"),a.innerHTML="Sonraki",a.style.visibility="",a.tabIndex=0;var S=Fe(m,b);a.disabled=!S,a.classList.toggle("ikr-fwizard-cta-btn--disabled",!S),f(function(){a.disabled||l()})}else a.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",a.innerHTML="",a.style.visibility="hidden",a.tabIndex=-1,a.disabled=!0,f(null)}return{el:c,update:function(m,b){u.forEach(function(y,g){g+1<=m?y.classList.add("ikr-fwizard-progress-seg-active"):y.classList.remove("ikr-fwizard-progress-seg-active")});var x=m<=1;o.style.visibility=x?"hidden":"",o.style.pointerEvents=x?"none":"",o.tabIndex=x?-1:0,v(m,b)},setNextDisabled:function(m){a.classList.contains("ikr-fwizard-cta-btn")&&(a.disabled=!!m,a.classList.toggle("ikr-fwizard-cta-btn--disabled",!!m))},setThanksState:function(m){o.style.visibility="hidden",d.style.visibility="hidden",a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Devam Et"),a.innerHTML="Devam Et",a.style.visibility="",a.disabled=!1,a.classList.remove("ikr-fwizard-cta-btn--disabled"),f(m)}}}function ai(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var t=!1,n=document.createElement("div");n.className="ikr-fwizard-step-title",n.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(n);var l=document.createElement("div");l.className="ikr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var c=Oe(A||{}),o=[];function d(s){o.forEach(function(a,p){var f=p<s;a.classList.toggle("ikr-fwizard-star-active",f),a.setAttribute("aria-checked",p+1===s?"true":"false"),a.innerHTML=f?c.filled:c.empty})}for(var u=1;u<=5;u++)(function(s){var a=document.createElement("button");a.type="button",a.className="ikr-fwizard-star",a.setAttribute("role","radio"),a.setAttribute("aria-label",s+" y\u0131ld\u0131z"),a.innerHTML=c.empty,a.addEventListener("mouseenter",function(){d(s)}),a.addEventListener("mouseleave",function(){d(e.get().rating)}),a.addEventListener("click",function(){t||(t=!0,e.set({rating:s}),d(s),setTimeout(function(){var p=!r.canNavigate||r.canNavigate();p&&e.goNext()},400))}),o.push(a),l.appendChild(a)})(u);d(e.get().rating);var k=function(s){var a=s&&s.detail&&s.detail.settings;c=Oe(a||A||{}),d(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",k),i.appendChild(l),{el:i,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",k)}}}var ni=3,Gi=10*1024*1024;function oi(e,r){r=r||{};var i=!1,t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-photos";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",t.appendChild(n);var l=document.createElement("div");l.className="ikr-fwizard-step-subtitle",l.textContent="Foto\u011Fraf ekleyebilirsiniz.",t.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",c.appendChild(o),c.appendChild(d);var u=document.createElement("div");u.className="ikr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),c.appendChild(u),t.appendChild(c);var k=r.blobMap||{},s=r.urlToFinger||{};function a(){if(!i){var y=e.get().images||[],g=e.get().pendingImages||[],S=y.map(function(z){return{url:z,isPending:!1}}).concat(g.map(function(z){return{url:z.url,file:z.file,isPending:!0,error:z.error}}));u.innerHTML="",S.forEach(function(z){var C=k[z.url]||z.url,w=p(z,C);u.appendChild(w)}),b()}}function p(y,g){var S=document.createElement("div");S.className="ikr-fwizard-photo-thumb";var z=document.createElement("img");z.src=g,z.alt="",z.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",S.appendChild(z);var C=document.createElement("div");C.className="ikr-fwizard-photo-loading",C.style.display="none",S.appendChild(C);var w=document.createElement("button");return w.type="button",w.className="ikr-fwizard-photo-remove",w.innerHTML="&#x2715;",S.appendChild(w),f(S,y,g),S}function f(y,g,S){var z=y.querySelector("img");z.src!==S&&(z.src=S);var C=y.querySelector(".ikr-fwizard-photo-loading");g.isPending&&g.error?(C.style.display="flex",C.innerHTML='<span class="ikr-upload-error">\u2717 '+g.error+"</span>"):C.style.display="none";var w=y.querySelector(".ikr-fwizard-photo-remove");w.onclick=function(){var E=s[g.url]||(g.file?g.file.name+"_"+g.file.size:null);if(g.url.startsWith("blob:")&&URL.revokeObjectURL(g.url),E){var T=(e.get().fingerprints||[]).filter(function(L){return L!==E});e.set({fingerprints:T})}if(g.isPending){var h=(e.get().pendingImages||[]).filter(function(L){return L.url!==g.url});e.set({pendingImages:h})}else{var N=(e.get().images||[]).filter(function(L){return L!==g.url});e.set({images:N})}}}var v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',m='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function b(){var y=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,S=y+g,z=S>=ni;S>0?(c.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=m):(c.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=v+"<span>Foto\u011Fraf Ekle</span>"),z?(o.style.display="none",o.disabled=!0,d.disabled=!0):(o.style.display="flex",o.disabled=!1,d.disabled=!1,o.classList.remove("ikr-fwizard-photo-add--disabled"))}o.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(y){var g=(e.get().images||[]).length+(e.get().pendingImages||[]).length,S=Array.from(y.target.files).slice(0,ni-g);d.value="";var z=(e.get().pendingImages||[]).length,C=e.get().images||[],w=C.length;if(S.length!==0){for(var E=[],T=[],h=0;h<S.length;h++){var N=S[h],L=N.name+"_"+N.size,B=(e.get().fingerprints||[]).some(function(F){return F===L})||E.some(function(F){return F.file.name+"_"+F.file.size===L});if(B){console.log("[ikr] Duplicate file detected, skipping:",N.name);continue}if(N.size>Gi){var H="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(H,"error"):alert(H);continue}var G=URL.createObjectURL(N);s[G]=L,E.push({url:G,file:N,error:null}),T.push({url:G,file:N});var ne=(e.get().fingerprints||[]).slice();ne.push(L),e.set({fingerprints:ne})}if(E.length!==0){var oe=(e.get().pendingImages||[]).concat(E),W=async function(){for(var F=0;F<T.length;F++){var Ne=T[F],le=Ne.file,D=Ne.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var me=(e.get().pendingImages||[]).filter(function(j){return j.url!==D}),Ae=(e.get().images||[]).slice();Ae.push(D),e.set({pendingImages:me,images:Ae});continue}try{var q=await he(ke+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:fe})});if(!q.ok)throw q.status===429?new Error("rate_limit"):new Error("sign failed");var K=await q.json();if(!K.folder)throw new Error("sign folder missing");var Y=new FormData;Y.append("file",le),Y.append("api_key",K.api_key),Y.append("timestamp",K.timestamp),Y.append("signature",K.signature),Y.append("folder",K.folder);var _e=await fetch("https://api.cloudinary.com/v1_1/"+K.cloud_name+"/image/upload",{method:"POST",body:Y}),X=await _e.json();if(X.secure_url&&_r(X.secure_url)){var ye=(e.get().pendingImages||[]).some(function(j){return j.url===D});if(!ye){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}k[X.secure_url]=D,s[X.secure_url]=s[D];var J=(e.get().pendingImages||[]).filter(function(j){return j.url!==D}),Z=(e.get().images||[]).slice();Z.push(X.secure_url),e.set({pendingImages:J,images:Z});try{he(ke+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:fe,secureUrl:X.secure_url})}).catch(function(){})}catch(j){}}else throw new Error("invalid image url")}catch(j){console.error("[ikr] Image upload failed:",j);var $=j.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast($,"error");var we=(e.get().pendingImages||[]).map(function(I){return I.url===D?{url:I.url,file:I.file,error:$}:I});e.set({pendingImages:we})}}};if(w===0&&z===0){i=!0;var O=!r.canNavigate||r.canNavigate();O&&e.goNext()}e.set({pendingImages:oe}),W()}}};var x=e.onChange(a);return a(),{el:t,destroy:function(){i=!0,d.onchange=null,x&&x()}}}var fr=2e3,Wi=60;function li(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",t.appendChild(n);var l=document.createElement("div");l.className="ikr-fwizard-content-form";var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",c.maxLength=Wi,c.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),c.value=e.get().title||"",c.addEventListener("input",function(){e.set({title:c.value})}),l.appendChild(c);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=fr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",l.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),l.appendChild(d);function u(){var s=o.value.length;d.textContent=s+"/"+fr,d.classList.toggle("ikr-fwizard-char-counter--max",s>=fr)}function k(){return Fe(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),u(),i(k())}),t.appendChild(l),u(),setTimeout(function(){i(k())},0),{el:t,destroy:function(){}}}var qi=40;function di(e,r){r=r||{};var i=r.onValidityChange||function(){},t=r.onSuccess||function(){},n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-author";var l=document.createElement("div");l.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",l.textContent="Hakk\u0131n\u0131zda",n.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="ikr-fwizard-input",u.maxLength=qi,u.setAttribute("aria-required","true"),u.value=e.get().author||"",o.appendChild(d),o.appendChild(u),c.appendChild(o);var k=document.createElement("div");k.className="ikr-fwizard-field";var s=document.createElement("label");s.className="ikr-fwizard-label",s.textContent="E-posta (opsiyonel)";var a=document.createElement("input");a.type="email",a.className="ikr-fwizard-input",a.setAttribute("autocomplete","email"),a.value=e.get().email||"",k.appendChild(s),k.appendChild(a),c.appendChild(k);var p=document.createElement("div");p.className="ikr-fwizard-notice",p.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",c.appendChild(p);var f=document.createElement("div");f.className="ikr-fwizard-msg",f.setAttribute("role","alert"),f.setAttribute("aria-live","assertive"),c.appendChild(f);var v=document.createElement("button");v.type="button",v.className="ikr-fwizard-submit-btn",v.textContent="G\xF6nder",c.appendChild(v),n.appendChild(c);function m(){return Fe(4,e.get())}function b(){var y=!m(),g=(e.get().pendingImages||[]).length,S=g>0;S?(v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled"),v.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(v.disabled=y,v.classList.toggle("ikr-fwizard-submit-btn--disabled",y),v.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),b(),i(m())}),a.addEventListener("input",function(){e.set({email:a.value})}),b(),setTimeout(function(){i(m())},0),v.onclick=async function(){if(!v.disabled){var y=e.get(),g=(y.author||"").trim(),S=(y.comment||"").trim();if(a.value.trim()&&!a.checkValidity()){a.reportValidity();return}if(!g){f.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!y.rating){f.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled");var z=v.textContent;if(v.textContent="G\xF6nderiliyor\u2026",f.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t()},600);return}try{var C=Mr(window.location.href),w=y.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await he(ke+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:fe,productId:y.productId||null,slug:C||null,productName:w,author:g,title:(y.title||"").trim()||null,comment:S||null,rating:y.rating,images:y.images||[]})},15e3);if(E.ok)t();else{var T=await E.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(L){var h=L&&(L.name==="AbortError"||/signal/i.test(L.message||"")),N=h?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":L.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(N,"error"):f.innerHTML='<div class="ikr-fwizard-msg-error">'+N+"</div>",v.disabled=!1,v.classList.remove("ikr-fwizard-submit-btn--disabled"),v.textContent=z}}};var x=e.onChange(b);return{el:n,destroy:function(){v.onclick=null,x&&x()}}}var si=!1;function Ki(){if(!si){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ri,document.head.appendChild(e),si=!0}}function Ui(e,r,i){if(i=i||{},e===1)return ai(r,{canNavigate:i.canNavigate});if(e===2)return oi(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return li(r,{onValidityChange:i.onValidityChange});if(e===4)return di(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:t,destroy:function(){}}}function ci(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function pi(e){e=e||{},Ki();var r=ii({productId:e.productId,productName:e.productName}),i={},t={},n=ei({onClose:function(){window.removeEventListener("popstate",c),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(z){var C=i[z];C&&C.startsWith("blob:")&&URL.revokeObjectURL(C)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),l={ikrReviewModal:!0};window.history.pushState(l,null,"");var c=function(z){n&&n.close&&n.close()};window.addEventListener("popstate",c);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var d=ti({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="ikr-fwizard-layout",u.appendChild(o),u.appendChild(d.el);var k=null,s="idle",a=null,p=!0,f=null;function v(z,C){o.innerHTML="";var w=Ui(z,r,{canNavigate:function(){return s==="idle"},blobMap:i,urlToFinger:t,onValidityChange:function(h){d.setNextDisabled(!h)},onSuccess:b,showToast:n.showToast});if(k=w,d.update(z,r.get()),C){s="entering",w.el.classList.add("ikr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),w.el.removeEventListener("animationend",T),w.el.classList.remove("ikr-fwizard-step--enter"),s="idle",a!==null&&x()};w.el.addEventListener("animationend",T),E=setTimeout(T,700)}else s="idle";o.appendChild(w.el),n.setStepAttr&&n.setStepAttr(z),z===3&&d.setNextDisabled(!0)}var m=!1;function b(){if(!m){if(m=!0,!k){o.innerHTML="";var z=ci();z.classList.add("ikr-fwizard-step--enter"),o.appendChild(z),n.setStepAttr("thanks"),d.setThanksState(n.close);return}var C=k;s="exiting",C.el.classList.add("ikr-fwizard-step--exit");var w=function(){if(f&&clearTimeout(f),C.el.removeEventListener("animationend",w),C.destroy)try{C.destroy()}catch(T){}k===C&&(k=null),o.innerHTML="";var E=ci();E.classList.add("ikr-fwizard-step--enter"),o.appendChild(E),n.setStepAttr("thanks"),d.setThanksState(n.close),s="idle"};C.el.addEventListener("animationend",w),f=setTimeout(w,300)}}function x(){var z=r.get().currentStep;if(s!=="idle"){a=z;return}if(!k){var C=!p;p=!1,v(z,C);return}var w=k;s="exiting",w.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(f&&clearTimeout(f),w.el.removeEventListener("animationend",E),w.destroy)try{w.destroy()}catch(h){}if(k===w){o.innerHTML="",k=null;var T=a!==null?a:r.get().currentStep;a=null,v(T,!0),s="idle"}};w.el.addEventListener("animationend",E),f=setTimeout(E,350)}x();var y=r.get().currentStep,g=r.onChange(function(z){z.currentStep!==y?(y=z.currentStep,x()):d.update(z.currentStep,z)}),S=n.close;return n.close=function(){g&&g(),typeof f!="undefined"&&f&&clearTimeout(f),S()},n.open(u),{close:n.close}}function _(){pi({productId:Q||"",productName:Pe||""})}var Xi={id:"classic",name:"Klasik (A\xE7\u0131k)"};function Ji(e){var r=e.widget,i=e.data,t=e.settings,n=e.iconPair,l=e.allCount,c=e.ratingCounts,o=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,k=e.currentHasImages,s=e.onFilterChange,a=e.onSortChange,p=document.createElement("div");p.className="ikr-summary";var f=(c[3]||0)+(c[4]||0),v=l>0?Math.round(f/l*100):0,m=document.createElement("div");m.className="ikr-summary-block ikr-summary-avg",m.innerHTML='<span class="ikr-avg-star ikr-icon">'+n.filled+'</span><span class="ikr-avg-num">'+o+"</span>",p.appendChild(m);var b=document.createElement("div");if(b.className="ikr-summary-block ikr-summary-count",b.textContent=l.toLocaleString("tr-TR")+" Yorum",p.appendChild(b),t.showRecommendation!==!1&&v>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",p.appendChild(x)}return p.appendChild(Me({ratingCounts:c,allCount:l,iconPair:n,currentRatingFilter:d,onFilterChange:s})),p.appendChild(U({widget:r,currentOrderBy:u,currentHasImages:k,onWriteClick:_,onSortChange:a})),p}var vr={};ue(vr,{css:()=>$i,meta:()=>Zi,render:()=>Qi});var mi=`
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
`;var Zi={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},$i=mi;function Qi(e){var r=e.widget,i=e.settings,t=e.iconPair,n=e.allCount,l=e.ratingCounts,c=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,s=e.onSortChange,a=document.createElement("div");a.className="ikr-summary ikr-summary-compact";var p=document.createElement("div");p.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var v=document.createElement("button");v.className="ikr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="ikr-compact-trigger-stars">'+ve(c,t)+'</span><span class="ikr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(v),p.appendChild(f);var m=U({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:_,onSortChange:s}),b=m.querySelector(".ikr-filter-wrap"),x=m.querySelector(".ikr-write-btn"),y=document.createElement("div");y.className="ikr-compact-actions-slot",x&&y.appendChild(x),b&&y.appendChild(b),p.appendChild(y),a.appendChild(p);var g=document.createElement("div");g.className="ikr-compact-panel",g.setAttribute("role","dialog"),g.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="ikr-compact-panel-inner";var z=document.createElement("div");z.className="ikr-compact-avg",z.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+c+"</span>",S.appendChild(z),S.appendChild(Me({ratingCounts:l,allCount:n,iconPair:t,currentRatingFilter:o,onFilterChange:k})),g.appendChild(S);var C=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function w(O){var F=O?a:f;g.parentNode!==F&&(g.classList.contains("ikr-open")&&(g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),F.appendChild(g))}if(w(C?C.matches:!1),C){var E=function(O){w(O.matches)};C.addEventListener?C.addEventListener("change",E):C.addListener&&C.addListener(E)}if(x){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=A&&A.writeButtonText||"Yorum Yap",T.onclick=_;var h=document.createElement("div");h.className="ikr-compact-write-row",h.appendChild(T),a.appendChild(h)}function N(){g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function L(){$e(B),g.classList.add("ikr-open"),g.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){g.classList.contains("ikr-open")?N():L()};var B=null;function H(O){B&&(B(),B=null),O||(B=Qe({trigger:f,element:g,close:N}))}if(H(C?C.matches:!1),C){var G=function(O){H(O.matches)};C.addEventListener?C.addEventListener("change",G):C.addListener&&C.addListener(G)}if(i.showRecommendation!==!1){var ne=(l[3]||0)+(l[4]||0),oe=n>0?Math.round(ne/n*100):0;if(oe>0){var W=document.createElement("div");W.className="ikr-summary-block ikr-summary-recommend",W.style.marginTop="8px",W.innerHTML='<span class="ikr-recommend-pct">%'+oe+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild(W)}}return a}var gr={};ue(gr,{css:()=>rt,meta:()=>et,render:()=>it});var ui=`
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
`;var et={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},rt=ui;function it(e){var r=e.widget,i=e.settings,t=e.iconPair,n=e.allCount,l=e.ratingCounts,c=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,s=e.onSortChange,a=document.createElement("div");a.className="ikr-summary ikr-summary-split";var p=document.createElement("div");p.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+c+"</span>",p.appendChild(f);var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-count ikr-split-left-count",v.textContent=n.toLocaleString("tr-TR")+" Yorum",p.appendChild(v),a.appendChild(p);var m=document.createElement("div");m.className="ikr-split-col ikr-split-mid",m.appendChild(Me({ratingCounts:l,allCount:n,iconPair:t,currentRatingFilter:o,onFilterChange:k})),a.appendChild(m);var b=U({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:_,onSortChange:s}),x=b.querySelector(".ikr-filter-wrap"),y=b.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-split-col ikr-split-right",y&&g.appendChild(y),x&&g.appendChild(x),a.appendChild(g);var S=(l[3]||0)+(l[4]||0),z=n>0?Math.round(S/n*100):0,C=document.createElement("div");C.className="ikr-summary-block ikr-summary-recommend",C.innerHTML='<span class="ikr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var w=i.showRecommendation===!1||z===0;return w&&C.classList.add("ikr-split-rec-hidden"),p.appendChild(C),a}var hr={};ue(hr,{css:()=>at,meta:()=>tt,render:()=>nt});var fi=`
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
`;var tt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},at=fi;function nt(e){var r=e.widget,i=e.iconPair,t=e.allCount,n=e.avgRatingVal,l=e.currentOrderBy,c=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var u=document.createElement("div");u.className="ikr-minimal-info";var k=document.createElement("div");k.className="ikr-minimal-row";var s=document.createElement("span");s.className="ikr-minimal-avg",s.textContent=n,k.appendChild(s);var a=document.createElement("span");a.className="ikr-minimal-stars",a.innerHTML=ve(n,i),k.appendChild(a);var p=document.createElement("span");p.className="ikr-minimal-count",p.textContent=t.toLocaleString("tr-TR")+" Yorum",k.appendChild(p),u.appendChild(k),d.appendChild(u);var f=U({widget:r,currentOrderBy:l,currentHasImages:c,onWriteClick:_,onSortChange:o}),v=f.querySelector(".ikr-filter-wrap"),m=f.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-minimal-actions",m&&b.appendChild(m),v&&b.appendChild(v),d.appendChild(b),m){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent=A&&A.writeButtonText||"Yorum Yap",x.onclick=_;var y=document.createElement("div");y.className="ikr-minimal-write-row",y.appendChild(x),d.appendChild(y)}return d}var br={};ue(br,{css:()=>lt,meta:()=>ot,render:()=>dt});var ki=`
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
`;var ot={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},lt=ki;function dt(e){var r=e.widget,i=e.iconPair,t=e.allCount,n=e.avgRatingVal,l=e.currentOrderBy,c=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var u=document.createElement("div");u.className="ikr-hero-info";var k=document.createElement("div");k.className="ikr-hero-rating-col";var s=document.createElement("span");s.className="ikr-hero-avg",s.textContent=n,k.appendChild(s);var a=document.createElement("div");a.className="ikr-hero-meta-row";var p=document.createElement("span");p.className="ikr-hero-stars",p.innerHTML=ve(n,i),a.appendChild(p);var f=document.createElement("div");f.className="ikr-hero-count",f.textContent=t.toLocaleString("tr-TR")+" Yorum",a.appendChild(f),k.appendChild(a),u.appendChild(k),d.appendChild(u);var v=U({widget:r,currentOrderBy:l,currentHasImages:c,onWriteClick:_,onSortChange:o}),m=v.querySelector(".ikr-filter-wrap"),b=v.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-hero-actions ikr-desktop-only",b&&x.appendChild(b),m&&x.appendChild(m),d.appendChild(x);var y=U({widget:r,currentOrderBy:l,currentHasImages:c,onWriteClick:_,onSortChange:o}),g=y.querySelector(".ikr-filter-wrap"),S=y.querySelector(".ikr-write-btn"),z=document.createElement("div");return z.className="ikr-hero-write-row",S&&z.appendChild(S),g&&z.appendChild(g),d.appendChild(z),d}var er={classic:kr,compact:vr,split:gr,minimal:hr,hero:br};function rr(e){return er[e]||er.classic}function vi(){return Object.keys(er).map(function(e){return er[e].css||""}).join(`
`)}var yr={};ue(yr,{css:()=>ct,meta:()=>st,render:()=>pt});function He(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var n=document.createElement("span");n.className="ikr-reply-label",n.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi",t.appendChild(n),i.appendChild(t);var l=document.createElement("div");l.className="ikr-reply-text ikr-reply-text-clamped",l.textContent=e,i.appendChild(l);var c=document.createElement("span");return c.className="ikr-read-more ikr-reply-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",i.appendChild(c),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(c.style.display="inline",typeof r=="function")c.onclick=r;else{var o=!1;c.onclick=function(){o=!o,l.classList.toggle("ikr-reply-text-clamped",!o),c.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var st={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},ct="";function pt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var n=document.createElement("div");n.className="ikr-review-top-left";var l=document.createElement("span");l.className="ikr-review-stars",l.innerHTML=se(e.rating,A),n.appendChild(l);var c=document.createElement("span");if(c.className="ikr-date",c.textContent=ce(e.createdAt),t.appendChild(n),t.appendChild(c),i.appendChild(t),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",i.appendChild(d);var u=(e.comment||"").trim();if(u){var k=document.createElement("div");k.className="ikr-body ikr-body-clamped",k.textContent=u,i.appendChild(k);var s=document.createElement("span");s.className="ikr-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(k.scrollHeight>k.clientHeight+2){s.style.display="inline";var v=!1;s.onclick=function(){v=!v,k.classList.toggle("ikr-body-clamped",!v),s.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var a=ge(e);if(a.length){var p=document.createElement("div");p.className="ikr-gallery",a.forEach(function(v){var m=document.createElement("img"),b=ee(v,V);m.src=b.src,m.srcset=b.srcset,m.loading="lazy",m.decoding="async",m.width=V,m.height=V,m.className="ikr-img",re(m),m.setAttribute("data-ikr-img-url",v),(function(x){m.onclick=function(){te(e,x,r)}})(v),p.appendChild(m)}),i.appendChild(p)}var f=He(e.merchantReply);return f&&i.appendChild(f),i}var wr={};ue(wr,{css:()=>ut,meta:()=>mt,render:()=>ft});var gi=`
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
`;var mt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},ut=gi;function ft(e,r){var i=ge(e),t=i.length>0,n=document.createElement("div");n.className="ikr-review-list"+(t?"":" ikr-review-list--no-media");var l=document.createElement("div");l.className="ikr-review-list-author";var c=document.createElement("span");c.className="ikr-review-stars ikr-review-list-author-stars",c.innerHTML=se(e.rating,A),l.appendChild(c);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",l.appendChild(o);var d=document.createElement("span");d.className="ikr-date ikr-review-list-author-date",d.textContent=ce(e.createdAt),l.appendChild(d),n.appendChild(l);var u=document.createElement("div");if(u.className="ikr-review-list-content",e.title){var k=document.createElement("div");k.className="ikr-review-list-title",k.textContent=e.title,u.appendChild(k)}var s=(e.comment||"").trim();if(s){var a=document.createElement("div");a.className="ikr-review-list-body ikr-body-clamped",a.textContent=s,u.appendChild(a);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",u.appendChild(p),requestAnimationFrame(function(){if(a.scrollHeight>a.clientHeight+2){p.style.display="inline";var m=!1;p.onclick=function(){m=!m,a.classList.toggle("ikr-body-clamped",!m),p.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var f=He(e.merchantReply);if(f&&u.appendChild(f),n.appendChild(u),t){var v=document.createElement("div");v.className="ikr-review-list-media",i.forEach(function(m){var b=document.createElement("img"),x=ee(m,V);b.src=x.src,b.srcset=x.srcset,b.loading="lazy",b.decoding="async",b.width=V,b.height=Math.round(V*4/3),b.setAttribute("data-ikr-img-url",m),re(b),(function(y){b.onclick=function(){te(e,y,r)}})(m),v.appendChild(b)}),n.appendChild(v)}return n}var xr={};ue(xr,{css:()=>vt,meta:()=>kt,render:()=>gt});var hi=`
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
`;var kt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},vt=hi;function gt(e,r){var i=Ue(e),t=!!i,n=document.createElement("div");n.className="ikr-review-gallery"+(t?"":" ikr-review-gallery--no-media");var l=document.createElement("div");l.className="ikr-review-gallery-content";var c=document.createElement("span");if(c.className="ikr-review-stars ikr-review-gallery-stars",c.innerHTML=se(e.rating,A),l.appendChild(c),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,l.appendChild(o)}var d=document.createElement("div");d.className="ikr-review-gallery-author",d.textContent=e.author||"",l.appendChild(d);var u=document.createElement("div");u.className="ikr-review-gallery-date",u.textContent=ce(e.createdAt),l.appendChild(u);var k=(e.comment||"").trim();if(k){var s=document.createElement("div");s.className="ikr-review-gallery-body ikr-body-clamped",s.textContent=k,l.appendChild(s);var a=document.createElement("span");a.className="ikr-read-more",a.textContent="Devam\u0131n\u0131 oku",a.style.display="none",a.style.cursor="pointer";var p=!1;a.onclick=function(){if(i){te(e,i,r);return}p=!p,s.classList.toggle("ikr-body-clamped",!p),a.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},l.appendChild(a),requestAnimationFrame(function(){s.scrollHeight>s.clientHeight+2&&(a.style.display="inline")})}if(n.appendChild(l),t){var f=document.createElement("div");f.className="ikr-review-gallery-media";var v=document.createElement("img"),m=ee(i,Xe);v.src=m.src,v.srcset=m.srcset,v.loading="lazy",v.decoding="async",v.width=Xe,v.height=Math.round(Xe*4/3),re(v),v.setAttribute("data-ikr-img-url",i),v.onclick=function(){te(e,i,r)},f.appendChild(v),n.appendChild(f)}var b=He(e.merchantReply,i?function(){te(e,i,r)}:null);return b&&(b.classList.add("ikr-review-gallery-reply"),n.appendChild(b)),n}var ir={card:yr,list:wr,gallery:xr};function De(e){return ir[e]||ir.card}function bi(){return Object.keys(ir).map(function(e){return ir[e].css||""}).join(`
`)}function Le(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),n=parseInt(i[2],16),l=parseInt(i[3],16);return"rgba("+t+","+n+","+l+","+r+")"}function ht(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(Vr)}catch(t){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var i=document.querySelector("main")||document.body;return i?(i.appendChild(e),e):null}var yi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},wi={small:80,medium:110,large:140};function bt(e,r){var i=document.createElement("div");i.className="ikr-state-msg ikr-state-error",i.setAttribute("role","status"),i.setAttribute("aria-live","polite");var t=document.createElement("div");t.className="ikr-state-error-text",t.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",i.appendChild(t);var n=document.createElement("button");return n.type="button",n.className="ikr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},i.appendChild(n),i}function yt(e,r){var i=r.headerTitleColor||"#111111",t=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",l=r.headerRecommendColor||"#111111",c=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",u=Le(c,.06),k=r.reviewStarColor||"#f59e0b",s=r.btnBgColor||"#111111",a=r.btnTextColor||"#ffffff",p=r.btnBorderColor||"#111111",f=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",m=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",x=r.filterMenuBorderColor||"#e5e7eb",y=r.filterItemTextColor||"#111111",g=r.filterItemHoverBgColor||"#f3f4f6",S=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",C=r.reviewAuthorColor||"#111111",w=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",h=r.replyBgColor||"#f9fafb",N=r.replyBorderColor||"#747474",L=r.replyLabelColor||"#111111",B=r.replyTextColor||"#111111",H=r.photoTitleColor||"#111111",G=Le("#111111",.05),ne=r.photoArrowBgColor||"#ffffff",oe=r.photoArrowTextColor||"#111111",W=Le("#111111",.12),O=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Ne=r.formSecondaryTextColor||"#3b3b3b",le=r.inputTextColor||F,D=r.inputBorderColor||"#d1d5db",me=r.placeholderColor||"#9ca3af",Ae=r.formStepBarColor||"#111111",q=r.formBtnBgColor||"#111111",K=r.formBtnTextColor||"#ffffff",Y=r.formBtnBorderColor||"#111111",_e=Le(q,.06),X=Le(q,.18),ye=Le(K,.85),J=Le(F,.06),Z=r.loadMoreBgColor||"#ffffff",$=r.loadMoreTextColor||"#111111",we=r.loadMoreBorderColor||"#111111",j={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":t,"--ikr-header-count":n,"--ikr-header-recommend":l,"--ikr-bar-fill":c,"--ikr-bar-track":o,"--ikr-bar-count":d,"--ikr-bar-hover-bg":u,"--ikr-btn-bg":s,"--ikr-btn-text":a,"--ikr-btn-border":p,"--ikr-filter-btn-bg":f,"--ikr-filter-btn-text":v,"--ikr-filter-btn-border":m,"--ikr-filter-menu-bg":b,"--ikr-filter-menu-border":x,"--ikr-filter-item-text":y,"--ikr-filter-item-hover-bg":g,"--ikr-filter-item-active":S,"--ikr-review-title":z,"--ikr-review-author":C,"--ikr-review-date":w,"--ikr-review-body":E,"--ikr-review-border":T,"--ikr-review-star-color":k,"--ikr-reply-bg-color":h,"--ikr-reply-border":N,"--ikr-reply-label":L,"--ikr-reply-text":B,"--ikr-photo-title":H,"--ikr-photo-image-border":G,"--ikr-photo-arrow-bg":ne,"--ikr-photo-arrow-text":oe,"--ikr-photo-arrow-border":W,"--ikr-fwizard-bg":O,"--ikr-fwizard-text":F,"--ikr-fwizard-secondary-text":Ne,"--ikr-fwizard-input-bg":O,"--ikr-fwizard-input-text":le,"--ikr-fwizard-input-border":D,"--ikr-fwizard-placeholder":me,"--ikr-fwizard-close-text":F,"--ikr-fwizard-close-hover-bg":J,"--ikr-fwizard-progress-bg":J,"--ikr-fwizard-progress-active":Ae,"--ikr-fwizard-btn-bg":q,"--ikr-fwizard-btn-text":K,"--ikr-fwizard-btn-border":Y,"--ikr-fwizard-btn-disabled-bg":X,"--ikr-fwizard-btn-disabled-text":ye,"--ikr-fwizard-nav-hover-bg":_e,"--ikr-load-more-bg":Z,"--ikr-load-more-text":$,"--ikr-load-more-border":we};Object.keys(j).forEach(function(I){e.style.setProperty(I,j[I])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function be(e,r,i,t,n,l,c){if(Ir){Ke({productId:e,settings:r,reviewsData:i,productName:t,orderBy:n,page:l,badgeSettings:c});return}qe(!0),Sr(e),Er(r),c!==void 0&&Tr(c),Lr(t),n&&Re(n),l&&Ee(l),i!=null&&Nr(i);try{let tr=function(P,R){if(!(!P||!P.meta||!P.meta.sizeOverrides)){var M=P.meta.sizeOverrides[R];M&&Object.keys(M).forEach(function(ze){a.style.setProperty(ze,M[ze])})}};var wt=tr,o=rr(r.summaryLayout),d=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),u=r.showTitle!==!1,k=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",s=d&&u?k:"",a=document.documentElement;yt(a,r),Hr("#111111",$r+vi()+bi());var p=r.borderRadius!==void 0?r.borderRadius:8,f=yi[r.size]||yi.medium,v=wi[r.thumbnailSize]||wi.medium,m=De(r.reviewLayout);if(m.meta&&m.meta.sizeOverrides&&m.meta.sizeOverrides[r.size]){var b=m.meta.sizeOverrides[r.size],x=b["--ikr-list-photo-w"]||b["--ikr-gallery-photo-w"];x&&(v=parseInt(x))}a.style.setProperty("--ikr-title-size",f.titleSize+"px"),a.style.setProperty("--ikr-review-text-size",f.reviewTextSize+"px"),a.style.setProperty("--ikr-review-title-size",f.reviewTitleSize+"px"),a.style.setProperty("--ikr-author-size",f.authorSize+"px"),a.style.setProperty("--ikr-reply-name-size",f.replyNameSize+"px"),a.style.setProperty("--ikr-reply-text-size",f.replyTextSize+"px"),a.style.setProperty("--ikr-radius",p+"px"),a.style.setProperty("--ikr-radius-sm",Math.max(0,p-4)+"px"),a.style.setProperty("--ikr-photo-title-size",f.photoTitleSize+"px"),a.style.setProperty("--ikr-avg-rating-size",f.avgRatingSize+"px"),a.style.setProperty("--ikr-review-count-size",f.reviewCountSize+"px"),a.style.setProperty("--ikr-compact-count-size",f.compactCountSize+"px"),a.style.setProperty("--ikr-recommend-size",f.recommendSize+"px"),a.style.setProperty("--ikr-btn-text-size",f.btnTextSize+"px"),a.style.setProperty("--ikr-bar-label-size",f.barLabelSize+"px"),a.style.setProperty("--ikr-minimal-avg-size",f.minimalAvgSize+"px"),a.style.setProperty("--ikr-hero-avg-size",f.heroAvgSize+"px"),a.style.setProperty("--ikr-bar-count-size",f.barCountSize+"px"),a.style.setProperty("--ikr-review-date-size",f.reviewDateSize+"px"),a.style.setProperty("--ikr-filter-text-size",f.filterTextSize+"px"),a.style.setProperty("--ikr-load-more-size",f.loadMoreSize+"px"),a.style.setProperty("--ikr-read-more-size",f.readMoreSize+"px"),a.style.setProperty("--ikr-thumbnail-size",v+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";a.style.setProperty("--ikr-review-star-color",y),a.style.setProperty("--ikr-star-size",f.reviewStarSize+"px"),a.style.setProperty("--ikr-avg-star-size",f.avgStarSize+"px"),tr(rr(r.summaryLayout),r.size),tr(De(r.reviewLayout),r.size);var g=Oe(r),S=document.getElementById("ikas-reviews");if(!S){var z=ht();if(!z)return;S=document.createElement("div"),S.id="ikas-reviews",S.style.minHeight="200px",z.appendChild(S)}if(r.enabled===!1){S.style.minHeight="auto",S.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',qe(!1);var C=We;Ke(null),C&&be(C.productId,C.settings,C.reviewsData,C.productName,C.orderBy,C.page,C.badgeSettings);return}S.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var w=i||{},E=cr(w),T=E?[]:w.data&&w.data.reviews||[],h=E?0:w.data&&w.data.totalCount||0;Pr(T);var N=S.cloneNode(!1);S.parentNode.replaceChild(N,S),S=N;var L=document.createElement("div");if(L.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),s){var B=document.createElement("div"),H=r.summaryLayout||"classic";B.className="ikr-title ikr-title-"+H,B.textContent=s,L.appendChild(B)}if(E){L.appendChild(bt(w.message,async function(){var P=await Te(Q,de,1,Ce,Se);await be(Q,A,P,Pe,de,1,ar)})),S.appendChild(L);return}var G=w.data&&w.data.allCount||0,ne=w.data&&w.data.ratingCounts||null,oe=ne||[0,0,0,0,0],W=w.data&&w.data.avgRating||"0.0";if(!ne&&T.length>0){T.forEach(function(P){P.rating>=1&&P.rating<=5&&oe[P.rating-1]++});var O=T.reduce(function(P,R){return P+R.rating},0);W=(O/T.length).toFixed(1)}if(G>0){var F=rr(r.summaryLayout),Ne=F.render({widget:L,data:w,settings:r,iconPair:g,allCount:G,ratingCounts:oe,avgRatingVal:W,currentRatingFilter:Ce,currentOrderBy:de,currentHasImages:Se,onFilterChange:async function(P){Ge(Ce===P?null:P),Ee(1);var R=await Te(Q,de,1,Ce,Se);await be(Q,A,R,Pe,de,1)},onSortChange:async function(P,R){Ee(1),R?(or(!0),Re("newest")):(or(!1),Re(P));var M=await Te(Q,de,1,Ce,Se);await be(Q,A,M,Pe,de,1)}});L.appendChild(Ne)}else{var le=document.createElement("button");le.className="ikr-write-btn",le.style.cssText="display:block;margin:16px auto 0;",le.textContent=r.writeButtonText||"Yorum Yap",le.onclick=_,L.appendChild(le)}var D=(Cr||[]).filter(function(P){return ge(P).length>0});if(r.showPhotoGallery!==!1&&!Se&&D.length>0){var me=document.createElement("div");if(me.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var Ae=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",q=document.createElement("div");q.className="ikr-photo-title",q.textContent=Ae,me.appendChild(q)}var K=r.reviewLayout==="card"?"1/1":"3/4";a.style.setProperty("--ikr-photo-thumb-aspect",K);var Y=document.createElement("div");Y.className="ikr-photo-strip";var _e=V,X=r.reviewLayout==="card"?V:Math.round(V*4/3),ye=0;D.forEach(function(P){if(!(ye>=15)){var R=Ue(P);if(R){var M=document.createElement("img"),ze=ee(R,V);M.src=ze.src,M.srcset=ze.srcset,M.loading=ye<3?"eager":"lazy",M.decoding="async",M.width=_e,M.height=X,M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",re(M),(function(xi,zi){M.onclick=function(){te(zi,xi,D)}})(R,P),Y.appendChild(M),ye++}}});var J=document.createElement("button");J.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",J.innerHTML="&#8249;",J.setAttribute("aria-label","\xD6nceki"),J.onclick=function(){Y.scrollBy({left:-200,behavior:"smooth"})};var Z=document.createElement("button");Z.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",Z.innerHTML="&#8250;",Z.setAttribute("aria-label","Sonraki"),Z.onclick=function(){Y.scrollBy({left:200,behavior:"smooth"})};var $=document.createElement("div");$.className="ikr-photo-strip-wrap",$.appendChild(J),$.appendChild(Y),$.appendChild(Z),me.appendChild($),L.appendChild(me)}if(T.length===0){var we=document.createElement("p");we.className="ikr-state-msg",we.textContent="Hen\xFCz yorum yok.",L.appendChild(we)}else{var m=De(r.reviewLayout);T.forEach(function(R){L.appendChild(m.render(R,nr))})}var j=w.data&&w.data.hasMore;if(j){var I=document.createElement("button");I.className="ikr-load-more",I.textContent="Daha Fazla G\xF6ster",I.onclick=async function(){I.disabled=!0,I.textContent="Y\xFCkleniyor...";var P=zr+1,R=await Te(Q,de,P,Ce,Se);if(R&&!cr(R)&&R.data&&Array.isArray(R.data.reviews)){Rr(R.data.reviews),Ee(P);var M=De(A.reviewLayout);R.data.reviews.forEach(function(ze){L.insertBefore(M.render(ze,nr),I)}),R.data.hasMore?(I.disabled=!1,I.textContent="Daha Fazla G\xF6ster"):I.remove()}else I.disabled=!1,I.textContent="Tekrar Dene"},L.appendChild(I)}S.appendChild(L),Zr(G>0?W:null,h,t,ar,g)}catch(P){console.error("[ikr] render error:",P),S.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(qe(!1),We){var xe=We;Ke(null),be(xe.productId,xe.settings,xe.reviewsData,xe.productName,xe.orderBy,xe.page,xe.badgeSettings)}}}export{be as a,Ze as b,cr as c,Te as d,Ei as e,Lt as f};
