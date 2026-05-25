/* Renuvex Product Reviews ESM runtime | theme: default */
import{b as Xe}from"./chunk-IVH3XSVO.js";import{a as ze,b as nt,c as nr,d as ir,e as it,f as Ue,g as ot,j as lt,k as pt,l as dt}from"./chunk-X6X2FGAT.js";import{$ as ke,A as Wr,B as Gr,C as qr,D as Ur,E as Kr,F as Ze,G as $e,H as Qe,N as ye,O as W,P as G,Q as Ge,R as Xr,T as Jr,U as ce,V as we,W as Zr,X as $r,Y as me,Z as Qr,_ as et,a as ge,aa as er,b as he,ba as j,c as be,ca as rr,da as tr,e as fr,ea as br,f as Ve,fa as yr,g as Fr,ga as te,h as Te,ha as rt,i as Or,ia as ae,j as Re,ja as tt,k as Ie,ka as qe,l as K,la as at,m as N,n as gr,na as ar,o as Me,oa as Pe,q as hr,r as _r,s as We,t as Le,u as Je,v as Hr,w as Yr,x as Dr,y as jr,z as Vr}from"./chunk-IPCLXR5A.js";var jt=15,Vt=60*1e3,ut="__renuvexProductReviewsFetchError",wr={};function or(e){return{type:ut,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function kr(e){return!!(e&&e.type===ut)}async function Ne(e,r,t,n,a,o){if(window.__ikasPreviewMode){try{var d=window.__ikasPreviewBaseUrl||be,l=d+"/api/preview/reviews?page="+encodeURIComponent(t||1),u=await ze(l);if(u.ok)return await u.json()}catch(f){}return or()}r=r||"newest",t=t||1;var c=o?"_l"+o:"",x="renuvex_pr_reviews_"+he+"_"+e+"_"+r+"_"+t+"_"+(n||"")+"_"+(a?"1":"0")+c,s=null,i=tt(x);if(i)try{var h=JSON.parse(i);if(h&&h.t!==void 0&&h.v){if(Date.now()-h.t<Vt)return h.v;s=h.v,qe(x,"")}else qe(x,"")}catch(f){qe(x,"")}try{var v=be+"/api/public/reviews?storeId="+encodeURIComponent(he)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(n?"&rating="+encodeURIComponent(n):"")+(a?"&hasImages=true":"")+(o?"&limit="+encodeURIComponent(o):""),p=await ze(v);if(!p.ok)return s||or();var m=await p.json();return qe(x,JSON.stringify({t:Date.now(),v:m})),m}catch(f){return console.error("[renuvex-pr] fetchReviews error:",f),s||or()}}async function Wt(e){var r=await Ne(e,"newest",1,null,!0,jt);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Ka(e,r){var t=document.getElementById("renuvex-pr-rating-badge");t&&t.remove();var n=document.getElementById("renuvex-pr-jsonld");if(n&&n.remove(),!wr[e]){wr[e]=!0;var a={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},o={enabled:!0,size:"medium"};try{var d=await nt();if(!d)return;var l=d.widgets&&d.widgets.reviews||a,u=d.widgets&&d.widgets.badge||o;if(l.enabled===!1)return;We("newest"),Le(1),Je(null);var c=await Promise.all([Ne(e,"newest",1,null),Wt(e)]),x=c[0];Gr(c[1]),await Ce(e,l,x,r,"newest",1,u)}catch(s){console.error("[renuvex-pr] bootstrap error:",s),await Ce(e,a,or(),r,void 0,void 0,o)}finally{delete wr[e]}}}function Fe(e){return ke(e)}function Gt(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ne(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function qt(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function Ut(){var e=Gt(),r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",o=qt()&&!a;if(n>0){var d=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",d+n+"px","important")}return t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Kt(e){if(e){var r=document.body.style,t=document.documentElement.style;ne(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ne(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ne(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ne(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ne(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ne(r,"position",e.bodyPosition,e.bodyPositionPriority),ne(r,"top",e.bodyTop,e.bodyTopPriority),ne(r,"left",e.bodyLeft,e.bodyLeftPriority),ne(r,"right",e.bodyRight,e.bodyRightPriority),ne(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Xt(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Oe(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Jt(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function vt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Jt)}function ct(e){var r=vt(e),t=r[0]||e.querySelector('[role="dialog"]')||e;Oe(t)}function Zt(e,r){if(e.key==="Tab"){var t=vt(r);if(!t.length){e.preventDefault(),ct(r);return}var n=t[0],a=t[t.length-1],o=document.activeElement;if(!r.contains(o)){e.preventDefault(),Oe(n);return}e.shiftKey&&o===n?(e.preventDefault(),Oe(a)):!e.shiftKey&&o===a&&(e.preventDefault(),Oe(n))}}function $t(){var e={id:"renuvex-pr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({renuvexPrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function Qt(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.renuvexPrModal===e.id)}function ea(e){if(Qt(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function st(e,r,t,n,a){Kt(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e),Oe(a)}function ra(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ce(e.rating,N);var o=document.createElement("span");o.className="renuvex-pr-modal-date",o.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-modal-title",d.textContent=e.title||"",d.style.display=e.title?"":"none",t.appendChild(d);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-modal-body",u.textContent=(e.comment||"").trim(),u.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-modal-reply";var x=document.createElement("div");x.className="renuvex-pr-modal-reply-label",x.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi";var s=document.createElement("div");return s.className="renuvex-pr-modal-reply-text",s.textContent=e.merchantReply||"",c.appendChild(x),c.appendChild(s),c.style.display=e.merchantReply?"":"none",t.appendChild(c),r.appendChild(t),r}function mt(e,r,t){var n=t||N,a=e.querySelector(".renuvex-pr-modal-scroll-content"),o=a.querySelector(".renuvex-pr-modal-stars");o.innerHTML=ce(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var d=a.querySelector(".renuvex-pr-modal-title");d.textContent=r.title||"",d.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=a.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var u=a.querySelector(".renuvex-pr-modal-reply");u.querySelector(".renuvex-pr-modal-reply-label").textContent=n&&n.merchantReplyLabel||"Ma\u011Faza Sahibi",u.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",u.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Cr(e,r,t,n,a,o,d,l,u){var c=Fe(e),x=Math.max(0,Math.min(t||0,c.length-1)),s=document.createElement("div");s.className="renuvex-pr-modal-left";var i=document.createElement("img"),h=d==="next"?"renuvex-pr-modal-img-enter-right":d==="prev"?"renuvex-pr-modal-img-enter-left":"";i.className="renuvex-pr-modal-main-img"+(h?" "+h:""),i.src=yr(c[x]||""),i.decoding="async",i.width=br,i.height=Math.round(br*4/3),i.alt="Yorum foto\u011Fraf\u0131",rt(i,function(E){if(E.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var T=document.createElement("div");T.className="renuvex-pr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(T,E)}}),s.appendChild(i);var v=document.createElement("button");v.className="renuvex-pr-modal-close-mobile",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(E){E.stopPropagation(),o()},s.appendChild(v);var p=0;if(s.addEventListener("touchstart",function(E){p=E.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(E){var T=p-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(C)xe(e,r,x+1,n,a,o,!0,"next",l,u);else if(y){var b=n[r+1];xe(b,r+1,0,n,a,o,!1,"next",l,u)}}else if(f)xe(e,r,x-1,n,a,o,!0,"prev",l,u);else if(S){var P=n[r-1],A=Fe(P);xe(P,r-1,A.length-1,n,a,o,!1,"prev",l,u)}}},{passive:!0}),c.length>1){var m=document.createElement("div");m.className="renuvex-pr-modal-thumbs",c.forEach(function(E,T){var b=document.createElement("img"),P=te(E,tr);b.src=P.src,b.srcset=P.srcset,b.loading="lazy",b.decoding="async",b.width=tr,b.height=tr,b.className="renuvex-pr-modal-thumb"+(T===x?" renuvex-pr-modal-thumb-active":""),b.alt="K\xFC\xE7\xFCk resim "+(T+1),ae(b),b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===x&&b.setAttribute("aria-current","true"),(function(A){function L(){xe(e,r,A,n,a,o,!0,null,l,u)}b.onclick=L,b.onkeydown=function(R){(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),L())}})(T),m.appendChild(b)}),s.appendChild(m)}var f=x>0,C=x<c.length-1,S=r>0,y=r<n.length-1,k=f||S,w=C||y;if(k){var g=document.createElement("button");g.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev",g.innerHTML="&#8249;",g.setAttribute("aria-label","\xD6nceki"),g.onclick=function(E){if(E.stopPropagation(),f)xe(e,r,x-1,n,a,o,!0,"prev",l,u);else if(S){var T=n[r-1],b=Fe(T);xe(T,r-1,b.length-1,n,a,o,!1,"prev",l,u)}},s.appendChild(g)}if(w){var z=document.createElement("button");z.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next",z.innerHTML="&#8250;",z.setAttribute("aria-label","Sonraki"),z.onclick=function(E){if(E.stopPropagation(),C)xe(e,r,x+1,n,a,o,!0,"next",l,u);else if(y){var T=n[r+1];xe(T,r+1,0,n,a,o,!1,"next",l,u)}},s.appendChild(z)}return s}function xt(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Fe(n);a[0]&&(new Image().src=yr(a[0]))}})}function zr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ta(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function o(){zr(t),zr(n),zr(a)}o(),t&&Oe(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function xe(e,r,t,n,a,o,d,l,u,c){if(c&&(c.currentReview=e),d){var x=Cr(e,r,t,n,a,o,l,u,c);a.firstChild&&a.replaceChild(x,a.firstChild)}else{var x=Cr(e,r,t,n,a,o,l,u,c),s=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&a.replaceChild(x,a.firstChild),s&&mt(s,e,c&&c.currentSettings),ta(u,a)}xt(r,n)}function ie(e,r,t){var n=Fe(e);if(!n.length)return;var a=(t||[]).filter(function(k){return Fe(k).length>0}),o=a.findIndex(function(k){return k===e||k.id===e.id});o===-1&&(a.unshift(e),o=0);var d=n.indexOf(r);d<0&&(d=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var u=document.createElement("div");u.className="renuvex-pr-modal";var c=!1,x=Xt(),s=Ut(),i=$t(),h={currentReview:e,currentSettings:N},v=null;function p(k){var w=k&&k.detail&&k.detail.settings;if(!(w&&w===v)){v=w||null,h.currentSettings=w||N;var g=u.querySelector(".renuvex-pr-modal-right");!g||!h.currentReview||mt(g,h.currentReview,h.currentSettings)}}function m(){c||(c=!0,window.removeEventListener(Pe,p),st(l,f,m,s,x))}function f(k){if(k.key==="Escape"){C();return}Zt(k,l)}function C(){c||(c=!0,window.removeEventListener(Pe,p),st(l,f,m,s,x),ea(i))}document.addEventListener("keydown",f),window.addEventListener("popstate",m),window.addEventListener(Pe,p),l.onclick=function(){C()},u.onclick=function(k){k.stopPropagation()},u.appendChild(Cr(e,o,d,a,u,C,null,l,h)),u.appendChild(ra(e)),xt(o,a);var S=document.createElement("div");S.className="renuvex-pr-modal-wrap",S.tabIndex=-1,S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),S.appendChild(u);var y=document.createElement("button");y.className="renuvex-pr-modal-close",y.textContent="\u2715",y.setAttribute("aria-label","Kapat"),y.onclick=function(k){k.stopPropagation(),C()},S.appendChild(y),l.appendChild(S),document.body.appendChild(l),ct(l)}function ft(e){var r=ar();if(r&&typeof r.findProductTitle=="function")try{var t=r.findProductTitle(e);if(t)return t}catch(d){}if(e)for(var n=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),a=0;a<n.length;a++){var o=n[a];if(o.children.length===0&&o.textContent.trim()===e&&o.tagName!=="TITLE"&&!o.closest("[data-renuvex-listing-badge]")&&!o.closest("[data-renuvex-slot]")&&!o.closest("#ikas-reviews")&&!o.closest("nav")&&!o.closest("header")&&!o.closest('[class*="breadcrumb"]')&&!o.closest('[aria-label*="breadcrumb"]'))return o}return document.querySelector("h1")}var lr=null,pr=null;function aa(e,r){return we(e,r)}function na(e){var r=ar();if(r&&typeof r.getProductBadgeMountPoint=="function")try{var t=r.getProductBadgeMountPoint(e);if(t&&t.parent)return t}catch(n){}return lt(e)}function Sr(e,r,t,n,a,o,d){lr&&(lr.disconnect(),lr=null),pr&&(pr.disconnect(),pr=null),it("product-title-rating");var l=document.querySelector(".renuvex-pr-rating-badge--pdp");if(l&&l.remove(),!!e&&!(n&&n.enabled===!1)){var u=document.getElementById("renuvex-pr-jsonld");u&&u.remove();var c=document.createElement("script");c.id="renuvex-pr-jsonld",c.type="application/ld+json",c.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(c);var x=ft(t);if(!x||!x.parentNode){fr("dom-conflict","PDP product title could not be found for badge placement",{surface:"pdp-badge",reason:"title_not_found",productName:t||"",productId:o||""});return}var s=na(x);if(!s||!s.parent){fr("dom-conflict","PDP badge mount point could not be resolved",{surface:"pdp-badge",reason:"mount_not_found",productName:t||"",productId:o||""});return}var i=n&&n.size||"medium",h=Ue[i]||Ue.medium,v=null;if(n&&n.mobileOverride===!0){var p=n.mobileSize||"small";v=Ue[p]||Ue.small}ot(h,v);var m=nr({slot:"product-title-rating",className:"renuvex-pr-product-badge-slot",context:{surface:"pdp",productId:o||""}}),f=document.createElement("a");f.className="renuvex-pr-rating-badge renuvex-pr-rating-badge--pdp",f.href="#ikas-reviews";var C=Zr(e,r);f.setAttribute("aria-labelledby",C.id),f.setAttribute("data-renuvex-surface","pdp"),f.setAttribute("data-renuvex-rating",String(e)),f.setAttribute("data-renuvex-count",String(r)),ir(f,{surface:"pdp",productId:o||""});var S=window.getComputedStyle(x).textAlign,y=S==="center"?"center":S==="right"?"right":"left";f.setAttribute("data-renuvex-align",y),f.insertAdjacentHTML("beforeend",C.html+aa(e,a));var k=document.createElement("span");k.className="renuvex-pr-rating-badge__label",k.textContent=e+" ("+r+" yorum)",f.appendChild(k),f.onclick=function(w){w.preventDefault();var g=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(g){var z=document.querySelector("header"),E=z?z.getBoundingClientRect().height:0,T=g.getBoundingClientRect().top+window.pageYOffset-E-16;window.scrollTo({top:T,behavior:"smooth"})}},m.appendChild(f),pt(m,s),pr=dt(m,s,{surface:"pdp-badge",reason:"position_reanchored",message:"PDP badge slot reordered after render",extra:{productName:t||"",productId:o||""}}),Ve(m,"pdp-badge",{productName:t||"",productId:o||""}),d||(lr=Fr(m,"pdp-badge",function(){Sr(e,r,t,n,a,o,!0)},{productName:t||"",productId:o||""}))}}var gt=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:#111111;background:transparent;border:1px solid var(--renuvex-pr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;--renuvex-pr-pad-summary-mobile:16px;--renuvex-pr-pad-review-mobile:16px;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* NOT: Eskiden burada .renuvex-pr-body ve .renuvex-pr-reply-text i\xE7in max-width:70ch vard\u0131
     (okunabilirlik). Card layout'ta "Devam\u0131n\u0131 oku" sonras\u0131 body 70ch'de kesiliyor,
     parent geni\u015Fli\u011Fini kullanm\u0131yordu \u2014 kald\u0131r\u0131ld\u0131. Sat\u0131r uzunlu\u011Fu art\u0131k layout
     container'\u0131na ba\u011Fl\u0131. Uzun-kelime ta\u015Fma korumas\u0131 overflow-wrap:anywhere ile
     ayr\u0131 kuralda (a\u015Fa\u011F\u0131da), o davran\u0131\u015F de\u011Fi\u015Fmedi. */
  /* Kullan\u0131c\u0131 i\xE7eri\u011Fi ta\u015Fma korumas\u0131 \u2014 uzun bo\u015Fluksuz string (URL, "aaaa...",
     \xFCr\xFCn kodu) container'\u0131 zorlamas\u0131n diye yumu\u015Fak k\u0131rma. Sadece text class'lar\u0131na
     uygulan\u0131r, buton/UI tipografisine dokunulmaz. Gallery masonry i\xE7in kritik:
     tek bir uzun string break-inside:avoid'a ra\u011Fmen kolon dengesini bozard\u0131. */
  #ikas-reviews-widget .renuvex-pr-body,
  #ikas-reviews-widget .renuvex-pr-author,
  #ikas-reviews-widget .renuvex-pr-review-title,
  #ikas-reviews-widget .renuvex-pr-review-list-body,
  #ikas-reviews-widget .renuvex-pr-review-list-title,
  #ikas-reviews-widget .renuvex-pr-review-list-author-name,
  #ikas-reviews-widget .renuvex-pr-review-gallery-body,
  #ikas-reviews-widget .renuvex-pr-review-gallery-title,
  #ikas-reviews-widget .renuvex-pr-review-gallery-author,
  #ikas-reviews-widget .renuvex-pr-reply-text{overflow-wrap:anywhere;}
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

${$r}

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
  .renuvex-pr-stars .renuvex-pr-icon-filled{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-stars .renuvex-pr-icon-empty{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .renuvex-pr-review-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-author{font-size:var(--renuvex-pr-author-size,14px);font-weight:600;font-style:normal;color:var(--renuvex-pr-review-author,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-date{color:var(--renuvex-pr-review-date,#5e5e5e);font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .renuvex-pr-body{margin-top:var(--renuvex-pr-gap-normal);line-height:1.65;color:var(--renuvex-pr-review-body,#111111);font-size:var(--renuvex-pr-review-text-size,14px);font-weight:400;}
  .renuvex-pr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .renuvex-pr-read-more{display:block;margin-top:var(--renuvex-pr-gap-tight);color:var(--renuvex-pr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--renuvex-pr-read-more-size,12px);}
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
       --renuvex-pr-pad-review-mobile:  yorum listesi container'i (#ikas-reviews)
       Ileride admin panelinden degistirmek icin: settings -> CSS variable. */
    #ikas-reviews-widget{padding-left:0;padding-right:0;}
    /* Summary yan padding'i .renuvex-pr-summary mobile bloguna eklendi (--renuvex-pr-pad-summary-mobile) */
    /* Review layoutlari widget direct child \u2014 her item kendi yan padding'ini
       --renuvex-pr-pad-review-mobile uzerinden alir. #ikas-reviews container'ina
       padding vermek yerine item class'larina vermek gerek cunku review'lar
       widget'in child'i, #ikas-reviews icinde degil. */
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
`;var Lr={};ge(Lr,{meta:()=>ma,render:()=>xa});function _e(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,o=e.onFilterChange;ye(n);var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var u=r[l-1]||0,c=t>0?Math.round(u/t*100):0,x=a===l,s=document.createElement("div");s.className="renuvex-pr-bar-row"+(x?" renuvex-pr-bar-active":""),a&&!x&&(s.style.opacity="0.35");for(var i="",h=1;h<=5;h++){var v=h<=l;i+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(v?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+W(v?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+i+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+c+'%;"></div></div><span class="renuvex-pr-bar-count">('+u.toLocaleString("tr-TR")+")</span>",(function(p){s.onclick=function(){o(p)}})(l),d.appendChild(s)}return d}var oe=[],ht=!1;function ia(e){for(var r=oe.length-1;r>=0;r--){var t=oe[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function oa(e){if(e.key==="Escape")for(var r=oe.length-1;r>=0;r--)oe[r].close()}function la(){ht||typeof document=="undefined"||(document.addEventListener("click",ia,!0),document.addEventListener("keydown",oa),ht=!0)}function dr(e){for(var r=0;r<oe.length;r++)oe[r]!==e&&oe[r].close()}function ur(e){la();var r={trigger:e.trigger,element:e.element,close:e.close};return oe.push(r),function(){var n=oe.indexOf(r);n!==-1&&oe.splice(n,1)}}function X(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,o=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=N&&N.writeButtonText||"Yorum Yap",l.onclick=a,d.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-filter-wrap";var c=document.createElement("button");c.type="button",c.className="renuvex-pr-filter-btn",c.setAttribute("aria-label","Filtrele"),c.setAttribute("aria-haspopup","menu"),c.setAttribute("aria-expanded","false");var x=N&&N.filterIcon||"lines";c.innerHTML=G(Xr(x));var s=document.createElement("div");s.className="renuvex-pr-filter-menu",s.setAttribute("role","menu");var i=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],h=!1;function v(f){var C=s.classList.contains("renuvex-pr-open");s.classList.remove("renuvex-pr-open"),c.classList.remove("renuvex-pr-filter-btn-active"),c.setAttribute("aria-expanded","false");var S=f&&(f.restoreFocus===!0||f.restoreFocus==="auto"&&Xe());if(C&&S)try{c.focus({preventScroll:!0})}catch(y){try{c.focus()}catch(k){}}}function p(){dr(m),s.classList.add("renuvex-pr-open"),c.classList.add("renuvex-pr-filter-btn-active"),c.setAttribute("aria-expanded","true");var f=s.querySelector(".renuvex-pr-filter-item-active")||s.querySelector(".renuvex-pr-filter-item");f&&requestAnimationFrame(function(){try{f.focus({preventScroll:!0})}catch(C){try{f.focus()}catch(S){}}})}i.forEach(function(f){var C=f[2],S=C?n:!n&&(t||"newest")===f[0],y=document.createElement("button");y.type="button",y.className="renuvex-pr-filter-item"+(S?" renuvex-pr-filter-item-active":""),y.setAttribute("role","menuitem"),y.textContent=f[1];var k=!1;function w(g,z){g&&(g.preventDefault(),g.stopPropagation()),!k&&(k=!0,h=!0,v({restoreFocus:z}),o(f[0],C),setTimeout(function(){k=!1,h=!1},0))}y.addEventListener("pointerdown",function(g){g.button!==void 0&&g.button!==0||w(g,!1)}),typeof window!="undefined"&&!window.PointerEvent&&y.addEventListener("touchstart",function(g){w(g,!1)},{passive:!1}),y.addEventListener("mousedown",function(g){g.button!==void 0&&g.button!==0||w(g,!1)}),y.addEventListener("keydown",function(g){(g.key==="Enter"||g.key===" ")&&w(g,!0)}),y.onclick=function(g){w(g,!1)},s.appendChild(y)}),c.onclick=function(){s.classList.contains("renuvex-pr-open")?v({restoreFocus:"auto"}):p()},u.addEventListener("keydown",function(f){f.key==="Escape"&&s.classList.contains("renuvex-pr-open")&&(f.stopPropagation(),v({restoreFocus:!0}))}),u.addEventListener("focusout",function(f){if(s.classList.contains("renuvex-pr-open")&&!h){var C=f.relatedTarget;C&&u.contains(C)||v()}});var m=ur({trigger:u,element:s,close:v});return u.appendChild(c),u.appendChild(s),d.appendChild(u),d}function bt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="renuvex-pr-fwizard",n.appendChild(a);var o=document.createElement("button");o.className="renuvex-pr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat"),o.innerHTML=G('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),a.appendChild(o);var d=document.createElement("div");d.className="renuvex-pr-fwizard-content",a.appendChild(d);var l=!1,u=null,c=!1,x="",s="";function i(){var b=document.activeElement;return!b||b===document.body||b===document.documentElement?null:b}function h(b){if(!(!b||!document.contains(b)||typeof b.focus!="function"))try{b.focus({preventScroll:!0})}catch(P){try{b.focus()}catch(A){}}}function v(b){if(!b||b.disabled||b.getAttribute("aria-hidden")==="true")return!1;var P=window.getComputedStyle?window.getComputedStyle(b):null;return P&&(P.display==="none"||P.visibility==="hidden")?!1:!!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)}function p(b){var P=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(b.querySelectorAll(P)).filter(v)}function m(){var b=p(d),P=p(n),A=b[0]||P[0]||n;h(A)}function f(b){if(b.key==="Tab"){var P=p(n);if(!P.length){b.preventDefault(),h(n);return}var A=P[0],L=P[P.length-1],R=document.activeElement;if(!n.contains(R)){b.preventDefault(),h(A);return}b.shiftKey&&R===A?(b.preventDefault(),h(L)):!b.shiftKey&&R===L&&(b.preventDefault(),h(A))}}function C(){var b=window.innerWidth-document.documentElement.clientWidth;x=document.body.style.overflow,s=document.body.style.paddingRight,document.body.style.overflow="hidden",b>0&&(document.body.style.paddingRight=b+"px")}function S(){document.body.style.overflow=x,document.body.style.paddingRight=s}function y(){l||(l=!0,document.removeEventListener("keydown",k),n.removeEventListener("click",w),o.removeEventListener("click",y),n.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n),S(),c&&h(u);try{r()}catch(b){}},200))}function k(b){if(b.key==="Escape"){y();return}f(b)}function w(b){b.target===n&&t&&y()}document.addEventListener("keydown",k),n.addEventListener("click",w),o.addEventListener("click",y);function g(b){u=i(),c=Xe(),b&&d.appendChild(b),document.body.appendChild(n),C(),requestAnimationFrame(function(){n.classList.add("renuvex-pr-fwizard-open"),m()})}var z=null,E=null;function T(b,P){if(P=P||"error",z){try{z.remove()}catch(A){}z=null}E&&(clearTimeout(E),E=null),z=document.createElement("div"),z.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+P,z.textContent=b,a.appendChild(z),E=setTimeout(function(){z&&(z.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(z){try{z.remove()}catch(A){}z=null}},300))},4e3)}return{open:g,close:y,content:d,setAllowOutsideClose:function(b){t=!!b},setStepAttr:function(b){a.setAttribute("data-step",String(b))},focusFirstControl:m,showToast:T}}var yt=`
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
`;var Er=4;function He(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function wt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(o){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<Er&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(o){return o!==a})}}}}var pa='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function kt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},o=e.onNext||function(){},d=document.createElement("div");d.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=G(pa)+"<span>Geri</span>",l.addEventListener("click",function(){n()}),d.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-footer-progress";for(var c=[],x=0;x<Er;x++){var s=document.createElement("span");s.className="renuvex-pr-fwizard-progress-seg",u.appendChild(s),c.push(s)}d.appendChild(u);var i=document.createElement("button");i.type="button";var h=null;function v(m){h&&i.removeEventListener("click",h),h=m,m&&i.addEventListener("click",m)}d.appendChild(i);function p(m,f){var C=r.indexOf(m)!==-1,S=t.indexOf(m)!==-1,y=f&&(f.images&&f.images.length>0||f.pendingImages&&f.pendingImages.length>0);if(C)m===2&&y?(i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",v(function(){o()})):(i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.setAttribute("aria-label","Atla"),i.innerHTML="<span>Atla</span>",v(function(){a()})),i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),i.style.visibility="",i.tabIndex=0;else if(S){i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Sonraki"),i.innerHTML="Sonraki",i.style.visibility="",i.tabIndex=0;var k=He(m,f);i.disabled=!k,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!k),v(function(){i.disabled||o()})}else i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.innerHTML="",i.style.visibility="hidden",i.tabIndex=-1,i.disabled=!0,v(null)}return{el:d,update:function(m,f){c.forEach(function(S,y){y+1<=m?S.classList.add("renuvex-pr-fwizard-progress-seg-active"):S.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var C=m<=1;l.style.visibility=C?"hidden":"",l.style.pointerEvents=C?"none":"",l.tabIndex=C?-1:0,p(m,f)},setNextDisabled:function(m){i.classList.contains("renuvex-pr-fwizard-cta-btn")&&(i.disabled=!!m,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!m))},setThanksState:function(m){l.style.visibility="hidden",u.style.visibility="hidden",i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",i.style.visibility="",i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),v(m)}}}function zt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(o);var d=document.createElement("div");d.className="renuvex-pr-fwizard-stars",d.setAttribute("role","radiogroup"),d.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=Ge(N||{});ye(l);var u=[];function c(v){u.forEach(function(p,m){var f=m<v;p.classList.toggle("renuvex-pr-fwizard-star-active",f),p.setAttribute("aria-checked",m+1===v?"true":"false"),p.innerHTML=f?W("full"):W("outline")})}function x(v,p){p&&typeof p.preventDefault=="function"&&p.preventDefault(),p&&typeof p.stopPropagation=="function"&&p.stopPropagation(),!n&&(n=!0,e.set({rating:v}),c(v),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(v){var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-star",p.setAttribute("role","radio"),p.setAttribute("aria-label",v+" y\u0131ld\u0131z"),p.innerHTML=W("outline"),p.addEventListener("mouseenter",function(){c(v)}),p.addEventListener("mouseleave",function(){c(e.get().rating)}),p.addEventListener("pointerdown",function(m){m.button&&m.button!==0||x(v,m)}),typeof window!="undefined"&&!window.PointerEvent&&p.addEventListener("touchstart",function(m){x(v,m)},{passive:!1}),p.addEventListener("mousedown",function(m){window.PointerEvent||x(v,m)}),p.addEventListener("keydown",function(m){(m.key==="Enter"||m.key===" ")&&x(v,m)}),p.addEventListener("click",function(m){x(v,m)}),u.push(p),d.appendChild(p)})(s);c(e.get().rating);var i=null,h=function(v){var p=v&&v.detail&&v.detail.settings;p&&p===i||(i=p||null,l=Ge(p||N||{}),c(e.get().rating))};return window.addEventListener(Pe,h),t.appendChild(d),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Pe,h)}}}var Ct=3,da=10*1024*1024;function St(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(o);var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML=G('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>')+"<span>Foto\u011Fraf Ekle</span>";var u=document.createElement("input");u.type="file",u.accept="image/*",u.multiple=!0,u.style.display="none",d.appendChild(l),d.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),d.appendChild(c),n.appendChild(d);var x=r.blobMap||{},s=r.urlToFinger||{};function i(){if(!t){var S=e.get().images||[],y=e.get().pendingImages||[],k=S.map(function(w){return{url:w,isPending:!1}}).concat(y.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));c.innerHTML="",k.forEach(function(w){var g=x[w.url]||w.url,z=h(w,g);c.appendChild(z)}),f()}}function h(S,y){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var w=document.createElement("img");w.src=y,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(w);var g=document.createElement("div");g.className="renuvex-pr-fwizard-photo-loading",g.style.display="none",k.appendChild(g);var z=document.createElement("button");return z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.innerHTML="&#x2715;",k.appendChild(z),v(k,S,y),k}function v(S,y,k){var w=S.querySelector("img");w.src!==k&&(w.src=k);var g=S.querySelector(".renuvex-pr-fwizard-photo-loading");if(y.isPending&&y.error){g.style.display="flex",g.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+y.error,g.appendChild(z)}else g.style.display="none",g.textContent="";var E=S.querySelector(".renuvex-pr-fwizard-photo-remove");E.onclick=function(){var T=s[y.url]||(y.file?y.file.name+"_"+y.file.size:null);if(y.url.startsWith("blob:")&&URL.revokeObjectURL(y.url),T){var b=(e.get().fingerprints||[]).filter(function(L){return L!==T});e.set({fingerprints:b})}if(y.isPending){var P=(e.get().pendingImages||[]).filter(function(L){return L.url!==y.url});e.set({pendingImages:P})}else{var A=(e.get().images||[]).filter(function(L){return L!==y.url});e.set({images:A})}}}var p='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',m='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function f(){var S=(e.get().images||[]).length,y=(e.get().pendingImages||[]).length,k=S+y,w=k>=Ct;k>0?(d.classList.add("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=G(m)):(d.classList.remove("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=G(p)+"<span>Foto\u011Fraf Ekle</span>"),w?(l.style.display="none",l.disabled=!0,u.disabled=!0):(l.style.display="flex",l.disabled=!1,u.disabled=!1,l.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){u.disabled||u.click()}),u.onchange=async function(S){var y=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(S.target.files).slice(0,Ct-y);u.value="";var w=(e.get().pendingImages||[]).length,g=e.get().images||[],z=g.length;if(k.length!==0){for(var E=[],T=[],b=0;b<k.length;b++){var P=k[b],A=P.name+"_"+P.size,L=(e.get().fingerprints||[]).some(function(F){return F===A})||E.some(function(F){return F.file.name+"_"+F.file.size===A});if(L){console.log("[renuvex-pr] Duplicate file detected, skipping:",P.name);continue}if(P.size>da){var R="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(R,"error"):alert(R);continue}var J=URL.createObjectURL(P);s[J]=A,E.push({url:J,file:P,error:null}),T.push({url:J,file:P});var Z=(e.get().fingerprints||[]).slice();Z.push(A),e.set({fingerprints:Z})}if(E.length!==0){var le=(e.get().pendingImages||[]).concat(E),q=async function(){for(var F=0;F<T.length;F++){var Be=T[F],De=Be.file,H=Be.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Se=(e.get().pendingImages||[]).filter(function(_){return _.url!==H}),pe=(e.get().images||[]).slice();pe.push(H),e.set({pendingImages:Se,images:pe});continue}try{var de=await ze(be+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he})});if(!de.ok)throw de.status===429?new Error("rate_limit"):new Error("sign failed");var D=await de.json();if(!D.folder)throw new Error("sign folder missing");var $=new FormData;$.append("file",De),$.append("api_key",D.api_key),$.append("timestamp",D.timestamp),$.append("signature",D.signature),$.append("folder",D.folder);var ue=await fetch("https://api.cloudinary.com/v1_1/"+D.cloud_name+"/image/upload",{method:"POST",body:$}),Q=await ue.json();if(Q.secure_url&&et(Q.secure_url)){var je=(e.get().pendingImages||[]).some(function(_){return _.url===H});if(!je){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}x[Q.secure_url]=H,s[Q.secure_url]=s[H];var fe=(e.get().pendingImages||[]).filter(function(_){return _.url!==H}),ee=(e.get().images||[]).slice();ee.push(Q.secure_url),e.set({pendingImages:fe,images:ee});try{ze(be+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,secureUrl:Q.secure_url})}).catch(function(){})}catch(_){}}else throw new Error("invalid image url")}catch(_){console.error("[renuvex-pr] Image upload failed:",_);var re=_.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(re,"error");var se=(e.get().pendingImages||[]).map(function(ve){return ve.url===H?{url:ve.url,file:ve.file,error:re}:ve});e.set({pendingImages:se})}}};if(z===0&&w===0){t=!0;var O=!r.canNavigate||r.canNavigate();O&&e.goNext()}e.set({pendingImages:le}),q()}}};var C=e.onChange(i);return i(),{el:n,destroy:function(){t=!0,u.onchange=null,C&&C()}}}var Tr=2e3,ua=60;function Et(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",n.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content-form";var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",d.maxLength=ua,d.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),d.value=e.get().title||"",d.addEventListener("input",function(){e.set({title:d.value})}),o.appendChild(d);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Tr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-char-counter",u.setAttribute("aria-live","polite"),o.appendChild(u);function c(){var s=l.value.length;u.textContent=s+"/"+Tr,u.classList.toggle("renuvex-pr-fwizard-char-counter--max",s>=Tr)}function x(){return He(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),c(),t(x())}),n.appendChild(o),c(),setTimeout(function(){t(x())},0),{el:n,destroy:function(){}}}var sa=40;function Tt(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",a.appendChild(o);var d=document.createElement("div");d.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var u=document.createElement("label");u.className="renuvex-pr-fwizard-label",u.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="renuvex-pr-fwizard-input",c.maxLength=sa,c.setAttribute("aria-required","true"),c.value=e.get().author||"",l.appendChild(u),l.appendChild(c),d.appendChild(l);var x=document.createElement("div");x.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.textContent="E-posta (opsiyonel)";var i=document.createElement("input");i.type="email",i.className="renuvex-pr-fwizard-input",i.setAttribute("autocomplete","email"),i.value=e.get().email||"",x.appendChild(s),x.appendChild(i),d.appendChild(x);var h=document.createElement("div");h.className="renuvex-pr-fwizard-notice",h.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",d.appendChild(h);var v=document.createElement("div");v.className="renuvex-pr-fwizard-msg",v.setAttribute("role","alert"),v.setAttribute("aria-live","assertive"),d.appendChild(v);var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-submit-btn",p.textContent="G\xF6nder",d.appendChild(p),a.appendChild(d);function m(){return He(4,e.get())}function f(){var k=!m(),w=(e.get().pendingImages||[]).length,g=w>0;g?(p.disabled=!0,p.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),p.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(p.disabled=k,p.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",k),p.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),f(),t(m())}),i.addEventListener("input",function(){e.set({email:i.value})}),f(),setTimeout(function(){t(m())},0);function C(){v.textContent=""}function S(k){C();var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg-error",w.textContent=k||"",v.appendChild(w)}p.onclick=async function(){if(!p.disabled){var k=e.get(),w=(k.author||"").trim(),g=(k.comment||"").trim();if(i.value.trim()&&!i.checkValidity()){i.reportValidity();return}if(!w){S("Gerekli alan");return}if(!k.rating){S("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}p.disabled=!0,p.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var z=p.textContent;if(p.textContent="G\xF6nderiliyor\u2026",C(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var E=Jr(window.location.href),T=k.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),b=await ze(be+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,productId:k.productId||null,slug:E||null,productName:T,author:w,title:(k.title||"").trim()||null,comment:g||null,rating:k.rating,images:k.images||[]})},15e3);if(b.ok)n();else{var P=await b.json().catch(function(){return{}});throw new Error(P.error||"Yorum kaydedilemedi.")}}catch(R){var A=R&&(R.name==="AbortError"||/signal/i.test(R.message||"")),L=A?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":R.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):S(L),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),p.textContent=z}}};var y=e.onChange(f);return{el:a,destroy:function(){p.onclick=null,y&&y()}}}var Lt=!1;function va(){if(!Lt){var e=document.createElement("style");e.setAttribute("data-renuvex-fwizard",""),e.setAttribute("data-renuvex-pr-style","review-form-wizard"),e.textContent=yt,document.head.appendChild(e),Lt=!0}}function ca(e,r,t){if(t=t||{},e===1)return zt(r,{canNavigate:t.canNavigate});if(e===2)return St(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return Et(r,{onValidityChange:t.onValidityChange});if(e===4)return Tt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Pt(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Nt(e){e=e||{},va();var r=wt({productId:e.productId,productName:e.productName}),t={},n={},a=bt({onClose:function(){window.removeEventListener("popstate",d),window.history.state&&window.history.state.renuvexPrReviewModal&&window.history.back(),Object.keys(t).forEach(function(w){var g=t[w];g&&g.startsWith("blob:")&&URL.revokeObjectURL(g)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),o={renuvexPrReviewModal:!0};window.history.pushState(o,null,"");var d=function(w){a&&a.close&&a.close()};window.addEventListener("popstate",d);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-wrap";var u=kt({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="renuvex-pr-fwizard-layout",c.appendChild(l),c.appendChild(u.el);var x=null,s="idle",i=null,h=!0,v=null;function p(w,g){l.innerHTML="";var z=ca(w,r,{canNavigate:function(){return s==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(b){u.setNextDisabled(!b)},onSuccess:f,showToast:a.showToast});if(x=z,u.update(w,r.get()),g){s="entering",z.el.classList.add("renuvex-pr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),z.el.removeEventListener("animationend",T),z.el.classList.remove("renuvex-pr-fwizard-step--enter"),s="idle",i!==null&&C()};z.el.addEventListener("animationend",T),E=setTimeout(T,700)}else s="idle";l.appendChild(z.el),a.setStepAttr&&a.setStepAttr(w),w===3&&u.setNextDisabled(!0)}var m=!1;function f(){if(!m){if(m=!0,!x){l.innerHTML="";var w=Pt();w.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(w),a.setStepAttr("thanks"),u.setThanksState(a.close);return}var g=x;s="exiting",g.el.classList.add("renuvex-pr-fwizard-step--exit");var z=function(){if(v&&clearTimeout(v),g.el.removeEventListener("animationend",z),g.destroy)try{g.destroy()}catch(T){}x===g&&(x=null),l.innerHTML="";var E=Pt();E.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(E),a.setStepAttr("thanks"),u.setThanksState(a.close),s="idle"};g.el.addEventListener("animationend",z),v=setTimeout(z,300)}}function C(){var w=r.get().currentStep;if(s!=="idle"){i=w;return}if(!x){var g=!h;h=!1,p(w,g);return}var z=x;s="exiting",z.el.classList.add("renuvex-pr-fwizard-step--exit");var E=function(){if(v&&clearTimeout(v),z.el.removeEventListener("animationend",E),z.destroy)try{z.destroy()}catch(b){}if(x===z){l.innerHTML="",x=null;var T=i!==null?i:r.get().currentStep;i=null,p(T,!0),s="idle"}};z.el.addEventListener("animationend",E),v=setTimeout(E,350)}C();var S=r.get().currentStep,y=r.onChange(function(w){w.currentStep!==S?(S=w.currentStep,C()):u.update(w.currentStep,w)}),k=a.close;return a.close=function(){y&&y(),typeof v!="undefined"&&v&&clearTimeout(v),k()},a.open(c),{close:a.close}}function Y(){Nt({productId:K||"",productName:Me||""})}var ma={id:"classic",name:"Klasik (A\xE7\u0131k)"};function xa(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,o=e.allCount,d=e.ratingCounts,l=e.avgRatingVal,u=e.currentRatingFilter,c=e.currentOrderBy,x=e.currentHasImages,s=e.onFilterChange,i=e.onSortChange;ye(a);var h=document.createElement("div");h.className="renuvex-pr-summary";var v=(d[3]||0)+(d[4]||0),p=o>0?Math.round(v/o*100):0,m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-avg",m.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",h.appendChild(m);var f=document.createElement("div");if(f.className="renuvex-pr-summary-block renuvex-pr-summary-count",f.textContent=o.toLocaleString("tr-TR")+" Yorum",h.appendChild(f),n.showRecommendation!==!1&&p>0){var C=document.createElement("div");C.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",C.innerHTML='<span class="renuvex-pr-recommend-pct">%'+p+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",h.appendChild(C)}return h.appendChild(_e({ratingCounts:d,allCount:o,iconPair:a,currentRatingFilter:u,onFilterChange:s})),h.appendChild(X({widget:r,currentOrderBy:c,currentHasImages:x,onWriteClick:Y,onSortChange:i})),h}var Pr={};ge(Pr,{css:()=>ga,meta:()=>fa,render:()=>ha});var At=`
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
`;var fa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},ga=At;function ha(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,o=e.ratingCounts,d=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange,i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-compact";var h=document.createElement("div");h.className="renuvex-pr-compact-header";var v=document.createElement("div");v.className="renuvex-pr-compact-trigger-wrap";var p=document.createElement("button");p.className="renuvex-pr-compact-trigger",p.type="button",p.setAttribute("aria-expanded","false"),p.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+we(d,n)+'</span><span class="renuvex-pr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+G('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>')+"</span>",v.appendChild(p),h.appendChild(v);var m=X({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:Y,onSortChange:s}),f=m.querySelector(".renuvex-pr-filter-wrap"),C=m.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");S.className="renuvex-pr-compact-actions-slot",C&&S.appendChild(C),f&&S.appendChild(f),h.appendChild(S),i.appendChild(h);var y=document.createElement("div");y.className="renuvex-pr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var k=document.createElement("div");k.className="renuvex-pr-compact-panel-inner";var w=document.createElement("div");w.className="renuvex-pr-compact-avg",w.innerHTML='<span class="renuvex-pr-icon">'+W("full")+"</span><span>"+d+"</span>",k.appendChild(w),k.appendChild(_e({ratingCounts:o,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:x})),y.appendChild(k);var g=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(O){var F=O?i:v;y.parentNode!==F&&(y.classList.contains("renuvex-pr-open")&&(y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),p.setAttribute("aria-expanded","false")),F.appendChild(y))}if(z(g?g.matches:!1),g){var E=function(O){z(O.matches)};g.addEventListener?g.addEventListener("change",E):g.addListener&&g.addListener(E)}if(C){var T=document.createElement("button");T.className="renuvex-pr-write-btn",T.textContent=N&&N.writeButtonText||"Yorum Yap",T.onclick=Y;var b=document.createElement("div");b.className="renuvex-pr-compact-write-row",b.appendChild(T),i.appendChild(b)}function P(){y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),p.setAttribute("aria-expanded","false")}function A(){dr(L),y.classList.add("renuvex-pr-open"),y.setAttribute("aria-hidden","false"),p.setAttribute("aria-expanded","true")}p.onclick=function(){y.classList.contains("renuvex-pr-open")?P():A()};var L=null;function R(O){L&&(L(),L=null),O||(L=ur({trigger:v,element:y,close:P}))}if(R(g?g.matches:!1),g){var J=function(O){R(O.matches)};g.addEventListener?g.addEventListener("change",J):g.addListener&&g.addListener(J)}if(t.showRecommendation!==!1){var Z=(o[3]||0)+(o[4]||0),le=a>0?Math.round(Z/a*100):0;if(le>0){var q=document.createElement("div");q.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",q.style.marginTop="8px",q.innerHTML='<span class="renuvex-pr-recommend-pct">%'+le+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(q)}}return i}var Nr={};ge(Nr,{css:()=>ya,meta:()=>ba,render:()=>wa});var Bt=`
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
`;var ba={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ya=Bt;function wa(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,o=e.ratingCounts,d=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange;ye(n);var i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-split";var h=document.createElement("div");h.className="renuvex-pr-split-col renuvex-pr-split-left";var v=document.createElement("div");v.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",v.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+d+"</span>",h.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",p.textContent=a.toLocaleString("tr-TR")+" Yorum",h.appendChild(p),i.appendChild(h);var m=document.createElement("div");m.className="renuvex-pr-split-col renuvex-pr-split-mid",m.appendChild(_e({ratingCounts:o,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:x})),i.appendChild(m);var f=X({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:Y,onSortChange:s}),C=f.querySelector(".renuvex-pr-filter-wrap"),S=f.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-right",S&&y.appendChild(S),C&&y.appendChild(C),i.appendChild(y);var k=(o[3]||0)+(o[4]||0),w=a>0?Math.round(k/a*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var z=t.showRecommendation===!1||w===0;return z&&g.classList.add("renuvex-pr-split-rec-hidden"),h.appendChild(g),i}var Ar={};ge(Ar,{css:()=>za,meta:()=>ka,render:()=>Ca});var Rt=`
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
`;var ka={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},za=Rt;function Ca(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,o=e.currentOrderBy,d=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var c=document.createElement("div");c.className="renuvex-pr-minimal-info";var x=document.createElement("div");x.className="renuvex-pr-minimal-row";var s=document.createElement("span");s.className="renuvex-pr-minimal-avg",s.textContent=a,x.appendChild(s);var i=document.createElement("span");i.className="renuvex-pr-minimal-stars",i.innerHTML=we(a,t),x.appendChild(i);var h=document.createElement("span");h.className="renuvex-pr-minimal-count",h.textContent=n.toLocaleString("tr-TR")+" Yorum",x.appendChild(h),c.appendChild(x),u.appendChild(c);var v=X({widget:r,currentOrderBy:o,currentHasImages:d,onWriteClick:Y,onSortChange:l}),p=v.querySelector(".renuvex-pr-filter-wrap"),m=v.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");if(f.className="renuvex-pr-minimal-actions",m&&f.appendChild(m),p&&f.appendChild(p),u.appendChild(f),m){var C=document.createElement("button");C.className="renuvex-pr-write-btn",C.textContent=N&&N.writeButtonText||"Yorum Yap",C.onclick=Y;var S=document.createElement("div");S.className="renuvex-pr-minimal-write-row",S.appendChild(C),u.appendChild(S)}return u}var Br={};ge(Br,{css:()=>Ea,meta:()=>Sa,render:()=>Ta});var It=`
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
`;var Sa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ea=It;function Ta(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,o=e.currentOrderBy,d=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var c=document.createElement("div");c.className="renuvex-pr-hero-info";var x=document.createElement("div");x.className="renuvex-pr-hero-rating-col";var s=document.createElement("span");s.className="renuvex-pr-hero-avg",s.textContent=a,x.appendChild(s);var i=document.createElement("div");i.className="renuvex-pr-hero-meta-row";var h=document.createElement("span");h.className="renuvex-pr-hero-stars",h.innerHTML=we(a,t),i.appendChild(h);var v=document.createElement("div");v.className="renuvex-pr-hero-count",v.textContent=n.toLocaleString("tr-TR")+" Yorum",i.appendChild(v),x.appendChild(i),c.appendChild(x),u.appendChild(c);var p=X({widget:r,currentOrderBy:o,currentHasImages:d,onWriteClick:Y,onSortChange:l}),m=p.querySelector(".renuvex-pr-filter-wrap"),f=p.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");C.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",f&&C.appendChild(f),m&&C.appendChild(m),u.appendChild(C);var S=X({widget:r,currentOrderBy:o,currentHasImages:d,onWriteClick:Y,onSortChange:l}),y=S.querySelector(".renuvex-pr-filter-wrap"),k=S.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");return w.className="renuvex-pr-hero-write-row",k&&w.appendChild(k),y&&w.appendChild(y),u.appendChild(w),u}var sr={classic:Lr,compact:Pr,split:Nr,minimal:Ar,hero:Br};function vr(e){return sr[e]||sr.classic}function Mt(){return Object.keys(sr).map(function(e){return sr[e].css||""}).join(`
`)}var Rr={};ge(Rr,{css:()=>Pa,meta:()=>La,render:()=>Na});function Ye(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi",n.appendChild(a),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",o.textContent=e,t.appendChild(o);var d=document.createElement("span");return d.className="renuvex-pr-read-more renuvex-pr-reply-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",t.appendChild(d),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(d.style.display="inline",typeof r=="function")d.onclick=r;else{var l=!1;d.onclick=function(){l=!l,o.classList.toggle("renuvex-pr-reply-text-clamped",!l),d.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var La={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Pa="";function Na(e,r){var t=document.createElement("div");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var o=document.createElement("span");o.className="renuvex-pr-review-stars",o.innerHTML=ce(e.rating,N),a.appendChild(o);var d=document.createElement("span");if(d.className="renuvex-pr-date",d.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(d),t.appendChild(n),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-author",u.textContent=e.author||"",t.appendChild(u);var c=(e.comment||"").trim();if(c){var x=document.createElement("div");x.className="renuvex-pr-body renuvex-pr-body-clamped",x.textContent=c,t.appendChild(x);var s=document.createElement("span");s.className="renuvex-pr-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",t.appendChild(s),requestAnimationFrame(function(){if(x.scrollHeight>x.clientHeight+2){s.style.display="inline";var p=!1;s.onclick=function(){p=!p,x.classList.toggle("renuvex-pr-body-clamped",!p),s.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var i=ke(e);if(i.length){var h=document.createElement("div");h.className="renuvex-pr-gallery",i.forEach(function(p){var m=document.createElement("img"),f=te(p,j);m.src=f.src,m.srcset=f.srcset,m.loading="lazy",m.decoding="async",m.width=j,m.height=j,m.className="renuvex-pr-img",ae(m),m.setAttribute("data-renuvex-img-url",p),(function(C){m.onclick=function(){ie(e,C,r)}})(p),h.appendChild(m)}),t.appendChild(h)}var v=Ye(e.merchantReply);return v&&t.appendChild(v),t}var Ir={};ge(Ir,{css:()=>Ba,meta:()=>Aa,render:()=>Ra});var Ft=`
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
`;var Aa={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Ba=Ft;function Ra(e,r){var t=ke(e),n=t.length>0,a=document.createElement("div");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-list-author";var d=document.createElement("span");d.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",d.innerHTML=ce(e.rating,N),o.appendChild(d);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",o.appendChild(l);var u=document.createElement("span");u.className="renuvex-pr-date renuvex-pr-review-list-author-date",u.textContent=me(e.createdAt),o.appendChild(u),a.appendChild(o);var c=document.createElement("div");if(c.className="renuvex-pr-review-list-content",e.title){var x=document.createElement("div");x.className="renuvex-pr-review-list-title",x.textContent=e.title,c.appendChild(x)}var s=(e.comment||"").trim();if(s){var i=document.createElement("div");i.className="renuvex-pr-review-list-body renuvex-pr-body-clamped",i.textContent=s,c.appendChild(i);var h=document.createElement("span");h.className="renuvex-pr-read-more",h.textContent="Devam\u0131n\u0131 oku",h.style.display="none",c.appendChild(h),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2){h.style.display="inline";var m=!1;h.onclick=function(){m=!m,i.classList.toggle("renuvex-pr-body-clamped",!m),h.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var v=Ye(e.merchantReply);if(v&&c.appendChild(v),a.appendChild(c),n){var p=document.createElement("div");p.className="renuvex-pr-review-list-media",t.forEach(function(m){var f=document.createElement("img"),C=te(m,j);f.src=C.src,f.srcset=C.srcset,f.loading="lazy",f.decoding="async",f.width=j,f.height=Math.round(j*4/3),f.setAttribute("data-renuvex-img-url",m),ae(f),(function(S){f.onclick=function(){ie(e,S,r)}})(m),p.appendChild(f)}),a.appendChild(p)}return a}var Mr={};ge(Mr,{css:()=>Ma,meta:()=>Ia,render:()=>Fa});var Ot=`
  /* Galeri se\xE7iliyken widget full-bleed yerine 1200px ile s\u0131n\u0131rl\u0131 \u2014
     CSS columns parent geni\u015Fli\u011Fine yay\u0131ld\u0131\u011F\u0131 i\xE7in widget kendisi s\u0131n\u0131rlanmal\u0131.
     Di\u011Fer layoutlar (card/list) full-bleed olarak kal\u0131r. */
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery){
    width:auto;
    max-width:1200px;
    margin-left:auto;
    margin-right:auto;
    column-count:2;
    column-gap:32px;
  }
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, foto strip vs. */
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-title,
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-summary,
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-photo-section,
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-write-btn,
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-load-more,
  #ikas-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-state-msg{
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
    #ikas-reviews-widget:has(.renuvex-pr-review-gallery){
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
`;var Ia={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ma=Ot;function Fa(e,r){var t=er(e),n=!!t,a=document.createElement("div");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-gallery-content";var d=document.createElement("span");if(d.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",d.innerHTML=ce(e.rating,N),o.appendChild(d),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,o.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-review-gallery-author",u.textContent=e.author||"",o.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-review-gallery-date",c.textContent=me(e.createdAt),o.appendChild(c);var x=(e.comment||"").trim();if(x){var s=document.createElement("div");s.className="renuvex-pr-review-gallery-body renuvex-pr-body-clamped",s.textContent=x,o.appendChild(s);var i=document.createElement("span");i.className="renuvex-pr-read-more",i.textContent="Devam\u0131n\u0131 oku",i.style.display="none",i.style.cursor="pointer";var h=!1;i.onclick=function(){if(t){ie(e,t,r);return}h=!h,s.classList.toggle("renuvex-pr-body-clamped",!h),i.textContent=h?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},o.appendChild(i),requestAnimationFrame(function(){s.scrollHeight>s.clientHeight+2&&(i.style.display="inline")})}if(a.appendChild(o),n){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var p=document.createElement("img"),m=te(t,rr);p.src=m.src,p.srcset=m.srcset,p.loading="lazy",p.decoding="async",p.width=rr,p.height=Math.round(rr*4/3),ae(p),p.setAttribute("data-renuvex-img-url",t),p.onclick=function(){ie(e,t,r)},v.appendChild(p),a.appendChild(v)}var f=Ye(e.merchantReply,t?function(){ie(e,t,r)}:null);return f&&(f.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(f)),a}var cr={card:Rr,list:Ir,gallery:Mr};function Ke(e){return cr[e]||cr.card}function _t(){return Object.keys(cr).map(function(e){return cr[e].css||""}).join(`
`)}function Ae(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),o=parseInt(t[3],16);return"rgba("+n+","+a+","+o+","+r+")"}function Oa(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-renuvex-auto-anchor","1");var r=null;try{r=document.querySelector(at)}catch(n){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var t=document.querySelector("main")||document.body;return t?(t.appendChild(e),e):null}function _a(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=nr({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),ir(t,{surface:"reviews",productId:r||""}),t}var Ht={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Yt={small:80,medium:110,large:140};function Ha(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Ya(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",d=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",u=r.barCountColor||"#111111",c=Ae(d,.06),x=r.reviewStarColor||"#f59e0b",s=r.btnBgColor||"#111111",i=r.btnTextColor||"#ffffff",h=r.btnBorderColor||"#111111",v=r.filterBtnBgColor||"#111111",p=r.filterBtnTextColor||"#ffffff",m=r.filterBtnBorderColor||"#111111",f=r.filterMenuBgColor||"#ffffff",C=r.filterMenuBorderColor||"#e5e7eb",S=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",k=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",z=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",b=r.replyBgColor||"#f9fafb",P=r.replyBorderColor||"#747474",A=r.replyLabelColor||"#111111",L=r.replyTextColor||"#111111",R=r.photoTitleColor||"#111111",J=Ae("#111111",.05),Z=r.photoArrowBgColor||"#ffffff",le=r.photoArrowTextColor||"#111111",q=Ae("#111111",.12),O=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Be=r.formSecondaryTextColor||"#3b3b3b",De=r.inputTextColor||F,H=r.inputBorderColor||"#d1d5db",Se=r.placeholderColor||"#9ca3af",pe=r.formStepBarColor||"#111111",de=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",$=r.formBtnBorderColor||"#111111",ue=Ae(de,.06),Q=Ae(de,.18),je=Ae(D,.85),fe=Ae(F,.06),ee=r.loadMoreBgColor||"#ffffff",re=r.loadMoreTextColor||"#111111",se=r.loadMoreBorderColor||"#111111",_={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":o,"--renuvex-pr-bar-fill":d,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":u,"--renuvex-pr-bar-hover-bg":c,"--renuvex-pr-btn-bg":s,"--renuvex-pr-btn-text":i,"--renuvex-pr-btn-border":h,"--renuvex-pr-filter-btn-bg":v,"--renuvex-pr-filter-btn-text":p,"--renuvex-pr-filter-btn-border":m,"--renuvex-pr-filter-menu-bg":f,"--renuvex-pr-filter-menu-border":C,"--renuvex-pr-filter-item-text":S,"--renuvex-pr-filter-item-hover-bg":y,"--renuvex-pr-filter-item-active":k,"--renuvex-pr-review-title":w,"--renuvex-pr-review-author":g,"--renuvex-pr-review-date":z,"--renuvex-pr-review-body":E,"--renuvex-pr-review-border":T,"--renuvex-pr-review-star-color":x,"--renuvex-pr-reply-bg-color":b,"--renuvex-pr-reply-border":P,"--renuvex-pr-reply-label":A,"--renuvex-pr-reply-text":L,"--renuvex-pr-photo-title":R,"--renuvex-pr-photo-image-border":J,"--renuvex-pr-photo-arrow-bg":Z,"--renuvex-pr-photo-arrow-text":le,"--renuvex-pr-photo-arrow-border":q,"--renuvex-pr-fwizard-bg":O,"--renuvex-pr-fwizard-text":F,"--renuvex-pr-fwizard-secondary-text":Be,"--renuvex-pr-fwizard-input-bg":O,"--renuvex-pr-fwizard-input-text":De,"--renuvex-pr-fwizard-input-border":H,"--renuvex-pr-fwizard-placeholder":Se,"--renuvex-pr-fwizard-close-text":F,"--renuvex-pr-fwizard-close-hover-bg":fe,"--renuvex-pr-fwizard-progress-bg":fe,"--renuvex-pr-fwizard-progress-active":pe,"--renuvex-pr-fwizard-btn-bg":de,"--renuvex-pr-fwizard-btn-text":D,"--renuvex-pr-fwizard-btn-border":$,"--renuvex-pr-fwizard-btn-disabled-bg":Q,"--renuvex-pr-fwizard-btn-disabled-text":je,"--renuvex-pr-fwizard-nav-hover-bg":ue,"--renuvex-pr-load-more-bg":ee,"--renuvex-pr-load-more-text":re,"--renuvex-pr-load-more-border":se};Object.keys(_).forEach(function(ve){e.style.setProperty(ve,_[ve])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function Ce(e,r,t,n,a,o,d){if(Kr){Qe({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:o,badgeSettings:d});return}$e(!0),Yr(e),Dr(r),d!==void 0&&jr(d),Vr(n),a&&We(a),o&&Le(o),t!=null&&Wr(t);try{let mr=function(B,M){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var I=B.meta.sizeOverrides[M];I&&Object.keys(I).forEach(function(U){i.style.setProperty(U,I[U])})}};var Da=mr,l=vr(r.summaryLayout),u=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),c=r.showTitle!==!1,x=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",s=u&&c?x:"",i=document.documentElement;Ya(i,r),Qr("#111111",gt+Mt()+_t());var h=r.borderRadius!==void 0?r.borderRadius:8,v=Ht[r.size]||Ht.medium,p=Yt[r.thumbnailSize]||Yt.medium,m=Ke(r.reviewLayout);if(m.meta&&m.meta.sizeOverrides&&m.meta.sizeOverrides[r.size]){var f=m.meta.sizeOverrides[r.size],C=f["--renuvex-pr-list-photo-w"]||f["--renuvex-pr-gallery-photo-w"];C&&(p=parseInt(C))}i.style.setProperty("--renuvex-pr-title-size",v.titleSize+"px"),i.style.setProperty("--renuvex-pr-review-text-size",v.reviewTextSize+"px"),i.style.setProperty("--renuvex-pr-review-title-size",v.reviewTitleSize+"px"),i.style.setProperty("--renuvex-pr-author-size",v.authorSize+"px"),i.style.setProperty("--renuvex-pr-reply-name-size",v.replyNameSize+"px"),i.style.setProperty("--renuvex-pr-reply-text-size",v.replyTextSize+"px"),i.style.setProperty("--renuvex-pr-radius",h+"px"),i.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,h-4)+"px"),i.style.setProperty("--renuvex-pr-photo-title-size",v.photoTitleSize+"px"),i.style.setProperty("--renuvex-pr-avg-rating-size",v.avgRatingSize+"px"),i.style.setProperty("--renuvex-pr-review-count-size",v.reviewCountSize+"px"),i.style.setProperty("--renuvex-pr-compact-count-size",v.compactCountSize+"px"),i.style.setProperty("--renuvex-pr-recommend-size",v.recommendSize+"px"),i.style.setProperty("--renuvex-pr-btn-text-size",v.btnTextSize+"px"),i.style.setProperty("--renuvex-pr-bar-label-size",v.barLabelSize+"px"),i.style.setProperty("--renuvex-pr-minimal-avg-size",v.minimalAvgSize+"px"),i.style.setProperty("--renuvex-pr-hero-avg-size",v.heroAvgSize+"px"),i.style.setProperty("--renuvex-pr-bar-count-size",v.barCountSize+"px"),i.style.setProperty("--renuvex-pr-review-date-size",v.reviewDateSize+"px"),i.style.setProperty("--renuvex-pr-filter-text-size",v.filterTextSize+"px"),i.style.setProperty("--renuvex-pr-load-more-size",v.loadMoreSize+"px"),i.style.setProperty("--renuvex-pr-read-more-size",v.readMoreSize+"px"),i.style.setProperty("--renuvex-pr-thumbnail-size",p+"px");var S=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";i.style.setProperty("--renuvex-pr-review-star-color",S),i.style.setProperty("--renuvex-pr-star-size",v.reviewStarSize+"px"),i.style.setProperty("--renuvex-pr-avg-star-size",v.avgStarSize+"px"),mr(vr(r.summaryLayout),r.size),mr(Ke(r.reviewLayout),r.size);var y=Ge(r),k=Oa();if(!k)return;var w=_a(k,e),g=document.getElementById("ikas-reviews");if(g||(g=document.createElement("div"),g.id="ikas-reviews",g.style.minHeight="200px"),g.parentNode!==w&&w.appendChild(g),r.enabled===!1){g.style.minHeight="auto",g.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',$e(!1);var z=Ze;Qe(null),z&&Ce(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}g.innerHTML='<p class="renuvex-pr-state-msg renuvex-pr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var E=t||{},T=kr(E),b=T?[]:E.data&&E.data.reviews||[],P=T?0:E.data&&E.data.totalCount||0;qr(b);var A=g.cloneNode(!1);g.parentNode.replaceChild(A,g),g=A;var L=document.createElement("div");if(L.id="ikas-reviews-widget",L.className="renuvex-pr-reviews-widget",L.setAttribute("data-renuvex-surface","reviews"),e&&L.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),s){var R=document.createElement("div"),J=r.summaryLayout||"classic";R.className="renuvex-pr-title renuvex-pr-title-"+J,R.textContent=s,L.appendChild(R)}if(T){L.appendChild(Ha(E.message,async function(){var B=await Ne(K,Te,1,Re,Ie);await Ce(K,N,B,Me,Te,1,gr)})),g.appendChild(L),Ve(L,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var Z=E.data&&E.data.allCount||0,le=E.data&&E.data.ratingCounts||null,q=le||[0,0,0,0,0],O=E.data&&E.data.avgRating||"0.0";if(!le&&b.length>0){b.forEach(function(B){B.rating>=1&&B.rating<=5&&q[B.rating-1]++});var F=b.reduce(function(B,M){return B+M.rating},0);O=(F/b.length).toFixed(1)}if(Z>0){var Be=vr(r.summaryLayout),De=Be.render({widget:L,data:E,settings:r,iconPair:y,allCount:Z,ratingCounts:q,avgRatingVal:O,currentRatingFilter:Re,currentOrderBy:Te,currentHasImages:Ie,onFilterChange:async function(B){var M=Re===B?null:B;Je(M),Le(1);var I=await Ne(K,Te,1,M,Ie);await Ce(K,N,I,Me,Te,1)},onSortChange:async function(B,M){Le(1);var I=B,U=!1;M&&(U=!0,I="newest"),Hr(U),We(I);var xr=await Ne(K,I,1,Re,U);await Ce(K,N,xr,Me,I,1)}});L.appendChild(De)}else{var H=document.createElement("button");H.className="renuvex-pr-write-btn",H.style.cssText="display:block;margin:16px auto 0;",H.textContent=r.writeButtonText||"Yorum Yap",H.onclick=Y,L.appendChild(H)}var Se=(_r||[]).filter(function(B){return ke(B).length>0});if(r.showPhotoGallery!==!1&&!Ie&&Se.length>0){var pe=document.createElement("div");if(pe.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var de=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",D=document.createElement("div");D.className="renuvex-pr-photo-title",D.textContent=de,pe.appendChild(D)}var $=r.reviewLayout==="card"?"1/1":"3/4";i.style.setProperty("--renuvex-pr-photo-thumb-aspect",$);var ue=document.createElement("div");ue.className="renuvex-pr-photo-strip";var Q=j,je=r.reviewLayout==="card"?j:Math.round(j*4/3),fe=0;Se.forEach(function(B){if(!(fe>=15)){var M=er(B);if(M){var I=document.createElement("img"),U=te(M,j);I.src=U.src,I.srcset=U.srcset,I.loading=fe<3?"eager":"lazy",I.decoding="async",I.width=Q,I.height=je,I.className="renuvex-pr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",ae(I),(function(xr,Dt){I.onclick=function(){ie(Dt,xr,Se)}})(M,B),ue.appendChild(I),fe++}}});var ee=document.createElement("button");ee.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev",ee.innerHTML="&#8249;",ee.setAttribute("aria-label","\xD6nceki"),ee.onclick=function(){ue.scrollBy({left:-200,behavior:"smooth"})};var re=document.createElement("button");re.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next",re.innerHTML="&#8250;",re.setAttribute("aria-label","Sonraki"),re.onclick=function(){ue.scrollBy({left:200,behavior:"smooth"})};var se=document.createElement("div");se.className="renuvex-pr-photo-strip-wrap",se.appendChild(ee),se.appendChild(ue),se.appendChild(re),pe.appendChild(se),L.appendChild(pe)}if(b.length===0){var _=document.createElement("p");_.className="renuvex-pr-state-msg",_.textContent="Hen\xFCz yorum yok.",L.appendChild(_)}else{var m=Ke(r.reviewLayout);b.forEach(function(M){L.appendChild(m.render(M,hr))})}var ve=E.data&&E.data.hasMore;if(ve){var V=document.createElement("button");V.className="renuvex-pr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var B=Or+1,M=await Ne(K,Te,B,Re,Ie);if(M&&!kr(M)&&M.data&&Array.isArray(M.data.reviews)){Ur(M.data.reviews),Le(B);var I=Ke(N.reviewLayout);M.data.reviews.forEach(function(U){L.insertBefore(I.render(U,hr),V)}),M.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},L.appendChild(V)}g.appendChild(L),Ve(L,"reviews-widget",{productId:e||""}),Sr(Z>0?O:null,P,n,gr,y,K)}catch(B){console.error("[renuvex-pr] render error:",B),g.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if($e(!1),Ze){var Ee=Ze;Qe(null),Ce(Ee.productId,Ee.settings,Ee.reviewsData,Ee.productName,Ee.orderBy,Ee.page,Ee.badgeSettings)}}}export{Ce as a,or as b,kr as c,Ne as d,Wt as e,Ka as f};
