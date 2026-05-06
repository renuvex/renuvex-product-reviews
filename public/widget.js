/* ikas Reviews Widget — built 2026-05-06T15:05:32.783Z | theme: default */
"use strict";(()=>{var Yi=Object.defineProperty;var xe=(e,r)=>{for(var i in r)Yi(e,i,{get:r[i],enumerable:!0})};var Gi=typeof document!="undefined",Ir=Gi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,lr=Ir?Ir.src:"",Vi=new URLSearchParams(lr.split("?")[1]||""),Y=Vi.get("publicApiKey"),Q=lr?lr.split("?")[0].replace(/\/widget\.js$/,""):"";var ae="newest",He=1,Se=null,Ee=!1,ee=null,_=null,dr=null,ye=null,sr=null;function Ae(e){ae=e}function Te(e){He=e}function Ue(e){Se=e}function cr(e){Ee=e}function _r(e){ee=e}function Br(e){_=e}function Rr(e){dr=e}function Mr(e){ye=e}function Pr(e){sr=e}var pr=!1,Fe=null;function Ke(e){pr=e}function Ze(e){Fe=e}var I={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},je={},De=null;function Or(e){De=e}var Hr={};function qe(e){try{return sessionStorage.getItem(e)}catch(r){return Hr[e]||null}}function O(e,r){try{sessionStorage.setItem(e,r)}catch(i){Hr[e]=r}}var me="0 -960 960 960",ne={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function We(e){return'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Fr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starFill+'"/></g></svg>',empty:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ne.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+ne.starFill+'"/></g></svg>',empty:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ne.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+ne.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+ne.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+me+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+ne.heartOutline+'"/></g></svg>'}}}};function Ui(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Ye(e,r){var i=Fr[e]||Fr.star,a=i.styles;return a[r]||a[Object.keys(a)[0]]}function Ne(e){var r=e&&e.reviewIcon||"star",i=Ui(r),a=i.style||e&&e.reviewIconStyle||"classic";return Ye(i.type,a)}function Dr(e,r,i){for(var a=Math.round(parseFloat(e))||0,t=Ne(r),n=i&&i.sizePx,s=n?"width:"+n+"px;height:"+n+"px;":"",o="",d=1;d<=5;d++){var p=d<=a;o+='<span class="ikr-icon '+(p?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(p?t.filled:t.empty)+"</span>"}return o}var Xe={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},jr={lines:{label:"\xC7izgili",svg:We(Xe.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:We(Xe.linesAlt)},funnel:{label:"Huni",svg:We(Xe.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:We(Xe.dense)}};function qr(e){var r=jr[e]||jr.lines;return r.svg}var Ki="var(--ikr-review-star-color,#f59e0b)";var Je=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function F(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ue(e,r){var i="color:"+Ki+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Dr(e,r)+"</span>"}function oe(e,r,i){for(var a=Math.max(0,Math.min(5,parseFloat(e)||0)),t=Math.floor(a),n=a-t,s=n<.25?t:n<.75?t+.5:t+1,o=s/5*100,d=i&&i.sizeStyle||"",p="",m="",c=0;c<5;c++)p+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>",m+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+p+'</span><span class="ikr-stars-partial-fill" style="width:'+o+'%;">'+m+"</span></span>"}function fe(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Zi(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Wi(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Zi(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Yr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Wi(e)}function W(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function re(e,r,i){var a=new AbortController,t=setTimeout(function(){a.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:a.signal})).finally(function(){clearTimeout(t)})}function Gr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Xi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var t=document.createElement("div");t.className="ikr-modal-stars",t.innerHTML=ue(e.rating,_);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(n),i.appendChild(a);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(d);var p=document.createElement("div");p.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="ikr-modal-reply-text",c.textContent=e.merchantReply||"",p.appendChild(m),p.appendChild(c),p.style.display=e.merchantReply?"":"none",i.appendChild(p),r.appendChild(i),r}function Ji(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ue(r.rating,_),i.querySelector(".ikr-modal-date").textContent=fe(r.createdAt);var a=i.querySelector(".ikr-modal-title");a.textContent=r.title||"",a.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var t=i.querySelector(".ikr-modal-body");t.textContent=(r.comment||"").trim(),t.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function mr(e,r,i,a,t,n,s,o){var d=e.images&&Array.isArray(e.images)?e.images.filter(function(S){return S&&(S.indexOf("https://")===0||S.indexOf("data:image/")===0)}):[],p=Math.min(i,d.length-1),m=document.createElement("div");m.className="ikr-modal-left";var c=document.createElement("img"),l=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";c.className="ikr-modal-main-img"+(l?" "+l:""),c.src=W(d[p]||""),c.alt="Yorum foto\u011Fraf\u0131",m.appendChild(c);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(S){S.stopPropagation(),n()},m.appendChild(k);var u=0;if(m.addEventListener("touchstart",function(S){u=S.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(S){var C=u-S.changedTouches[0].clientX;if(!(Math.abs(C)<50)){if(C>0){if(w)ve(e,r,p+1,a,t,n,!0,"next",o);else if(b){var E=a[r+1];ve(E,r+1,0,a,t,n,!1,"next",o)}}else if(f)ve(e,r,p-1,a,t,n,!0,"prev",o);else if(x){var A=a[r-1],P=(A.images||[]).filter(function(N){return N&&(N.indexOf("https://")===0||N.indexOf("data:image/")===0)});ve(A,r-1,P.length-1,a,t,n,!1,"prev",o)}}},{passive:!0}),d.length>1){var v=document.createElement("div");v.className="ikr-modal-thumbs",d.forEach(function(S,C){var E=document.createElement("img");E.src=W(S),E.className="ikr-modal-thumb"+(C===p?" ikr-modal-thumb-active":""),E.alt="K\xFC\xE7\xFCk resim "+(C+1),(function(A){E.onclick=function(){ve(e,r,A,a,t,n,!0,null,o)}})(C),v.appendChild(E)}),m.appendChild(v)}var f=p>0,w=p<d.length-1,x=r>0,b=r<a.length-1,g=f||x,z=w||b;if(g){var h=document.createElement("button");h.className="ikr-modal-nav ikr-modal-nav-prev",h.innerHTML="&#8249;",h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(S){if(S.stopPropagation(),f)ve(e,r,p-1,a,t,n,!0,"prev",o);else if(x){var C=a[r-1],E=(C.images||[]).filter(function(A){return A&&A.indexOf("https://")===0});ve(C,r-1,E.length-1,a,t,n,!1,"prev",o)}},m.appendChild(h)}if(z){var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-next",y.innerHTML="&#8250;",y.setAttribute("aria-label","Sonraki"),y.onclick=function(S){if(S.stopPropagation(),w)ve(e,r,p+1,a,t,n,!0,"next",o);else if(b){var C=a[r+1];ve(C,r+1,0,a,t,n,!1,"next",o)}},m.appendChild(y)}return m}function Vr(e,r){[-1,1].forEach(function(i){var a=r[e+i];if(a){var t=(a.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});t[0]&&(new Image().src=W(t[0]))}})}function ve(e,r,i,a,t,n,s,o,d){if(s){var p=mr(e,r,i,a,t,n,o,d);t.firstChild&&t.replaceChild(p,t.firstChild)}else{var p=mr(e,r,i,a,t,n,o,d),m=t.querySelector(".ikr-modal-right");t.firstChild&&t.replaceChild(p,t.firstChild),m&&Ji(m,e);var c=d&&d.querySelector(".ikr-modal-wrap");c&&(c.scrollTop=0)}Vr(r,a)}function le(e,r,i){var a=(i||[]).filter(function(f){return f.images&&Array.isArray(f.images)&&f.images.some(function(w){return w&&(w.indexOf("https://")===0||w.indexOf("data:image/")===0)})}),t=a.findIndex(function(f){return f===e||f.id===e.id});t===-1&&(t=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(f){return f&&(f.indexOf("https://")===0||f.indexOf("data:image/")===0)}):[],s=Math.max(0,n.indexOf(r)),o=document.createElement("div");o.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var p=!1;function m(){p||(p=!0,Gr(o,c,m))}function c(f){f.key==="Escape"&&l()}function l(){p||(p=!0,history.go(-1),Gr(o,c,m))}document.addEventListener("keydown",c);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),o.onclick=function(){l()},d.onclick=function(f){f.stopPropagation()},d.appendChild(mr(e,t,s,a,d,l,null,o)),d.appendChild(Xi(e)),Vr(t,a);var u=document.createElement("div");u.className="ikr-modal-wrap",u.appendChild(d);var v=document.createElement("button");v.className="ikr-modal-close",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(f){f.stopPropagation(),l()},u.appendChild(v),o.appendChild(u),document.body.appendChild(o)}function Ur(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var a=r[i];if(a.children.length===0&&a.textContent.trim()===e&&a.tagName!=="TITLE"&&!a.closest("[data-ikr-listing-badge]")&&!a.closest("#ikas-reviews")&&!a.closest("nav")&&!a.closest("header")&&!a.closest('[class*="breadcrumb"]')&&!a.closest('[aria-label*="breadcrumb"]'))return a}return document.querySelector("h1")}var Kr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function $i(e,r,i,a,t){var n=Ye(r,i),s="width:"+t+"px;height:"+t+"px;";return'<span style="color:'+a+';display:inline-flex;align-items:center;line-height:1;">'+oe(e,n,{sizeStyle:s})+"</span>"}function Zr(e,r,i,a){var t=document.getElementById("ikr-rating-badge");if(t&&t.remove(),!!e&&!(a&&a.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var o=Ur(i);if(!(!o||!o.parentNode)){var d=a&&a.icon||"star",p=a&&a.iconStyle||"classic",m=a&&a.size||"medium",c=a&&a.color||"#f59e0b",l=Kr[m]||Kr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var u=window.getComputedStyle(o).textAlign,v=u==="center"?"center":u==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+v+";",k.innerHTML=$i(e,d,p,c,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(f){f.preventDefault();var w=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(w){var x=document.querySelector("header"),b=x?x.getBoundingClientRect().height:0,g=w.getBoundingClientRect().top+window.pageYOffset-b-16;window.scrollTo({top:g,behavior:"smooth"})}},o.parentNode.insertBefore(k,o.nextSibling)}}}var Wr=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:var(--ikr-text,rgba(0,0,0,1));background:var(--ikr-widget-bg,var(--ikr-bg,transparent));border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;--ikr-pad-summary-mobile:8px;--ikr-pad-review-mobile:10px;}
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
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:center;margin-bottom:12px;color:var(--ikr-header-title,var(--ikr-text,rgba(0,0,0,1)));}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

  /* \u2500\u2500\u2500 PARTIAL STARS (yar\u0131m y\u0131ld\u0131z overlay) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Empty katman tabanda, filled katman \xFCstte clip ile %X kadar g\xF6sterilir.
     Loox/Yotpo/Material UI Rating standard\u0131. Boyut yine .ikr-icon parent'\u0131ndan
     gelir (.ikr-hero-stars .ikr-icon { width:22px } gibi).
     gap parent'tan (.ikr-stars-partial-empty/fill inline-flex) miras al\u0131nmaz \u2014
     overlay ayn\u0131 yap\u0131y\u0131 tekrar etti\u011Fi i\xE7in iki katman birebir \xFCst \xFCste oturur. */
  .ikr-stars-partial{position:relative;display:inline-flex;line-height:1;}
  .ikr-stars-partial-empty,.ikr-stars-partial-fill{display:inline-flex;gap:2px;align-items:center;}
  .ikr-stars-partial-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
  .ikr-stars-partial .ikr-stars-partial-empty .ikr-icon{color:var(--ikr-star-empty-color,#e5e7eb);}
  .ikr-stars-partial .ikr-stars-partial-fill .ikr-icon{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-stars-partial-fill{
    position:absolute;left:0;top:0;height:100%;
    overflow:hidden;pointer-events:none;
  }

  /* \u2500\u2500\u2500 SUMMARY LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her blok ba\u011F\u0131ms\u0131z \u2014 s\u0131ra/gizleme CSS ile kolayca de\u011Fi\u015Ftirilebilir.
     Kolon geni\u015Flikleri CSS variable ile payla\u015F\u0131l\u0131r (label/count s\xFCtunlar\u0131).
     Bu sayede bar-row ve actions-row ayn\u0131 hizada kal\u0131r. */
  .ikr-summary{
    --ikr-col-label:104px;
    --ikr-col-count:60px;
    --ikr-col-gap:4px;
    --ikr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:12px;
    padding:16px 28px 24px;border-radius:var(--ikr-radius,6px);margin:0 auto 24px;
  }
  .ikr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--ikr-summary-max);}

  /* Blok: Ortalama puan (b\xFCy\xFCk) */
  .ikr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .ikr-avg-star{width:var(--ikr-avg-star-size,52px);height:var(--ikr-avg-star-size,52px);color:var(--ikr-review-star-color,#f59e0b);line-height:1;}
  .ikr-avg-num{font-size:var(--ikr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));}

  /* Blok: Toplam yorum say\u0131s\u0131 */
  .ikr-summary-count{font-size:var(--ikr-review-count-size,16px);color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  /* Blok: Tavsiye y\xFCzdesi */
  .ikr-summary-recommend{display:block;font-size:var(--ikr-recommend-size,14px);color:var(--ikr-header-recommend,var(--ikr-text,rgba(0,0,0,1)));text-align:center;max-width:none;width:auto;}
  .ikr-recommend-pct{font-weight:700;color:var(--ikr-header-recommend,var(--ikr-text,rgba(0,0,0,1)));margin-right:3px;}

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
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-bar-hover-bg,var(--ikr-color-light));}}
  .ikr-bar-active{background:var(--ikr-bar-hover-bg,var(--ikr-color-light))!important;}
  .ikr-bar-label{flex:0 0 var(--ikr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-bar-star{width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);}
  .ikr-bar-star-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-star-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
  .ikr-bar-track{flex:1 1 auto;min-width:0;background:var(--ikr-bar-track,var(--ikr-track-bg,rgba(0,0,0,0.10)));border-radius:var(--ikr-radius-sm,4px);height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-bar-fill,var(--ikr-text,rgba(0,0,0,1)));border-radius:var(--ikr-radius-sm,4px);}
  .ikr-bar-count{flex:0 0 var(--ikr-col-count);white-space:nowrap;text-align:right;color:var(--ikr-bar-count,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-bar-count-size,14px);}

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda.
     Padding yok ki wrapper tam 340px kullansin; bar chart ile kenar hizasi
     tutsun. Bar row'un kendi 3px 6px padding'i hover alani icin, actions'in
     buna ihtiyaci yok. */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:center;gap:var(--ikr-col-gap);
    box-sizing:border-box;
  }
  /* min-height:36px \u2014 filter butonu (36\xD736 sabit) ile ayni yukseklikte tutar.
     Font small/medium'da yukseklik 36'ya kilitlenir; large font'ta padding
     katkisi ile bir miktar buyur ama filter'la dengeli kalir. */
  .ikr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:10px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:600;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;}
  .ikr-filter-wrap{flex:0 0 var(--ikr-col-count);position:relative;display:flex;justify-content:flex-end;}
  /* Filter button colors come from the Filtre color group in admin. */
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--ikr-radius,6px);border:2px solid var(--ikr-filter-btn-border,var(--ikr-color,#000));background:var(--ikr-filter-btn-bg,transparent);color:var(--ikr-filter-btn-text,var(--ikr-color,#000));cursor:pointer;}
  /* Material Symbols viewBox 0 -960 960 960 \u2014 buton i\xE7ine s\u0131\u011Fmas\u0131 i\xE7in 16x16 */
  .ikr-filter-btn svg{width:16px;height:16px;flex-shrink:0;}

  /* Filtre dropdown (wrap yukar\u0131da tan\u0131mland\u0131) */
  /* Filter dropdown \u2014 Loox-style growOut animasyonu (200ms ease-in-out) */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--ikr-filter-menu-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-filter-menu-border,var(--ikr-border,rgba(0,0,0,0.12)));border-radius:var(--ikr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;visibility:hidden;opacity:0;pointer-events:none;transform-origin:top right;}
  .ikr-filter-menu.ikr-open{visibility:visible;pointer-events:auto;animation:ikr-grow-out 200ms ease-in-out forwards;}
  .ikr-filter-item{padding:10px 16px;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,var(--ikr-text,rgba(0,0,0,1)));cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,var(--ikr-color-light));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,var(--ikr-color,#000));}

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .ikr-photo-section{margin-bottom:24px;}
  /* Strip \xFCst\xFCndeki b\xF6l\xFCm ba\u015Fl\u0131\u011F\u0131 (Loox/Yotpo: "Customer Photos") \u2014
     admin "Foto\u011Fraf Galerisi \u2192 Ba\u015Fl\u0131k Rengi" ve SIZE_PRESETS.photoTitleSize
     bu \xF6\u011Feyi kontrol eder. */
  .ikr-photo-title{
    font-size:var(--ikr-photo-title-size,16px);
    font-weight:500;
    color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));
    margin-bottom:12px;
  }
  .ikr-photo-strip-wrap{position:relative;}
  /* .ikr-photo-strip ve .ikr-photo-strip-thumb as\u0131l tan\u0131mlar\u0131 a\u015Fa\u011F\u0131da
     (sat\u0131r 266 ve 268). Bu \xF6l\xFC duplicate kurallar temizlendi.
     .ikr-photo-thumb hi\xE7bir DOM taraf\u0131ndan kullan\u0131lm\u0131yordu \u2014 silindi. */

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-arrow-bg,#fff);border:1px solid var(--ikr-photo-arrow-border,rgba(0,0,0,0.12));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-arrow-text,var(--ikr-text,rgba(0,0,0,1)));box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
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
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}
  /* Reply clamp: yorum metni (.ikr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .ikr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-reply-read-more{margin-top:var(--ikr-gap-tight);}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-load-more-border,var(--ikr-border,rgba(0,0,0,0.30)));border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,var(--ikr-surface,#fff));color:var(--ikr-load-more-text,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .ikr-state-msg{text-align:center;color:var(--ikr-text-faint,rgba(0,0,0,0.45));font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 4px;display:block;}
  .ikr-photo-strip-container{position:relative;margin:0 -4px;}
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  /* Thumbnail geni\u015Fli\u011Fi sabit (--ikr-thumbnail-size); y\xFCksekli\u011Fi aspect-ratio
     ile gelir. --ikr-photo-thumb-aspect render.js'de review layout'a g\xF6re set
     edilir: card -> 1/1 (kare), list & gallery -> 3/4 (portre, item fotolar\u0131yla
     tutarl\u0131). Fallback 1/1, eski davran\u0131\u015F. */
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-text,rgba(0,0,0,1));border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close,
  .ikr-modal-close-mobile{background:var(--ikr-modal-close-bg,#00000080);border:1px solid var(--ikr-modal-close-border,#ffffff33);box-sizing:border-box;color:var(--ikr-modal-close-text,var(--ikr-color-text,#fff));font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;align-items:center;justify-content:center;}
  .ikr-modal-close{position:absolute;top:-42px;right:0;display:flex;z-index:100000;}
  @media(hover:hover){.ikr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  /* Mobile and desktop close buttons share the same color variables. */
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{opacity:0.85;}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:var(--ikr-modal-nav-bg,#00000059);border:1px solid var(--ikr-modal-nav-border,#ffffff33);box-sizing:border-box;color:var(--ikr-modal-nav-text,#fff);width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover){.ikr-modal-nav:hover{opacity:0.85;}}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-text,rgba(0,0,0,1));}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}

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
`;var vr={};xe(vr,{meta:()=>dt,render:()=>st});function Ie(e){var r=e.ratingCounts,i=e.allCount,a=e.iconPair,t=e.currentRatingFilter,n=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var d=r[o-1]||0,p=i>0?Math.round(d/i*100):0,m=t===o,c=document.createElement("div");c.className="ikr-bar-row"+(m?" ikr-bar-active":""),t&&!m&&(c.style.opacity="0.35");for(var l="",k=1;k<=5;k++){var u=k<=o;l+='<span class="ikr-bar-star ikr-icon '+(u?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(u?a.filled:a.empty)+"</span>"}c.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+p+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(v){c.onclick=function(){n(v)}})(o),s.appendChild(c)}return s}var de=[],Xr=!1;function Qi(e){for(var r=de.length-1;r>=0;r--){var i=de[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function et(e){if(e.key==="Escape")for(var r=de.length-1;r>=0;r--)de[r].close()}function rt(){Xr||typeof document=="undefined"||(document.addEventListener("click",Qi,!0),document.addEventListener("keydown",et),Xr=!0)}function $e(e){for(var r=0;r<de.length;r++)de[r]!==e&&de[r].close()}function Qe(e){rt();var r={trigger:e.trigger,element:e.element,close:e.close};return de.push(r),function(){var a=de.indexOf(r);a!==-1&&de.splice(a,1)}}function se(e){var r=e.widget,i=e.currentOrderBy,a=e.currentHasImages,t=e.onWriteClick,n=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent="Yorum Yap",o.onclick=t,s.appendChild(o);var d=document.createElement("div");d.className="ikr-filter-wrap";var p=document.createElement("button");p.className="ikr-filter-btn",p.setAttribute("aria-label","Filtrele");var m=_&&_.filterIcon||"lines";p.innerHTML=qr(m);var c=document.createElement("div");c.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){c.classList.remove("ikr-open"),p.classList.remove("ikr-filter-btn-active")}function u(){$e(v),c.classList.add("ikr-open"),p.classList.add("ikr-filter-btn-active")}l.forEach(function(f){var w=f[2],x=w?a:!a&&(i||"newest")===f[0],b=document.createElement("div");b.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),b.textContent=f[1],b.onclick=function(){k(),n(f[0],w)},c.appendChild(b)}),p.onclick=function(){c.classList.contains("ikr-open")?k():u()};var v=Qe({trigger:d,element:c,close:k});return d.appendChild(p),d.appendChild(c),s.appendChild(d),s}function Jr(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true");var t=document.createElement("div");t.className="ikr-fwizard",a.appendChild(t);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',t.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-content",t.appendChild(s);var o=!1,d="",p="";function m(){var f=window.innerWidth-document.documentElement.clientWidth;d=document.body.style.overflow,p=document.body.style.paddingRight,document.body.style.overflow="hidden",f>0&&(document.body.style.paddingRight=f+"px")}function c(){document.body.style.overflow=d,document.body.style.paddingRight=p}function l(){o||(o=!0,document.removeEventListener("keydown",k),a.removeEventListener("click",u),n.removeEventListener("click",l),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),c();try{r()}catch(f){}},200))}function k(f){f.key==="Escape"&&l()}function u(f){f.target===a&&i&&l()}document.addEventListener("keydown",k),a.addEventListener("click",u),n.addEventListener("click",l);function v(f){f&&s.appendChild(f),document.body.appendChild(a),m(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open")})}return{open:v,close:l,content:s,setAllowOutsideClose:function(f){i=!!f},setStepAttr:function(f){t.setAttribute("data-step",String(f))}}}var $r=`
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
    border-radius:12px;
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
    border-radius:8px;
    border:none;
    background:transparent;
    color:var(--ikr-fwizard-close-text, rgba(0,0,0,0.6));
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
      color:var(--ikr-fwizard-text, rgb(17,17,17));
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
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.75));
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
    border-radius:12px;
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
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border-radius:8px;
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
    background:var(--ikr-fwizard-input-bg, #f9f9f9);
    color:var(--ikr-fwizard-input-text, var(--ikr-fwizard-text, #000000));
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
    border-radius:8px;
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
    border-radius:8px;
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
    border-radius:8px;
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
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.75));
  }
  .ikr-fwizard-required{
    color:#dc2626;
    margin-left:2px;
  }
  .ikr-fwizard-notice{
    font-size:12px;
    line-height:1.5;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.75));
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
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border:1px solid var(--ikr-fwizard-cta-border, rgb(17,17,17));
    border-radius:8px;
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
    background:var(--ikr-fwizard-cta-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-cta-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-cta-disabled-border, transparent);
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
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border:1px solid var(--ikr-fwizard-cta-border, rgb(17,17,17));
    border-radius:8px;
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
    background:var(--ikr-fwizard-cta-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-cta-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-cta-disabled-border, transparent);
    cursor:not-allowed;
  }
  .ikr-fwizard-cta-btn[hidden]{
    display:none;
  }
  .ikr-fwizard-progress-seg{
    flex:0 0 auto;
    width:80px;
    height:8px;
    border-radius:16px;
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
    color:var(--ikr-fwizard-nav-text, rgb(17,17,17));
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-radius:8px;
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
`;var ur=4;function _e(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Qr(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(t){try{t(i)}catch(n){}})}return{get:function(){return i},set:function(t){Object.assign(i,t),a()},goNext:function(){i.currentStep<ur&&(i.currentStep+=1,a())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,a())},onChange:function(t){return r.push(t),function(){r=r.filter(function(n){return n!==t})}}}}var it='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function ei(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],a=e.onBack||function(){},t=e.onSkip||function(){},n=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=it+"<span>Geri</span>",o.addEventListener("click",function(){a()}),s.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var p=[],m=0;m<ur;m++){var c=document.createElement("span");c.className="ikr-fwizard-progress-seg",d.appendChild(c),p.push(c)}s.appendChild(d);var l=document.createElement("button");l.type="button";var k=null;function u(f){k&&l.removeEventListener("click",k),k=f,f&&l.addEventListener("click",f)}s.appendChild(l);function v(f,w){var x=r.indexOf(f)!==-1,b=i.indexOf(f)!==-1,g=w&&w.images&&w.images.length>0;if(x)f===2&&g?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",u(function(){n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",u(function(){t()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(b){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var z=_e(f,w);l.disabled=!z,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!z),u(function(){l.disabled||n()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,u(null)}return{el:s,update:function(f,w){p.forEach(function(b,g){g+1<=f?b.classList.add("ikr-fwizard-progress-seg-active"):b.classList.remove("ikr-fwizard-progress-seg-active")});var x=f<=1;o.style.visibility=x?"hidden":"",o.style.pointerEvents=x?"none":"",o.tabIndex=x?-1:0,v(f,w)},setNextDisabled:function(f){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!f,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){o.style.visibility="hidden",d.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),u(f)}}}function ri(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,t=document.createElement("div");t.className="ikr-fwizard-step-title",t.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-stars",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var s=Ne(_||{}),o=[];function d(m){o.forEach(function(c,l){var k=l<m;c.classList.toggle("ikr-fwizard-star-active",k),c.innerHTML=k?s.filled:s.empty})}for(var p=1;p<=5;p++)(function(m){var c=document.createElement("button");c.type="button",c.className="ikr-fwizard-star",c.setAttribute("role","radio"),c.setAttribute("aria-label",m+" y\u0131ld\u0131z"),c.innerHTML=s.empty,c.addEventListener("mouseenter",function(){d(m)}),c.addEventListener("mouseleave",function(){d(e.get().rating)}),c.addEventListener("click",function(){a||(a=!0,e.set({rating:m}),d(m),setTimeout(function(){var l=!r.canNavigate||r.canNavigate();l&&e.goNext()},280))}),o.push(c),n.appendChild(c)})(p);return d(e.get().rating),i.appendChild(n),{el:i,destroy:function(){}}}var ii=3,tt=5*1024*1024;function ti(e,r){r=r||{};var i=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var o=document.createElement("label");o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",o.appendChild(d),s.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),s.appendChild(p),a.appendChild(s);var m=r.blobMap||{},c=r.urlToFinger||{};function l(){if(!i){var b=e.get().images||[],g=e.get().pendingImages||[],z=b.map(function(h){return{url:h,isPending:!1}}).concat(g.map(function(h){return{url:h.url,file:h.file,isPending:!0,error:h.error}}));p.innerHTML="",z.forEach(function(h){var y=m[h.url]||h.url,S=k(h,y);p.appendChild(S)}),w()}}function k(b,g){var z=document.createElement("div");z.className="ikr-fwizard-photo-thumb",z.innerHTML='<img src="'+g+'" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';var h=document.createElement("div");h.className="ikr-fwizard-photo-loading",h.style.display="none",z.appendChild(h);var y=document.createElement("button");return y.type="button",y.className="ikr-fwizard-photo-remove",y.innerHTML="&#x2715;",z.appendChild(y),u(z,b,g),z}function u(b,g,z){var h=b.querySelector("img");h.src!==z&&(h.src=z);var y=b.querySelector(".ikr-fwizard-photo-loading");g.isPending&&g.error?(y.style.display="flex",y.innerHTML='<span class="ikr-upload-error">\u2717 '+g.error+"</span>"):y.style.display="none";var S=b.querySelector(".ikr-fwizard-photo-remove");S.onclick=function(){var C=c[g.url]||(g.file?g.file.name+"_"+g.file.size:null);if(g.url.startsWith("blob:")&&URL.revokeObjectURL(g.url),C){var E=(e.get().fingerprints||[]).filter(function(N){return N!==C});e.set({fingerprints:E})}if(g.isPending){var A=(e.get().pendingImages||[]).filter(function(N){return N.url!==g.url});e.set({pendingImages:A})}else{var P=(e.get().images||[]).filter(function(N){return N!==g.url});e.set({images:P})}}}var v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',f='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function w(){var b=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,z=b+g,h=z>=ii,y=g>0;z>0?(s.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=f):(s.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=v+"<span>Foto\u011Fraf Ekle</span>"),h?(o.style.display="none",d.disabled=!0):(o.style.display="flex",d.disabled=y,o.classList.toggle("ikr-fwizard-photo-add--disabled",y),o.appendChild(d))}d.onchange=async function(b){var g=(e.get().pendingImages||[]).length;if(!(g>0)){var z=e.get().images||[],h=z.length,y=ii-z.length,S=(e.get().images||[]).map(function(V){return""}),C=e.get().pendingImages||[],E=Array.from(b.target.files).slice(0,y);if(E.length!==0){for(var A=[],P=[],N=0;N<E.length;N++){var M=E[N],G=M.name+"_"+M.size,ge=(e.get().fingerprints||[]).some(function(V){return V===G})||A.some(function(V){return V.file.name+"_"+V.file.size===G});if(ge){console.log("[ikr] Duplicate file detected, skipping:",M.name);continue}if(M.size>tt){alert(M.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}var ce=URL.createObjectURL(M);c[ce]=G,A.push({url:ce,file:M,error:null}),P.push({url:ce,file:M});var pe=(e.get().fingerprints||[]).slice();pe.push(G),e.set({fingerprints:pe})}if(A.length!==0){var D=(e.get().pendingImages||[]).concat(A),q=async function(){for(var V=0;V<P.length;V++){var he=P[V],Pe=he.file,B=he.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var ze=(e.get().pendingImages||[]).filter(function(L){return L.url!==B}),te=(e.get().images||[]).slice();te.push(B),e.set({pendingImages:ze,images:te});continue}try{var J=await re(Q+"/api/public/upload/sign",{method:"POST"});if(!J.ok)throw J.status===429?new Error("rate_limit"):new Error("sign failed");var U=await J.json(),K=new FormData;K.append("file",Pe),K.append("api_key",U.api_key),K.append("timestamp",U.timestamp),K.append("signature",U.signature),K.append("folder","review_images");var Oe=await fetch("https://api.cloudinary.com/v1_1/"+U.cloud_name+"/image/upload",{method:"POST",body:K}),be=await Oe.json();if(be.secure_url){var H=(e.get().pendingImages||[]).some(function(L){return L.url===B});if(!H){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}m[be.secure_url]=B,c[be.secure_url]=c[B];var $=(e.get().pendingImages||[]).filter(function(L){return L.url!==B}),Le=(e.get().images||[]).slice();Le.push(be.secure_url),e.set({pendingImages:$,images:Le})}}catch(L){console.error("[ikr] Image upload failed:",L);var Ce=L.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.",T=(e.get().pendingImages||[]).map(function(R){return R.url===B?{url:R.url,file:R.file,error:Ce}:R});e.set({pendingImages:T})}}};if(h===0){i=!0;var X=!r.canNavigate||r.canNavigate();X&&e.goNext()}e.set({pendingImages:D}),q(),d.value=""}}}};var x=e.onChange(l);return l(),{el:a,destroy:function(){i=!0,d.onchange=null,x&&x()}}}var fr=2e3,at=60;function ai(e,r){r=r||{};var i=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Deneyiminizi anlat\u0131n",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=at,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),n.appendChild(s);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=fr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",n.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),n.appendChild(d);function p(){var c=o.value.length;d.textContent=c+"/"+fr,d.classList.toggle("ikr-fwizard-char-counter--max",c>=fr)}function m(){return _e(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),p(),i(m())}),a.appendChild(n),p(),setTimeout(function(){i(m())},0),{el:a,destroy:function(){}}}var nt=40;function ni(e,r){r=r||{};var i=r.onValidityChange||function(){},a=r.onSuccess||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",t.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="ikr-fwizard-input",p.maxLength=nt,p.setAttribute("aria-required","true"),p.value=e.get().author||"",o.appendChild(d),o.appendChild(p),s.appendChild(o);var m=document.createElement("div");m.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",m.appendChild(c),m.appendChild(l),s.appendChild(m);var k=document.createElement("div");k.className="ikr-fwizard-notice",k.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(k);var u=document.createElement("div");u.className="ikr-fwizard-msg",u.setAttribute("role","alert"),u.setAttribute("aria-live","assertive"),s.appendChild(u);var v=document.createElement("button");v.type="button",v.className="ikr-fwizard-submit-btn",v.textContent="G\xF6nder",s.appendChild(v),t.appendChild(s);function f(){return _e(4,e.get())}function w(){var b=!f(),g=(e.get().pendingImages||[]).length,z=g>0;z?(v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled"),v.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(v.disabled=b,v.classList.toggle("ikr-fwizard-submit-btn--disabled",b),v.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),w(),i(f())}),l.addEventListener("input",function(){e.set({email:l.value})}),w(),setTimeout(function(){i(f())},0),v.onclick=async function(){if(!v.disabled){var b=e.get(),g=(b.author||"").trim(),z=(b.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!g){u.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(!b.rating){u.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}v.disabled=!0,v.classList.add("ikr-fwizard-submit-btn--disabled");var h=v.textContent;if(v.textContent="G\xF6nderiliyor\u2026",u.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var y=F(window.location.href),S=b.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),C=await re(Q+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Y,productId:b.productId||null,slug:y||null,productName:S,author:g,title:(b.title||"").trim()||null,comment:z||null,rating:b.rating,images:b.images||[]})},15e3);if(C.ok)a();else{var E=await C.json().catch(function(){return{}});throw new Error(E.error||"Yorum kaydedilemedi.")}}catch(N){var A=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),P=A?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";u.innerHTML='<div class="ikr-fwizard-msg-error">'+P+"</div>",v.disabled=!1,v.classList.remove("ikr-fwizard-submit-btn--disabled"),v.textContent=h}}};var x=e.onChange(w);return{el:t,destroy:function(){v.onclick=null,x&&x()}}}var oi=!1;function ot(){if(!oi){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=$r,document.head.appendChild(e),oi=!0}}function lt(e,r,i){if(i=i||{},e===1)return ri(r,{canNavigate:i.canNavigate});if(e===2)return ti(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger});if(e===3)return ai(r,{onValidityChange:i.onValidityChange});if(e===4)return ni(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function li(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function di(e){e=e||{},ot();var r=Qr({productId:e.productId,productName:e.productName}),i={},a={},t=Jr({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(h){var y=i[h];y&&y.startsWith("blob:")&&URL.revokeObjectURL(y)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),n={ikrReviewModal:!0};window.history.pushState(n,null,"");var s=function(h){t&&t.close&&t.close()};window.addEventListener("popstate",s);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var d=ei({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="ikr-fwizard-layout",p.appendChild(o),p.appendChild(d.el);var m=null,c="idle",l=null,k=!0,u=null;function v(h,y){o.innerHTML="";var S=lt(h,r,{canNavigate:function(){return c==="idle"},blobMap:i,urlToFinger:a,onValidityChange:function(A){d.setNextDisabled(!A)},onSuccess:w});if(m=S,d.update(h,r.get()),y){c="entering",S.el.classList.add("ikr-fwizard-step--enter");var C=null,E=function(){C&&clearTimeout(C),S.el.removeEventListener("animationend",E),S.el.classList.remove("ikr-fwizard-step--enter"),c="idle",l!==null&&x()};S.el.addEventListener("animationend",E),C=setTimeout(E,700)}else c="idle";o.appendChild(S.el),t.setStepAttr&&t.setStepAttr(h),h===3&&d.setNextDisabled(!0)}var f=!1;function w(){if(!f){if(f=!0,!m){o.innerHTML="";var h=li();h.classList.add("ikr-fwizard-step--enter"),o.appendChild(h),t.setStepAttr("thanks"),d.setThanksState(t.close);return}var y=m;c="exiting",y.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(u&&clearTimeout(u),y.el.removeEventListener("animationend",S),y.destroy)try{y.destroy()}catch(E){}m===y&&(m=null),o.innerHTML="";var C=li();C.classList.add("ikr-fwizard-step--enter"),o.appendChild(C),t.setStepAttr("thanks"),d.setThanksState(t.close),c="idle"};y.el.addEventListener("animationend",S),u=setTimeout(S,300)}}function x(){var h=r.get().currentStep;if(c!=="idle"){l=h;return}if(!m){var y=!k;k=!1,v(h,y);return}var S=m;c="exiting",S.el.classList.add("ikr-fwizard-step--exit");var C=function(){if(u&&clearTimeout(u),S.el.removeEventListener("animationend",C),S.destroy)try{S.destroy()}catch(A){}if(m===S){o.innerHTML="",m=null;var E=l!==null?l:r.get().currentStep;l=null,v(E,!0),c="idle"}};S.el.addEventListener("animationend",C),u=setTimeout(C,350)}x();var b=r.get().currentStep,g=r.onChange(function(h){h.currentStep!==b?(b=h.currentStep,x()):d.update(h.currentStep,h)}),z=t.close;return t.close=function(){g&&g(),typeof u!="undefined"&&u&&clearTimeout(u),z()},t.open(p),{close:t.close}}function j(){di({productId:ee||"",productName:ye||""})}var dt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function st(e){var r=e.widget,i=e.data,a=e.settings,t=e.iconPair,n=e.allCount,s=e.ratingCounts,o=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,m=e.currentHasImages,c=e.onFilterChange,l=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var u=(s[3]||0)+(s[4]||0),v=n>0?Math.round(u/n*100):0,f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(f);var w=document.createElement("div");if(w.className="ikr-summary-block ikr-summary-count",w.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(w),a.showRecommendation!==!1&&v>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(x)}return k.appendChild(Ie({ratingCounts:s,allCount:n,iconPair:t,currentRatingFilter:d,onFilterChange:c})),k.appendChild(se({widget:r,currentOrderBy:p,currentHasImages:m,onWriteClick:j,onSortChange:l})),k}var kr={};xe(kr,{css:()=>pt,meta:()=>ct,render:()=>mt});var si=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 */
  /* Ba\u015Fl\u0131k trigger ile ayn\u0131 sol kenardan ba\u015Flas\u0131n \u2014 base .ikr-summary
     padding-left:28px y\u0131ld\u0131z sat\u0131r\u0131n\u0131 i\xE7eride ba\u015Flat\u0131yor; ba\u015Fl\u0131k (.ikr-title
     widget direct child) varsay\u0131lan 0 yan padding ald\u0131\u011F\u0131 i\xE7in kenarda
     kal\u0131yordu. 28px ile hizalan. Mobile theme'de --ikr-pad-summary-mobile
     uygulan\u0131yor zaten \u2014 bu desktop-only override. */
  .ikr-title-compact{text-align:left;}
  @media(min-width:601px){
    .ikr-title-compact{padding-left:28px;}
  }

  /* Compact'te ana .ikr-summary padding'ini s\u0131f\u0131rla \u2014 y\u0131ld\u0131zlar ba\u015Fl\u0131k ile ayn\u0131 sol kenar */
  /* padding-top/bottom 0; yan padding base .ikr-summary mobile blo\u011Fundan gelir
     (--ikr-pad-summary-mobile). Di\u011Fer layoutlarla ayn\u0131 yan bo\u015Fluk. */
  .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding-top:0;padding-bottom:0;}

  .ikr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:8px 0;
  }

  /* Trigger wrap \u2014 popover anchor'\u0131 (position:relative parent) */
  .ikr-compact-trigger-wrap{
    position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;
  }

  .ikr-compact-trigger{
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:8px 0;cursor:pointer;
    font-family:inherit;color:inherit;flex:0 0 auto;
  }
  .ikr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  /* Compact trigger yildizlari kendi degiskeni; global bar-label-size'i etkilemez.
     Fallback bar-label-size, eski davranista geri donus icin. */
  .ikr-compact-trigger-stars .ikr-icon{
    width:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    height:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    color:var(--ikr-review-star-color,#f59e0b);line-height:1;
  }
  .ikr-compact-trigger-text{
    font-size:var(--ikr-review-count-size,16px);
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
     Loox-style: scale(0.7) translateY(-20px) \u2192 scale(1), opacity 0 \u2192 1.
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
    display:flex;flex-direction:column;align-items:center;gap:16px;
    padding:16px 28px 24px;
    border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.10)));
    border-radius:var(--ikr-radius,6px);
    background:var(--ikr-widget-bg,var(--ikr-surface,#fff));
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
      margin-top:8px;
    }
  }
`;var ct={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},pt=si;function mt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var u=document.createElement("div");u.className="ikr-compact-trigger-wrap";var v=document.createElement("button");v.className="ikr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="ikr-compact-trigger-stars">'+oe(s,a)+'</span><span class="ikr-compact-trigger-text">'+t.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',u.appendChild(v),k.appendChild(u);var f=se({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:j,onSortChange:c}),w=f.querySelector(".ikr-filter-wrap"),x=f.querySelector(".ikr-write-btn"),b=document.createElement("div");b.className="ikr-compact-actions-slot",x&&b.appendChild(x),w&&b.appendChild(w),k.appendChild(b),l.appendChild(k);var g=document.createElement("div");g.className="ikr-compact-panel",g.setAttribute("role","dialog"),g.setAttribute("aria-hidden","true");var z=document.createElement("div");z.className="ikr-compact-panel-inner";var h=document.createElement("div");h.className="ikr-compact-avg",h.innerHTML='<span class="ikr-icon">'+a.filled+"</span><span>"+s+"</span>",z.appendChild(h),z.appendChild(Ie({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:o,onFilterChange:m})),g.appendChild(z);var y=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function S(q){var X=q?l:u;g.parentNode!==X&&(g.classList.contains("ikr-open")&&(g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),X.appendChild(g))}if(S(y?y.matches:!1),y){var C=function(q){S(q.matches)};y.addEventListener?y.addEventListener("change",C):y.addListener&&y.addListener(C)}if(x){var E=document.createElement("button");E.className="ikr-write-btn",E.textContent="Yorum Yap",E.onclick=j;var A=document.createElement("div");A.className="ikr-compact-write-row",A.appendChild(E),l.appendChild(A)}function P(){g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function N(){$e(M),g.classList.add("ikr-open"),g.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){g.classList.contains("ikr-open")?P():N()};var M=null;function G(q){M&&(M(),M=null),q||(M=Qe({trigger:u,element:g,close:P}))}if(G(y?y.matches:!1),y){var ge=function(q){G(q.matches)};y.addEventListener?y.addEventListener("change",ge):y.addListener&&y.addListener(ge)}if(i.showRecommendation!==!1){var ce=(n[3]||0)+(n[4]||0),pe=t>0?Math.round(ce/t*100):0;if(pe>0){var D=document.createElement("div");D.className="ikr-summary-block ikr-summary-recommend",D.style.marginTop="8px",D.innerHTML='<span class="ikr-recommend-pct">%'+pe+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(D)}}return l}var gr={};xe(gr,{css:()=>ft,meta:()=>ut,render:()=>vt});var ci=`
  /* Ba\u015Fl\u0131k sola hizali (sol blok \xFCst\xFCne) \u2014 avg+say\u0131+tavsiye ile b\xFCt\xFCnluk kazanir.
     Loox/Yotpo standardi, merkez ba\u015Fl\u0131k bar chart \xFCst\xFCne d\xFCs\xFCyordu. */
  .ikr-title-split{text-align:left;}

  /* Mobile (<=768): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) \u2014 write-btn yan yana filter ile durur. */
  @media(max-width:600px){
    /* Mobile'da split classic gibi davranir -> baslik da classic gibi ortada. */
    .ikr-title-split{text-align:center;}
    .ikr-split-left,.ikr-split-mid{display:contents;}
    /* .ikr-split-right classic'in .ikr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:center;
      gap:var(--ikr-col-gap,8px);
      width:100%;max-width:var(--ikr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=769px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:601px){
    .ikr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      min-width:0;
    }

    .ikr-summary-split{
      display:flex;flex-direction:row;align-items:center;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 0;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .ikr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
    /* Count classic .ikr-summary-count kullanir (font-size/weight/color
       oradan gelir). Burada sadece sola yaslama override. */
    .ikr-split-left .ikr-split-left-count{align-self:flex-start;text-align:left;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .ikr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart okunabilir genislikte: 500px max.
       Full genislik okuma mesafesini uzatiyordu, 500 dengeli. */
    .ikr-split-mid .ikr-summary-bars{
      max-width:500px;width:100%;margin:0;
    }
    /* Bar row sikilastir: satirlar arasi ve satir ici padding daralir.
       Loox/Yotpo tarzi kompakt his. */
    .ikr-split-mid .ikr-summary-bars{gap:2px;}
    .ikr-split-mid .ikr-bar-row{padding:2px 4px;}

    /* Sag: write + filter yan yana */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:center;gap:8px;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{align-self:auto;}
  }
`;var ut={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ft=ci;function vt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+s+"</span>",k.appendChild(u);var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-count ikr-split-left-count",v.textContent=t.toLocaleString("tr-TR")+" Yorum",k.appendChild(v),l.appendChild(k);var f=document.createElement("div");f.className="ikr-split-col ikr-split-mid",f.appendChild(Ie({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:o,onFilterChange:m})),l.appendChild(f);var w=se({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:j,onSortChange:c}),x=w.querySelector(".ikr-filter-wrap"),b=w.querySelector(".ikr-write-btn"),g=document.createElement("div");if(g.className="ikr-split-col ikr-split-right",b&&g.appendChild(b),x&&g.appendChild(x),l.appendChild(g),i.showRecommendation!==!1){var z=(n[3]||0)+(n[4]||0),h=t>0?Math.round(z/t*100):0;if(h>0){var y=document.createElement("div");y.className="ikr-summary-block ikr-summary-recommend",y.innerHTML='<span class="ikr-recommend-pct">%'+h+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(y)}}return l}var hr={};xe(hr,{css:()=>gt,meta:()=>kt,render:()=>ht});var pi=`
  .ikr-title-minimal{text-align:left;}

  .ikr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px 0;
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
  .ikr-minimal-stars .ikr-icon{
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
`;var kt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},gt=pi;function ht(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var p=document.createElement("div");p.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var c=document.createElement("span");c.className="ikr-minimal-avg",c.textContent=t,m.appendChild(c);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=oe(t,i),m.appendChild(l);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=a.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),p.appendChild(m),d.appendChild(p);var u=se({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:j,onSortChange:o}),v=u.querySelector(".ikr-filter-wrap"),f=u.querySelector(".ikr-write-btn"),w=document.createElement("div");if(w.className="ikr-minimal-actions",f&&w.appendChild(f),v&&w.appendChild(v),d.appendChild(w),f){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=j;var b=document.createElement("div");b.className="ikr-minimal-write-row",b.appendChild(x),d.appendChild(b)}return d}var br={};xe(br,{css:()=>xt,meta:()=>bt,render:()=>yt});var mi=`
  .ikr-title-hero{text-align:left;}

  .ikr-summary-hero{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 0;
  }

  .ikr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:16px;min-width:0;
  }
  .ikr-hero-avg{
    font-size:var(--ikr-hero-avg-size,64px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-1px;
  }
  .ikr-hero-meta{
    display:flex;flex-direction:row;align-items:center;gap:12px;min-width:0;
  }
  .ikr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-hero-stars .ikr-icon{
    width:var(--ikr-bar-label-size,22px);height:var(--ikr-bar-label-size,22px);
  }
  .ikr-hero-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;white-space:nowrap;
  }

  .ikr-hero-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .ikr-hero-info{flex:1 1 auto;gap:12px;}
    .ikr-hero-avg{font-size:calc(var(--ikr-hero-avg-size,64px) * 0.75);}
    .ikr-hero-meta{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-hero-actions{flex:0 0 auto;}
    /* Filter info'nun yaninda kalir (sag ust kose), Yorum Yap full-genislik
       alta tek basina duser. Minimal ile ayni pattern. */
    .ikr-hero-actions .ikr-write-btn{display:none;}
    .ikr-hero-write-row{display:flex;width:100%;}
    .ikr-hero-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;var bt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},xt=mi;function yt(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var p=document.createElement("div");p.className="ikr-hero-info";var m=document.createElement("span");m.className="ikr-hero-avg",m.textContent=t,p.appendChild(m);var c=document.createElement("div");c.className="ikr-hero-meta";var l=document.createElement("span");l.className="ikr-hero-stars",l.innerHTML=oe(t,i),c.appendChild(l);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=a.toLocaleString("tr-TR")+" Yorum",c.appendChild(k),p.appendChild(c),d.appendChild(p);var u=se({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:j,onSortChange:o}),v=u.querySelector(".ikr-filter-wrap"),f=u.querySelector(".ikr-write-btn"),w=document.createElement("div");if(w.className="ikr-hero-actions",f&&w.appendChild(f),v&&w.appendChild(v),d.appendChild(w),f){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=j;var b=document.createElement("div");b.className="ikr-hero-write-row",b.appendChild(x),d.appendChild(b)}return d}var er={classic:vr,compact:kr,split:gr,minimal:hr,hero:br};function rr(e){return er[e]||er.classic}function ui(){return Object.keys(er).map(function(e){return er[e].css||""}).join(`
`)}var xr={};xe(xr,{css:()=>zt,meta:()=>wt,render:()=>Ct});function Be(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var t=document.createElement("span");t.className="ikr-reply-label",t.textContent="Ma\u011Faza Sahibi",a.appendChild(t),i.appendChild(a);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var o=!1;s.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),s.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var wt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},zt="";function Ct(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var t=document.createElement("div");t.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ue(e.rating,_),t.appendChild(n);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(s),i.appendChild(a),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",i.appendChild(d);var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=p,i.appendChild(m);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",i.appendChild(c),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){c.style.display="inline";var u=!1;c.onclick=function(){u=!u,m.classList.toggle("ikr-body-clamped",!u),c.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var l=document.createElement("div");l.className="ikr-gallery",e.images.forEach(function(u){if(!(!u||u.indexOf("https://")!==0&&u.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=W(u),v.className="ikr-img",v.setAttribute("data-ikr-img-url",u),(function(f){v.onclick=function(){le(e,f,r)}})(u),l.appendChild(v)}}),i.appendChild(l)}var k=Be(e.merchantReply);return k&&i.appendChild(k),i}var yr={};xe(yr,{css:()=>Et,meta:()=>St,render:()=>Tt});var fi=`
  .ikr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,120px);
    gap:24px;
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
`;var St={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},Et=fi;function Tt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),a=document.createElement("div");a.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var t=document.createElement("div");t.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ue(e.rating,_),t.appendChild(n);var s=document.createElement("span");s.className="ikr-review-list-author-name",s.textContent=e.author||"",t.appendChild(s);var o=document.createElement("span");o.className="ikr-date ikr-review-list-author-date",o.textContent=fe(e.createdAt),t.appendChild(o),a.appendChild(t);var d=document.createElement("div");if(d.className="ikr-review-list-content",e.title){var p=document.createElement("div");p.className="ikr-review-list-title",p.textContent=e.title,d.appendChild(p)}var m=(e.comment||"").trim();if(m){var c=document.createElement("div");c.className="ikr-review-list-body ikr-body-clamped",c.textContent=m,d.appendChild(c);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",d.appendChild(l),requestAnimationFrame(function(){if(c.scrollHeight>c.clientHeight+2){l.style.display="inline";var v=!1;l.onclick=function(){v=!v,c.classList.toggle("ikr-body-clamped",!v),l.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Be(e.merchantReply);if(k&&d.appendChild(k),a.appendChild(d),i){var u=document.createElement("div");u.className="ikr-review-list-media",e.images.forEach(function(v){if(!(!v||v.indexOf("https://")!==0&&v.indexOf("data:image/")!==0)){var f=document.createElement("img");f.src=W(v),f.setAttribute("data-ikr-img-url",v),(function(w){f.onclick=function(){le(e,w,r)}})(v),u.appendChild(f)}}),a.appendChild(u)}return a}var wr={};xe(wr,{css:()=>At,meta:()=>Lt,render:()=>Nt});var vi=`
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
`;var Lt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},At=vi;function Nt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),a=document.createElement("div");a.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var t=document.createElement("div");t.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ue(e.rating,_),t.appendChild(n),e.title){var s=document.createElement("div");s.className="ikr-review-gallery-title",s.textContent=e.title,t.appendChild(s)}var o=document.createElement("div");o.className="ikr-review-gallery-author",o.textContent=e.author||"",t.appendChild(o);var d=document.createElement("div");d.className="ikr-review-gallery-date",d.textContent=fe(e.createdAt),t.appendChild(d);var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=p,t.appendChild(m);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",c.style.cursor="pointer",c.onclick=function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;le(e,f,r)},t.appendChild(c),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(c.style.display="inline")})}if(a.appendChild(t),i){var l=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var u=document.createElement("img");u.src=W(l),u.loading="lazy",u.setAttribute("data-ikr-img-url",l),u.onclick=function(){le(e,l,r)},k.appendChild(u),a.appendChild(k)}var v=Be(e.merchantReply,function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;le(e,f,r)});return v&&(v.classList.add("ikr-review-gallery-reply"),a.appendChild(v)),a}var ir={card:xr,list:yr,gallery:wr};function tr(e){return ir[e]||ir.card}function ki(){return Object.keys(ir).map(function(e){return ir[e].css||""}).join(`
`)}function ie(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var a=parseInt(i[1],16),t=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+a+","+t+","+n+","+r+")"}var gi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},hi={small:80,medium:110,large:140};function It(e,r){var i=r.bgColor||"#ffffff",a=r.textColor||"#111111",t=r.replyBgColor||"#f9fafb",n=r.headerTitleColor||"#111111",s=r.headerAvgColor||"#111111",o=r.headerCountColor||"#111111",d=r.headerRecommendColor||"#111111",p=r.barFillColor||"#111111",m=r.barTrackColor||"#e5e7eb",c=r.starEmptyColor||"#e5e7eb",l=r.barCountColor||"#111111",k=ie(p,.06),u=r.btnBgColor||"#111111",v=r.btnTextColor||"#ffffff",f=r.btnBorderColor||"#111111",w=r.filterBtnBgColor||"#111111",x=r.filterBtnTextColor||"#ffffff",b=r.filterBtnBorderColor||"#111111",g=r.filterMenuBgColor||"#ffffff",z=r.filterMenuBorderColor||"#e5e7eb",h=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",S=r.filterItemActiveColor||"#111111",C=r.reviewTitleColor||"#111111",E=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#111111",P=r.reviewBodyColor||"#111111",N=r.reviewBorderColor||"#e5e7eb",M=r.reviewStarColor||"#f59e0b",G=r.replyBgColor||"#f9fafb",ge=r.replyBorderColor||"#747474",ce=r.replyLabelColor||"#111111",pe=r.replyTextColor||"#111111",D=r.photoTitleColor||"#111111",q=ie("#111111",.05),X=r.photoArrowBgColor||"#ffffff",V=r.photoArrowTextColor||"#111111",he=ie("#111111",.12),Pe=r.formBgColor||"#ffffff",B=r.formTextColor||"#111111",ze=ie(B,.72),te=r.inputBgColor||"#ffffff",J=r.inputTextColor||B,U=r.inputBorderColor||ie(B,.2),K=r.placeholderColor||ie(B,.42),Oe=r.formStepBarColor||"#111111",be=r.formCtaBgColor||"#111111",H=r.formCtaTextColor||"#ffffff",$=r.formCtaBorderColor||"#111111",Le=r.formNavTextColor||"#111111",Ce=ie(Le,.06),T=ie(B,.06),L=r.loadMoreBgColor||"#ffffff",R=r.loadMoreTextColor||"#111111",Z=r.loadMoreBorderColor||"#111111",or=r.modalBgColor||"#ffffff",Oi="#00000080",Hi=r.modalCloseTextColor||"#ffffff",Fi="#ffffff33",ji="#00000059",Di=r.modalNavTextColor||"#ffffff",qi="#ffffff33",Ar={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":n,"--ikr-header-avg":s,"--ikr-header-count":o,"--ikr-header-recommend":d,"--ikr-bar-fill":p,"--ikr-bar-track":m,"--ikr-star-empty-color":c,"--ikr-bar-count":l,"--ikr-bar-hover-bg":k,"--ikr-btn-bg":u,"--ikr-btn-text":v,"--ikr-btn-border":f,"--ikr-filter-btn-bg":w,"--ikr-filter-btn-text":x,"--ikr-filter-btn-border":b,"--ikr-filter-menu-bg":g,"--ikr-filter-menu-border":z,"--ikr-filter-item-text":h,"--ikr-filter-item-hover-bg":y,"--ikr-filter-item-active":S,"--ikr-review-title":C,"--ikr-review-author":E,"--ikr-review-date":A,"--ikr-review-body":P,"--ikr-review-border":N,"--ikr-review-star-color":M,"--ikr-reply-bg-color":G,"--ikr-reply-border":ge,"--ikr-reply-label":ce,"--ikr-reply-text":pe,"--ikr-photo-title":D,"--ikr-photo-image-border":q,"--ikr-photo-arrow-bg":X,"--ikr-photo-arrow-text":V,"--ikr-photo-arrow-border":he,"--ikr-fwizard-bg":Pe,"--ikr-fwizard-text":B,"--ikr-fwizard-muted":ze,"--ikr-fwizard-input-bg":te,"--ikr-fwizard-input-text":J,"--ikr-fwizard-input-border":U,"--ikr-fwizard-placeholder":K,"--ikr-fwizard-close-text":ze,"--ikr-fwizard-close-hover-bg":T,"--ikr-fwizard-progress-bg":T,"--ikr-fwizard-progress-active":Oe,"--ikr-fwizard-cta-bg":be,"--ikr-fwizard-cta-text":H,"--ikr-fwizard-cta-border":$,"--ikr-fwizard-nav-text":Le,"--ikr-fwizard-nav-hover-bg":Ce,"--ikr-load-more-bg":L,"--ikr-load-more-text":R,"--ikr-load-more-border":Z,"--ikr-modal-bg":or,"--ikr-modal-close-bg":Oi,"--ikr-modal-close-text":Hi,"--ikr-modal-close-border":Fi,"--ikr-modal-nav-bg":ji,"--ikr-modal-nav-text":Di,"--ikr-modal-nav-border":qi,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":a,"--ikr-text-faint":ie(a,.45),"--ikr-border":ie(a,.12),"--ikr-track-bg":ie(a,.22),"--ikr-reply-bg":t};Object.keys(Ar).forEach(function(Nr){e.style.setProperty(Nr,Ar[Nr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function ke(e,r,i,a,t,n,s){if(pr){Ze({productId:e,settings:r,reviewsData:i,productName:a,orderBy:t,page:n,badgeSettings:s});return}Ke(!0),_r(e),Br(r),s!==void 0&&Rr(s),Mr(a),t&&Ae(t),n&&Te(n),i!=null&&Pr(i);try{let Ce=function(T,L){if(!(!T||!T.meta||!T.meta.sizeOverrides)){var R=T.meta.sizeOverrides[L];R&&Object.keys(R).forEach(function(Z){l.style.setProperty(Z,R[Z])})}};var Le=Ce,o=rr(r.summaryLayout),d=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),p=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=d&&p?m:"",l=document.documentElement;It(l,r),Yr("#111111",Wr+ui()+ki());var k=r.borderRadius!==void 0?r.borderRadius:8,u=gi[r.size]||gi.medium,v=hi[r.thumbnailSize]||hi.medium;l.style.setProperty("--ikr-title-size",u.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",u.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),l.style.setProperty("--ikr-radius",k+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,k-4)+"px"),l.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),l.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",v+"px");var f=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",f),l.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),Ce(rr(r.summaryLayout),r.size),Ce(tr(r.reviewLayout),r.size);var w=Ne(r),x=document.getElementById("ikas-reviews");if(!x){var b=document.getElementById("ikas-reviews-anchor");if(!b)return;x=document.createElement("div"),x.id="ikas-reviews",x.style.minHeight="200px",b.appendChild(x)}if(r.enabled===!1){x.style.minHeight="auto",x.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ke(!1);var g=Fe;Ze(null),g&&ke(g.productId,g.settings,g.reviewsData,g.productName,g.orderBy,g.page,g.badgeSettings);return}x.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var z=i||{},h=z.data&&z.data.reviews||[],y=z.data&&z.data.totalCount||0,S=x.cloneNode(!1);x.parentNode.replaceChild(S,x),x=S;var C=document.createElement("div");if(C.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(C.style.width="100%",C.style.maxWidth="100%",C.style.marginLeft="0",C.style.marginRight="0"),c){var E=document.createElement("div"),A=r.summaryLayout||"classic";E.className="ikr-title ikr-title-"+A,E.textContent=c,C.appendChild(E)}var P=z.data&&z.data.allCount||0,N=z.data&&z.data.ratingCounts||null,M=N||[0,0,0,0,0],G=z.data&&z.data.avgRating||"0.0";if(!N&&h.length>0){h.forEach(function(T){T.rating>=1&&T.rating<=5&&M[T.rating-1]++});var ge=h.reduce(function(T,L){return T+L.rating},0);G=(ge/h.length).toFixed(1)}if(P>0){var ce=rr(r.summaryLayout),pe=ce.render({widget:C,data:z,settings:r,iconPair:w,allCount:P,ratingCounts:M,avgRatingVal:G,currentRatingFilter:Se,currentOrderBy:ae,currentHasImages:Ee,onFilterChange:async function(T){Ue(Se===T?null:T),Te(1);var L=await Ge(ee,ae,1,Se,Ee);await ke(ee,_,L,ye,ae,1)},onSortChange:async function(T,L){Te(1),L?(cr(!0),Ae("newest")):(cr(!1),Ae(T));var R=await Ge(ee,ae,1,Se,Ee);await ke(ee,_,R,ye,ae,1)}});C.appendChild(pe)}else{var D=document.createElement("button");D.className="ikr-write-btn",D.style.cssText="display:block;margin:16px auto 0;",D.textContent="Yorum Yap",D.onclick=j,C.appendChild(D)}var q=h.filter(function(T){return T.images&&Array.isArray(T.images)&&T.images.some(function(L){return L&&(L.indexOf("https://")===0||L.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!Ee&&q.length>0){var X=document.createElement("div");if(X.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var V=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",he=document.createElement("div");he.className="ikr-photo-title",he.textContent=V,X.appendChild(he)}var Pe=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",Pe);var B=document.createElement("div");B.className="ikr-photo-strip";var ze=0;q.forEach(function(T){if(!(ze>=10)){var L=T.images.find(function(Z){return Z&&(Z.indexOf("https://")===0||Z.indexOf("data:image/")===0)});if(L){var R=document.createElement("img");R.src=W(L),R.className="ikr-photo-strip-thumb",R.alt="Yorum foto\u011Fraf\u0131",(function(Z,or){R.onclick=function(){le(or,Z,h)}})(L,T),B.appendChild(R),ze++}}});var te=document.createElement("button");te.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",te.innerHTML="&#8249;",te.setAttribute("aria-label","\xD6nceki"),te.onclick=function(){B.scrollBy({left:-200,behavior:"smooth"})};var J=document.createElement("button");J.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",J.innerHTML="&#8250;",J.setAttribute("aria-label","Sonraki"),J.onclick=function(){B.scrollBy({left:200,behavior:"smooth"})};var U=document.createElement("div");U.className="ikr-photo-strip-wrap",U.appendChild(te),U.appendChild(B),U.appendChild(J),X.appendChild(U),C.appendChild(X)}if(h.length===0){var K=document.createElement("p");K.className="ikr-state-msg",K.textContent="Hen\xFCz yorum yok.",C.appendChild(K)}else{var Oe=tr(r.reviewLayout);h.forEach(function(T){C.appendChild(Oe.render(T,h))})}var be=z.data&&z.data.hasMore;if(be){var H=document.createElement("button");H.className="ikr-load-more",H.textContent="Daha Fazla G\xF6ster",H.onclick=async function(){H.disabled=!0,H.textContent="Y\xFCkleniyor...";var T=He+1,L=await Ge(ee,ae,T,Se,Ee);if(L&&L.data&&L.data.reviews){Te(T);var R=tr(_.reviewLayout);L.data.reviews.forEach(function(Z){C.insertBefore(R.render(Z,L.data.reviews),H)}),L.data.hasMore?(H.disabled=!1,H.textContent="Daha Fazla G\xF6ster"):H.remove()}else H.remove()},C.appendChild(H)}x.appendChild(C),Zr(P>0?G:null,y,a,dr)}catch(T){console.error("[ikr] render error:",T),x.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ke(!1),Fe){var $=Fe;Ze(null),ke($.productId,$.settings,$.reviewsData,$.productName,$.orderBy,$.page,$.badgeSettings)}}}var we="ikr_settings_"+Y,_t=300*1e3,Bt=30*1e3;async function Cr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||Q,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var a=await re(e+"/api/preview/settings");if(a.ok){var t=await a.json();return t.widgets&&t.widgets.reviews&&Object.keys(i).length&&(t.widgets.reviews=Object.assign({},t.widgets.reviews,i)),t}}catch(m){}return null}var n=null,s=qe(we);if(s)try{var o=JSON.parse(s);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<Bt)return null;O(we,"")}else if(o.v){if(Date.now()-o.t<_t)return o.v;n=o.v,O(we,"")}else O(we,"");else O(we,"")}catch(m){O(we,"")}try{var d=await re(Q+"/api/public/settings?publicApiKey="+encodeURIComponent(Y));if(!d.ok)return d.status===404&&O(we,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var p=await d.json();return O(we,JSON.stringify({t:Date.now(),v:p})),p}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var Rt=60*1e3;async function Ge(e,r,i,a,t){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||Q,s=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),o=await re(s);if(o.ok)return await o.json()}catch(v){}return null}r=r||"newest",i=i||1;var d="ikr_reviews_"+Y+"_"+e+"_"+r+"_"+i+"_"+(a||"")+"_"+(t?"1":"0"),p=null,m=qe(d);if(m)try{var c=JSON.parse(m);if(c&&c.t!==void 0&&c.v){if(Date.now()-c.t<Rt)return c.v;p=c.v,O(d,"")}else O(d,"")}catch(v){O(d,"")}try{var l=Q+"/api/public/reviews?storeId="+encodeURIComponent(Y)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(a?"&rating="+encodeURIComponent(a):"")+(t?"&hasImages=true":""),k=await re(l);if(!k.ok)return p||null;var u=await k.json();return O(d,JSON.stringify({t:Date.now(),v:u})),u}catch(v){return console.error("[ikr] fetchReviews error:",v),p||null}}var zr={};async function Re(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!zr[e]){zr[e]=!0;var t={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await Cr();if(!s)return;var o=s.widgets&&s.widgets.reviews||t,d=s.widgets&&s.widgets.badge||n;if(o.enabled===!1)return;Ae("newest"),Te(1),Ue(null);var p=await Ge(e,"newest",1,null);await ke(e,o,p,r,"newest",1,d)}catch(m){console.error("[ikr] bootstrap error:",m),await ke(e,t,null,r,void 0,void 0,n)}finally{delete zr[e]}}}function Sr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(a){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function bi(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var a=i.getAttribute("href");if(!a||a.charAt(0)==="#"||a.charAt(0)==="?")return;var t=F(i.href);if(!t||r[t]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(t)||Je.test(t))return;r[t]=!0,e[t]=null}catch(n){}}),Object.keys(je).forEach(function(i){e[i]=je[i]}),e}var Mt=300*1e3,xi=50;async function yi(e){var r="ikr_ratings_"+Y,i={},a=qe(r);if(a)try{var t=JSON.parse(a);t&&t.t!==void 0&&Date.now()-t.t<Mt?i=t.v||{}:O(r,"")}catch(p){O(r,"")}var n=e.filter(function(p){return!i[p]});if(!n.length)return i;for(var s=[],o=0;o<n.length;o+=xi)s.push(n.slice(o,o+xi));var d=await Promise.all(s.map(function(p){var m=Q+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(Y)+"&slugs="+p.map(encodeURIComponent).join(",");return re(m).then(function(c){return c.ok?c.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(p){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(p).forEach(function(m){i[m]=p[m]})}),O(r,JSON.stringify({t:Date.now(),v:i})),i}var Pt="var(--ikr-badge-color,#f59e0b)",wi=13,Ot="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function Ht(e){var r=Ye("star","classic"),i="width:"+wi+"px;height:"+wi+"px;";return'<span style="color:'+Pt+';display:inline-flex;align-items:center;">'+oe(e,r,{sizeStyle:i})+"</span>"}function Ve(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=Ot+"justify-content:"+(r||"flex-start")+";",i.innerHTML=Ht(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var zi=".product-name",Ci=".add-to-basket-modal",Si="h1.product-name",ar=".single-product-container-main",Er=".single-product-product-name",Ei=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Ti=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Li='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Ft=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Tr(e,r){var i=e.querySelector(zi);if(i)return i;if(e.matches&&e.matches(Li))return e;var a=e.querySelector(Li);if(a)return a;if(r){for(var t=e.querySelectorAll("*"),n=0;n<t.length;n++)if(t[n].children.length===0&&t[n].textContent.trim()===r)return t[n]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<s.length;o++){var d=s[o],p=d.textContent.trim();if(!(!p||p.length<2||p.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(p)&&!Ft.test(p)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function jt(e,r,i,a){if(!e.getAttribute("data-ikr-badge")){var t=F(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(ar)&&!e.closest(Er)){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.closest(Er)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ei)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(u){return u.nodeType===3}).map(function(u){return u.textContent.trim()}).join("").trim(),o=!!Tr(e,i);if(!s&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(u){u.setAttribute("data-ikr-badge","1")});var d=Tr(e,i);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var p=window.getComputedStyle(d).textAlign;d.appendChild(Ve(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"));return}var m=Tr(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var c=window.getComputedStyle(m).textAlign;m.appendChild(Ve(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"))}else{var l=Ve(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(l,k):e.appendChild(l)}}}function Dt(e,r){var i=document.querySelector(Ci);if(i){var a=i.querySelector(Si);if(!(!a||a.querySelector("[data-ikr-listing-badge]"))){var t=null;if(De&&r[De]&&(t=De),!t){var n=F(window.location.pathname);n&&r[n]&&(t=n)}if(!t){var s=a.textContent.trim();Object.keys(e).forEach(function(c){if(!t){var l=e[c];l&&l.trim()===s&&r[c]&&(t=c)}})}if(!t){var o=document.querySelector(ar);if(o){var d=o.querySelector("a[href]");if(d){var p=F(d.href);p&&r[p]&&(t=p)}}}if(!t){var m=a.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(c){if(!t&&!(c.closest("header")||c.closest("nav"))&&!c.closest(ar)){var l=c.textContent.trim().toLowerCase();if(l&&l===m){var k=F(c.href);k&&r[k]&&(t=k)}}})}!t||!r[t]||r[t]._empty||r[t].count===0||a.appendChild(Ve(r[t],"flex-start"))}}}function Ai(e,r){var i=F(window.location.pathname),a=document.querySelectorAll(Ti),t=[];a.forEach(function(n){n.tagName==="A"&&n.href?t.push(n):n.querySelectorAll("a[href]").forEach(function(s){t.push(s)})}),Object.keys(e).forEach(function(n){var s=r[n];if(!(!s||s._empty||s.count===0)){var o=e[n];t.forEach(function(d){F(d.href)===n&&jt(d,s,o,i)})}}),Dt(e,r)}async function Me(){if(I.inProgress){I.queued=!0;return}if(!I.rendered){I.rendered=!0,I.inProgress=!0;try{var e=I.navCleanup;e&&(I.navCleanup=!1);var r=bi();if(!Object.keys(r).length){I.rendered=!1;return}var i=await Promise.all([Cr(),yi(Object.keys(r))]),a=i[0];if(!a){I.rendered=!1;return}var t=i[1],n=a&&a.widgets||{},s=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){I.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),Ai(r,t)}finally{I.inProgress=!1,I.queued&&(I.queued=!1,I.rendered=!1,Me())}}}var Ni=!1,Ii=!1;function Ri(){Ii||(Ii=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=F(r.href);!i||i.length<3||Or(i)}},!0))}var _i=!1,Bi=typeof location!="undefined"?location.pathname:"";function nr(){try{if(location.pathname===Bi)return;Bi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function qt(){if(!_i){_i=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return nr(),i},history.replaceState=function(){var i=r.apply(this,arguments);return nr(),i},window.addEventListener("popstate",nr),window.addEventListener("hashchange",nr)}}function Lr(){if(qt(),window.IkasEvents){if(Ni)return;Ni=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var s=n.data&&n.data.productDetails;Array.isArray(s)&&s.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(je[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var o=n.data&&n.data.productDetail&&n.data.productDetail.id,d=n.data&&n.data.productDetail&&n.data.productDetail.name;o&&(O("ikr_reviews_"+Y+"_"+o,""),Re(o,d))}if(n&&n.type==="PAGE_VIEW"){var p=Date.now();if(I.lastPageView&&p-I.lastPageView<800)return;I.lastPageView=p,I.navCleanup=!0,I.rendered=!1,Me()}}});var e=Sr();if(e)Re(e.id,e.name);else{let n=function(){var s=Sr();s?Re(s.id,s.name):r<20&&(r++,setTimeout(n,100))};var a=n,r=0;setTimeout(n,100)}setTimeout(function(){I.rendered||Me()},2e3)}else{let n=function(){window.IkasEvents?Lr():i<100&&(i++,setTimeout(n,50))};var t=n,i=0;setTimeout(n,50)}}var Mi=null;function Pi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(a){return Array.from(a.addedNodes).some(function(t){return!(t.nodeType!==1||t.hasAttribute&&(t.hasAttribute("data-ikr-listing-badge")||t.id==="ikr-rating-badge"||t.id==="ikr-reviews-widget")||t.closest&&(t.closest("[data-ikr-listing-badge]")||t.closest("#ikr-rating-badge")||t.closest("#ikr-reviews-widget"))||t.querySelector&&t.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Mi),Mi=setTimeout(function(){var a=Array.from(document.querySelectorAll("a[href]")).some(function(t){if(t.getAttribute("data-ikr-badge"))return!1;var n=F(t.href);return n&&n.length>=3&&!Je.test(n)});a&&(I.rendered=!1,Me())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Yt=window.__ikasPreviewMode===!0;if(Yt){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Re("mock-product","\xD6rnek \xDCr\xFCn"),e()};Gt=e,Vt=r,window.addEventListener("message",function(i){var a=i.data;if(!(!a||a.type!=="IKR_SETTINGS_UPDATE")){var t=a.settings;if(!(!t||!_)){var n=Object.assign({},_,t);ke(ee,n,sr,ye,ae,He)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(Y){let e=function(){Lr(),Ri(),Pi()};Ut=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Gt,Vt,Ut;})();
