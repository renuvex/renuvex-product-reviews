/* ikas Reviews Widget — built 2026-05-09T16:14:05.224Z | theme: default */
"use strict";(()=>{var Oi=Object.defineProperty;var xe=(e,r)=>{for(var i in r)Oi(e,i,{get:r[i],enumerable:!0})};var Hi=typeof document!="undefined",Ir=Hi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,sr=Ir?Ir.src:"",Fi=new URLSearchParams(sr.split("?")[1]||""),D=Fi.get("publicApiKey"),ee=sr?sr.split("?")[0].replace(/\/widget\.js$/,""):"";var le="newest",qe=1,Te=null,Le=!1,re=null,L=null,dr=null,we=null,cr=null;function Be(e){le=e}function Ae(e){qe=e}function Ze(e){Te=e}function pr(e){Le=e}function _r(e){re=e}function Br(e){L=e}function Rr(e){dr=e}function Pr(e){we=e}function Mr(e){cr=e}var mr=!1,De=null;function Xe(e){mr=e}function Je(e){De=e}var B={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},je={},Ye=null;function Or(e){Ye=e}var Hr={};function Ge(e){try{return sessionStorage.getItem(e)}catch(r){return Hr[e]||null}}function R(e,r){try{sessionStorage.setItem(e,r)}catch(i){Hr[e]=r}}var ve="0 -960 960 960",se={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function $e(e){return'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Fr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+se.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+se.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+se.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+se.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+se.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+se.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ve+'" fill="currentColor" opacity="0.35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+se.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+se.starFill+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+ve+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+se.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+ve+'" fill="none" stroke="currentColor" stroke-width="80" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+se.heartRounded+'"/></g></svg>'}}}};function qi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Ve(e,r){var i=Fr[e]||Fr.star,a=i.styles;return a[r]||a[Object.keys(a)[0]]}function Ne(e){var r=e&&e.reviewIcon||"star",i=qi(r),a=i.style||e&&e.reviewIconStyle||"classic";return Ve(i.type,a)}function Dr(e,r,i){for(var a=Math.round(parseFloat(e))||0,t=Ne(r),n=i&&i.sizePx,d=n?"width:"+n+"px;height:"+n+"px;":"",o="",s=1;s<=5;s++){var c=s<=a;o+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+d+'">'+(c?t.filled:t.empty)+"</span>"}return o}var Qe={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},qr={lines:{label:"\xC7izgili",svg:$e(Qe.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:$e(Qe.linesAlt)},funnel:{label:"Huni",svg:$e(Qe.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:$e(Qe.dense)}};function jr(e){var r=qr[e]||qr.lines;return r.svg}var Di="var(--ikr-review-star-color,#f59e0b)";var er=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function O(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ke(e,r){var i="color:"+Di+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Dr(e,r)+"</span>"}function de(e,r,i){for(var a=Math.max(0,Math.min(5,parseFloat(e)||0)),t=Math.floor(a),n=a-t,d=n<.25?t:n<.75?t+.5:t+1,o=i&&i.sizeStyle||"",s="",c=1;c<=5;c++){var m=c<=d?"full":c-.5===d?"half":"empty";m==="full"?s+='<span class="ikr-star ikr-star-full" style="'+o+'">'+r.filled+"</span>":m==="empty"?s+='<span class="ikr-star ikr-star-empty" style="'+o+'">'+r.empty+"</span>":s+='<span class="ikr-star ikr-star-half" style="'+o+'"><span class="ikr-star-half-bg">'+r.empty+'</span><span class="ikr-star-half-fg">'+r.filled+"</span></span>"}return'<span class="ikr-stars-partial">'+s+"</span>"}function ge(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Yr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r}function K(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function ie(e,r,i){var a=new AbortController,t=setTimeout(function(){a.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:a.signal})).finally(function(){clearTimeout(t)})}function Gr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function ji(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var t=document.createElement("div");t.className="ikr-modal-stars",t.innerHTML=ke(e.rating,L);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ge(e.createdAt),a.appendChild(t),a.appendChild(n),i.appendChild(a);var d=document.createElement("div");d.className="ikr-modal-title",d.textContent=e.title||"",d.style.display=e.title?"":"none",i.appendChild(d);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(s);var c=document.createElement("div");c.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",c.appendChild(m),c.appendChild(p),c.style.display=e.merchantReply?"":"none",i.appendChild(c),r.appendChild(i),r}function Yi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ke(r.rating,L),i.querySelector(".ikr-modal-date").textContent=ge(r.createdAt);var a=i.querySelector(".ikr-modal-title");a.textContent=r.title||"",a.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var t=i.querySelector(".ikr-modal-body");t.textContent=(r.comment||"").trim(),t.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function ur(e,r,i,a,t,n,d,o){var s=e.images&&Array.isArray(e.images)?e.images.filter(function(x){return x&&(x.indexOf("https://")===0||x.indexOf("data:image/")===0)}):[],c=Math.min(i,s.length-1),m=document.createElement("div");m.className="ikr-modal-left";var p=document.createElement("img"),l=d==="next"?"ikr-modal-img-enter-right":d==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(l?" "+l:""),p.src=K(s[c]||""),p.alt="Yorum foto\u011Fraf\u0131",m.appendChild(p);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(x){x.stopPropagation(),n()},m.appendChild(k);var u=0;if(m.addEventListener("touchstart",function(x){u=x.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(x){var S=u-x.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(w)he(e,r,c+1,a,t,n,!0,"next",o);else if(g){var T=a[r+1];he(T,r+1,0,a,t,n,!1,"next",o)}}else if(f)he(e,r,c-1,a,t,n,!0,"prev",o);else if(C){var N=a[r-1],E=(N.images||[]).filter(function(I){return I&&(I.indexOf("https://")===0||I.indexOf("data:image/")===0)});he(N,r-1,E.length-1,a,t,n,!1,"prev",o)}}},{passive:!0}),s.length>1){var v=document.createElement("div");v.className="ikr-modal-thumbs",s.forEach(function(x,S){var T=document.createElement("img");T.src=K(x),T.className="ikr-modal-thumb"+(S===c?" ikr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(S+1),(function(N){T.onclick=function(){he(e,r,N,a,t,n,!0,null,o)}})(S),v.appendChild(T)}),m.appendChild(v)}var f=c>0,w=c<s.length-1,C=r>0,g=r<a.length-1,h=f||C,z=w||g;if(h){var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-prev",y.innerHTML="&#8249;",y.setAttribute("aria-label","\xD6nceki"),y.onclick=function(x){if(x.stopPropagation(),f)he(e,r,c-1,a,t,n,!0,"prev",o);else if(C){var S=a[r-1],T=(S.images||[]).filter(function(N){return N&&N.indexOf("https://")===0});he(S,r-1,T.length-1,a,t,n,!1,"prev",o)}},m.appendChild(y)}if(z){var b=document.createElement("button");b.className="ikr-modal-nav ikr-modal-nav-next",b.innerHTML="&#8250;",b.setAttribute("aria-label","Sonraki"),b.onclick=function(x){if(x.stopPropagation(),w)he(e,r,c+1,a,t,n,!0,"next",o);else if(g){var S=a[r+1];he(S,r+1,0,a,t,n,!1,"next",o)}},m.appendChild(b)}return m}function Vr(e,r){[-1,1].forEach(function(i){var a=r[e+i];if(a){var t=(a.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});t[0]&&(new Image().src=K(t[0]))}})}function he(e,r,i,a,t,n,d,o,s){if(d){var c=ur(e,r,i,a,t,n,o,s);t.firstChild&&t.replaceChild(c,t.firstChild)}else{var c=ur(e,r,i,a,t,n,o,s),m=t.querySelector(".ikr-modal-right");t.firstChild&&t.replaceChild(c,t.firstChild),m&&Yi(m,e);var p=s&&s.querySelector(".ikr-modal-wrap");p&&(p.scrollTop=0)}Vr(r,a)}function ce(e,r,i){var a=(i||[]).filter(function(f){return f.images&&Array.isArray(f.images)&&f.images.some(function(w){return w&&(w.indexOf("https://")===0||w.indexOf("data:image/")===0)})}),t=a.findIndex(function(f){return f===e||f.id===e.id});t===-1&&(t=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(f){return f&&(f.indexOf("https://")===0||f.indexOf("data:image/")===0)}):[],d=Math.max(0,n.indexOf(r)),o=document.createElement("div");o.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var c=!1;function m(){c||(c=!0,Gr(o,p,m))}function p(f){f.key==="Escape"&&l()}function l(){c||(c=!0,history.go(-1),Gr(o,p,m))}document.addEventListener("keydown",p);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),o.onclick=function(){l()},s.onclick=function(f){f.stopPropagation()},s.appendChild(ur(e,t,d,a,s,l,null,o)),s.appendChild(ji(e)),Vr(t,a);var u=document.createElement("div");u.className="ikr-modal-wrap",u.appendChild(s);var v=document.createElement("button");v.className="ikr-modal-close",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(f){f.stopPropagation(),l()},u.appendChild(v),o.appendChild(u),document.body.appendChild(o)}function Ur(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var a=r[i];if(a.children.length===0&&a.textContent.trim()===e&&a.tagName!=="TITLE"&&!a.closest("[data-ikr-listing-badge]")&&!a.closest("#ikas-reviews")&&!a.closest("nav")&&!a.closest("header")&&!a.closest('[class*="breadcrumb"]')&&!a.closest('[aria-label*="breadcrumb"]'))return a}return document.querySelector("h1")}var Kr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Gi(e,r,i,a,t){var n=Ve(r,i),d="width:"+t+"px;height:"+t+"px;";return'<span style="color:'+a+';display:inline-flex;align-items:center;line-height:1;">'+de(e,n,{sizeStyle:d})+"</span>"}function Wr(e,r,i,a){var t=document.getElementById("ikr-rating-badge");if(t&&t.remove(),!!e&&!(a&&a.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var d=document.createElement("script");d.id="ikr-jsonld",d.type="application/ld+json",d.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(d);var o=Ur(i);if(!(!o||!o.parentNode)){var s=a&&a.icon||"star",c=a&&a.iconStyle||"classic",m=a&&a.size||"medium",p=a&&a.color||"#f59e0b",l=Kr[m]||Kr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var u=window.getComputedStyle(o).textAlign,v=u==="center"?"center":u==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+v+";",k.innerHTML=Gi(e,s,c,p,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(f){f.preventDefault();var w=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(w){var C=document.querySelector("header"),g=C?C.getBoundingClientRect().height:0,h=w.getBoundingClientRect().top+window.pageYOffset-g-16;window.scrollTo({top:h,behavior:"smooth"})}},o.parentNode.insertBefore(k,o.nextSibling)}}}var Zr=`
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
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--ikr-header-title,#111111);}
  /* Classic layout basligi ortali \u2014 classic disindaki layout'lar sola yasli */
  .ikr-title-classic{text-align:center;}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

  /* \u2500\u2500\u2500 PARTIAL STARS (bireysel star + clip-path) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her y\u0131ld\u0131z ba\u011F\u0131ms\u0131z .ikr-star kapsay\u0131c\u0131s\u0131nda. Half state'te tek filled
     geometri iki katmanda: alt katman bo\u015F-renk full, \xFCst katman dolu-renk
     + clip-path:inset(0 50% 0 0) ile sol %50. Tek SVG path kullan\u0131ld\u0131\u011F\u0131
     i\xE7in kare/kalp ikonlar\u0131nda bile geometri uyumsuzlu\u011Fu fiziksel olarak
     imk\xE2ns\u0131z. Material UI Rating decimal mode + react-stars pattern. */
  .ikr-stars-partial{display:inline-flex;gap:2px;align-items:center;line-height:1;}
  .ikr-star{
    position:relative;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    line-height:1;
  }
  .ikr-star > svg{width:100%;height:100%;display:block;}
  .ikr-star-full  { color: var(--ikr-review-star-color, #f59e0b); }
  .ikr-star-empty { color: var(--ikr-star-empty-color,  #e5e7eb); }
  /* Half: iki katman, \xFCst katman clip ile sol %50. */
  .ikr-star-half-bg,
  .ikr-star-half-fg{
    position:absolute;
    inset:0;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .ikr-star-half-bg{ color: var(--ikr-star-empty-color, #e5e7eb); }
  .ikr-star-half-fg{
    color: var(--ikr-review-star-color, #f59e0b);
    -webkit-clip-path: inset(0 50% 0 0);
            clip-path: inset(0 50% 0 0);
  }
  .ikr-star-half-bg > svg,
  .ikr-star-half-fg > svg{width:100%;height:100%;display:block;}

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
  .ikr-bar-star-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
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
  .ikr-filter-item{padding:10px 16px;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,#111111);cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,#111111);}

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
  .ikr-stars .ikr-icon-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,#111111);font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,#111111);font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);}
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

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
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
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
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
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:#ffffff;color:#111111;}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,#111111);white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,#111111);line-height:1.6;}

  /* Responsive */
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:transparent;}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:auto;z-index:100000;width:100%;max-width:100%;overscroll-behavior:contain;background:rgba(0,0,0,0.50);}
    .ikr-modal{flex-direction:column;height:auto;min-height:100vh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
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
`;var gr={};xe(gr,{meta:()=>et,render:()=>rt});function Re(e){var r=e.ratingCounts,i=e.allCount,a=e.iconPair,t=e.currentRatingFilter,n=e.onFilterChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var s=r[o-1]||0,c=i>0?Math.round(s/i*100):0,m=t===o,p=document.createElement("div");p.className="ikr-bar-row"+(m?" ikr-bar-active":""),t&&!m&&(p.style.opacity="0.35");for(var l="",k=1;k<=5;k++){var u=k<=o;l+='<span class="ikr-bar-star ikr-icon '+(u?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(u?a.filled:a.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(v){p.onclick=function(){n(v)}})(o),d.appendChild(p)}return d}var pe=[],Xr=!1;function Vi(e){for(var r=pe.length-1;r>=0;r--){var i=pe[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Ui(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function Ki(){Xr||typeof document=="undefined"||(document.addEventListener("click",Vi,!0),document.addEventListener("keydown",Ui),Xr=!0)}function rr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function ir(e){Ki();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var a=pe.indexOf(r);a!==-1&&pe.splice(a,1)}}function te(e){var r=e.widget,i=e.currentOrderBy,a=e.currentHasImages,t=e.onWriteClick,n=e.onSortChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent=L&&L.writeButtonText||"Yorum Yap",o.onclick=t,d.appendChild(o);var s=document.createElement("div");s.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var m=L&&L.filterIcon||"lines";c.innerHTML=jr(m);var p=document.createElement("div");p.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){p.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function u(){rr(v),p.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}l.forEach(function(f){var w=f[2],C=w?a:!a&&(i||"newest")===f[0],g=document.createElement("div");g.className="ikr-filter-item"+(C?" ikr-filter-item-active":""),g.textContent=f[1],g.onclick=function(){k(),n(f[0],w)},p.appendChild(g)}),c.onclick=function(){p.classList.contains("ikr-open")?k():u()};var v=ir({trigger:s,element:p,close:k});return s.appendChild(c),s.appendChild(p),d.appendChild(s),d}function Jr(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true");var t=document.createElement("div");t.className="ikr-fwizard",a.appendChild(t);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',t.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-content",t.appendChild(d);var o=!1,s="",c="";function m(){var g=window.innerWidth-document.documentElement.clientWidth;s=document.body.style.overflow,c=document.body.style.paddingRight,document.body.style.overflow="hidden",g>0&&(document.body.style.paddingRight=g+"px")}function p(){document.body.style.overflow=s,document.body.style.paddingRight=c}function l(){o||(o=!0,document.removeEventListener("keydown",k),a.removeEventListener("click",u),n.removeEventListener("click",l),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),p();try{r()}catch(g){}},200))}function k(g){g.key==="Escape"&&l()}function u(g){g.target===a&&i&&l()}document.addEventListener("keydown",k),a.addEventListener("click",u),n.addEventListener("click",l);function v(g){g&&d.appendChild(g),document.body.appendChild(a),m(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open")})}var f=null,w=null;function C(g,h){if(h=h||"error",f){try{f.remove()}catch(z){}f=null}w&&(clearTimeout(w),w=null),f=document.createElement("div"),f.className="ikr-fwizard-toast ikr-fwizard-toast--"+h,f.textContent=g,t.appendChild(f),w=setTimeout(function(){f&&(f.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(f){try{f.remove()}catch(z){}f=null}},300))},4e3)}return{open:v,close:l,content:d,setAllowOutsideClose:function(g){i=!!g},setStepAttr:function(g){t.setAttribute("data-step",String(g))},showToast:C}}var $r=`
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
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
    /* Aktiflik efekti kald\u0131r\u0131ld\u0131, border rengi sabit kal\u0131r */
  }
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
       - SVG: getIconFromSettings (icons.js, currentSettings.reviewIcon)
       - Renk: --ikr-review-star-color (admin "Y\u0131ld\u0131z Rengi")
     Empty color uses --ikr-star-empty-color, shared with review and bar stars. */
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
    color:var(--ikr-star-empty-color, #e5e7eb);
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
`;var fr=4;function Pe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Qr(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(t){try{t(i)}catch(n){}})}return{get:function(){return i},set:function(t){Object.assign(i,t),a()},goNext:function(){i.currentStep<fr&&(i.currentStep+=1,a())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,a())},onChange:function(t){return r.push(t),function(){r=r.filter(function(n){return n!==t})}}}}var Wi='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function ei(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],a=e.onBack||function(){},t=e.onSkip||function(){},n=e.onNext||function(){},d=document.createElement("div");d.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=Wi+"<span>Geri</span>",o.addEventListener("click",function(){a()}),d.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-footer-progress";for(var c=[],m=0;m<fr;m++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",s.appendChild(p),c.push(p)}d.appendChild(s);var l=document.createElement("button");l.type="button";var k=null;function u(f){k&&l.removeEventListener("click",k),k=f,f&&l.addEventListener("click",f)}d.appendChild(l);function v(f,w){var C=r.indexOf(f)!==-1,g=i.indexOf(f)!==-1,h=w&&(w.images&&w.images.length>0||w.pendingImages&&w.pendingImages.length>0);if(C)f===2&&h?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",u(function(){n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",u(function(){t()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(g){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var z=Pe(f,w);l.disabled=!z,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!z),u(function(){l.disabled||n()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,u(null)}return{el:d,update:function(f,w){c.forEach(function(g,h){h+1<=f?g.classList.add("ikr-fwizard-progress-seg-active"):g.classList.remove("ikr-fwizard-progress-seg-active")});var C=f<=1;o.style.visibility=C?"hidden":"",o.style.pointerEvents=C?"none":"",o.tabIndex=C?-1:0,v(f,w)},setNextDisabled:function(f){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!f,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){o.style.visibility="hidden",s.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),u(f)}}}function ri(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,t=document.createElement("div");t.className="ikr-fwizard-step-title",t.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-stars",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var d=Ne(L||{}),o=[];function s(p){o.forEach(function(l,k){var u=k<p;l.classList.toggle("ikr-fwizard-star-active",u),l.innerHTML=u?d.filled:d.empty})}for(var c=1;c<=5;c++)(function(p){var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-star",l.setAttribute("role","radio"),l.setAttribute("aria-label",p+" y\u0131ld\u0131z"),l.innerHTML=d.empty,l.addEventListener("mouseenter",function(){s(p)}),l.addEventListener("mouseleave",function(){s(e.get().rating)}),l.addEventListener("click",function(){a||(a=!0,e.set({rating:p}),s(p),setTimeout(function(){var k=!r.canNavigate||r.canNavigate();k&&e.goNext()},400))}),o.push(l),n.appendChild(l)})(c);s(e.get().rating);var m=function(){d=Ne(L||{}),s(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",m),i.appendChild(n),{el:i,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",m)}}}var vr=3,Zi=10*1024*1024;function ii(e,r){r=r||{};var i=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-photo-card";var o=document.createElement("label");o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",o.appendChild(s),d.appendChild(o);var c=document.createElement("div");c.className="ikr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),d.appendChild(c),a.appendChild(d);var m=r.blobMap||{},p=r.urlToFinger||{};function l(){if(!i){var g=e.get().images||[],h=e.get().pendingImages||[],z=g.map(function(y){return{url:y,isPending:!1}}).concat(h.map(function(y){return{url:y.url,file:y.file,isPending:!0,error:y.error}}));c.innerHTML="",z.forEach(function(y){var b=m[y.url]||y.url,x=k(y,b);c.appendChild(x)}),w()}}function k(g,h){var z=document.createElement("div");z.className="ikr-fwizard-photo-thumb",z.innerHTML='<img src="'+h+'" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';var y=document.createElement("div");y.className="ikr-fwizard-photo-loading",y.style.display="none",z.appendChild(y);var b=document.createElement("button");return b.type="button",b.className="ikr-fwizard-photo-remove",b.innerHTML="&#x2715;",z.appendChild(b),u(z,g,h),z}function u(g,h,z){var y=g.querySelector("img");y.src!==z&&(y.src=z);var b=g.querySelector(".ikr-fwizard-photo-loading");h.isPending&&h.error?(b.style.display="flex",b.innerHTML='<span class="ikr-upload-error">\u2717 '+h.error+"</span>"):b.style.display="none";var x=g.querySelector(".ikr-fwizard-photo-remove");x.onclick=function(){var S=p[h.url]||(h.file?h.file.name+"_"+h.file.size:null);if(h.url.startsWith("blob:")&&URL.revokeObjectURL(h.url),S){var T=(e.get().fingerprints||[]).filter(function(I){return I!==S});e.set({fingerprints:T})}if(h.isPending){var N=(e.get().pendingImages||[]).filter(function(I){return I.url!==h.url});e.set({pendingImages:N})}else{var E=(e.get().images||[]).filter(function(I){return I!==h.url});e.set({images:E})}}}var v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',f='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function w(){var g=(e.get().images||[]).length,h=(e.get().pendingImages||[]).length,z=g+h,y=z>=vr,b=h>0;z>0?(d.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=f):(d.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=v+"<span>Foto\u011Fraf Ekle</span>"),y?(o.style.display="none",s.disabled=!0):(o.style.display="flex",s.disabled=b,o.classList.toggle("ikr-fwizard-photo-add--disabled",b),o.appendChild(s))}s.onchange=async function(g){var h=Array.from(g.target.files).slice(0,vr-(e.get().images||[]).length);s.value="";var z=(e.get().pendingImages||[]).length;if(!(z>0)){var y=e.get().images||[],b=y.length,x=vr-y.length;if(h.length!==0){for(var S=[],T=[],N=0;N<h.length;N++){var E=h[N],I=E.name+"_"+E.size,W=(e.get().fingerprints||[]).some(function(P){return P===I})||S.some(function(P){return P.file.name+"_"+P.file.size===I});if(W){console.log("[ikr] Duplicate file detected, skipping:",E.name);continue}if(E.size>Zi){var Z="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(Z,"error"):alert(Z);continue}var X=URL.createObjectURL(E);p[X]=I,S.push({url:X,file:E,error:null}),T.push({url:X,file:E});var me=(e.get().fingerprints||[]).slice();me.push(I),e.set({fingerprints:me})}if(S.length!==0){var ae=(e.get().pendingImages||[]).concat(S),ne=async function(){for(var P=0;P<T.length;P++){var Y=T[P],_e=Y.file,F=Y.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Fe=(e.get().pendingImages||[]).filter(function($){return $.url!==F}),ye=(e.get().images||[]).slice();ye.push(F),e.set({pendingImages:Fe,images:ye});continue}try{var Ce=await ie(ee+"/api/public/upload/sign",{method:"POST"});if(!Ce.ok)throw Ce.status===429?new Error("rate_limit"):new Error("sign failed");var q=await Ce.json(),V=new FormData;V.append("file",_e),V.append("api_key",q.api_key),V.append("timestamp",q.timestamp),V.append("signature",q.signature),V.append("folder","review_images");var ue=await fetch("https://api.cloudinary.com/v1_1/"+q.cloud_name+"/image/upload",{method:"POST",body:V}),U=await ue.json();if(U.secure_url){var fe=(e.get().pendingImages||[]).some(function($){return $.url===F});if(!fe){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}m[U.secure_url]=F,p[U.secure_url]=p[F];var Se=(e.get().pendingImages||[]).filter(function($){return $.url!==F}),Ee=(e.get().images||[]).slice();Ee.push(U.secure_url),e.set({pendingImages:Se,images:Ee})}}catch($){console.error("[ikr] Image upload failed:",$);var M=$.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(M,"error");var J=(e.get().pendingImages||[]).map(function(Q){return Q.url===F?{url:Q.url,file:Q.file,error:M}:Q});e.set({pendingImages:J})}}};if(b===0){i=!0;var j=!r.canNavigate||r.canNavigate();j&&e.goNext()}e.set({pendingImages:ae}),ne()}}}};var C=e.onChange(l);return l(),{el:a,destroy:function(){i=!0,s.onchange=null,C&&C()}}}var kr=2e3,Xi=60;function ti(e,r){r=r||{};var i=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Deneyiminizi anlat\u0131n",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var d=document.createElement("input");d.type="text",d.className="ikr-fwizard-input",d.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",d.maxLength=Xi,d.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),d.value=e.get().title||"",d.addEventListener("input",function(){e.set({title:d.value})}),n.appendChild(d);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=kr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",n.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-char-counter",s.setAttribute("aria-live","polite"),n.appendChild(s);function c(){var p=o.value.length;s.textContent=p+"/"+kr,s.classList.toggle("ikr-fwizard-char-counter--max",p>=kr)}function m(){return Pe(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),c(),i(m())}),a.appendChild(n),c(),setTimeout(function(){i(m())},0),{el:a,destroy:function(){}}}var Ji=40;function ai(e,r){r=r||{};var i=r.onValidityChange||function(){},a=r.onSuccess||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",t.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var s=document.createElement("label");s.className="ikr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.maxLength=Ji,c.setAttribute("aria-required","true"),c.value=e.get().author||"",o.appendChild(s),o.appendChild(c),d.appendChild(o);var m=document.createElement("div");m.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",m.appendChild(p),m.appendChild(l),d.appendChild(m);var k=document.createElement("div");k.className="ikr-fwizard-notice",k.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",d.appendChild(k);var u=document.createElement("div");u.className="ikr-fwizard-msg",u.setAttribute("role","alert"),u.setAttribute("aria-live","assertive"),d.appendChild(u);var v=document.createElement("button");v.type="button",v.className="ikr-fwizard-submit-btn",v.textContent="G\xF6nder",d.appendChild(v),t.appendChild(d);function f(){return Pe(4,e.get())}function w(){var g=!f(),h=(e.get().pendingImages||[]).length,z=h>0;z?(v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled"),v.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(v.disabled=g,v.classList.toggle("ikr-fwizard-submit-btn--disabled",g),v.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),w(),i(f())}),l.addEventListener("input",function(){e.set({email:l.value})}),w(),setTimeout(function(){i(f())},0),v.onclick=async function(){if(!v.disabled){var g=e.get(),h=(g.author||"").trim(),z=(g.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!h){u.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!g.rating){u.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled");var y=v.textContent;if(v.textContent="G\xF6nderiliyor\u2026",u.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var b=O(window.location.href),x=g.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),S=await ie(ee+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:D,productId:g.productId||null,slug:b||null,productName:x,author:h,title:(g.title||"").trim()||null,comment:z||null,rating:g.rating,images:g.images||[]})},15e3);if(S.ok)a();else{var T=await S.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(I){var N=I&&(I.name==="AbortError"||/signal/i.test(I.message||"")),E=N?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":I.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(E,"error"):u.innerHTML='<div class="ikr-fwizard-msg-error">'+E+"</div>",v.disabled=!1,v.classList.remove("ikr-fwizard-submit-btn--disabled"),v.textContent=y}}};var C=e.onChange(w);return{el:t,destroy:function(){v.onclick=null,C&&C()}}}var ni=!1;function $i(){if(!ni){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=$r,document.head.appendChild(e),ni=!0}}function Qi(e,r,i){if(i=i||{},e===1)return ri(r,{canNavigate:i.canNavigate});if(e===2)return ii(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return ti(r,{onValidityChange:i.onValidityChange});if(e===4)return ai(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function oi(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function li(e){e=e||{},$i();var r=Qr({productId:e.productId,productName:e.productName}),i={},a={},t=Jr({onClose:function(){window.removeEventListener("popstate",d),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(y){var b=i[y];b&&b.startsWith("blob:")&&URL.revokeObjectURL(b)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),n={ikrReviewModal:!0};window.history.pushState(n,null,"");var d=function(y){t&&t.close&&t.close()};window.addEventListener("popstate",d);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var s=ei({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="ikr-fwizard-layout",c.appendChild(o),c.appendChild(s.el);var m=null,p="idle",l=null,k=!0,u=null;function v(y,b){o.innerHTML="";var x=Qi(y,r,{canNavigate:function(){return p==="idle"},blobMap:i,urlToFinger:a,onValidityChange:function(N){s.setNextDisabled(!N)},onSuccess:w,showToast:t.showToast});if(m=x,s.update(y,r.get()),b){p="entering",x.el.classList.add("ikr-fwizard-step--enter");var S=null,T=function(){S&&clearTimeout(S),x.el.removeEventListener("animationend",T),x.el.classList.remove("ikr-fwizard-step--enter"),p="idle",l!==null&&C()};x.el.addEventListener("animationend",T),S=setTimeout(T,700)}else p="idle";o.appendChild(x.el),t.setStepAttr&&t.setStepAttr(y),y===3&&s.setNextDisabled(!0)}var f=!1;function w(){if(!f){if(f=!0,!m){o.innerHTML="";var y=oi();y.classList.add("ikr-fwizard-step--enter"),o.appendChild(y),t.setStepAttr("thanks"),s.setThanksState(t.close);return}var b=m;p="exiting",b.el.classList.add("ikr-fwizard-step--exit");var x=function(){if(u&&clearTimeout(u),b.el.removeEventListener("animationend",x),b.destroy)try{b.destroy()}catch(T){}m===b&&(m=null),o.innerHTML="";var S=oi();S.classList.add("ikr-fwizard-step--enter"),o.appendChild(S),t.setStepAttr("thanks"),s.setThanksState(t.close),p="idle"};b.el.addEventListener("animationend",x),u=setTimeout(x,300)}}function C(){var y=r.get().currentStep;if(p!=="idle"){l=y;return}if(!m){var b=!k;k=!1,v(y,b);return}var x=m;p="exiting",x.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(u&&clearTimeout(u),x.el.removeEventListener("animationend",S),x.destroy)try{x.destroy()}catch(N){}if(m===x){o.innerHTML="",m=null;var T=l!==null?l:r.get().currentStep;l=null,v(T,!0),p="idle"}};x.el.addEventListener("animationend",S),u=setTimeout(S,350)}C();var g=r.get().currentStep,h=r.onChange(function(y){y.currentStep!==g?(g=y.currentStep,C()):s.update(y.currentStep,y)}),z=t.close;return t.close=function(){h&&h(),typeof u!="undefined"&&u&&clearTimeout(u),z()},t.open(c),{close:t.close}}function H(){li({productId:re||"",productName:we||""})}var et={id:"classic",name:"Klasik (A\xE7\u0131k)"};function rt(e){var r=e.widget,i=e.data,a=e.settings,t=e.iconPair,n=e.allCount,d=e.ratingCounts,o=e.avgRatingVal,s=e.currentRatingFilter,c=e.currentOrderBy,m=e.currentHasImages,p=e.onFilterChange,l=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var u=(d[3]||0)+(d[4]||0),v=n>0?Math.round(u/n*100):0,f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(f);var w=document.createElement("div");if(w.className="ikr-summary-block ikr-summary-count",w.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(w),a.showRecommendation!==!1&&v>0){var C=document.createElement("div");C.className="ikr-summary-block ikr-summary-recommend",C.innerHTML='<span class="ikr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(C)}return k.appendChild(Re({ratingCounts:d,allCount:n,iconPair:t,currentRatingFilter:s,onFilterChange:p})),k.appendChild(te({widget:r,currentOrderBy:c,currentHasImages:m,onWriteClick:H,onSortChange:l})),k}var hr={};xe(hr,{css:()=>tt,meta:()=>it,render:()=>at});var si=`
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
`;var it={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},tt=si;function at(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,p=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var u=document.createElement("div");u.className="ikr-compact-trigger-wrap";var v=document.createElement("button");v.className="ikr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="ikr-compact-trigger-stars">'+de(d,a)+'</span><span class="ikr-compact-trigger-text">'+t.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',u.appendChild(v),k.appendChild(u);var f=te({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:H,onSortChange:p}),w=f.querySelector(".ikr-filter-wrap"),C=f.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-compact-actions-slot",C&&g.appendChild(C),w&&g.appendChild(w),k.appendChild(g),l.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var z=document.createElement("div");z.className="ikr-compact-panel-inner";var y=document.createElement("div");y.className="ikr-compact-avg",y.innerHTML='<span class="ikr-icon">'+a.filled+"</span><span>"+d+"</span>",z.appendChild(y),z.appendChild(Re({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:o,onFilterChange:m})),h.appendChild(z);var b=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function x(j){var P=j?l:u;h.parentNode!==P&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),P.appendChild(h))}if(x(b?b.matches:!1),b){var S=function(j){x(j.matches)};b.addEventListener?b.addEventListener("change",S):b.addListener&&b.addListener(S)}if(C){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=L&&L.writeButtonText||"Yorum Yap",T.onclick=H;var N=document.createElement("div");N.className="ikr-compact-write-row",N.appendChild(T),l.appendChild(N)}function E(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function I(){rr(W),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){h.classList.contains("ikr-open")?E():I()};var W=null;function Z(j){W&&(W(),W=null),j||(W=ir({trigger:u,element:h,close:E}))}if(Z(b?b.matches:!1),b){var X=function(j){Z(j.matches)};b.addEventListener?b.addEventListener("change",X):b.addListener&&b.addListener(X)}if(i.showRecommendation!==!1){var me=(n[3]||0)+(n[4]||0),ae=t>0?Math.round(me/t*100):0;if(ae>0){var ne=document.createElement("div");ne.className="ikr-summary-block ikr-summary-recommend",ne.style.marginTop="8px",ne.innerHTML='<span class="ikr-recommend-pct">%'+ae+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(ne)}}return l}var br={};xe(br,{css:()=>ot,meta:()=>nt,render:()=>lt});var di=`
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
`;var nt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ot=di;function lt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,p=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+d+"</span>",k.appendChild(u);var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-count ikr-split-left-count",v.textContent=t.toLocaleString("tr-TR")+" Yorum",k.appendChild(v),l.appendChild(k);var f=document.createElement("div");f.className="ikr-split-col ikr-split-mid",f.appendChild(Re({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:o,onFilterChange:m})),l.appendChild(f);var w=te({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:H,onSortChange:p}),C=w.querySelector(".ikr-filter-wrap"),g=w.querySelector(".ikr-write-btn"),h=document.createElement("div");h.className="ikr-split-col ikr-split-right",g&&h.appendChild(g),C&&h.appendChild(C),l.appendChild(h);var z=(n[3]||0)+(n[4]||0),y=t>0?Math.round(z/t*100):0,b=document.createElement("div");b.className="ikr-summary-block ikr-summary-recommend",b.innerHTML='<span class="ikr-recommend-pct">%'+y+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var x=i.showRecommendation===!1||y===0;return x&&b.classList.add("ikr-split-rec-hidden"),k.appendChild(b),l}var yr={};xe(yr,{css:()=>dt,meta:()=>st,render:()=>ct});var ci=`
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
`;var st={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},dt=ci;function ct(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=t,m.appendChild(p);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=de(t,i),m.appendChild(l);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=a.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),c.appendChild(m),s.appendChild(c);var u=te({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:H,onSortChange:o}),v=u.querySelector(".ikr-filter-wrap"),f=u.querySelector(".ikr-write-btn"),w=document.createElement("div");if(w.className="ikr-minimal-actions",f&&w.appendChild(f),v&&w.appendChild(v),s.appendChild(w),f){var C=document.createElement("button");C.className="ikr-write-btn",C.textContent=L&&L.writeButtonText||"Yorum Yap",C.onclick=H;var g=document.createElement("div");g.className="ikr-minimal-write-row",g.appendChild(C),s.appendChild(g)}return s}var xr={};xe(xr,{css:()=>mt,meta:()=>pt,render:()=>ut});var pi=`
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
`;var pt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},mt=pi;function ut(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var m=document.createElement("div");m.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=t,m.appendChild(p);var l=document.createElement("div");l.className="ikr-hero-meta-row";var k=document.createElement("span");k.className="ikr-hero-stars",k.innerHTML=de(t,i),l.appendChild(k);var u=document.createElement("div");u.className="ikr-hero-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",l.appendChild(u),m.appendChild(l),c.appendChild(m),s.appendChild(c);var v=te({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:H,onSortChange:o}),f=v.querySelector(".ikr-filter-wrap"),w=v.querySelector(".ikr-write-btn"),C=document.createElement("div");C.className="ikr-hero-actions ikr-desktop-only",w&&C.appendChild(w),f&&C.appendChild(f),s.appendChild(C);var g=te({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:H,onSortChange:o}),h=g.querySelector(".ikr-filter-wrap"),z=g.querySelector(".ikr-write-btn"),y=document.createElement("div");return y.className="ikr-hero-write-row",z&&y.appendChild(z),h&&y.appendChild(h),s.appendChild(y),s}var tr={classic:gr,compact:hr,split:br,minimal:yr,hero:xr};function ar(e){return tr[e]||tr.classic}function mi(){return Object.keys(tr).map(function(e){return tr[e].css||""}).join(`
`)}var wr={};xe(wr,{css:()=>vt,meta:()=>ft,render:()=>kt});function Me(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var t=document.createElement("span");t.className="ikr-reply-label",t.textContent="Ma\u011Faza Sahibi",a.appendChild(t),i.appendChild(a);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var d=document.createElement("span");return d.className="ikr-read-more ikr-reply-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",i.appendChild(d),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(d.style.display="inline",typeof r=="function")d.onclick=r;else{var o=!1;d.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),d.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var ft={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},vt="";function kt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var t=document.createElement("div");t.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ke(e.rating,L),t.appendChild(n);var d=document.createElement("span");if(d.className="ikr-date",d.textContent=ge(e.createdAt),a.appendChild(t),a.appendChild(d),i.appendChild(a),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",i.appendChild(s);var c=(e.comment||"").trim();if(c){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=c,i.appendChild(m);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){p.style.display="inline";var u=!1;p.onclick=function(){u=!u,m.classList.toggle("ikr-body-clamped",!u),p.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var l=document.createElement("div");l.className="ikr-gallery",e.images.forEach(function(u){if(!(!u||u.indexOf("https://")!==0&&u.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=K(u),v.className="ikr-img",v.setAttribute("data-ikr-img-url",u),(function(f){v.onclick=function(){ce(e,f,r)}})(u),l.appendChild(v)}}),i.appendChild(l)}var k=Me(e.merchantReply);return k&&i.appendChild(k),i}var zr={};xe(zr,{css:()=>ht,meta:()=>gt,render:()=>bt});var ui=`
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
  .ikr-review-list-author-date{margin-top:var(--ikr-gap-tight);font-size:var(--ikr-review-date-size,12px);color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));}
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
`;var gt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},ht=ui;function bt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),a=document.createElement("div");a.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var t=document.createElement("div");t.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ke(e.rating,L),t.appendChild(n);var d=document.createElement("span");d.className="ikr-review-list-author-name",d.textContent=e.author||"",t.appendChild(d);var o=document.createElement("span");o.className="ikr-date ikr-review-list-author-date",o.textContent=ge(e.createdAt),t.appendChild(o),a.appendChild(t);var s=document.createElement("div");if(s.className="ikr-review-list-content",e.title){var c=document.createElement("div");c.className="ikr-review-list-title",c.textContent=e.title,s.appendChild(c)}var m=(e.comment||"").trim();if(m){var p=document.createElement("div");p.className="ikr-review-list-body ikr-body-clamped",p.textContent=m,s.appendChild(p);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",s.appendChild(l),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){l.style.display="inline";var v=!1;l.onclick=function(){v=!v,p.classList.toggle("ikr-body-clamped",!v),l.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Me(e.merchantReply);if(k&&s.appendChild(k),a.appendChild(s),i){var u=document.createElement("div");u.className="ikr-review-list-media",e.images.forEach(function(v){if(!(!v||v.indexOf("https://")!==0&&v.indexOf("data:image/")!==0)){var f=document.createElement("img");f.src=K(v),f.setAttribute("data-ikr-img-url",v),(function(w){f.onclick=function(){ce(e,w,r)}})(v),u.appendChild(f)}}),a.appendChild(u)}return a}var Cr={};xe(Cr,{css:()=>xt,meta:()=>yt,render:()=>wt});var fi=`
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
    color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));
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
`;var yt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},xt=fi;function wt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),a=document.createElement("div");a.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var t=document.createElement("div");t.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ke(e.rating,L),t.appendChild(n),e.title){var d=document.createElement("div");d.className="ikr-review-gallery-title",d.textContent=e.title,t.appendChild(d)}var o=document.createElement("div");o.className="ikr-review-gallery-author",o.textContent=e.author||"",t.appendChild(o);var s=document.createElement("div");s.className="ikr-review-gallery-date",s.textContent=ge(e.createdAt),t.appendChild(s);var c=(e.comment||"").trim();if(c){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=c,t.appendChild(m);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",p.style.cursor="pointer",p.onclick=function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;ce(e,f,r)},t.appendChild(p),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(p.style.display="inline")})}if(a.appendChild(t),i){var l=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var u=document.createElement("img");u.src=K(l),u.loading="lazy",u.setAttribute("data-ikr-img-url",l),u.onclick=function(){ce(e,l,r)},k.appendChild(u),a.appendChild(k)}var v=Me(e.merchantReply,function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;ce(e,f,r)});return v&&(v.classList.add("ikr-review-gallery-reply"),a.appendChild(v)),a}var nr={card:wr,list:zr,gallery:Cr};function Ue(e){return nr[e]||nr.card}function vi(){return Object.keys(nr).map(function(e){return nr[e].css||""}).join(`
`)}function Ie(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var a=parseInt(i[1],16),t=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+a+","+t+","+n+","+r+")"}var ki={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},gi={small:80,medium:110,large:140};function zt(e,r){var i=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",t=r.headerCountColor||"#111111",n=r.headerRecommendColor||"#111111",d=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",s=r.barCountColor||"#111111",c=Ie(d,.06),m=r.reviewStarColor||"#f59e0b",p=m,l=r.btnBgColor||"#111111",k=r.btnTextColor||"#ffffff",u=r.btnBorderColor||"#111111",v=r.filterBtnBgColor||"#111111",f=r.filterBtnTextColor||"#ffffff",w=r.filterBtnBorderColor||"#111111",C=r.filterMenuBgColor||"#ffffff",g=r.filterMenuBorderColor||"#e5e7eb",h=r.filterItemTextColor||"#111111",z=r.filterItemHoverBgColor||"#f3f4f6",y=r.filterItemActiveColor||"#111111",b=r.reviewTitleColor||"#111111",x=r.reviewAuthorColor||"#111111",S=r.reviewDateColor||"#111111",T=r.reviewBodyColor||"#111111",N=r.reviewBorderColor||"#e5e7eb",E=r.replyBgColor||"#f9fafb",I=r.replyBorderColor||"#747474",W=r.replyLabelColor||"#111111",Z=r.replyTextColor||"#111111",X=r.photoTitleColor||"#111111",me=Ie("#111111",.05),ae=r.photoArrowBgColor||"#ffffff",ne=r.photoArrowTextColor||"#111111",j=Ie("#111111",.12),P=r.formBgColor||"#ffffff",Y=r.formPrimaryTextColor||"#111111",_e=r.formSecondaryTextColor||"#3b3b3b",F=r.inputTextColor||Y,Fe=r.inputBorderColor||"#d1d5db",ye=r.placeholderColor||"#9ca3af",Ce=r.formStepBarColor||"#111111",q=r.formBtnBgColor||"#111111",V=r.formBtnTextColor||"#ffffff",ue=r.formBtnBorderColor||"#111111",U=Ie(q,.06),fe=Ie(q,.18),Se=Ie(V,.85),Ee=Ie(Y,.06),M=r.loadMoreBgColor||"#ffffff",J=r.loadMoreTextColor||"#111111",$=r.loadMoreBorderColor||"#111111",Q={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":a,"--ikr-header-count":t,"--ikr-header-recommend":n,"--ikr-bar-fill":d,"--ikr-bar-track":o,"--ikr-star-empty-color":p,"--ikr-bar-count":s,"--ikr-bar-hover-bg":c,"--ikr-btn-bg":l,"--ikr-btn-text":k,"--ikr-btn-border":u,"--ikr-filter-btn-bg":v,"--ikr-filter-btn-text":f,"--ikr-filter-btn-border":w,"--ikr-filter-menu-bg":C,"--ikr-filter-menu-border":g,"--ikr-filter-item-text":h,"--ikr-filter-item-hover-bg":z,"--ikr-filter-item-active":y,"--ikr-review-title":b,"--ikr-review-author":x,"--ikr-review-date":S,"--ikr-review-body":T,"--ikr-review-border":N,"--ikr-review-star-color":m,"--ikr-reply-bg-color":E,"--ikr-reply-border":I,"--ikr-reply-label":W,"--ikr-reply-text":Z,"--ikr-photo-title":X,"--ikr-photo-image-border":me,"--ikr-photo-arrow-bg":ae,"--ikr-photo-arrow-text":ne,"--ikr-photo-arrow-border":j,"--ikr-fwizard-bg":P,"--ikr-fwizard-text":Y,"--ikr-fwizard-secondary-text":_e,"--ikr-fwizard-input-bg":P,"--ikr-fwizard-input-text":F,"--ikr-fwizard-input-border":Fe,"--ikr-fwizard-placeholder":ye,"--ikr-fwizard-close-text":Y,"--ikr-fwizard-close-hover-bg":Ee,"--ikr-fwizard-progress-bg":Ee,"--ikr-fwizard-progress-active":Ce,"--ikr-fwizard-btn-bg":q,"--ikr-fwizard-btn-text":V,"--ikr-fwizard-btn-border":ue,"--ikr-fwizard-btn-disabled-bg":fe,"--ikr-fwizard-btn-disabled-text":Se,"--ikr-fwizard-nav-hover-bg":U,"--ikr-load-more-bg":M,"--ikr-load-more-text":J,"--ikr-load-more-border":$};Object.keys(Q).forEach(function(A){e.style.setProperty(A,Q[A])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function be(e,r,i,a,t,n,d){if(mr){Je({productId:e,settings:r,reviewsData:i,productName:a,orderBy:t,page:n,badgeSettings:d});return}Xe(!0),_r(e),Br(r),d!==void 0&&Rr(d),Pr(a),t&&Be(t),n&&Ae(n),i!=null&&Mr(i);try{let Q=function(A,_){if(!(!A||!A.meta||!A.meta.sizeOverrides)){var G=A.meta.sizeOverrides[_];G&&Object.keys(G).forEach(function(oe){l.style.setProperty(oe,G[oe])})}};var $=Q,o=ar(r.summaryLayout),s=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),c=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=s&&c?m:"",l=document.documentElement;zt(l,r),Yr("#111111",Zr+mi()+vi());var k=r.borderRadius!==void 0?r.borderRadius:8,u=ki[r.size]||ki.medium,v=gi[r.thumbnailSize]||gi.medium,f=Ue(r.reviewLayout);if(f.meta&&f.meta.sizeOverrides&&f.meta.sizeOverrides[r.size]){var w=f.meta.sizeOverrides[r.size],C=w["--ikr-list-photo-w"]||w["--ikr-gallery-photo-w"];C&&(v=parseInt(C))}l.style.setProperty("--ikr-title-size",u.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",u.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),l.style.setProperty("--ikr-radius",k+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,k-4)+"px"),l.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),l.style.setProperty("--ikr-compact-count-size",u.compactCountSize+"px"),l.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",v+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",g),l.style.setProperty("--ikr-star-empty-color",g),l.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),Q(ar(r.summaryLayout),r.size),Q(Ue(r.reviewLayout),r.size);var h=Ne(r),z=document.getElementById("ikas-reviews");if(!z){var y=document.getElementById("ikas-reviews-anchor");if(!y)return;z=document.createElement("div"),z.id="ikas-reviews",z.style.minHeight="200px",y.appendChild(z)}if(r.enabled===!1){z.style.minHeight="auto",z.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Xe(!1);var b=De;Je(null),b&&be(b.productId,b.settings,b.reviewsData,b.productName,b.orderBy,b.page,b.badgeSettings);return}z.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var x=i||{},S=x.data&&x.data.reviews||[],T=x.data&&x.data.totalCount||0,N=z.cloneNode(!1);z.parentNode.replaceChild(N,z),z=N;var E=document.createElement("div");if(E.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(E.style.width="100%",E.style.maxWidth="100%",E.style.marginLeft="0",E.style.marginRight="0"),p){var I=document.createElement("div"),W=r.summaryLayout||"classic";I.className="ikr-title ikr-title-"+W,I.textContent=p,E.appendChild(I)}var Z=x.data&&x.data.allCount||0,X=x.data&&x.data.ratingCounts||null,me=X||[0,0,0,0,0],ae=x.data&&x.data.avgRating||"0.0";if(!X&&S.length>0){S.forEach(function(A){A.rating>=1&&A.rating<=5&&me[A.rating-1]++});var ne=S.reduce(function(A,_){return A+_.rating},0);ae=(ne/S.length).toFixed(1)}if(Z>0){var j=ar(r.summaryLayout),P=j.render({widget:E,data:x,settings:r,iconPair:h,allCount:Z,ratingCounts:me,avgRatingVal:ae,currentRatingFilter:Te,currentOrderBy:le,currentHasImages:Le,onFilterChange:async function(A){Ze(Te===A?null:A),Ae(1);var _=await Ke(re,le,1,Te,Le);await be(re,L,_,we,le,1)},onSortChange:async function(A,_){Ae(1),_?(pr(!0),Be("newest")):(pr(!1),Be(A));var G=await Ke(re,le,1,Te,Le);await be(re,L,G,we,le,1)}});E.appendChild(P)}else{var Y=document.createElement("button");Y.className="ikr-write-btn",Y.style.cssText="display:block;margin:16px auto 0;",Y.textContent=r.writeButtonText||"Yorum Yap",Y.onclick=H,E.appendChild(Y)}var _e=S.filter(function(A){return A.images&&Array.isArray(A.images)&&A.images.some(function(_){return _&&(_.indexOf("https://")===0||_.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!Le&&_e.length>0){var F=document.createElement("div");if(F.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var Fe=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",ye=document.createElement("div");ye.className="ikr-photo-title",ye.textContent=Fe,F.appendChild(ye)}var Ce=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",Ce);var q=document.createElement("div");q.className="ikr-photo-strip";var V=0;_e.forEach(function(A){if(!(V>=10)){var _=A.images.find(function(oe){return oe&&(oe.indexOf("https://")===0||oe.indexOf("data:image/")===0)});if(_){var G=document.createElement("img");G.src=K(_),G.className="ikr-photo-strip-thumb",G.alt="Yorum foto\u011Fraf\u0131",(function(oe,Mi){G.onclick=function(){ce(Mi,oe,S)}})(_,A),q.appendChild(G),V++}}});var ue=document.createElement("button");ue.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ue.innerHTML="&#8249;",ue.setAttribute("aria-label","\xD6nceki"),ue.onclick=function(){q.scrollBy({left:-200,behavior:"smooth"})};var U=document.createElement("button");U.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",U.innerHTML="&#8250;",U.setAttribute("aria-label","Sonraki"),U.onclick=function(){q.scrollBy({left:200,behavior:"smooth"})};var fe=document.createElement("div");fe.className="ikr-photo-strip-wrap",fe.appendChild(ue),fe.appendChild(q),fe.appendChild(U),F.appendChild(fe),E.appendChild(F)}if(S.length===0){var Se=document.createElement("p");Se.className="ikr-state-msg",Se.textContent="Hen\xFCz yorum yok.",E.appendChild(Se)}else{var f=Ue(r.reviewLayout);S.forEach(function(_){E.appendChild(f.render(_,S))})}var Ee=x.data&&x.data.hasMore;if(Ee){var M=document.createElement("button");M.className="ikr-load-more",M.textContent="Daha Fazla G\xF6ster",M.onclick=async function(){M.disabled=!0,M.textContent="Y\xFCkleniyor...";var A=qe+1,_=await Ke(re,le,A,Te,Le);if(_&&_.data&&_.data.reviews){Ae(A);var G=Ue(L.reviewLayout);_.data.reviews.forEach(function(oe){E.insertBefore(G.render(oe,_.data.reviews),M)}),_.data.hasMore?(M.disabled=!1,M.textContent="Daha Fazla G\xF6ster"):M.remove()}else M.remove()},E.appendChild(M)}z.appendChild(E),Wr(Z>0?ae:null,T,a,dr)}catch(A){console.error("[ikr] render error:",A),z.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Xe(!1),De){var J=De;Je(null),be(J.productId,J.settings,J.reviewsData,J.productName,J.orderBy,J.page,J.badgeSettings)}}}var ze="ikr_settings_"+D,Ct=300*1e3,St=30*1e3;async function Er(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||ee,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var a=await ie(e+"/api/preview/settings");if(a.ok){var t=await a.json();return t.widgets&&t.widgets.reviews&&Object.keys(i).length&&(t.widgets.reviews=Object.assign({},t.widgets.reviews,i)),t}}catch(m){}return null}var n=null,d=Ge(ze);if(d)try{var o=JSON.parse(d);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<St)return null;R(ze,"")}else if(o.v){if(Date.now()-o.t<Ct)return o.v;n=o.v,R(ze,"")}else R(ze,"");else R(ze,"")}catch(m){R(ze,"")}try{var s=await ie(ee+"/api/public/settings?publicApiKey="+encodeURIComponent(D));if(!s.ok)return s.status===404&&R(ze,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await s.json();return R(ze,JSON.stringify({t:Date.now(),v:c})),c}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var Et=60*1e3;async function Ke(e,r,i,a,t){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||ee,d=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),o=await ie(d);if(o.ok)return await o.json()}catch(v){}return null}r=r||"newest",i=i||1;var s="ikr_reviews_"+D+"_"+e+"_"+r+"_"+i+"_"+(a||"")+"_"+(t?"1":"0"),c=null,m=Ge(s);if(m)try{var p=JSON.parse(m);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<Et)return p.v;c=p.v,R(s,"")}else R(s,"")}catch(v){R(s,"")}try{var l=ee+"/api/public/reviews?storeId="+encodeURIComponent(D)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(a?"&rating="+encodeURIComponent(a):"")+(t?"&hasImages=true":""),k=await ie(l);if(!k.ok)return c||null;var u=await k.json();return R(s,JSON.stringify({t:Date.now(),v:u})),u}catch(v){return console.error("[ikr] fetchReviews error:",v),c||null}}var Sr={};async function Oe(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!Sr[e]){Sr[e]=!0;var t={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var d=await Er();if(!d)return;var o=d.widgets&&d.widgets.reviews||t,s=d.widgets&&d.widgets.badge||n;if(o.enabled===!1)return;Be("newest"),Ae(1),Ze(null);var c=await Ke(e,"newest",1,null);await be(e,o,c,r,"newest",1,s)}catch(m){console.error("[ikr] bootstrap error:",m),await be(e,t,null,r,void 0,void 0,n)}finally{delete Sr[e]}}}function Tr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(a){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function hi(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var a=i.getAttribute("href");if(!a||a.charAt(0)==="#"||a.charAt(0)==="?")return;var t=O(i.href);if(!t||r[t]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(t)||er.test(t))return;r[t]=!0,e[t]=null}catch(n){}}),Object.keys(je).forEach(function(i){e[i]=je[i]}),e}var Tt=300*1e3,bi=50;async function yi(e){var r="ikr_ratings_"+D,i={},a=Ge(r);if(a)try{var t=JSON.parse(a);t&&t.t!==void 0&&Date.now()-t.t<Tt?i=t.v||{}:R(r,"")}catch(c){R(r,"")}var n=e.filter(function(c){return!i[c]});if(!n.length)return i;for(var d=[],o=0;o<n.length;o+=bi)d.push(n.slice(o,o+bi));var s=await Promise.all(d.map(function(c){var m=ee+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(D)+"&slugs="+c.map(encodeURIComponent).join(",");return ie(m).then(function(p){return p.ok?p.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return s.forEach(function(c){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(m){i[m]=c[m]})}),R(r,JSON.stringify({t:Date.now(),v:i})),i}var Lt="var(--ikr-badge-color,#f59e0b)",xi=13,At="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function Nt(e){var r=Ve("star","classic"),i="width:"+xi+"px;height:"+xi+"px;";return'<span style="color:'+Lt+';display:inline-flex;align-items:center;">'+de(e,r,{sizeStyle:i})+"</span>"}function We(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=At+"justify-content:"+(r||"flex-start")+";",i.innerHTML=Nt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var wi=".product-name",zi=".add-to-basket-modal",Ci="h1.product-name",or=".single-product-container-main",Lr=".single-product-product-name",Si=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Ei=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Ti='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',It=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Ar(e,r){var i=e.querySelector(wi);if(i)return i;if(e.matches&&e.matches(Ti))return e;var a=e.querySelector(Ti);if(a)return a;if(r){for(var t=e.querySelectorAll("*"),n=0;n<t.length;n++)if(t[n].children.length===0&&t[n].textContent.trim()===r)return t[n]}for(var d=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<d.length;o++){var s=d[o],c=s.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!It.test(c)&&!(s.closest("figure")||s.closest("picture"))&&!(s.children.length>1))return s}return null}function _t(e,r,i,a){if(!e.getAttribute("data-ikr-badge")){var t=O(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(or)&&!e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Si)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),d=Array.from(e.childNodes).filter(function(u){return u.nodeType===3}).map(function(u){return u.textContent.trim()}).join("").trim(),o=!!Ar(e,i);if(!d&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(u){u.setAttribute("data-ikr-badge","1")});var s=Ar(e,i);if(!s||s.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(s).textAlign;s.appendChild(We(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var m=Ar(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var p=window.getComputedStyle(m).textAlign;m.appendChild(We(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var l=We(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(l,k):e.appendChild(l)}}}function Bt(e,r){var i=document.querySelector(zi);if(i){var a=i.querySelector(Ci);if(!(!a||a.querySelector("[data-ikr-listing-badge]"))){var t=null;if(Ye&&r[Ye]&&(t=Ye),!t){var n=O(window.location.pathname);n&&r[n]&&(t=n)}if(!t){var d=a.textContent.trim();Object.keys(e).forEach(function(p){if(!t){var l=e[p];l&&l.trim()===d&&r[p]&&(t=p)}})}if(!t){var o=document.querySelector(or);if(o){var s=o.querySelector("a[href]");if(s){var c=O(s.href);c&&r[c]&&(t=c)}}}if(!t){var m=a.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!t&&!(p.closest("header")||p.closest("nav"))&&!p.closest(or)){var l=p.textContent.trim().toLowerCase();if(l&&l===m){var k=O(p.href);k&&r[k]&&(t=k)}}})}!t||!r[t]||r[t]._empty||r[t].count===0||a.appendChild(We(r[t],"flex-start"))}}}function Li(e,r){var i=O(window.location.pathname),a=document.querySelectorAll(Ei),t=[];a.forEach(function(n){n.tagName==="A"&&n.href?t.push(n):n.querySelectorAll("a[href]").forEach(function(d){t.push(d)})}),Object.keys(e).forEach(function(n){var d=r[n];if(!(!d||d._empty||d.count===0)){var o=e[n];t.forEach(function(s){O(s.href)===n&&_t(s,d,o,i)})}}),Bt(e,r)}async function He(){if(B.inProgress){B.queued=!0;return}if(!B.rendered){B.rendered=!0,B.inProgress=!0;try{var e=B.navCleanup;e&&(B.navCleanup=!1);var r=hi();if(!Object.keys(r).length){B.rendered=!1;return}var i=await Promise.all([Er(),yi(Object.keys(r))]),a=i[0];if(!a){B.rendered=!1;return}var t=i[1],n=a&&a.widgets||{},d=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){B.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",d),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),Li(r,t)}finally{B.inProgress=!1,B.queued&&(B.queued=!1,B.rendered=!1,He())}}}var Ai=!1,Ni=!1;function Bi(){Ni||(Ni=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=O(r.href);!i||i.length<3||Or(i)}},!0))}var Ii=!1,_i=typeof location!="undefined"?location.pathname:"";function lr(){try{if(location.pathname===_i)return;_i=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function Rt(){if(!Ii){Ii=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return lr(),i},history.replaceState=function(){var i=r.apply(this,arguments);return lr(),i},window.addEventListener("popstate",lr),window.addEventListener("hashchange",lr)}}function Nr(){if(Rt(),window.IkasEvents){if(Ai)return;Ai=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var d=n.data&&n.data.productDetails;Array.isArray(d)&&d.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(je[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var o=n.data&&n.data.productDetail&&n.data.productDetail.id,s=n.data&&n.data.productDetail&&n.data.productDetail.name;o&&(R("ikr_reviews_"+D+"_"+o,""),Oe(o,s))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(B.lastPageView&&c-B.lastPageView<800)return;B.lastPageView=c,B.navCleanup=!0,B.rendered=!1,He()}}});var e=Tr();if(e)Oe(e.id,e.name);else{let n=function(){var d=Tr();d?Oe(d.id,d.name):r<20&&(r++,setTimeout(n,100))};var a=n,r=0;setTimeout(n,100)}setTimeout(function(){B.rendered||He()},2e3)}else{let n=function(){window.IkasEvents?Nr():i<100&&(i++,setTimeout(n,50))};var t=n,i=0;setTimeout(n,50)}}var Ri=null;function Pi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(a){return Array.from(a.addedNodes).some(function(t){return!(t.nodeType!==1||t.hasAttribute&&(t.hasAttribute("data-ikr-listing-badge")||t.id==="ikr-rating-badge"||t.id==="ikr-reviews-widget")||t.closest&&(t.closest("[data-ikr-listing-badge]")||t.closest("#ikr-rating-badge")||t.closest("#ikr-reviews-widget"))||t.querySelector&&t.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Ri),Ri=setTimeout(function(){var a=Array.from(document.querySelectorAll("a[href]")).some(function(t){if(t.getAttribute("data-ikr-badge"))return!1;var n=O(t.href);return n&&n.length>=3&&!er.test(n)});a&&(B.rendered=!1,He())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Pt=window.__ikasPreviewMode===!0;if(Pt){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Oe("mock-product","\xD6rnek \xDCr\xFCn"),e()};Mt=e,Ot=r,window.addEventListener("message",function(i){var a=i.data;if(!(!a||a.type!=="IKR_SETTINGS_UPDATE")){var t=a.settings;if(!(!t||!L)){var n=Object.assign({},L,t);be(re,n,cr,we,le,qe),window.dispatchEvent(new CustomEvent("IKR_SETTINGS_UPDATED_PREVIEW"))}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(D){let e=function(){Nr(),Bi(),Pi()};Ht=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Mt,Ot,Ht;})();
