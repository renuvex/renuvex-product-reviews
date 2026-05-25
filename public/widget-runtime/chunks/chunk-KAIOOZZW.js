/* Renuvex Product Reviews ESM runtime | theme: default */
import{b as Xe}from"./chunk-IVH3XSVO.js";import{a as ze,b as at,c as nr,d as ir,e as nt,f as Ue,g as it,j as ot,k as lt,l as pt}from"./chunk-VSN6KF2Z.js";import{$ as ke,A as Wr,B as Gr,C as qr,D as Ur,E as Kr,F as Ze,G as $e,H as Qe,N as ye,O as W,P as G,Q as Ge,R as Xr,T as Jr,U as ce,V as we,W as Zr,X as $r,Y as me,Z as Qr,_ as et,a as ge,aa as er,b as he,ba as D,c as be,ca as rr,da as tr,e as gr,ea as yr,f as Ve,fa as wr,g as Fr,ga as re,h as Te,ha as rt,i as Or,ia as te,j as Be,ja as tt,k as Ie,ka as qe,l as K,m as N,ma as ar,n as hr,na as Pe,o as Me,q as br,r as _r,s as We,t as Le,u as Je,v as Hr,w as Yr,x as jr,y as Dr,z as Vr}from"./chunk-2AHFSPID.js";var jt=15,Dt=60*1e3,dt="__renuvexProductReviewsFetchError",kr={};function or(e){return{type:dt,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function lr(e){return!!(e&&e.type===dt)}async function Ne(e,r,t,n,a,i){if(window.__ikasPreviewMode){try{var p=window.__ikasPreviewBaseUrl||be,l=p+"/api/preview/reviews?page="+encodeURIComponent(t||1),u=await ze(l);if(u.ok)return await u.json()}catch(f){}return or()}r=r||"newest",t=t||1;var c=i?"_l"+i:"",x="renuvex_pr_reviews_"+he+"_"+e+"_"+r+"_"+t+"_"+(n||"")+"_"+(a?"1":"0")+c,s=null,o=tt(x);if(o)try{var g=JSON.parse(o);if(g&&g.t!==void 0&&g.v){if(Date.now()-g.t<Dt)return g.v;s=g.v,qe(x,"")}else qe(x,"")}catch(f){qe(x,"")}try{var v=be+"/api/public/reviews?storeId="+encodeURIComponent(he)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(n?"&rating="+encodeURIComponent(n):"")+(a?"&hasImages=true":"")+(i?"&limit="+encodeURIComponent(i):""),d=await ze(v);if(!d.ok)return s||or();var m=await d.json();return qe(x,JSON.stringify({t:Date.now(),v:m})),m}catch(f){return console.error("[renuvex-pr] fetchReviews error:",f),s||or()}}async function Vt(e){var r=await Ne(e,"newest",1,null,!0,jt);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Ka(e,r){var t=document.getElementById("renuvex-pr-rating-badge");t&&t.remove();var n=document.getElementById("renuvex-pr-jsonld");if(n&&n.remove(),!kr[e]){kr[e]=!0;var a={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},i={enabled:!0,size:"medium"};try{var p=await at();if(!p)return;var l=p.widgets&&p.widgets.reviews||a,u=p.widgets&&p.widgets.badge||i;if(l.enabled===!1)return;We("newest"),Le(1),Je(null);var c=await Promise.all([Ne(e,"newest",1,null),Vt(e)]),x=c[0];Gr(c[1]),await Ce(e,l,x,r,"newest",1,u)}catch(s){console.error("[renuvex-pr] bootstrap error:",s),await Ce(e,a,or(),r,void 0,void 0,i)}finally{delete kr[e]}}}function Fe(e){return ke(e)}function Wt(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ae(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function Gt(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function qt(){var e=Wt(),r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=Gt()&&!a;if(n>0){var p=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",p+n+"px","important")}return t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Ut(e){if(e){var r=document.body.style,t=document.documentElement.style;ae(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ae(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ae(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ae(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ae(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ae(r,"position",e.bodyPosition,e.bodyPositionPriority),ae(r,"top",e.bodyTop,e.bodyTopPriority),ae(r,"left",e.bodyLeft,e.bodyLeftPriority),ae(r,"right",e.bodyRight,e.bodyRightPriority),ae(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Kt(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Oe(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Xt(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function st(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Xt)}function vt(e){var r=st(e),t=r[0]||e.querySelector('[role="dialog"]')||e;Oe(t)}function Jt(e,r){if(e.key==="Tab"){var t=st(r);if(!t.length){e.preventDefault(),vt(r);return}var n=t[0],a=t[t.length-1],i=document.activeElement;if(!r.contains(i)){e.preventDefault(),Oe(n);return}e.shiftKey&&i===n?(e.preventDefault(),Oe(a)):!e.shiftKey&&i===a&&(e.preventDefault(),Oe(n))}}function Zt(){var e={id:"renuvex-pr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({renuvexPrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function $t(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.renuvexPrModal===e.id)}function Qt(e){if($t(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function ut(e,r,t,n,a){Ut(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e),Oe(a)}function ea(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ce(e.rating,N);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var p=document.createElement("div");p.className="renuvex-pr-modal-title",p.textContent=e.title||"",p.style.display=e.title?"":"none",t.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-modal-body",u.textContent=(e.comment||"").trim(),u.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-modal-reply";var x=document.createElement("div");x.className="renuvex-pr-modal-reply-label",x.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi";var s=document.createElement("div");return s.className="renuvex-pr-modal-reply-text",s.textContent=e.merchantReply||"",c.appendChild(x),c.appendChild(s),c.style.display=e.merchantReply?"":"none",t.appendChild(c),r.appendChild(t),r}function ct(e,r,t){var n=t||N,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ce(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var p=a.querySelector(".renuvex-pr-modal-title");p.textContent=r.title||"",p.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=a.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var u=a.querySelector(".renuvex-pr-modal-reply");u.querySelector(".renuvex-pr-modal-reply-label").textContent=n&&n.merchantReplyLabel||"Ma\u011Faza Sahibi",u.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",u.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Cr(e,r,t,n,a,i,p,l,u){var c=Fe(e),x=Math.max(0,Math.min(t||0,c.length-1)),s=document.createElement("div");s.className="renuvex-pr-modal-left";var o=document.createElement("img"),g=p==="next"?"renuvex-pr-modal-img-enter-right":p==="prev"?"renuvex-pr-modal-img-enter-left":"";o.className="renuvex-pr-modal-main-img"+(g?" "+g:""),o.src=wr(c[x]||""),o.decoding="async",o.width=yr,o.height=Math.round(yr*4/3),o.alt="Yorum foto\u011Fraf\u0131",rt(o,function(T){if(T.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var E=document.createElement("div");E.className="renuvex-pr-modal-img-error",E.setAttribute("role","status"),E.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(E,T)}}),s.appendChild(o);var v=document.createElement("button");v.className="renuvex-pr-modal-close-mobile",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(T){T.stopPropagation(),i()},s.appendChild(v);var d=0;if(s.addEventListener("touchstart",function(T){d=T.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(T){var E=d-T.changedTouches[0].clientX;if(!(Math.abs(E)<50)){if(E>0){if(C)xe(e,r,x+1,n,a,i,!0,"next",l,u);else if(b){var y=n[r+1];xe(y,r+1,0,n,a,i,!1,"next",l,u)}}else if(f)xe(e,r,x-1,n,a,i,!0,"prev",l,u);else if(S){var L=n[r-1],R=Fe(L);xe(L,r-1,R.length-1,n,a,i,!1,"prev",l,u)}}},{passive:!0}),c.length>1){var m=document.createElement("div");m.className="renuvex-pr-modal-thumbs",c.forEach(function(T,E){var y=document.createElement("img"),L=re(T,tr);y.src=L.src,y.srcset=L.srcset,y.loading="lazy",y.decoding="async",y.width=tr,y.height=tr,y.className="renuvex-pr-modal-thumb"+(E===x?" renuvex-pr-modal-thumb-active":""),y.alt="K\xFC\xE7\xFCk resim "+(E+1),te(y),y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(E+1)+" se\xE7"),E===x&&y.setAttribute("aria-current","true"),(function(R){function P(){xe(e,r,R,n,a,i,!0,null,l,u)}y.onclick=P,y.onkeydown=function(B){(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),P())}})(E),m.appendChild(y)}),s.appendChild(m)}var f=x>0,C=x<c.length-1,S=r>0,b=r<n.length-1,k=f||S,w=C||b;if(k){var h=document.createElement("button");h.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev",h.innerHTML="&#8249;",h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(T){if(T.stopPropagation(),f)xe(e,r,x-1,n,a,i,!0,"prev",l,u);else if(S){var E=n[r-1],y=Fe(E);xe(E,r-1,y.length-1,n,a,i,!1,"prev",l,u)}},s.appendChild(h)}if(w){var z=document.createElement("button");z.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next",z.innerHTML="&#8250;",z.setAttribute("aria-label","Sonraki"),z.onclick=function(T){if(T.stopPropagation(),C)xe(e,r,x+1,n,a,i,!0,"next",l,u);else if(b){var E=n[r+1];xe(E,r+1,0,n,a,i,!1,"next",l,u)}},s.appendChild(z)}return s}function mt(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Fe(n);a[0]&&(new Image().src=wr(a[0]))}})}function zr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ra(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){zr(t),zr(n),zr(a)}i(),t&&Oe(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function xe(e,r,t,n,a,i,p,l,u,c){if(c&&(c.currentReview=e),p){var x=Cr(e,r,t,n,a,i,l,u,c);a.firstChild&&a.replaceChild(x,a.firstChild)}else{var x=Cr(e,r,t,n,a,i,l,u,c),s=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&a.replaceChild(x,a.firstChild),s&&ct(s,e,c&&c.currentSettings),ra(u,a)}mt(r,n)}function ne(e,r,t){var n=Fe(e);if(!n.length)return;var a=(t||[]).filter(function(k){return Fe(k).length>0}),i=a.findIndex(function(k){return k===e||k.id===e.id});i===-1&&(a.unshift(e),i=0);var p=n.indexOf(r);p<0&&(p=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var u=document.createElement("div");u.className="renuvex-pr-modal";var c=!1,x=Kt(),s=qt(),o=Zt(),g={currentReview:e,currentSettings:N},v=null;function d(k){var w=k&&k.detail&&k.detail.settings;if(!(w&&w===v)){v=w||null,g.currentSettings=w||N;var h=u.querySelector(".renuvex-pr-modal-right");!h||!g.currentReview||ct(h,g.currentReview,g.currentSettings)}}function m(){c||(c=!0,window.removeEventListener(Pe,d),ut(l,f,m,s,x))}function f(k){if(k.key==="Escape"){C();return}Jt(k,l)}function C(){c||(c=!0,window.removeEventListener(Pe,d),ut(l,f,m,s,x),Qt(o))}document.addEventListener("keydown",f),window.addEventListener("popstate",m),window.addEventListener(Pe,d),l.onclick=function(){C()},u.onclick=function(k){k.stopPropagation()},u.appendChild(Cr(e,i,p,a,u,C,null,l,g)),u.appendChild(ea(e)),mt(i,a);var S=document.createElement("div");S.className="renuvex-pr-modal-wrap",S.tabIndex=-1,S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),S.appendChild(u);var b=document.createElement("button");b.className="renuvex-pr-modal-close",b.textContent="\u2715",b.setAttribute("aria-label","Kapat"),b.onclick=function(k){k.stopPropagation(),C()},S.appendChild(b),l.appendChild(S),document.body.appendChild(l),vt(l)}function xt(e){var r=ar();if(r&&typeof r.findProductTitle=="function")try{var t=r.findProductTitle(e);if(t)return t}catch(p){}if(e)for(var n=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),a=0;a<n.length;a++){var i=n[a];if(i.children.length===0&&i.textContent.trim()===e&&i.tagName!=="TITLE"&&!i.closest("[data-renuvex-listing-badge]")&&!i.closest("[data-renuvex-slot]")&&!i.closest("#renuvex-reviews")&&!i.closest("nav")&&!i.closest("header")&&!i.closest('[class*="breadcrumb"]')&&!i.closest('[aria-label*="breadcrumb"]'))return i}return document.querySelector("h1")}var pr=null,dr=null;function ta(e,r){return we(e,r)}function aa(e){var r=ar();if(r&&typeof r.getProductBadgeMountPoint=="function")try{var t=r.getProductBadgeMountPoint(e);if(t&&t.parent)return t}catch(n){}return ot(e)}function Sr(e,r,t,n,a,i,p){pr&&(pr.disconnect(),pr=null),dr&&(dr.disconnect(),dr=null),nt("product-title-rating");var l=document.querySelector(".renuvex-pr-rating-badge--pdp");if(l&&l.remove(),!!e&&!(n&&n.enabled===!1)){var u=document.getElementById("renuvex-pr-jsonld");u&&u.remove();var c=document.createElement("script");c.id="renuvex-pr-jsonld",c.type="application/ld+json",c.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(c);var x=xt(t);if(!x||!x.parentNode){gr("dom-conflict","PDP product title could not be found for badge placement",{surface:"pdp-badge",reason:"title_not_found",productName:t||"",productId:i||""});return}var s=aa(x);if(!s||!s.parent){gr("dom-conflict","PDP badge mount point could not be resolved",{surface:"pdp-badge",reason:"mount_not_found",productName:t||"",productId:i||""});return}var o=n&&n.size||"medium",g=Ue[o]||Ue.medium,v=null;if(n&&n.mobileOverride===!0){var d=n.mobileSize||"small";v=Ue[d]||Ue.small}it(g,v);var m=nr({slot:"product-title-rating",className:"renuvex-pr-product-badge-slot",context:{surface:"pdp",productId:i||""}}),f=document.createElement("a");f.className="renuvex-pr-rating-badge renuvex-pr-rating-badge--pdp",f.href="#renuvex-reviews";var C=Zr(e,r);f.setAttribute("aria-labelledby",C.id),f.setAttribute("data-renuvex-surface","pdp"),f.setAttribute("data-renuvex-rating",String(e)),f.setAttribute("data-renuvex-count",String(r)),ir(f,{surface:"pdp",productId:i||""});var S=window.getComputedStyle(x).textAlign,b=S==="center"?"center":S==="right"?"right":"left";f.setAttribute("data-renuvex-align",b),f.insertAdjacentHTML("beforeend",C.html+ta(e,a));var k=document.createElement("span");k.className="renuvex-pr-rating-badge__label",k.textContent=e+" ("+r+" yorum)",f.appendChild(k),f.onclick=function(w){w.preventDefault();var h=document.getElementById("renuvex-reviews-widget")||document.getElementById("renuvex-reviews");if(h){var z=document.querySelector("header"),T=z?z.getBoundingClientRect().height:0,E=h.getBoundingClientRect().top+window.pageYOffset-T-16;window.scrollTo({top:E,behavior:"smooth"})}},m.appendChild(f),lt(m,s),dr=pt(m,s,{surface:"pdp-badge",reason:"position_reanchored",message:"PDP badge slot reordered after render",extra:{productName:t||"",productId:i||""}}),Ve(m,"pdp-badge",{productName:t||"",productId:i||""}),p||(pr=Fr(m,"pdp-badge",function(){Sr(e,r,t,n,a,i,!0)},{productName:t||"",productId:i||""}))}}var ft=`
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
`;var Lr={};ge(Lr,{meta:()=>ca,render:()=>ma});function _e(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;ye(n);var p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var u=r[l-1]||0,c=t>0?Math.round(u/t*100):0,x=a===l,s=document.createElement("div");s.className="renuvex-pr-bar-row"+(x?" renuvex-pr-bar-active":""),a&&!x&&(s.style.opacity="0.35");for(var o="",g=1;g<=5;g++){var v=g<=l;o+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(v?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+W(v?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+o+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+c+'%;"></div></div><span class="renuvex-pr-bar-count">('+u.toLocaleString("tr-TR")+")</span>",(function(d){s.onclick=function(){i(d)}})(l),p.appendChild(s)}return p}var ie=[],gt=!1;function na(e){for(var r=ie.length-1;r>=0;r--){var t=ie[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function ia(e){if(e.key==="Escape")for(var r=ie.length-1;r>=0;r--)ie[r].close()}function oa(){gt||typeof document=="undefined"||(document.addEventListener("click",na,!0),document.addEventListener("keydown",ia),gt=!0)}function ur(e){for(var r=0;r<ie.length;r++)ie[r]!==e&&ie[r].close()}function sr(e){oa();var r={trigger:e.trigger,element:e.element,close:e.close};return ie.push(r),function(){var n=ie.indexOf(r);n!==-1&&ie.splice(n,1)}}function X(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=N&&N.writeButtonText||"Yorum Yap",l.onclick=a,p.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-filter-wrap";var c=document.createElement("button");c.type="button",c.className="renuvex-pr-filter-btn",c.setAttribute("aria-label","Filtrele"),c.setAttribute("aria-haspopup","menu"),c.setAttribute("aria-expanded","false");var x=N&&N.filterIcon||"lines";c.innerHTML=G(Xr(x));var s=document.createElement("div");s.className="renuvex-pr-filter-menu",s.setAttribute("role","menu");var o=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],g=!1;function v(f){var C=s.classList.contains("renuvex-pr-open");s.classList.remove("renuvex-pr-open"),c.classList.remove("renuvex-pr-filter-btn-active"),c.setAttribute("aria-expanded","false");var S=f&&(f.restoreFocus===!0||f.restoreFocus==="auto"&&Xe());if(C&&S)try{c.focus({preventScroll:!0})}catch(b){try{c.focus()}catch(k){}}}function d(){ur(m),s.classList.add("renuvex-pr-open"),c.classList.add("renuvex-pr-filter-btn-active"),c.setAttribute("aria-expanded","true");var f=s.querySelector(".renuvex-pr-filter-item-active")||s.querySelector(".renuvex-pr-filter-item");f&&requestAnimationFrame(function(){try{f.focus({preventScroll:!0})}catch(C){try{f.focus()}catch(S){}}})}o.forEach(function(f){var C=f[2],S=C?n:!n&&(t||"newest")===f[0],b=document.createElement("button");b.type="button",b.className="renuvex-pr-filter-item"+(S?" renuvex-pr-filter-item-active":""),b.setAttribute("role","menuitem"),b.textContent=f[1];var k=!1;function w(h,z){h&&(h.preventDefault(),h.stopPropagation()),!k&&(k=!0,g=!0,v({restoreFocus:z}),i(f[0],C),setTimeout(function(){k=!1,g=!1},0))}b.addEventListener("pointerdown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(h){w(h,!1)},{passive:!1}),b.addEventListener("mousedown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),b.addEventListener("keydown",function(h){(h.key==="Enter"||h.key===" ")&&w(h,!0)}),b.onclick=function(h){w(h,!1)},s.appendChild(b)}),c.onclick=function(){s.classList.contains("renuvex-pr-open")?v({restoreFocus:"auto"}):d()},u.addEventListener("keydown",function(f){f.key==="Escape"&&s.classList.contains("renuvex-pr-open")&&(f.stopPropagation(),v({restoreFocus:!0}))}),u.addEventListener("focusout",function(f){if(s.classList.contains("renuvex-pr-open")&&!g){var C=f.relatedTarget;C&&u.contains(C)||v()}});var m=sr({trigger:u,element:s,close:v});return u.appendChild(c),u.appendChild(s),p.appendChild(u),p}function ht(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="renuvex-pr-fwizard",n.appendChild(a);var i=document.createElement("button");i.className="renuvex-pr-fwizard-close",i.type="button",i.setAttribute("aria-label","Kapat"),i.innerHTML=G('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),a.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",a.appendChild(p);var l=!1,u=null,c=!1,x="",s="";function o(){var y=document.activeElement;return!y||y===document.body||y===document.documentElement?null:y}function g(y){if(!(!y||!document.contains(y)||typeof y.focus!="function"))try{y.focus({preventScroll:!0})}catch(L){try{y.focus()}catch(R){}}}function v(y){if(!y||y.disabled||y.getAttribute("aria-hidden")==="true")return!1;var L=window.getComputedStyle?window.getComputedStyle(y):null;return L&&(L.display==="none"||L.visibility==="hidden")?!1:!!(y.offsetWidth||y.offsetHeight||y.getClientRects().length)}function d(y){var L=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(y.querySelectorAll(L)).filter(v)}function m(){var y=d(p),L=d(n),R=y[0]||L[0]||n;g(R)}function f(y){if(y.key==="Tab"){var L=d(n);if(!L.length){y.preventDefault(),g(n);return}var R=L[0],P=L[L.length-1],B=document.activeElement;if(!n.contains(B)){y.preventDefault(),g(R);return}y.shiftKey&&B===R?(y.preventDefault(),g(P)):!y.shiftKey&&B===P&&(y.preventDefault(),g(R))}}function C(){var y=window.innerWidth-document.documentElement.clientWidth;x=document.body.style.overflow,s=document.body.style.paddingRight,document.body.style.overflow="hidden",y>0&&(document.body.style.paddingRight=y+"px")}function S(){document.body.style.overflow=x,document.body.style.paddingRight=s}function b(){l||(l=!0,document.removeEventListener("keydown",k),n.removeEventListener("click",w),i.removeEventListener("click",b),n.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n),S(),c&&g(u);try{r()}catch(y){}},200))}function k(y){if(y.key==="Escape"){b();return}f(y)}function w(y){y.target===n&&t&&b()}document.addEventListener("keydown",k),n.addEventListener("click",w),i.addEventListener("click",b);function h(y){u=o(),c=Xe(),y&&p.appendChild(y),document.body.appendChild(n),C(),requestAnimationFrame(function(){n.classList.add("renuvex-pr-fwizard-open"),m()})}var z=null,T=null;function E(y,L){if(L=L||"error",z){try{z.remove()}catch(R){}z=null}T&&(clearTimeout(T),T=null),z=document.createElement("div"),z.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+L,z.textContent=y,a.appendChild(z),T=setTimeout(function(){z&&(z.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(z){try{z.remove()}catch(R){}z=null}},300))},4e3)}return{open:h,close:b,content:p,setAllowOutsideClose:function(y){t=!!y},setStepAttr:function(y){a.setAttribute("data-step",String(y))},focusFirstControl:m,showToast:E}}var bt=`
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
`;var Er=4;function He(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function yt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<Er&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}var la='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function wt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},p=document.createElement("div");p.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=G(la)+"<span>Geri</span>",l.addEventListener("click",function(){n()}),p.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-footer-progress";for(var c=[],x=0;x<Er;x++){var s=document.createElement("span");s.className="renuvex-pr-fwizard-progress-seg",u.appendChild(s),c.push(s)}p.appendChild(u);var o=document.createElement("button");o.type="button";var g=null;function v(m){g&&o.removeEventListener("click",g),g=m,m&&o.addEventListener("click",m)}p.appendChild(o);function d(m,f){var C=r.indexOf(m)!==-1,S=t.indexOf(m)!==-1,b=f&&(f.images&&f.images.length>0||f.pendingImages&&f.pendingImages.length>0);if(C)m===2&&b?(o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",v(function(){i()})):(o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",o.setAttribute("aria-label","Atla"),o.innerHTML="<span>Atla</span>",v(function(){a()})),o.disabled=!1,o.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),o.style.visibility="",o.tabIndex=0;else if(S){o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Sonraki"),o.innerHTML="Sonraki",o.style.visibility="",o.tabIndex=0;var k=He(m,f);o.disabled=!k,o.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!k),v(function(){o.disabled||i()})}else o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",o.innerHTML="",o.style.visibility="hidden",o.tabIndex=-1,o.disabled=!0,v(null)}return{el:p,update:function(m,f){c.forEach(function(S,b){b+1<=m?S.classList.add("renuvex-pr-fwizard-progress-seg-active"):S.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var C=m<=1;l.style.visibility=C?"hidden":"",l.style.pointerEvents=C?"none":"",l.tabIndex=C?-1:0,d(m,f)},setNextDisabled:function(m){o.classList.contains("renuvex-pr-fwizard-cta-btn")&&(o.disabled=!!m,o.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!m))},setThanksState:function(m){l.style.visibility="hidden",u.style.visibility="hidden",o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",o.style.visibility="",o.disabled=!1,o.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),v(m)}}}function kt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-stars",p.setAttribute("role","radiogroup"),p.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=Ge(N||{});ye(l);var u=[];function c(v){u.forEach(function(d,m){var f=m<v;d.classList.toggle("renuvex-pr-fwizard-star-active",f),d.setAttribute("aria-checked",m+1===v?"true":"false"),d.innerHTML=f?W("full"):W("outline")})}function x(v,d){d&&typeof d.preventDefault=="function"&&d.preventDefault(),d&&typeof d.stopPropagation=="function"&&d.stopPropagation(),!n&&(n=!0,e.set({rating:v}),c(v),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(v){var d=document.createElement("button");d.type="button",d.className="renuvex-pr-fwizard-star",d.setAttribute("role","radio"),d.setAttribute("aria-label",v+" y\u0131ld\u0131z"),d.innerHTML=W("outline"),d.addEventListener("mouseenter",function(){c(v)}),d.addEventListener("mouseleave",function(){c(e.get().rating)}),d.addEventListener("pointerdown",function(m){m.button&&m.button!==0||x(v,m)}),typeof window!="undefined"&&!window.PointerEvent&&d.addEventListener("touchstart",function(m){x(v,m)},{passive:!1}),d.addEventListener("mousedown",function(m){window.PointerEvent||x(v,m)}),d.addEventListener("keydown",function(m){(m.key==="Enter"||m.key===" ")&&x(v,m)}),d.addEventListener("click",function(m){x(v,m)}),u.push(d),p.appendChild(d)})(s);c(e.get().rating);var o=null,g=function(v){var d=v&&v.detail&&v.detail.settings;d&&d===o||(o=d||null,l=Ge(d||N||{}),c(e.get().rating))};return window.addEventListener(Pe,g),t.appendChild(p),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Pe,g)}}}var zt=3,pa=10*1024*1024;function Ct(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-subtitle",i.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML=G('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>')+"<span>Foto\u011Fraf Ekle</span>";var u=document.createElement("input");u.type="file",u.accept="image/*",u.multiple=!0,u.style.display="none",p.appendChild(l),p.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),p.appendChild(c),n.appendChild(p);var x=r.blobMap||{},s=r.urlToFinger||{};function o(){if(!t){var S=e.get().images||[],b=e.get().pendingImages||[],k=S.map(function(w){return{url:w,isPending:!1}}).concat(b.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));c.innerHTML="",k.forEach(function(w){var h=x[w.url]||w.url,z=g(w,h);c.appendChild(z)}),f()}}function g(S,b){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var w=document.createElement("img");w.src=b,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(w);var h=document.createElement("div");h.className="renuvex-pr-fwizard-photo-loading",h.style.display="none",k.appendChild(h);var z=document.createElement("button");return z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.innerHTML="&#x2715;",k.appendChild(z),v(k,S,b),k}function v(S,b,k){var w=S.querySelector("img");w.src!==k&&(w.src=k);var h=S.querySelector(".renuvex-pr-fwizard-photo-loading");if(b.isPending&&b.error){h.style.display="flex",h.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+b.error,h.appendChild(z)}else h.style.display="none",h.textContent="";var T=S.querySelector(".renuvex-pr-fwizard-photo-remove");T.onclick=function(){var E=s[b.url]||(b.file?b.file.name+"_"+b.file.size:null);if(b.url.startsWith("blob:")&&URL.revokeObjectURL(b.url),E){var y=(e.get().fingerprints||[]).filter(function(P){return P!==E});e.set({fingerprints:y})}if(b.isPending){var L=(e.get().pendingImages||[]).filter(function(P){return P.url!==b.url});e.set({pendingImages:L})}else{var R=(e.get().images||[]).filter(function(P){return P!==b.url});e.set({images:R})}}}var d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',m='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function f(){var S=(e.get().images||[]).length,b=(e.get().pendingImages||[]).length,k=S+b,w=k>=zt;k>0?(p.classList.add("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=G(m)):(p.classList.remove("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=G(d)+"<span>Foto\u011Fraf Ekle</span>"),w?(l.style.display="none",l.disabled=!0,u.disabled=!0):(l.style.display="flex",l.disabled=!1,u.disabled=!1,l.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){u.disabled||u.click()}),u.onchange=async function(S){var b=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(S.target.files).slice(0,zt-b);u.value="";var w=(e.get().pendingImages||[]).length,h=e.get().images||[],z=h.length;if(k.length!==0){for(var T=[],E=[],y=0;y<k.length;y++){var L=k[y],R=L.name+"_"+L.size,P=(e.get().fingerprints||[]).some(function(F){return F===R})||T.some(function(F){return F.file.name+"_"+F.file.size===R});if(P){console.log("[renuvex-pr] Duplicate file detected, skipping:",L.name);continue}if(L.size>pa){var B="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(B,"error"):alert(B);continue}var J=URL.createObjectURL(L);s[J]=R,T.push({url:J,file:L,error:null}),E.push({url:J,file:L});var oe=(e.get().fingerprints||[]).slice();oe.push(R),e.set({fingerprints:oe})}if(T.length!==0){var le=(e.get().pendingImages||[]).concat(T),q=async function(){for(var F=0;F<E.length;F++){var Re=E[F],je=Re.file,H=Re.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Se=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),pe=(e.get().images||[]).slice();pe.push(H),e.set({pendingImages:Se,images:pe});continue}try{var de=await ze(be+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he})});if(!de.ok)throw de.status===429?new Error("rate_limit"):new Error("sign failed");var j=await de.json();if(!j.folder)throw new Error("sign folder missing");var Z=new FormData;Z.append("file",je),Z.append("api_key",j.api_key),Z.append("timestamp",j.timestamp),Z.append("signature",j.signature),Z.append("folder",j.folder);var ue=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:Z}),$=await ue.json();if($.secure_url&&et($.secure_url)){var De=(e.get().pendingImages||[]).some(function(O){return O.url===H});if(!De){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}x[$.secure_url]=H,s[$.secure_url]=s[H];var fe=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),Q=(e.get().images||[]).slice();Q.push($.secure_url),e.set({pendingImages:fe,images:Q});try{ze(be+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,secureUrl:$.secure_url})}).catch(function(){})}catch(O){}}else throw new Error("invalid image url")}catch(O){console.error("[renuvex-pr] Image upload failed:",O);var ee=O.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ee,"error");var se=(e.get().pendingImages||[]).map(function(ve){return ve.url===H?{url:ve.url,file:ve.file,error:ee}:ve});e.set({pendingImages:se})}}};if(z===0&&w===0){t=!0;var _=!r.canNavigate||r.canNavigate();_&&e.goNext()}e.set({pendingImages:le}),q()}}};var C=e.onChange(o);return o(),{el:n,destroy:function(){t=!0,u.onchange=null,C&&C()}}}var Tr=2e3,da=60;function St(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",p.maxLength=da,p.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),p.value=e.get().title||"",p.addEventListener("input",function(){e.set({title:p.value})}),i.appendChild(p);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Tr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-char-counter",u.setAttribute("aria-live","polite"),i.appendChild(u);function c(){var s=l.value.length;u.textContent=s+"/"+Tr,u.classList.toggle("renuvex-pr-fwizard-char-counter--max",s>=Tr)}function x(){return He(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),c(),t(x())}),n.appendChild(i),c(),setTimeout(function(){t(x())},0),{el:n,destroy:function(){}}}var ua=40;function Et(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent="Hakk\u0131n\u0131zda",a.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var u=document.createElement("label");u.className="renuvex-pr-fwizard-label",u.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="renuvex-pr-fwizard-input",c.maxLength=ua,c.setAttribute("aria-required","true"),c.value=e.get().author||"",l.appendChild(u),l.appendChild(c),p.appendChild(l);var x=document.createElement("div");x.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.textContent="E-posta (opsiyonel)";var o=document.createElement("input");o.type="email",o.className="renuvex-pr-fwizard-input",o.setAttribute("autocomplete","email"),o.value=e.get().email||"",x.appendChild(s),x.appendChild(o),p.appendChild(x);var g=document.createElement("div");g.className="renuvex-pr-fwizard-notice",g.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",p.appendChild(g);var v=document.createElement("div");v.className="renuvex-pr-fwizard-msg",v.setAttribute("role","alert"),v.setAttribute("aria-live","assertive"),p.appendChild(v);var d=document.createElement("button");d.type="button",d.className="renuvex-pr-fwizard-submit-btn",d.textContent="G\xF6nder",p.appendChild(d),a.appendChild(p);function m(){return He(4,e.get())}function f(){var k=!m(),w=(e.get().pendingImages||[]).length,h=w>0;h?(d.disabled=!0,d.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),d.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(d.disabled=k,d.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",k),d.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),f(),t(m())}),o.addEventListener("input",function(){e.set({email:o.value})}),f(),setTimeout(function(){t(m())},0);function C(){v.textContent=""}function S(k){C();var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg-error",w.textContent=k||"",v.appendChild(w)}d.onclick=async function(){if(!d.disabled){var k=e.get(),w=(k.author||"").trim(),h=(k.comment||"").trim();if(o.value.trim()&&!o.checkValidity()){o.reportValidity();return}if(!w){S("Gerekli alan");return}if(!k.rating){S("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}d.disabled=!0,d.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var z=d.textContent;if(d.textContent="G\xF6nderiliyor\u2026",C(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var T=Jr(window.location.href),E=k.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),y=await ze(be+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,productId:k.productId||null,slug:T||null,productName:E,author:w,title:(k.title||"").trim()||null,comment:h||null,rating:k.rating,images:k.images||[]})},15e3);if(y.ok)n();else{var L=await y.json().catch(function(){return{}});throw new Error(L.error||"Yorum kaydedilemedi.")}}catch(B){var R=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),P=R?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):S(P),d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),d.textContent=z}}};var b=e.onChange(f);return{el:a,destroy:function(){d.onclick=null,b&&b()}}}var Tt=!1;function sa(){if(!Tt){var e=document.createElement("style");e.setAttribute("data-renuvex-fwizard",""),e.setAttribute("data-renuvex-pr-style","review-form-wizard"),e.textContent=bt,document.head.appendChild(e),Tt=!0}}function va(e,r,t){if(t=t||{},e===1)return kt(r,{canNavigate:t.canNavigate});if(e===2)return Ct(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return St(r,{onValidityChange:t.onValidityChange});if(e===4)return Et(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Lt(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Pt(e){e=e||{},sa();var r=yt({productId:e.productId,productName:e.productName}),t={},n={},a=ht({onClose:function(){window.removeEventListener("popstate",p),window.history.state&&window.history.state.renuvexPrReviewModal&&window.history.back(),Object.keys(t).forEach(function(w){var h=t[w];h&&h.startsWith("blob:")&&URL.revokeObjectURL(h)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),i={renuvexPrReviewModal:!0};window.history.pushState(i,null,"");var p=function(w){a&&a.close&&a.close()};window.addEventListener("popstate",p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-wrap";var u=wt({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="renuvex-pr-fwizard-layout",c.appendChild(l),c.appendChild(u.el);var x=null,s="idle",o=null,g=!0,v=null;function d(w,h){l.innerHTML="";var z=va(w,r,{canNavigate:function(){return s==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(y){u.setNextDisabled(!y)},onSuccess:f,showToast:a.showToast});if(x=z,u.update(w,r.get()),h){s="entering",z.el.classList.add("renuvex-pr-fwizard-step--enter");var T=null,E=function(){T&&clearTimeout(T),z.el.removeEventListener("animationend",E),z.el.classList.remove("renuvex-pr-fwizard-step--enter"),s="idle",o!==null&&C()};z.el.addEventListener("animationend",E),T=setTimeout(E,700)}else s="idle";l.appendChild(z.el),a.setStepAttr&&a.setStepAttr(w),w===3&&u.setNextDisabled(!0)}var m=!1;function f(){if(!m){if(m=!0,!x){l.innerHTML="";var w=Lt();w.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(w),a.setStepAttr("thanks"),u.setThanksState(a.close);return}var h=x;s="exiting",h.el.classList.add("renuvex-pr-fwizard-step--exit");var z=function(){if(v&&clearTimeout(v),h.el.removeEventListener("animationend",z),h.destroy)try{h.destroy()}catch(E){}x===h&&(x=null),l.innerHTML="";var T=Lt();T.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(T),a.setStepAttr("thanks"),u.setThanksState(a.close),s="idle"};h.el.addEventListener("animationend",z),v=setTimeout(z,300)}}function C(){var w=r.get().currentStep;if(s!=="idle"){o=w;return}if(!x){var h=!g;g=!1,d(w,h);return}var z=x;s="exiting",z.el.classList.add("renuvex-pr-fwizard-step--exit");var T=function(){if(v&&clearTimeout(v),z.el.removeEventListener("animationend",T),z.destroy)try{z.destroy()}catch(y){}if(x===z){l.innerHTML="",x=null;var E=o!==null?o:r.get().currentStep;o=null,d(E,!0),s="idle"}};z.el.addEventListener("animationend",T),v=setTimeout(T,350)}C();var S=r.get().currentStep,b=r.onChange(function(w){w.currentStep!==S?(S=w.currentStep,C()):u.update(w.currentStep,w)}),k=a.close;return a.close=function(){b&&b(),typeof v!="undefined"&&v&&clearTimeout(v),k()},a.open(c),{close:a.close}}function Y(){Pt({productId:K||"",productName:Me||""})}var ca={id:"classic",name:"Klasik (A\xE7\u0131k)"};function ma(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,p=e.ratingCounts,l=e.avgRatingVal,u=e.currentRatingFilter,c=e.currentOrderBy,x=e.currentHasImages,s=e.onFilterChange,o=e.onSortChange;ye(a);var g=document.createElement("div");g.className="renuvex-pr-summary";var v=(p[3]||0)+(p[4]||0),d=i>0?Math.round(v/i*100):0,m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-avg",m.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",g.appendChild(m);var f=document.createElement("div");if(f.className="renuvex-pr-summary-block renuvex-pr-summary-count",f.textContent=i.toLocaleString("tr-TR")+" Yorum",g.appendChild(f),n.showRecommendation!==!1&&d>0){var C=document.createElement("div");C.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",C.innerHTML='<span class="renuvex-pr-recommend-pct">%'+d+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",g.appendChild(C)}return g.appendChild(_e({ratingCounts:p,allCount:i,iconPair:a,currentRatingFilter:u,onFilterChange:s})),g.appendChild(X({widget:r,currentOrderBy:c,currentHasImages:x,onWriteClick:Y,onSortChange:o})),g}var Pr={};ge(Pr,{css:()=>fa,meta:()=>xa,render:()=>ga});var Nt=`
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
`;var xa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},fa=Nt;function ga(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary renuvex-pr-summary-compact";var g=document.createElement("div");g.className="renuvex-pr-compact-header";var v=document.createElement("div");v.className="renuvex-pr-compact-trigger-wrap";var d=document.createElement("button");d.className="renuvex-pr-compact-trigger",d.type="button",d.setAttribute("aria-expanded","false"),d.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+we(p,n)+'</span><span class="renuvex-pr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+G('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>')+"</span>",v.appendChild(d),g.appendChild(v);var m=X({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:Y,onSortChange:s}),f=m.querySelector(".renuvex-pr-filter-wrap"),C=m.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");S.className="renuvex-pr-compact-actions-slot",C&&S.appendChild(C),f&&S.appendChild(f),g.appendChild(S),o.appendChild(g);var b=document.createElement("div");b.className="renuvex-pr-compact-panel",b.setAttribute("role","dialog"),b.setAttribute("aria-hidden","true");var k=document.createElement("div");k.className="renuvex-pr-compact-panel-inner";var w=document.createElement("div");w.className="renuvex-pr-compact-avg",w.innerHTML='<span class="renuvex-pr-icon">'+W("full")+"</span><span>"+p+"</span>",k.appendChild(w),k.appendChild(_e({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:x})),b.appendChild(k);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(_){var F=_?o:v;b.parentNode!==F&&(b.classList.contains("renuvex-pr-open")&&(b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),d.setAttribute("aria-expanded","false")),F.appendChild(b))}if(z(h?h.matches:!1),h){var T=function(_){z(_.matches)};h.addEventListener?h.addEventListener("change",T):h.addListener&&h.addListener(T)}if(C){var E=document.createElement("button");E.className="renuvex-pr-write-btn",E.textContent=N&&N.writeButtonText||"Yorum Yap",E.onclick=Y;var y=document.createElement("div");y.className="renuvex-pr-compact-write-row",y.appendChild(E),o.appendChild(y)}function L(){b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),d.setAttribute("aria-expanded","false")}function R(){ur(P),b.classList.add("renuvex-pr-open"),b.setAttribute("aria-hidden","false"),d.setAttribute("aria-expanded","true")}d.onclick=function(){b.classList.contains("renuvex-pr-open")?L():R()};var P=null;function B(_){P&&(P(),P=null),_||(P=sr({trigger:v,element:b,close:L}))}if(B(h?h.matches:!1),h){var J=function(_){B(_.matches)};h.addEventListener?h.addEventListener("change",J):h.addListener&&h.addListener(J)}if(t.showRecommendation!==!1){var oe=(i[3]||0)+(i[4]||0),le=a>0?Math.round(oe/a*100):0;if(le>0){var q=document.createElement("div");q.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",q.style.marginTop="8px",q.innerHTML='<span class="renuvex-pr-recommend-pct">%'+le+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(q)}}return o}var Nr={};ge(Nr,{css:()=>ba,meta:()=>ha,render:()=>ya});var At=`
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
`;var ha={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ba=At;function ya(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange;ye(n);var o=document.createElement("div");o.className="renuvex-pr-summary renuvex-pr-summary-split";var g=document.createElement("div");g.className="renuvex-pr-split-col renuvex-pr-split-left";var v=document.createElement("div");v.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",v.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+p+"</span>",g.appendChild(v);var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",d.textContent=a.toLocaleString("tr-TR")+" Yorum",g.appendChild(d),o.appendChild(g);var m=document.createElement("div");m.className="renuvex-pr-split-col renuvex-pr-split-mid",m.appendChild(_e({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:x})),o.appendChild(m);var f=X({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:Y,onSortChange:s}),C=f.querySelector(".renuvex-pr-filter-wrap"),S=f.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-split-col renuvex-pr-split-right",S&&b.appendChild(S),C&&b.appendChild(C),o.appendChild(b);var k=(i[3]||0)+(i[4]||0),w=a>0?Math.round(k/a*100):0,h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",h.innerHTML='<span class="renuvex-pr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var z=t.showRecommendation===!1||w===0;return z&&h.classList.add("renuvex-pr-split-rec-hidden"),g.appendChild(h),o}var Ar={};ge(Ar,{css:()=>ka,meta:()=>wa,render:()=>za});var Rt=`
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
`;var wa={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},ka=Rt;function za(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,i=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var c=document.createElement("div");c.className="renuvex-pr-minimal-info";var x=document.createElement("div");x.className="renuvex-pr-minimal-row";var s=document.createElement("span");s.className="renuvex-pr-minimal-avg",s.textContent=a,x.appendChild(s);var o=document.createElement("span");o.className="renuvex-pr-minimal-stars",o.innerHTML=we(a,t),x.appendChild(o);var g=document.createElement("span");g.className="renuvex-pr-minimal-count",g.textContent=n.toLocaleString("tr-TR")+" Yorum",x.appendChild(g),c.appendChild(x),u.appendChild(c);var v=X({widget:r,currentOrderBy:i,currentHasImages:p,onWriteClick:Y,onSortChange:l}),d=v.querySelector(".renuvex-pr-filter-wrap"),m=v.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");if(f.className="renuvex-pr-minimal-actions",m&&f.appendChild(m),d&&f.appendChild(d),u.appendChild(f),m){var C=document.createElement("button");C.className="renuvex-pr-write-btn",C.textContent=N&&N.writeButtonText||"Yorum Yap",C.onclick=Y;var S=document.createElement("div");S.className="renuvex-pr-minimal-write-row",S.appendChild(C),u.appendChild(S)}return u}var Rr={};ge(Rr,{css:()=>Sa,meta:()=>Ca,render:()=>Ea});var Bt=`
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
`;var Ca={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Sa=Bt;function Ea(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,i=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var c=document.createElement("div");c.className="renuvex-pr-hero-info";var x=document.createElement("div");x.className="renuvex-pr-hero-rating-col";var s=document.createElement("span");s.className="renuvex-pr-hero-avg",s.textContent=a,x.appendChild(s);var o=document.createElement("div");o.className="renuvex-pr-hero-meta-row";var g=document.createElement("span");g.className="renuvex-pr-hero-stars",g.innerHTML=we(a,t),o.appendChild(g);var v=document.createElement("div");v.className="renuvex-pr-hero-count",v.textContent=n.toLocaleString("tr-TR")+" Yorum",o.appendChild(v),x.appendChild(o),c.appendChild(x),u.appendChild(c);var d=X({widget:r,currentOrderBy:i,currentHasImages:p,onWriteClick:Y,onSortChange:l}),m=d.querySelector(".renuvex-pr-filter-wrap"),f=d.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");C.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",f&&C.appendChild(f),m&&C.appendChild(m),u.appendChild(C);var S=X({widget:r,currentOrderBy:i,currentHasImages:p,onWriteClick:Y,onSortChange:l}),b=S.querySelector(".renuvex-pr-filter-wrap"),k=S.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");return w.className="renuvex-pr-hero-write-row",k&&w.appendChild(k),b&&w.appendChild(b),u.appendChild(w),u}var vr={classic:Lr,compact:Pr,split:Nr,minimal:Ar,hero:Rr};function cr(e){return vr[e]||vr.classic}function It(){return Object.keys(vr).map(function(e){return vr[e].css||""}).join(`
`)}var Br={};ge(Br,{css:()=>La,meta:()=>Ta,render:()=>Pa});function Ye(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi",n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var p=document.createElement("span");return p.className="renuvex-pr-read-more renuvex-pr-reply-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",t.appendChild(p),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(p.style.display="inline",typeof r=="function")p.onclick=r;else{var l=!1;p.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),p.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Ta={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},La="";function Pa(e,r){var t=document.createElement("div");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ce(e.rating,N),a.appendChild(i);var p=document.createElement("span");if(p.className="renuvex-pr-date",p.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(p),t.appendChild(n),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-author",u.textContent=e.author||"",t.appendChild(u);var c=(e.comment||"").trim();if(c){var x=document.createElement("div");x.className="renuvex-pr-body renuvex-pr-body-clamped",x.textContent=c,t.appendChild(x);var s=document.createElement("span");s.className="renuvex-pr-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",t.appendChild(s),requestAnimationFrame(function(){if(x.scrollHeight>x.clientHeight+2){s.style.display="inline";var d=!1;s.onclick=function(){d=!d,x.classList.toggle("renuvex-pr-body-clamped",!d),s.textContent=d?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var o=ke(e);if(o.length){var g=document.createElement("div");g.className="renuvex-pr-gallery",o.forEach(function(d){var m=document.createElement("img"),f=re(d,D);m.src=f.src,m.srcset=f.srcset,m.loading="lazy",m.decoding="async",m.width=D,m.height=D,m.className="renuvex-pr-img",te(m),m.setAttribute("data-renuvex-img-url",d),(function(C){m.onclick=function(){ne(e,C,r)}})(d),g.appendChild(m)}),t.appendChild(g)}var v=Ye(e.merchantReply);return v&&t.appendChild(v),t}var Ir={};ge(Ir,{css:()=>Aa,meta:()=>Na,render:()=>Ra});var Mt=`
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
`;var Na={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Aa=Mt;function Ra(e,r){var t=ke(e),n=t.length>0,a=document.createElement("div");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var p=document.createElement("span");p.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",p.innerHTML=ce(e.rating,N),i.appendChild(p);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var u=document.createElement("span");u.className="renuvex-pr-date renuvex-pr-review-list-author-date",u.textContent=me(e.createdAt),i.appendChild(u),a.appendChild(i);var c=document.createElement("div");if(c.className="renuvex-pr-review-list-content",e.title){var x=document.createElement("div");x.className="renuvex-pr-review-list-title",x.textContent=e.title,c.appendChild(x)}var s=(e.comment||"").trim();if(s){var o=document.createElement("div");o.className="renuvex-pr-review-list-body renuvex-pr-body-clamped",o.textContent=s,c.appendChild(o);var g=document.createElement("span");g.className="renuvex-pr-read-more",g.textContent="Devam\u0131n\u0131 oku",g.style.display="none",c.appendChild(g),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2){g.style.display="inline";var m=!1;g.onclick=function(){m=!m,o.classList.toggle("renuvex-pr-body-clamped",!m),g.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var v=Ye(e.merchantReply);if(v&&c.appendChild(v),a.appendChild(c),n){var d=document.createElement("div");d.className="renuvex-pr-review-list-media",t.forEach(function(m){var f=document.createElement("img"),C=re(m,D);f.src=C.src,f.srcset=C.srcset,f.loading="lazy",f.decoding="async",f.width=D,f.height=Math.round(D*4/3),f.setAttribute("data-renuvex-img-url",m),te(f),(function(S){f.onclick=function(){ne(e,S,r)}})(m),d.appendChild(f)}),a.appendChild(d)}return a}var Mr={};ge(Mr,{css:()=>Ia,meta:()=>Ba,render:()=>Ma});var Ft=`
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
`;var Ba={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ia=Ft;function Ma(e,r){var t=er(e),n=!!t,a=document.createElement("div");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var p=document.createElement("span");if(p.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",p.innerHTML=ce(e.rating,N),i.appendChild(p),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-review-gallery-author",u.textContent=e.author||"",i.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-review-gallery-date",c.textContent=me(e.createdAt),i.appendChild(c);var x=(e.comment||"").trim();if(x){var s=document.createElement("div");s.className="renuvex-pr-review-gallery-body renuvex-pr-body-clamped",s.textContent=x,i.appendChild(s);var o=document.createElement("span");o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",o.style.cursor="pointer";var g=!1;o.onclick=function(){if(t){ne(e,t,r);return}g=!g,s.classList.toggle("renuvex-pr-body-clamped",!g),o.textContent=g?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},i.appendChild(o),requestAnimationFrame(function(){s.scrollHeight>s.clientHeight+2&&(o.style.display="inline")})}if(a.appendChild(i),n){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var d=document.createElement("img"),m=re(t,rr);d.src=m.src,d.srcset=m.srcset,d.loading="lazy",d.decoding="async",d.width=rr,d.height=Math.round(rr*4/3),te(d),d.setAttribute("data-renuvex-img-url",t),d.onclick=function(){ne(e,t,r)},v.appendChild(d),a.appendChild(v)}var f=Ye(e.merchantReply,t?function(){ne(e,t,r)}:null);return f&&(f.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(f)),a}var mr={card:Br,list:Ir,gallery:Mr};function Ke(e){return mr[e]||mr.card}function Ot(){return Object.keys(mr).map(function(e){return mr[e].css||""}).join(`
`)}function Ae(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function Fa(){return document.querySelector('[data-renuvex-widget="reviews"]')}function Oa(e){var r=e||{};if(lr(r))return{avg:null,totalCount:0};var t=r.data||{},n=t.totalCount||0,a=t.allCount||0,i=t.avgRating||"0.0",p=t.reviews||[];if(!t.ratingCounts&&p.length>0){var l=p.reduce(function(u,c){return u+c.rating},0);i=(l/p.length).toFixed(1)}return{avg:a>0?i:null,totalCount:n}}function _a(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=nr({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),ir(t,{surface:"reviews",productId:r||""}),t}var _t={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Ht={small:80,medium:110,large:140};function Ha(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Ya(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",p=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",u=r.barCountColor||"#111111",c=Ae(p,.06),x=r.reviewStarColor||"#f59e0b",s=r.btnBgColor||"#111111",o=r.btnTextColor||"#ffffff",g=r.btnBorderColor||"#111111",v=r.filterBtnBgColor||"#111111",d=r.filterBtnTextColor||"#ffffff",m=r.filterBtnBorderColor||"#111111",f=r.filterMenuBgColor||"#ffffff",C=r.filterMenuBorderColor||"#e5e7eb",S=r.filterItemTextColor||"#111111",b=r.filterItemHoverBgColor||"#f3f4f6",k=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",h=r.reviewAuthorColor||"#111111",z=r.reviewDateColor||"#5e5e5e",T=r.reviewBodyColor||"#111111",E=r.reviewBorderColor||"#e5e7eb",y=r.replyBgColor||"#f9fafb",L=r.replyBorderColor||"#747474",R=r.replyLabelColor||"#111111",P=r.replyTextColor||"#111111",B=r.photoTitleColor||"#111111",J=Ae("#111111",.05),oe=r.photoArrowBgColor||"#ffffff",le=r.photoArrowTextColor||"#111111",q=Ae("#111111",.12),_=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Re=r.formSecondaryTextColor||"#3b3b3b",je=r.inputTextColor||F,H=r.inputBorderColor||"#d1d5db",Se=r.placeholderColor||"#9ca3af",pe=r.formStepBarColor||"#111111",de=r.formBtnBgColor||"#111111",j=r.formBtnTextColor||"#ffffff",Z=r.formBtnBorderColor||"#111111",ue=Ae(de,.06),$=Ae(de,.18),De=Ae(j,.85),fe=Ae(F,.06),Q=r.loadMoreBgColor||"#ffffff",ee=r.loadMoreTextColor||"#111111",se=r.loadMoreBorderColor||"#111111",O={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":p,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":u,"--renuvex-pr-bar-hover-bg":c,"--renuvex-pr-btn-bg":s,"--renuvex-pr-btn-text":o,"--renuvex-pr-btn-border":g,"--renuvex-pr-filter-btn-bg":v,"--renuvex-pr-filter-btn-text":d,"--renuvex-pr-filter-btn-border":m,"--renuvex-pr-filter-menu-bg":f,"--renuvex-pr-filter-menu-border":C,"--renuvex-pr-filter-item-text":S,"--renuvex-pr-filter-item-hover-bg":b,"--renuvex-pr-filter-item-active":k,"--renuvex-pr-review-title":w,"--renuvex-pr-review-author":h,"--renuvex-pr-review-date":z,"--renuvex-pr-review-body":T,"--renuvex-pr-review-border":E,"--renuvex-pr-review-star-color":x,"--renuvex-pr-reply-bg-color":y,"--renuvex-pr-reply-border":L,"--renuvex-pr-reply-label":R,"--renuvex-pr-reply-text":P,"--renuvex-pr-photo-title":B,"--renuvex-pr-photo-image-border":J,"--renuvex-pr-photo-arrow-bg":oe,"--renuvex-pr-photo-arrow-text":le,"--renuvex-pr-photo-arrow-border":q,"--renuvex-pr-fwizard-bg":_,"--renuvex-pr-fwizard-text":F,"--renuvex-pr-fwizard-secondary-text":Re,"--renuvex-pr-fwizard-input-bg":_,"--renuvex-pr-fwizard-input-text":je,"--renuvex-pr-fwizard-input-border":H,"--renuvex-pr-fwizard-placeholder":Se,"--renuvex-pr-fwizard-close-text":F,"--renuvex-pr-fwizard-close-hover-bg":fe,"--renuvex-pr-fwizard-progress-bg":fe,"--renuvex-pr-fwizard-progress-active":pe,"--renuvex-pr-fwizard-btn-bg":de,"--renuvex-pr-fwizard-btn-text":j,"--renuvex-pr-fwizard-btn-border":Z,"--renuvex-pr-fwizard-btn-disabled-bg":$,"--renuvex-pr-fwizard-btn-disabled-text":De,"--renuvex-pr-fwizard-nav-hover-bg":ue,"--renuvex-pr-load-more-bg":Q,"--renuvex-pr-load-more-text":ee,"--renuvex-pr-load-more-border":se};Object.keys(O).forEach(function(ve){e.style.setProperty(ve,O[ve])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function Ce(e,r,t,n,a,i,p){if(Kr){Qe({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:p});return}$e(!0),Yr(e),jr(r),p!==void 0&&Dr(p),Vr(n),a&&We(a),i&&Le(i),t!=null&&Wr(t);try{let xr=function(A,M){if(!(!A||!A.meta||!A.meta.sizeOverrides)){var I=A.meta.sizeOverrides[M];I&&Object.keys(I).forEach(function(U){o.style.setProperty(U,I[U])})}};var ja=xr,l=cr(r.summaryLayout),u=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),c=r.showTitle!==!1,x=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",s=u&&c?x:"",o=document.documentElement;Ya(o,r),Qr("#111111",ft+It()+Ot());var g=r.borderRadius!==void 0?r.borderRadius:8,v=_t[r.size]||_t.medium,d=Ht[r.thumbnailSize]||Ht.medium,m=Ke(r.reviewLayout);if(m.meta&&m.meta.sizeOverrides&&m.meta.sizeOverrides[r.size]){var f=m.meta.sizeOverrides[r.size],C=f["--renuvex-pr-list-photo-w"]||f["--renuvex-pr-gallery-photo-w"];C&&(d=parseInt(C))}o.style.setProperty("--renuvex-pr-title-size",v.titleSize+"px"),o.style.setProperty("--renuvex-pr-review-text-size",v.reviewTextSize+"px"),o.style.setProperty("--renuvex-pr-review-title-size",v.reviewTitleSize+"px"),o.style.setProperty("--renuvex-pr-author-size",v.authorSize+"px"),o.style.setProperty("--renuvex-pr-reply-name-size",v.replyNameSize+"px"),o.style.setProperty("--renuvex-pr-reply-text-size",v.replyTextSize+"px"),o.style.setProperty("--renuvex-pr-radius",g+"px"),o.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,g-4)+"px"),o.style.setProperty("--renuvex-pr-photo-title-size",v.photoTitleSize+"px"),o.style.setProperty("--renuvex-pr-avg-rating-size",v.avgRatingSize+"px"),o.style.setProperty("--renuvex-pr-review-count-size",v.reviewCountSize+"px"),o.style.setProperty("--renuvex-pr-compact-count-size",v.compactCountSize+"px"),o.style.setProperty("--renuvex-pr-recommend-size",v.recommendSize+"px"),o.style.setProperty("--renuvex-pr-btn-text-size",v.btnTextSize+"px"),o.style.setProperty("--renuvex-pr-bar-label-size",v.barLabelSize+"px"),o.style.setProperty("--renuvex-pr-minimal-avg-size",v.minimalAvgSize+"px"),o.style.setProperty("--renuvex-pr-hero-avg-size",v.heroAvgSize+"px"),o.style.setProperty("--renuvex-pr-bar-count-size",v.barCountSize+"px"),o.style.setProperty("--renuvex-pr-review-date-size",v.reviewDateSize+"px"),o.style.setProperty("--renuvex-pr-filter-text-size",v.filterTextSize+"px"),o.style.setProperty("--renuvex-pr-load-more-size",v.loadMoreSize+"px"),o.style.setProperty("--renuvex-pr-read-more-size",v.readMoreSize+"px"),o.style.setProperty("--renuvex-pr-thumbnail-size",d+"px");var S=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--renuvex-pr-review-star-color",S),o.style.setProperty("--renuvex-pr-star-size",v.reviewStarSize+"px"),o.style.setProperty("--renuvex-pr-avg-star-size",v.avgStarSize+"px"),xr(cr(r.summaryLayout),r.size),xr(Ke(r.reviewLayout),r.size);var b=Ge(r);try{var k=Oa(t);Sr(k.avg,k.totalCount,n,hr,b,K)}catch(A){try{console.error("[renuvex-pr] rating badge inject error:",A)}catch(M){}}var w=Fa();if(!w)return;var h=_a(w,e),z=document.getElementById("renuvex-reviews");if(z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==h&&h.appendChild(z),r.enabled===!1){z.style.minHeight="auto",z.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',$e(!1);var T=Ze;Qe(null),T&&Ce(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}z.innerHTML='<p class="renuvex-pr-state-msg renuvex-pr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var E=t||{},y=lr(E),L=y?[]:E.data&&E.data.reviews||[];qr(L);var R=z.cloneNode(!1);z.parentNode.replaceChild(R,z),z=R;var P=document.createElement("div");if(P.id="renuvex-reviews-widget",P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),s){var B=document.createElement("div"),J=r.summaryLayout||"classic";B.className="renuvex-pr-title renuvex-pr-title-"+J,B.textContent=s,P.appendChild(B)}if(y){P.appendChild(Ha(E.message,async function(){var A=await Ne(K,Te,1,Be,Ie);await Ce(K,N,A,Me,Te,1,hr)})),z.appendChild(P),Ve(P,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var oe=E.data&&E.data.allCount||0,le=E.data&&E.data.ratingCounts||null,q=le||[0,0,0,0,0],_=E.data&&E.data.avgRating||"0.0";if(!le&&L.length>0){L.forEach(function(A){A.rating>=1&&A.rating<=5&&q[A.rating-1]++});var F=L.reduce(function(A,M){return A+M.rating},0);_=(F/L.length).toFixed(1)}if(oe>0){var Re=cr(r.summaryLayout),je=Re.render({widget:P,data:E,settings:r,iconPair:b,allCount:oe,ratingCounts:q,avgRatingVal:_,currentRatingFilter:Be,currentOrderBy:Te,currentHasImages:Ie,onFilterChange:async function(A){var M=Be===A?null:A;Je(M),Le(1);var I=await Ne(K,Te,1,M,Ie);await Ce(K,N,I,Me,Te,1)},onSortChange:async function(A,M){Le(1);var I=A,U=!1;M&&(U=!0,I="newest"),Hr(U),We(I);var fr=await Ne(K,I,1,Be,U);await Ce(K,N,fr,Me,I,1)}});P.appendChild(je)}else{var H=document.createElement("button");H.className="renuvex-pr-write-btn",H.style.cssText="display:block;margin:16px auto 0;",H.textContent=r.writeButtonText||"Yorum Yap",H.onclick=Y,P.appendChild(H)}var Se=(_r||[]).filter(function(A){return ke(A).length>0});if(r.showPhotoGallery!==!1&&!Ie&&Se.length>0){var pe=document.createElement("div");if(pe.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var de=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",j=document.createElement("div");j.className="renuvex-pr-photo-title",j.textContent=de,pe.appendChild(j)}var Z=r.reviewLayout==="card"?"1/1":"3/4";o.style.setProperty("--renuvex-pr-photo-thumb-aspect",Z);var ue=document.createElement("div");ue.className="renuvex-pr-photo-strip";var $=D,De=r.reviewLayout==="card"?D:Math.round(D*4/3),fe=0;Se.forEach(function(A){if(!(fe>=15)){var M=er(A);if(M){var I=document.createElement("img"),U=re(M,D);I.src=U.src,I.srcset=U.srcset,I.loading=fe<3?"eager":"lazy",I.decoding="async",I.width=$,I.height=De,I.className="renuvex-pr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",te(I),(function(fr,Yt){I.onclick=function(){ne(Yt,fr,Se)}})(M,A),ue.appendChild(I),fe++}}});var Q=document.createElement("button");Q.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev",Q.innerHTML="&#8249;",Q.setAttribute("aria-label","\xD6nceki"),Q.onclick=function(){ue.scrollBy({left:-200,behavior:"smooth"})};var ee=document.createElement("button");ee.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next",ee.innerHTML="&#8250;",ee.setAttribute("aria-label","Sonraki"),ee.onclick=function(){ue.scrollBy({left:200,behavior:"smooth"})};var se=document.createElement("div");se.className="renuvex-pr-photo-strip-wrap",se.appendChild(Q),se.appendChild(ue),se.appendChild(ee),pe.appendChild(se),P.appendChild(pe)}if(L.length===0){var O=document.createElement("p");O.className="renuvex-pr-state-msg",O.textContent="Hen\xFCz yorum yok.",P.appendChild(O)}else{var m=Ke(r.reviewLayout);L.forEach(function(M){P.appendChild(m.render(M,br))})}var ve=E.data&&E.data.hasMore;if(ve){var V=document.createElement("button");V.className="renuvex-pr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var A=Or+1,M=await Ne(K,Te,A,Be,Ie);if(M&&!lr(M)&&M.data&&Array.isArray(M.data.reviews)){Ur(M.data.reviews),Le(A);var I=Ke(N.reviewLayout);M.data.reviews.forEach(function(U){P.insertBefore(I.render(U,br),V)}),M.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},P.appendChild(V)}z.appendChild(P),Ve(P,"reviews-widget",{productId:e||""})}catch(A){console.error("[renuvex-pr] render error:",A),z.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if($e(!1),Ze){var Ee=Ze;Qe(null),Ce(Ee.productId,Ee.settings,Ee.reviewsData,Ee.productName,Ee.orderBy,Ee.page,Ee.badgeSettings)}}}export{Ce as a,or as b,lr as c,Ne as d,Vt as e,Ka as f};
