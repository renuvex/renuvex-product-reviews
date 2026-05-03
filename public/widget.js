/* ikas Reviews Widget — built 2026-05-03T21:48:49.243Z | theme: default */
"use strict";(()=>{var Ui=Object.defineProperty;var we=(e,r)=>{for(var i in r)Ui(e,i,{get:r[i],enumerable:!0})};var Vi=typeof document!="undefined",Rr=Vi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,pr=Rr?Rr.src:"",Ki=new URLSearchParams(pr.split("?")[1]||""),H=Ki.get("publicApiKey"),U=pr?pr.split("?")[0].replace(/\/widget\.js$/,""):"";var oe="newest",je=1,Le=null,Ae=!1,te=null,N=null,mr=null,ze=null,ur=null;function Me(e){oe=e}function Ne(e){je=e}function We(e){Le=e}function fr(e){Ae=e}function Pr(e){te=e}function Or(e){N=e}function Hr(e){mr=e}function Fr(e){ze=e}function qr(e){ur=e}var vr=!1,De=null;function Xe(e){vr=e}function Je(e){De=e}var B={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Ye={},Ge=null;function jr(e){Ge=e}var Dr={};function Ue(e){try{return sessionStorage.getItem(e)}catch(r){return Dr[e]||null}}function R(e,r){try{sessionStorage.setItem(e,r)}catch(i){Dr[e]=r}}var ke="0 -960 960 960",le={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function $e(e){return'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Yr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+le.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+le.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+le.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+le.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+le.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+le.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+le.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+le.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+le.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+ke+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+le.heartOutline+'"/></g></svg>'}}}};function Zi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Ve(e,r){var i=Yr[e]||Yr.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function Ie(e){var r=e&&e.reviewIcon||"star",i=Zi(r),t=i.style||e&&e.reviewIconStyle||"classic";return Ve(i.type,t)}function Ur(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=Ie(r),n=i&&i.sizePx,d=n?"width:"+n+"px;height:"+n+"px;":"",o="",c=1;c<=5;c++){var p=c<=t;o+='<span class="ikr-icon '+(p?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+d+'">'+(p?a.filled:a.empty)+"</span>"}return o}var Qe={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},Gr={lines:{label:"\xC7izgili",svg:$e(Qe.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:$e(Qe.linesAlt)},funnel:{label:"Huni",svg:$e(Qe.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:$e(Qe.dense)}};function Vr(e){var r=Gr[e]||Gr.lines;return r.svg}var er="var(--ikr-review-star-color,#f59e0b)",rr=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function P(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ge(e,r){var i="color:"+er+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Ur(e,r)+"</span>"}function de(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,d=n<.25?a:n<.75?a+.5:a+1,o=d/5*100,c=i&&i.sizeStyle||"",p="",m="",s=0;s<5;s++)p+='<span class="ikr-icon" style="'+c+'">'+r.filled+"</span>",m+='<span class="ikr-icon" style="'+c+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+p+'</span><span class="ikr-stars-partial-fill" style="width:'+o+'%;">'+m+"</span></span>"}function he(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Wi(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Xi(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Wi(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Zr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Xi(e)}function J(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Wr(e,r,i,t){var a=Ie(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),d=document.createElement("div");if(d.className="ikr-rating"+(r?" ikr-rating-interactive":""),d.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){d.style.flexDirection="row";for(var o=1;o<=5;o++){var c=document.createElement("span");c.className="ikr-icon",c.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(o<=e?er:"#ddd")+";",c.innerHTML=o<=e?a.filled:a.empty,d.appendChild(c)}return d}for(var p=5;p>=1;p--)(function(m){var s=document.createElement("input");s.type="radio",s.name=n,s.value=String(m),s.id=n+"-"+m,s.className="ikr-rating-input",m===e&&(s.checked=!0),s.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",s.addEventListener("change",function(){i&&i(m)});var l=document.createElement("label");l.htmlFor=s.id,l.className="ikr-rating-label",l.setAttribute("aria-label",m+" y\u0131ld\u0131z"),l.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",l.addEventListener("click",function(k){k.preventDefault();for(var v=d.querySelectorAll(".ikr-rating-input"),f=0;f<v.length;f++)v[f].checked=!1;s.checked=!0,i&&i(m)}),l.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+er+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",l.style.position="relative",d.appendChild(s),d.appendChild(l)})(p);return Ji(),d}var Kr=!1;function Ji(){if(!Kr){Kr=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+er+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function V(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Xr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function $i(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=ge(e.rating,N);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=he(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var d=document.createElement("div");d.className="ikr-modal-title",d.textContent=e.title||"",d.style.display=e.title?"":"none",i.appendChild(d);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var c=document.createElement("div");c.className="ikr-modal-body",c.textContent=(e.comment||"").trim(),c.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(c);var p=document.createElement("div");p.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var s=document.createElement("div");return s.className="ikr-modal-reply-text",s.textContent=e.merchantReply||"",p.appendChild(m),p.appendChild(s),p.style.display=e.merchantReply?"":"none",i.appendChild(p),r.appendChild(i),r}function Qi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ge(r.rating,N),i.querySelector(".ikr-modal-date").textContent=he(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function kr(e,r,i,t,a,n,d,o){var c=e.images&&Array.isArray(e.images)?e.images.filter(function(y){return y&&(y.indexOf("https://")===0||y.indexOf("data:image/")===0)}):[],p=Math.min(i,c.length-1),m=document.createElement("div");m.className="ikr-modal-left";var s=document.createElement("img"),l=d==="next"?"ikr-modal-img-enter-right":d==="prev"?"ikr-modal-img-enter-left":"";s.className="ikr-modal-main-img"+(l?" "+l:""),s.src=J(c[p]||""),s.alt="Yorum foto\u011Fraf\u0131",m.appendChild(s);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(y){y.stopPropagation(),n()},m.appendChild(k);var v=0;if(m.addEventListener("touchstart",function(y){v=y.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(y){var E=v-y.changedTouches[0].clientX;if(!(Math.abs(E)<50)){if(E>0){if(z)be(e,r,p+1,t,a,n,!0,"next",o);else if(b){var T=t[r+1];be(T,r+1,0,t,a,n,!1,"next",o)}}else if(u)be(e,r,p-1,t,a,n,!0,"prev",o);else if(w){var S=t[r-1],M=(S.images||[]).filter(function(A){return A&&(A.indexOf("https://")===0||A.indexOf("data:image/")===0)});be(S,r-1,M.length-1,t,a,n,!1,"prev",o)}}},{passive:!0}),c.length>1){var f=document.createElement("div");f.className="ikr-modal-thumbs",c.forEach(function(y,E){var T=document.createElement("img");T.src=J(y),T.className="ikr-modal-thumb"+(E===p?" ikr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(E+1),(function(S){T.onclick=function(){be(e,r,S,t,a,n,!0,null,o)}})(E),f.appendChild(T)}),m.appendChild(f)}var u=p>0,z=p<c.length-1,w=r>0,b=r<t.length-1,h=u||w,C=z||b;if(h||C){var x=document.createElement("button");x.className="ikr-modal-nav ikr-modal-nav-prev",x.innerHTML="&#8249;",x.setAttribute("aria-label","\xD6nceki"),x.style.opacity=h?"1":"0.3",x.onclick=function(y){if(y.stopPropagation(),u)be(e,r,p-1,t,a,n,!0,"prev",o);else if(w){var E=t[r-1],T=(E.images||[]).filter(function(S){return S&&S.indexOf("https://")===0});be(E,r-1,T.length-1,t,a,n,!1,"prev",o)}},m.appendChild(x);var g=document.createElement("button");g.className="ikr-modal-nav ikr-modal-nav-next",g.innerHTML="&#8250;",g.setAttribute("aria-label","Sonraki"),g.style.opacity=C?"1":"0.3",g.onclick=function(y){if(y.stopPropagation(),z)be(e,r,p+1,t,a,n,!0,"next",o);else if(b){var E=t[r+1];be(E,r+1,0,t,a,n,!1,"next",o)}},m.appendChild(g)}return m}function Jr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=J(a[0]))}})}function be(e,r,i,t,a,n,d,o,c){if(d){var p=kr(e,r,i,t,a,n,o,c);a.firstChild&&a.replaceChild(p,a.firstChild)}else{var p=kr(e,r,i,t,a,n,o,c),m=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(p,a.firstChild),m&&Qi(m,e);var s=c&&c.querySelector(".ikr-modal-wrap");s&&(s.scrollTop=0)}Jr(r,t)}function se(e,r,i){var t=(i||[]).filter(function(u){return u.images&&Array.isArray(u.images)&&u.images.some(function(z){return z&&(z.indexOf("https://")===0||z.indexOf("data:image/")===0)})}),a=t.findIndex(function(u){return u===e||u.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(u){return u&&(u.indexOf("https://")===0||u.indexOf("data:image/")===0)}):[],d=Math.max(0,n.indexOf(r)),o=document.createElement("div");o.className="ikr-modal-overlay";var c=document.createElement("div");c.className="ikr-modal";var p=!1;function m(){p||(p=!0,Xr(o,s,m))}function s(u){u.key==="Escape"&&l()}function l(){p||(p=!0,history.go(-1),Xr(o,s,m))}document.addEventListener("keydown",s);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),o.onclick=function(){l()},c.onclick=function(u){u.stopPropagation()},c.appendChild(kr(e,a,d,t,c,l,null,o)),c.appendChild($i(e)),Jr(a,t);var v=document.createElement("div");v.className="ikr-modal-wrap",v.appendChild(c);var f=document.createElement("button");f.className="ikr-modal-close",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(u){u.stopPropagation(),l()},v.appendChild(f),o.appendChild(v),document.body.appendChild(o)}function $r(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),d=i.querySelector("#ikr-comment-counter");function o(){var f=n.value.length;d.textContent=f+"/2000",d.classList.toggle("ikr-char-counter--max",f>=2e3)}n.addEventListener("input",o);var c=Wr(0,!0,function(f){t=f},N);i.querySelector("#ikr-stars-input").appendChild(c);var p=i.querySelector("#ikr-file-input"),m=i.querySelector("#ikr-photo-previews"),s=!1,l=i.querySelector("label.ikr-photo-btn"),k=3;function v(){var f=a.length;f>=k?(p.disabled=!0,l&&(l.style.opacity="0.4")):(p.disabled=!1,l&&(l.style.opacity="1"))}return p.onchange=async function(f){if(!s){s=!0,p.disabled=!0;var u=k-a.length,z=Array.from(f.target.files).slice(0,u);for(let b=0;b<z.length;b++){let h=z[b];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let C=document.createElement("div");C.className="ikr-preview-item";let x=URL.createObjectURL(h);C.innerHTML='<img class="ikr-preview-img" src="'+x+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',m.appendChild(C);let g=C.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(x),g.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){g.style.opacity="0",g.style.transition="opacity 0.4s",setTimeout(function(){g.style.display="none";let y=document.createElement("button");y.className="ikr-preview-remove",y.innerHTML="&#x2715;",y.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),y.onclick=function(){a=a.filter(function(E){return E!==x}),C.remove(),v()},C.appendChild(y)},400)},800);continue}try{let y=await V(U+"/api/public/upload/sign",{method:"POST"});if(!y.ok)throw y.status===429?new Error("rate_limit"):new Error("sign failed");let E=await y.json(),T=new FormData;T.append("file",h),T.append("api_key",E.api_key),T.append("timestamp",E.timestamp),T.append("signature",E.signature),T.append("folder","review_images");let M=await(await fetch("https://api.cloudinary.com/v1_1/"+E.cloud_name+"/image/upload",{method:"POST",body:T})).json();if(M.secure_url){let A=M.secure_url;a.push(A),g.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){g.style.opacity="0",g.style.transition="opacity 0.4s",setTimeout(function(){g.style.display="none";let I=document.createElement("button");I.className="ikr-preview-remove",I.innerHTML="&#x2715;",I.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),I.onclick=function(){a=a.filter(function(Y){return Y!==A}),C.remove(),v()},C.appendChild(I)},400)},800)}}catch(y){console.error("[ikr] Image upload failed:",y);var w=y.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";g.innerHTML='<span class="ikr-upload-error">\u2717 '+w+"</span>"}}s=!1,p.value="",v()}},i.querySelector("#ikr-submit").onclick=async function(){var f=this,u=i.querySelector("#ikr-name").value.trim(),z=i.querySelector("#ikr-title").value.trim(),w=i.querySelector("#ikr-comment").value.trim(),b=i.querySelector("#ikr-msg");if(!t){b.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!u){b.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(f.disabled=!0,f.textContent="G\xF6nderiliyor\u2026",b.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=P(window.location.href),C=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),x=await V(U+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:e,slug:h||null,productName:C,author:u,title:z||null,comment:w,rating:t,images:a})},15e3);if(x.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var g=await x.json().catch(function(){return{}});throw new Error(g.error||"Yorum kaydedilemedi.")}}catch(S){var y=S&&(S.name==="AbortError"||/signal/i.test(S.message||"")),E=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":S.message||"Yorum g\xF6nderilemedi.",T=document.createElement("div");T.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",T.textContent=E,b.innerHTML="",b.appendChild(T),f.disabled=!1,f.textContent="G\xF6nder"}},i}function Qr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var ei={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function et(e,r,i,t,a){var n=Ve(r,i),d="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+de(e,n,{sizeStyle:d})+"</span>"}function ri(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var d=document.createElement("script");d.id="ikr-jsonld",d.type="application/ld+json",d.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(d);var o=Qr(i);if(!(!o||!o.parentNode)){var c=t&&t.icon||"star",p=t&&t.iconStyle||"classic",m=t&&t.size||"medium",s=t&&t.color||"#f59e0b",l=ei[m]||ei.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var v=window.getComputedStyle(o).textAlign,f=v==="center"?"center":v==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+f+";",k.innerHTML=et(e,c,p,s,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(u){u.preventDefault();var z=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(z){var w=document.querySelector("header"),b=w?w.getBoundingClientRect().height:0,h=z.getBoundingClientRect().top+window.pageYOffset-b-16;window.scrollTo({top:h,behavior:"smooth"})}},o.parentNode.insertBefore(k,o.nextSibling)}}}var ii=`
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
  .ikr-stars-partial-empty{opacity:0.22;}
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
  .ikr-bar-label{flex:0 0 var(--ikr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:var(--ikr-bar-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-bar-star{width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);}
  .ikr-bar-star-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-star-empty{color:var(--ikr-bar-track,#e5e7eb);}
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
  /* Filter butonu default outline (bg transparent, text ikr-color).
     Primary action (.ikr-write-btn) dolu, filter secondary -> gorsel hiyerarsi net.
     Admin panelinden filterBtnBgColor/Text set edilirse o degerler kazanir. */
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

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-bg,var(--ikr-surface,rgba(255,255,255,0.95)));border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.12)));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-photo-bg,var(--ikr-surface,#fff));transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  /* Card review item \u2014 yan padding mobile'da --ikr-pad-review-mobile uzerinden
     (mobile blo\u011Funda set edilir). Burada sadece top/bottom; shorthand yerine
     ayr\u0131 property ki mobile yan override'\u0131 specificity sava\u015F\u0131nda kaybetmesin. */
  .ikr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}
  /* Reply clamp: yorum metni (.ikr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .ikr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-reply-read-more{margin-top:var(--ikr-gap-tight);}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:var(--ikr-form-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-form-border,var(--ikr-border,rgba(0,0,0,0.08)));padding:25px;border-radius:var(--ikr-radius,6px);margin:16px auto;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-form label{font-size:14px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;background:var(--ikr-input-bg-color,var(--ikr-input-bg,#fff));border:1px solid var(--ikr-input-border,var(--ikr-border,rgba(0,0,0,0.20)));border-radius:var(--ikr-radius,6px);font-size:14px;box-sizing:border-box;color:var(--ikr-input-text-color,var(--ikr-input-text,rgba(0,0,0,0.90)));}
  /* Karakter sayac\u0131 \u2014 textarea alt\u0131, sa\u011Fa hizal\u0131, soluk renk. Limit doluyken
     k\u0131rm\u0131z\u0131 (max modifier). aria-live="polite" ekran okuyucu deste\u011Fi i\xE7in. */
  .ikr-char-counter{font-size:12px;color:var(--ikr-review-date,rgba(0,0,0,0.55));text-align:right;margin-top:4px;}
  .ikr-char-counter--max{color:#dc2626;}
  .ikr-input::placeholder,.ikr-textarea::placeholder{font-size:14px;color:var(--ikr-placeholder,var(--ikr-text-faint,rgba(0,0,0,0.35)));}
  .ikr-btn{background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:700;font-size:14px;margin-top:15px;width:100%}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-load-more-border,var(--ikr-border,rgba(0,0,0,0.30)));border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,var(--ikr-surface,#fff));color:var(--ikr-load-more-text,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .ikr-state-msg{text-align:center;color:var(--ikr-text-faint,rgba(0,0,0,0.45));font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}
  .ikr-photo-btn{background:var(--ikr-reply-bg,rgba(0,0,0,0.03));color:var(--ikr-text,rgba(0,0,0,0.50));width:100%;height:56px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px dashed var(--ikr-border,rgba(0,0,0,0.20));font-size:14px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px;}
  .ikr-preview-remove{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,0.15);color:rgba(0,0,0,0.6);font-size:11px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.12);}
  @media(hover:hover){.ikr-preview-remove:hover{background:#fee2e2;border-color:#dc2626;color:#dc2626;}}
  .ikr-preview-img{width:90px;height:90px;object-fit:cover;border-radius:var(--ikr-radius,6px)}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;border-radius:var(--ikr-radius,6px);}
  .ikr-spinner{width:20px;height:20px;border:2px solid rgba(0,0,0,0.12);border-top-color:var(--ikr-color,#000);border-radius:50%;animation:ikrSpin 0.7s linear infinite;}
  @keyframes ikrSpin{to{transform:rotate(360deg);}}
  .ikr-upload-check{font-size:22px;color:#059669;line-height:1;}
  .ikr-upload-error{font-size:10px;color:#dc2626;line-height:1.3;text-align:center;padding:4px;word-break:break-word;}

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
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid rgba(0,0,0,0.05);}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close{position:absolute;top:-42px;right:0;background:var(--ikr-modal-close-bg,var(--ikr-color,#000));border:2px solid var(--ikr-modal-close-border,var(--ikr-color,#000));color:var(--ikr-modal-close-text,var(--ikr-color-text,#fff));font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:100000;box-shadow:0 2px 8px rgba(0,0,0,0.20);}
  @media(hover:hover){.ikr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  /* Mobile X \u2014 desktop ile ayn\u0131 renk variable'lar\u0131 kullan\u0131r.
     Hardcoded #fff ve rgba siyah yerine --ikr-modal-close-text ve
     --ikr-modal-close-bg \u2192 admin "Modal Kapat Butonu" ayarlar\u0131 her iki
     breakpoint'te ayn\u0131 g\xF6r\xFCn\xFCm\xFC verir. */
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:var(--ikr-modal-close-bg,var(--ikr-color,#000));border:2px solid var(--ikr-modal-close-border,var(--ikr-color,#000));color:var(--ikr-modal-close-text,var(--ikr-color-text,#fff));width:32px;height:32px;border-radius:var(--ikr-radius,6px);font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{opacity:0.85;}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:var(--ikr-modal-nav-bg,rgba(0,0,0,0.45));border:none;color:var(--ikr-modal-nav-text,#fff);width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-modal-reply-bg,var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03))));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-modal-reply-border,var(--ikr-reply-border,var(--ikr-color,#000)));}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));line-height:1.6;}

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
    .ikr-btn{width:100%;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var br={};we(br,{meta:()=>pt,render:()=>mt});function Re(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var c=r[o-1]||0,p=i>0?Math.round(c/i*100):0,m=a===o,s=document.createElement("div");s.className="ikr-bar-row"+(m?" ikr-bar-active":""),a&&!m&&(s.style.opacity="0.35");for(var l="",k=1;k<=5;k++){var v=k<=o;l+='<span class="ikr-bar-star ikr-icon '+(v?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(v?t.filled:t.empty)+"</span>"}s.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+p+'%;"></div></div><span class="ikr-bar-count">('+c.toLocaleString("tr-TR")+")</span>",(function(f){s.onclick=function(){n(f)}})(o),d.appendChild(s)}return d}var ce=[],ti=!1;function rt(e){for(var r=ce.length-1;r>=0;r--){var i=ce[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function it(e){if(e.key==="Escape")for(var r=ce.length-1;r>=0;r--)ce[r].close()}function tt(){ti||typeof document=="undefined"||(document.addEventListener("click",rt,!0),document.addEventListener("keydown",it),ti=!0)}function ir(e){for(var r=0;r<ce.length;r++)ce[r]!==e&&ce[r].close()}function tr(e){tt();var r={trigger:e.trigger,element:e.element,close:e.close};return ce.push(r),function(){var t=ce.indexOf(r);t!==-1&&ce.splice(t,1)}}function pe(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent="Yorum Yap",o.onclick=a,d.appendChild(o);var c=document.createElement("div");c.className="ikr-filter-wrap";var p=document.createElement("button");p.className="ikr-filter-btn",p.setAttribute("aria-label","Filtrele");var m=N&&N.filterIcon||"lines";p.innerHTML=Vr(m);var s=document.createElement("div");s.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){s.classList.remove("ikr-open"),p.classList.remove("ikr-filter-btn-active")}function v(){ir(f),s.classList.add("ikr-open"),p.classList.add("ikr-filter-btn-active")}l.forEach(function(u){var z=u[2],w=z?t:!t&&(i||"newest")===u[0],b=document.createElement("div");b.className="ikr-filter-item"+(w?" ikr-filter-item-active":""),b.textContent=u[1],b.onclick=function(){k(),n(u[0],z)},s.appendChild(b)}),p.onclick=function(){s.classList.contains("ikr-open")?k():v()};var f=tr({trigger:c,element:s,close:k});return c.appendChild(p),c.appendChild(s),d.appendChild(c),d}function ai(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");var a=document.createElement("div");a.className="ikr-fwizard",t.appendChild(a);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-content",a.appendChild(d);var o=!1,c="",p="";function m(){var u=window.innerWidth-document.documentElement.clientWidth;c=document.body.style.overflow,p=document.body.style.paddingRight,document.body.style.overflow="hidden",u>0&&(document.body.style.paddingRight=u+"px")}function s(){document.body.style.overflow=c,document.body.style.paddingRight=p}function l(){o||(o=!0,document.removeEventListener("keydown",k),t.removeEventListener("click",v),n.removeEventListener("click",l),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),s();try{r()}catch(u){}},200))}function k(u){u.key==="Escape"&&l()}function v(u){u.target===t&&i&&l()}document.addEventListener("keydown",k),t.addEventListener("click",v),n.addEventListener("click",l);function f(u){u&&d.appendChild(u),document.body.appendChild(t),m(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open")})}return{open:f,close:l,content:d,setAllowOutsideClose:function(u){i=!!u},setStepAttr:function(u){a.setAttribute("data-step",String(u))}}}var ni=`
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
    border:1px solid var(--ikr-fwizard-border, #AFAFAF);
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
    transition:background 0.15s;
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
      background:rgba(0,0,0,0.05);
      color:rgb(17,17,17);
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
    border:1px solid var(--ikr-fwizard-border, #AFAFAF);
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
    background:#f9f9f9;
    color:#000000;
    border:1px solid var(--ikr-fwizard-border, #AFAFAF);
    order:10; /* Listenin sonuna atar */
  }
  .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add:hover{
    background:#f0f0f0;
    opacity:1;
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
    border:1px solid var(--ikr-fwizard-border, #AFAFAF);
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
    border:1px solid var(--ikr-fwizard-border, #AFAFAF);
    border-radius:8px;
    font-size:16px; /* iOS zoom bug'\u0131n\u0131 \xF6nlemek i\xE7in min 16px olmal\u0131 */
    font-family:inherit;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
    /* Aktiflik efekti kald\u0131r\u0131ld\u0131, border rengi sabit kal\u0131r */
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
    border:none;
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
    cursor:not-allowed;
  }



  /* \u2500\u2500\u2500 Step 1: Y\u0131ld\u0131z sat\u0131r\u0131 \u2500\u2500\u2500
     \u0130kon ve renk admin "Y\u0131ld\u0131z Stili"nden gelir:
       - SVG: getIconFromSettings (icons.js, currentSettings.reviewIcon)
       - Renk: --ikr-review-star-color (admin "Y\u0131ld\u0131z Rengi")
     Bo\u015F hali i\xE7in ayr\u0131 bir variable yok; review widget pattern'iyle ayn\u0131:
     empty SVG'nin currentColor'\u0131 CSS'ten okunur. */
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
    color:var(--ikr-bar-track, rgba(0,0,0,0.18));
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
    border:none;
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
    color:#000000;
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
    background:rgba(0,0,0,0.06);
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
`;var gr=4;function Pe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function oi(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(a){try{a(i)}catch(n){}})}return{get:function(){return i},set:function(a){Object.assign(i,a),t()},goNext:function(){i.currentStep<gr&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(a){return r.push(a),function(){r=r.filter(function(n){return n!==a})}}}}var at='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function li(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},a=e.onSkip||function(){},n=e.onNext||function(){},d=document.createElement("div");d.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=at+"<span>Geri</span>",o.addEventListener("click",function(){t()}),d.appendChild(o);var c=document.createElement("div");c.className="ikr-fwizard-footer-progress";for(var p=[],m=0;m<gr;m++){var s=document.createElement("span");s.className="ikr-fwizard-progress-seg",c.appendChild(s),p.push(s)}d.appendChild(c);var l=document.createElement("button");l.type="button";var k=null;function v(u){k&&l.removeEventListener("click",k),k=u,u&&l.addEventListener("click",u)}d.appendChild(l);function f(u,z){var w=r.indexOf(u)!==-1,b=i.indexOf(u)!==-1,h=z&&z.images&&z.images.length>0;if(w)u===2&&h?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",v(function(){n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",v(function(){a()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(b){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var C=Pe(u,z);l.disabled=!C,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!C),v(function(){l.disabled||n()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,v(null)}return{el:d,update:function(u,z){p.forEach(function(b,h){h+1<=u?b.classList.add("ikr-fwizard-progress-seg-active"):b.classList.remove("ikr-fwizard-progress-seg-active")});var w=u<=1;o.style.visibility=w?"hidden":"",o.style.pointerEvents=w?"none":"",o.tabIndex=w?-1:0,f(u,z)},setNextDisabled:function(u){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!u,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!u))},setThanksState:function(u){o.style.visibility="hidden",c.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),v(u)}}}function di(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var t=!1,a=document.createElement("div");a.className="ikr-fwizard-step-title",a.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-stars",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var d=Ie(N||{}),o=[];function c(m){o.forEach(function(s,l){var k=l<m;s.classList.toggle("ikr-fwizard-star-active",k),s.innerHTML=k?d.filled:d.empty})}for(var p=1;p<=5;p++)(function(m){var s=document.createElement("button");s.type="button",s.className="ikr-fwizard-star",s.setAttribute("role","radio"),s.setAttribute("aria-label",m+" y\u0131ld\u0131z"),s.innerHTML=d.empty,s.addEventListener("mouseenter",function(){c(m)}),s.addEventListener("mouseleave",function(){c(e.get().rating)}),s.addEventListener("click",function(){t||(t=!0,e.set({rating:m}),c(m),setTimeout(function(){var l=!r.canNavigate||r.canNavigate();l&&e.goNext()},280))}),o.push(s),n.appendChild(s)})(p);return c(e.get().rating),i.appendChild(n),{el:i,destroy:function(){}}}var si=3,nt=5*1024*1024;function ci(e,r){r=r||{};var i=!1,t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-photos";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",t.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",t.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-photo-card";var o=document.createElement("label");o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var c=document.createElement("input");c.type="file",c.accept="image/*",c.multiple=!0,c.style.display="none",o.appendChild(c),d.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),d.appendChild(p),t.appendChild(d);var m=r.blobMap||{},s=r.urlToFinger||{};function l(){if(!i){var b=e.get().images||[],h=e.get().pendingImages||[],C=b.map(function(x){return{url:x,isPending:!1}}).concat(h.map(function(x){return{url:x.url,file:x.file,isPending:!0,error:x.error}}));p.innerHTML="",C.forEach(function(x){var g=m[x.url]||x.url,y=k(x,g);p.appendChild(y)}),z()}}function k(b,h){var C=document.createElement("div");C.className="ikr-fwizard-photo-thumb",C.innerHTML='<img src="'+h+'" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';var x=document.createElement("div");x.className="ikr-fwizard-photo-loading",x.style.display="none",C.appendChild(x);var g=document.createElement("button");return g.type="button",g.className="ikr-fwizard-photo-remove",g.innerHTML="&#x2715;",C.appendChild(g),v(C,b,h),C}function v(b,h,C){var x=b.querySelector("img");x.src!==C&&(x.src=C);var g=b.querySelector(".ikr-fwizard-photo-loading");h.isPending&&h.error?(g.style.display="flex",g.innerHTML='<span class="ikr-upload-error">\u2717 '+h.error+"</span>"):g.style.display="none";var y=b.querySelector(".ikr-fwizard-photo-remove");y.onclick=function(){var E=s[h.url]||(h.file?h.file.name+"_"+h.file.size:null);if(h.url.startsWith("blob:")&&URL.revokeObjectURL(h.url),E){var T=(e.get().fingerprints||[]).filter(function(A){return A!==E});e.set({fingerprints:T})}if(h.isPending){var S=(e.get().pendingImages||[]).filter(function(A){return A.url!==h.url});e.set({pendingImages:S})}else{var M=(e.get().images||[]).filter(function(A){return A!==h.url});e.set({images:M})}}}var f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',u='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function z(){var b=(e.get().images||[]).length,h=(e.get().pendingImages||[]).length,C=b+h,x=C>=si,g=h>0;C>0?(d.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=u):(d.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=f+"<span>Foto\u011Fraf Ekle</span>"),x?(o.style.display="none",c.disabled=!0):(o.style.display="flex",c.disabled=g,o.classList.toggle("ikr-fwizard-photo-add--disabled",g),o.appendChild(c))}c.onchange=async function(b){var h=(e.get().pendingImages||[]).length;if(!(h>0)){var C=e.get().images||[],x=C.length,g=si-C.length,y=(e.get().images||[]).map(function(O){return""}),E=e.get().pendingImages||[],T=Array.from(b.target.files).slice(0,g);if(T.length!==0){for(var S=[],M=[],A=0;A<T.length;A++){var I=T[A],Y=I.name+"_"+I.size,me=(e.get().fingerprints||[]).some(function(O){return O===Y})||S.some(function(O){return O.file.name+"_"+O.file.size===Y});if(me){console.log("[ikr] Duplicate file detected, skipping:",I.name);continue}if(I.size>nt){alert(I.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}var $=URL.createObjectURL(I);s[$]=Y,S.push({url:$,file:I,error:null}),M.push({url:$,file:I});var ue=(e.get().fingerprints||[]).slice();ue.push(Y),e.set({fingerprints:ue})}if(S.length!==0){var ae=(e.get().pendingImages||[]).concat(S),K=async function(){for(var O=0;O<M.length;O++){var Se=M[O],ye=Se.file,Q=Se.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Ee=(e.get().pendingImages||[]).filter(function(ie){return ie.url!==Q}),_e=(e.get().images||[]).slice();_e.push(Q),e.set({pendingImages:Ee,images:_e});continue}try{var ee=await V(U+"/api/public/upload/sign",{method:"POST"});if(!ee.ok)throw ee.status===429?new Error("rate_limit"):new Error("sign failed");var fe=await ee.json(),G=new FormData;G.append("file",ye),G.append("api_key",fe.api_key),G.append("timestamp",fe.timestamp),G.append("signature",fe.signature),G.append("folder","review_images");var ve=await fetch("https://api.cloudinary.com/v1_1/"+fe.cloud_name+"/image/upload",{method:"POST",body:G}),W=await ve.json();if(W.secure_url){var Te=(e.get().pendingImages||[]).some(function(ie){return ie.url===Q});if(!Te){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}m[W.secure_url]=Q,s[W.secure_url]=s[Q];var qe=(e.get().pendingImages||[]).filter(function(ie){return ie.url!==Q}),Be=(e.get().images||[]).slice();Be.push(W.secure_url),e.set({pendingImages:qe,images:Be})}}catch(ie){console.error("[ikr] Image upload failed:",ie);var F=ie.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.",re=(e.get().pendingImages||[]).map(function(ne){return ne.url===Q?{url:ne.url,file:ne.file,error:F}:ne});e.set({pendingImages:re})}}};if(x===0){i=!0;var Z=!r.canNavigate||r.canNavigate();Z&&e.goNext()}e.set({pendingImages:ae}),K(),c.value=""}}}};var w=e.onChange(l);return l(),{el:t,destroy:function(){i=!0,c.onchange=null,w&&w()}}}var hr=2e3,ot=60;function pi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",t.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var d=document.createElement("input");d.type="text",d.className="ikr-fwizard-input",d.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",d.maxLength=ot,d.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),d.value=e.get().title||"",d.addEventListener("input",function(){e.set({title:d.value})}),n.appendChild(d);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=hr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",n.appendChild(o);var c=document.createElement("div");c.className="ikr-fwizard-char-counter",c.setAttribute("aria-live","polite"),n.appendChild(c);function p(){var s=o.value.length;c.textContent=s+"/"+hr,c.classList.toggle("ikr-fwizard-char-counter--max",s>=hr)}function m(){return Pe(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),p(),i(m())}),t.appendChild(n),p(),setTimeout(function(){i(m())},0),{el:t,destroy:function(){}}}var lt=40;function mi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=r.onSuccess||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",a.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="ikr-fwizard-input",p.maxLength=lt,p.setAttribute("aria-required","true"),p.value=e.get().author||"",o.appendChild(c),o.appendChild(p),d.appendChild(o);var m=document.createElement("div");m.className="ikr-fwizard-field";var s=document.createElement("label");s.className="ikr-fwizard-label",s.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",m.appendChild(s),m.appendChild(l),d.appendChild(m);var k=document.createElement("div");k.className="ikr-fwizard-notice",k.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",d.appendChild(k);var v=document.createElement("div");v.className="ikr-fwizard-msg",v.setAttribute("role","alert"),v.setAttribute("aria-live","assertive"),d.appendChild(v);var f=document.createElement("button");f.type="button",f.className="ikr-fwizard-submit-btn",f.textContent="G\xF6nder",d.appendChild(f),a.appendChild(d);function u(){return Pe(4,e.get())}function z(){var b=!u(),h=(e.get().pendingImages||[]).length,C=h>0;C?(f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled"),f.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(f.disabled=b,f.classList.toggle("ikr-fwizard-submit-btn--disabled",b),f.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),z(),i(u())}),l.addEventListener("input",function(){e.set({email:l.value})}),z(),setTimeout(function(){i(u())},0),f.onclick=async function(){if(!f.disabled){var b=e.get(),h=(b.author||"").trim(),C=(b.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!h){v.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(!b.rating){v.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled");var x=f.textContent;if(f.textContent="G\xF6nderiliyor\u2026",v.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t()},600);return}try{var g=P(window.location.href),y=b.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await V(U+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:b.productId||null,slug:g||null,productName:y,author:h,title:(b.title||"").trim()||null,comment:C||null,rating:b.rating,images:b.images||[]})},15e3);if(E.ok)t();else{var T=await E.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(A){var S=A&&(A.name==="AbortError"||/signal/i.test(A.message||"")),M=S?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":A.message||"Yorum g\xF6nderilemedi.";v.innerHTML='<div class="ikr-fwizard-msg-error">'+M+"</div>",f.disabled=!1,f.classList.remove("ikr-fwizard-submit-btn--disabled"),f.textContent=x}}};var w=e.onChange(z);return{el:a,destroy:function(){f.onclick=null,w&&w()}}}var ui=!1;function dt(){if(!ui){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ni,document.head.appendChild(e),ui=!0}}function st(e,r,i){if(i=i||{},e===1)return di(r,{canNavigate:i.canNavigate});if(e===2)return ci(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger});if(e===3)return pi(r,{onValidityChange:i.onValidityChange});if(e===4)return mi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:t,destroy:function(){}}}function fi(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function vi(e){e=e||{},dt();var r=oi({productId:e.productId,productName:e.productName}),i={},t={},a=ai({onClose:function(){window.removeEventListener("popstate",d),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(x){var g=i[x];g&&g.startsWith("blob:")&&URL.revokeObjectURL(g)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),n={ikrReviewModal:!0};window.history.pushState(n,null,"");var d=function(x){a&&a.close&&a.close()};window.addEventListener("popstate",d);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var c=li({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="ikr-fwizard-layout",p.appendChild(o),p.appendChild(c.el);var m=null,s="idle",l=null,k=!0,v=null;function f(x,g){o.innerHTML="";var y=st(x,r,{canNavigate:function(){return s==="idle"},blobMap:i,urlToFinger:t,onValidityChange:function(S){c.setNextDisabled(!S)},onSuccess:z});if(m=y,c.update(x,r.get()),g){s="entering",y.el.classList.add("ikr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),y.el.removeEventListener("animationend",T),y.el.classList.remove("ikr-fwizard-step--enter"),s="idle",l!==null&&w()};y.el.addEventListener("animationend",T),E=setTimeout(T,700)}else s="idle";o.appendChild(y.el),a.setStepAttr&&a.setStepAttr(x),x===3&&c.setNextDisabled(!0)}var u=!1;function z(){if(!u){if(u=!0,!m){o.innerHTML="";var x=fi();x.classList.add("ikr-fwizard-step--enter"),o.appendChild(x),a.setStepAttr("thanks"),c.setThanksState(a.close);return}var g=m;s="exiting",g.el.classList.add("ikr-fwizard-step--exit");var y=function(){if(v&&clearTimeout(v),g.el.removeEventListener("animationend",y),g.destroy)try{g.destroy()}catch(T){}m===g&&(m=null),o.innerHTML="";var E=fi();E.classList.add("ikr-fwizard-step--enter"),o.appendChild(E),a.setStepAttr("thanks"),c.setThanksState(a.close),s="idle"};g.el.addEventListener("animationend",y),v=setTimeout(y,300)}}function w(){var x=r.get().currentStep;if(s!=="idle"){l=x;return}if(!m){var g=!k;k=!1,f(x,g);return}var y=m;s="exiting",y.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(v&&clearTimeout(v),y.el.removeEventListener("animationend",E),y.destroy)try{y.destroy()}catch(S){}if(m===y){o.innerHTML="",m=null;var T=l!==null?l:r.get().currentStep;l=null,f(T,!0),s="idle"}};y.el.addEventListener("animationend",E),v=setTimeout(E,350)}w();var b=r.get().currentStep,h=r.onChange(function(x){x.currentStep!==b?(b=x.currentStep,w()):c.update(x.currentStep,x)}),C=a.close;return a.close=function(){h&&h(),typeof v!="undefined"&&v&&clearTimeout(v),C()},a.open(p),{close:a.close}}function ct(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}function j(){var e=N&&N.reviewFormStyle||"modal";if(e==="modal"){vi({productId:te||"",productName:ze||""});return}ct()}var pt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function mt(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,d=e.ratingCounts,o=e.avgRatingVal,c=e.currentRatingFilter,p=e.currentOrderBy,m=e.currentHasImages,s=e.onFilterChange,l=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var v=(d[3]||0)+(d[4]||0),f=n>0?Math.round(v/n*100):0,u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(u);var z=document.createElement("div");if(z.className="ikr-summary-block ikr-summary-count",z.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(z),t.showRecommendation!==!1&&f>0){var w=document.createElement("div");w.className="ikr-summary-block ikr-summary-recommend",w.innerHTML='<span class="ikr-recommend-pct">%'+f+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(w)}return k.appendChild(Re({ratingCounts:d,allCount:n,iconPair:a,currentRatingFilter:c,onFilterChange:s})),k.appendChild(pe({widget:r,currentOrderBy:p,currentHasImages:m,onWriteClick:j,onSortChange:l})),k}var xr={};we(xr,{css:()=>ft,meta:()=>ut,render:()=>vt});var ki=`
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
`;var ut={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},ft=ki;function vt(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,c=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,s=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var v=document.createElement("div");v.className="ikr-compact-trigger-wrap";var f=document.createElement("button");f.className="ikr-compact-trigger",f.type="button",f.setAttribute("aria-expanded","false"),f.innerHTML='<span class="ikr-compact-trigger-stars">'+de(d,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',v.appendChild(f),k.appendChild(v);var u=pe({widget:r,currentOrderBy:c,currentHasImages:p,onWriteClick:j,onSortChange:s}),z=u.querySelector(".ikr-filter-wrap"),w=u.querySelector(".ikr-write-btn"),b=document.createElement("div");b.className="ikr-compact-actions-slot",w&&b.appendChild(w),z&&b.appendChild(z),k.appendChild(b),l.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="ikr-compact-panel-inner";var x=document.createElement("div");x.className="ikr-compact-avg",x.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+d+"</span>",C.appendChild(x),C.appendChild(Re({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:m})),h.appendChild(C);var g=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function y(K){var Z=K?l:v;h.parentNode!==Z&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")),Z.appendChild(h))}if(y(g?g.matches:!1),g){var E=function(K){y(K.matches)};g.addEventListener?g.addEventListener("change",E):g.addListener&&g.addListener(E)}if(w){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent="Yorum Yap",T.onclick=j;var S=document.createElement("div");S.className="ikr-compact-write-row",S.appendChild(T),l.appendChild(S)}function M(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")}function A(){ir(I),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),f.setAttribute("aria-expanded","true")}f.onclick=function(){h.classList.contains("ikr-open")?M():A()};var I=null;function Y(K){I&&(I(),I=null),K||(I=tr({trigger:v,element:h,close:M}))}if(Y(g?g.matches:!1),g){var me=function(K){Y(K.matches)};g.addEventListener?g.addEventListener("change",me):g.addListener&&g.addListener(me)}if(i.showRecommendation!==!1){var $=(n[3]||0)+(n[4]||0),ue=a>0?Math.round($/a*100):0;if(ue>0){var ae=document.createElement("div");ae.className="ikr-summary-block ikr-summary-recommend",ae.style.marginTop="8px",ae.innerHTML='<span class="ikr-recommend-pct">%'+ue+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",C.appendChild(ae)}}return l}var yr={};we(yr,{css:()=>gt,meta:()=>kt,render:()=>ht});var gi=`
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
`;var kt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},gt=gi;function ht(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,c=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,s=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+d+"</span>",k.appendChild(v);var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-count ikr-split-left-count",f.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(f),l.appendChild(k);var u=document.createElement("div");u.className="ikr-split-col ikr-split-mid",u.appendChild(Re({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:m})),l.appendChild(u);var z=pe({widget:r,currentOrderBy:c,currentHasImages:p,onWriteClick:j,onSortChange:s}),w=z.querySelector(".ikr-filter-wrap"),b=z.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-split-col ikr-split-right",b&&h.appendChild(b),w&&h.appendChild(w),l.appendChild(h),i.showRecommendation!==!1){var C=(n[3]||0)+(n[4]||0),x=a>0?Math.round(C/a*100):0;if(x>0){var g=document.createElement("div");g.className="ikr-summary-block ikr-summary-recommend",g.innerHTML='<span class="ikr-recommend-pct">%'+x+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(g)}}return l}var wr={};we(wr,{css:()=>xt,meta:()=>bt,render:()=>yt});var hi=`
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
`;var bt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1}},xt=hi;function yt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-minimal";var p=document.createElement("div");p.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var s=document.createElement("span");s.className="ikr-minimal-avg",s.textContent=a,m.appendChild(s);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=de(a,i),m.appendChild(l);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),p.appendChild(m),c.appendChild(p);var v=pe({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:j,onSortChange:o}),f=v.querySelector(".ikr-filter-wrap"),u=v.querySelector(".ikr-write-btn"),z=document.createElement("div");if(z.className="ikr-minimal-actions",u&&z.appendChild(u),f&&z.appendChild(f),c.appendChild(z),u){var w=document.createElement("button");w.className="ikr-write-btn",w.textContent="Yorum Yap",w.onclick=j;var b=document.createElement("div");b.className="ikr-minimal-write-row",b.appendChild(w),c.appendChild(b)}return c}var zr={};we(zr,{css:()=>zt,meta:()=>wt,render:()=>Ct});var bi=`
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
`;var wt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1}},zt=bi;function Ct(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-hero";var p=document.createElement("div");p.className="ikr-hero-info";var m=document.createElement("span");m.className="ikr-hero-avg",m.textContent=a,p.appendChild(m);var s=document.createElement("div");s.className="ikr-hero-meta";var l=document.createElement("span");l.className="ikr-hero-stars",l.innerHTML=de(a,i),s.appendChild(l);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",s.appendChild(k),p.appendChild(s),c.appendChild(p);var v=pe({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:j,onSortChange:o}),f=v.querySelector(".ikr-filter-wrap"),u=v.querySelector(".ikr-write-btn"),z=document.createElement("div");if(z.className="ikr-hero-actions",u&&z.appendChild(u),f&&z.appendChild(f),c.appendChild(z),u){var w=document.createElement("button");w.className="ikr-write-btn",w.textContent="Yorum Yap",w.onclick=j;var b=document.createElement("div");b.className="ikr-hero-write-row",b.appendChild(w),c.appendChild(b)}return c}var ar={classic:br,compact:xr,split:yr,minimal:wr,hero:zr};function nr(e){return ar[e]||ar.classic}function xi(){return Object.keys(ar).map(function(e){return ar[e].css||""}).join(`
`)}var Cr={};we(Cr,{css:()=>Et,meta:()=>St,render:()=>Tt});function Oe(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var d=document.createElement("span");return d.className="ikr-read-more ikr-reply-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",i.appendChild(d),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(d.style.display="inline",typeof r=="function")d.onclick=r;else{var o=!1;d.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),d.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var St={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Et="";function Tt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ge(e.rating,N),a.appendChild(n);var d=document.createElement("span");if(d.className="ikr-date",d.textContent=he(e.createdAt),t.appendChild(a),t.appendChild(d),i.appendChild(t),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var c=document.createElement("div");c.className="ikr-author",c.textContent=e.author||"",i.appendChild(c);var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=p,i.appendChild(m);var s=document.createElement("span");s.className="ikr-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){s.style.display="inline";var v=!1;s.onclick=function(){v=!v,m.classList.toggle("ikr-body-clamped",!v),s.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var l=document.createElement("div");l.className="ikr-gallery",e.images.forEach(function(v){if(!(!v||v.indexOf("https://")!==0&&v.indexOf("data:image/")!==0)){var f=document.createElement("img");f.src=J(v),f.className="ikr-img",f.setAttribute("data-ikr-img-url",v),(function(u){f.onclick=function(){se(e,u,r)}})(v),l.appendChild(f)}}),i.appendChild(l)}var k=Oe(e.merchantReply);return k&&i.appendChild(k),i}var Sr={};we(Sr,{css:()=>At,meta:()=>Lt,render:()=>Nt});var yi=`
  .ikr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,120px);
    gap:24px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand padding:24px 0 yan padding'i 0'a resetler ve theme kural\u0131n\u0131
       specifity sava\u015F\u0131nda ezer. Sadece top/bottom ayr\u0131 set. */
    padding-top:24px;padding-bottom:24px;
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));
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
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));
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
`;var Lt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},At=yi;function Nt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ge(e.rating,N),a.appendChild(n);var d=document.createElement("span");d.className="ikr-review-list-author-name",d.textContent=e.author||"",a.appendChild(d);var o=document.createElement("span");o.className="ikr-date ikr-review-list-author-date",o.textContent=he(e.createdAt),a.appendChild(o),t.appendChild(a);var c=document.createElement("div");if(c.className="ikr-review-list-content",e.title){var p=document.createElement("div");p.className="ikr-review-list-title",p.textContent=e.title,c.appendChild(p)}var m=(e.comment||"").trim();if(m){var s=document.createElement("div");s.className="ikr-review-list-body ikr-body-clamped",s.textContent=m,c.appendChild(s);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",c.appendChild(l),requestAnimationFrame(function(){if(s.scrollHeight>s.clientHeight+2){l.style.display="inline";var f=!1;l.onclick=function(){f=!f,s.classList.toggle("ikr-body-clamped",!f),l.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Oe(e.merchantReply);if(k&&c.appendChild(k),t.appendChild(c),i){var v=document.createElement("div");v.className="ikr-review-list-media",e.images.forEach(function(f){if(!(!f||f.indexOf("https://")!==0&&f.indexOf("data:image/")!==0)){var u=document.createElement("img");u.src=J(f),u.setAttribute("data-ikr-img-url",f),(function(z){u.onclick=function(){se(e,z,r)}})(f),v.appendChild(u)}}),t.appendChild(v)}return t}var Er={};we(Er,{css:()=>_t,meta:()=>It,render:()=>Bt});var wi=`
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
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, form, foto strip vs. */
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-title,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-summary,
  #ikas-reviews-widget:has(.ikr-review-gallery) > #ikr-form-accordion,
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
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));
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
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));
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
`;var It={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},_t=wi;function Bt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ge(e.rating,N),a.appendChild(n),e.title){var d=document.createElement("div");d.className="ikr-review-gallery-title",d.textContent=e.title,a.appendChild(d)}var o=document.createElement("div");o.className="ikr-review-gallery-author",o.textContent=e.author||"",a.appendChild(o);var c=document.createElement("div");c.className="ikr-review-gallery-date",c.textContent=he(e.createdAt),a.appendChild(c);var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=p,a.appendChild(m);var s=document.createElement("span");s.className="ikr-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",s.style.cursor="pointer",s.onclick=function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;se(e,u,r)},a.appendChild(s),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(s.style.display="inline")})}if(t.appendChild(a),i){var l=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var v=document.createElement("img");v.src=J(l),v.loading="lazy",v.setAttribute("data-ikr-img-url",l),v.onclick=function(){se(e,l,r)},k.appendChild(v),t.appendChild(k)}var f=Oe(e.merchantReply,function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;se(e,u,r)});return f&&(f.classList.add("ikr-review-gallery-reply"),t.appendChild(f)),t}var or={card:Cr,list:Sr,gallery:Er};function lr(e){return or[e]||or.card}function zi(){return Object.keys(or).map(function(e){return or[e].css||""}).join(`
`)}function D(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var Ci={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},Si={small:80,medium:110,large:140};function Mt(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",d=r.widgetBgColor||i,o=r.widgetBorderColor||"transparent",c=r.separatorColor||D(t,.08),p=r.headerTitleColor||t,m=r.headerAvgColor||t,s=r.headerCountColor||t,l=r.headerRecommendColor||t,k=r.barLabelColor||t,v=r.barFillColor||t,f=r.barTrackColor||D(t,.1),u=r.barCountColor||t,z=r.barHoverBgColor||D(t,.05),w=r.primaryColor||"#111111",b=r.primaryTextColor||"#ffffff",h=r.btnBgColor||w,C=r.btnTextColor||b,x=r.btnBorderColor||w,g=r.filterBtnBgColor||w,y=r.filterBtnTextColor||b,E=r.filterBtnBorderColor||w,T=r.filterMenuBgColor||i,S=r.filterMenuBorderColor||D(t,.12),M=r.filterItemTextColor||t,A=r.filterItemHoverBgColor||D(w,.07),I=r.filterItemActiveColor||w,Y=r.reviewTitleColor||t,me=r.reviewAuthorColor||t,$=r.reviewDateColor||t,ue=r.reviewBodyColor||t,ae=r.reviewBorderColor||D(t,.08),K=r.reviewStarColor||"#f59e0b",Z=r.replyBgColor||a,O=r.replyBorderColor||w,Se=r.replyLabelColor||t,ye=r.replyTextColor||t,Q=r.photoBgColor||D(t,.03),Ee=r.photoBorderColor||D(t,.1),_e=r.photoTitleColor||t,ee=r.formBgColor||i,fe=r.formBorderColor||D(t,.08),G=r.inputBgColor||n,ve=r.inputTextColor||t,W=r.inputBorderColor||D(t,.2),Te=r.placeholderColor||D(t,.35),qe=r.loadMoreBgColor||i,Be=r.loadMoreTextColor||t,F=r.loadMoreBorderColor||D(t,.3),re=r.modalBgColor||i,ie=r.modalTextColor||t,ne=r.modalCloseBgColor||w,L=r.modalCloseTextColor||b,_=r.modalCloseBorderColor||w,q=r.modalNavBgColor||"rgba(0,0,0,0.45)",X=r.modalNavTextColor||"#ffffff",cr=r.modalReplyBgColor||a,Gi=r.modalReplyBorderColor||w,Br={"--ikr-widget-bg":d,"--ikr-widget-border":o,"--ikr-separator":c,"--ikr-header-title":p,"--ikr-header-avg":m,"--ikr-header-count":s,"--ikr-header-recommend":l,"--ikr-bar-label":k,"--ikr-bar-fill":v,"--ikr-bar-track":f,"--ikr-bar-count":u,"--ikr-bar-hover-bg":z,"--ikr-btn-bg":h,"--ikr-btn-text":C,"--ikr-btn-border":x,"--ikr-filter-btn-bg":g,"--ikr-filter-btn-text":y,"--ikr-filter-btn-border":E,"--ikr-filter-menu-bg":T,"--ikr-filter-menu-border":S,"--ikr-filter-item-text":M,"--ikr-filter-item-hover-bg":A,"--ikr-filter-item-active":I,"--ikr-review-title":Y,"--ikr-review-author":me,"--ikr-review-date":$,"--ikr-review-body":ue,"--ikr-review-border":ae,"--ikr-review-star-color":K,"--ikr-reply-bg-color":Z,"--ikr-reply-border":O,"--ikr-reply-label":Se,"--ikr-reply-text":ye,"--ikr-photo-bg":Q,"--ikr-photo-border":Ee,"--ikr-photo-title":_e,"--ikr-form-bg":ee,"--ikr-form-border":fe,"--ikr-input-bg-color":G,"--ikr-input-text-color":ve,"--ikr-input-border":W,"--ikr-placeholder":Te,"--ikr-load-more-bg":qe,"--ikr-load-more-text":Be,"--ikr-load-more-border":F,"--ikr-modal-bg":re,"--ikr-modal-text":ie,"--ikr-modal-close-bg":ne,"--ikr-modal-close-text":L,"--ikr-modal-close-border":_,"--ikr-modal-nav-bg":q,"--ikr-modal-nav-text":X,"--ikr-modal-reply-bg":cr,"--ikr-modal-reply-border":Gi,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":D(t,.45),"--ikr-border":D(t,.12),"--ikr-track-bg":D(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(Br).forEach(function(Mr){e.style.setProperty(Mr,Br[Mr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function xe(e,r,i,t,a,n,d){if(vr){Je({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:d});return}Xe(!0),Pr(e),Or(r),d!==void 0&&Hr(d),Fr(t),a&&Me(a),n&&Ne(n),i!=null&&qr(i);try{let ne=function(L,_){if(!(!L||!L.meta||!L.meta.sizeOverrides)){var q=L.meta.sizeOverrides[_];q&&Object.keys(q).forEach(function(X){l.style.setProperty(X,q[X])})}};var ie=ne,o=nr(r.summaryLayout),c=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),p=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",s=c&&p?m:"",l=document.documentElement;Mt(l,r);var k=r.primaryColor||"#111111",v=r.primaryTextColor||"#ffffff";Zr(k,ii+xi()+zi());var f=r.borderRadius!==void 0?r.borderRadius:8,u=Ci[r.size]||Ci.medium,z=Si[r.thumbnailSize]||Si.medium;l.style.setProperty("--ikr-title-size",u.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",u.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),l.style.setProperty("--ikr-color-text",v),l.style.setProperty("--ikr-radius",f+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),l.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),l.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",z+"px");var w=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",w),l.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),ne(nr(r.summaryLayout),r.size),ne(lr(r.reviewLayout),r.size);var b=Ie(r),h=document.getElementById("ikas-reviews");if(!h){var C=document.getElementById("ikas-reviews-anchor");if(!C)return;h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px",C.appendChild(h)}if(r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Xe(!1);var x=De;Je(null),x&&xe(x.productId,x.settings,x.reviewsData,x.productName,x.orderBy,x.page,x.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var g=i||{},y=g.data&&g.data.reviews||[],E=g.data&&g.data.totalCount||0,T=h.cloneNode(!1);h.parentNode.replaceChild(T,h),h=T;var S=document.createElement("div");if(S.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),s){var M=document.createElement("div"),A=r.summaryLayout||"classic";M.className="ikr-title ikr-title-"+A,M.textContent=s,S.appendChild(M)}var I=g.data&&g.data.allCount||0,Y=g.data&&g.data.ratingCounts||null,me=Y||[0,0,0,0,0],$=g.data&&g.data.avgRating||"0.0";if(!Y&&y.length>0){y.forEach(function(L){L.rating>=1&&L.rating<=5&&me[L.rating-1]++});var ue=y.reduce(function(L,_){return L+_.rating},0);$=(ue/y.length).toFixed(1)}if(I>0){var ae=nr(r.summaryLayout),K=ae.render({widget:S,data:g,settings:r,iconPair:b,allCount:I,ratingCounts:me,avgRatingVal:$,currentRatingFilter:Le,currentOrderBy:oe,currentHasImages:Ae,onFilterChange:async function(L){We(Le===L?null:L),Ne(1);var _=await Ke(te,oe,1,Le,Ae);await xe(te,N,_,ze,oe,1)},onSortChange:async function(L,_){Ne(1),_?(fr(!0),Me("newest")):(fr(!1),Me(L));var q=await Ke(te,oe,1,Le,Ae);await xe(te,N,q,ze,oe,1)}});S.appendChild(K)}else{var Z=document.createElement("button");Z.className="ikr-write-btn",Z.style.cssText="display:block;margin:16px auto 0;",Z.textContent="Yorum Yap",Z.onclick=j,S.appendChild(Z)}if(r.reviewFormStyle!=="modal"){var O=document.createElement("div");O.id="ikr-form-accordion",O.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",O.appendChild($r(e,t)),S.appendChild(O)}var Se=y.filter(function(L){return L.images&&Array.isArray(L.images)&&L.images.some(function(_){return _&&(_.indexOf("https://")===0||_.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!Ae&&Se.length>0){var ye=document.createElement("div");if(ye.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var Q=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",Ee=document.createElement("div");Ee.className="ikr-photo-title",Ee.textContent=Q,ye.appendChild(Ee)}var _e=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",_e);var ee=document.createElement("div");ee.className="ikr-photo-strip";var fe=0;Se.forEach(function(L){if(!(fe>=10)){var _=L.images.find(function(X){return X&&(X.indexOf("https://")===0||X.indexOf("data:image/")===0)});if(_){var q=document.createElement("img");q.src=J(_),q.className="ikr-photo-strip-thumb",q.alt="Yorum foto\u011Fraf\u0131",(function(X,cr){q.onclick=function(){se(cr,X,y)}})(_,L),ee.appendChild(q),fe++}}});var G=document.createElement("button");G.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",G.innerHTML="&#8249;",G.setAttribute("aria-label","\xD6nceki"),G.onclick=function(){ee.scrollBy({left:-200,behavior:"smooth"})};var ve=document.createElement("button");ve.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",ve.innerHTML="&#8250;",ve.setAttribute("aria-label","Sonraki"),ve.onclick=function(){ee.scrollBy({left:200,behavior:"smooth"})};var W=document.createElement("div");W.className="ikr-photo-strip-wrap",W.appendChild(G),W.appendChild(ee),W.appendChild(ve),ye.appendChild(W),S.appendChild(ye)}if(y.length===0){var Te=document.createElement("p");Te.className="ikr-state-msg",Te.textContent="Hen\xFCz yorum yok.",S.appendChild(Te)}else{var qe=lr(r.reviewLayout);y.forEach(function(L){S.appendChild(qe.render(L,y))})}var Be=g.data&&g.data.hasMore;if(Be){var F=document.createElement("button");F.className="ikr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var L=je+1,_=await Ke(te,oe,L,Le,Ae);if(_&&_.data&&_.data.reviews){Ne(L);var q=lr(N.reviewLayout);_.data.reviews.forEach(function(X){S.insertBefore(q.render(X,_.data.reviews),F)}),_.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.remove()},S.appendChild(F)}h.appendChild(S),ri(I>0?$:null,E,t,mr)}catch(L){console.error("[ikr] render error:",L),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Xe(!1),De){var re=De;Je(null),xe(re.productId,re.settings,re.reviewsData,re.productName,re.orderBy,re.page,re.badgeSettings)}}}var Ce="ikr_settings_"+H,Rt=300*1e3,Pt=30*1e3;async function Lr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||U,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var t=await V(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(m){}return null}var n=null,d=Ue(Ce);if(d)try{var o=JSON.parse(d);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<Pt)return null;R(Ce,"")}else if(o.v){if(Date.now()-o.t<Rt)return o.v;n=o.v,R(Ce,"")}else R(Ce,"");else R(Ce,"")}catch(m){R(Ce,"")}try{var c=await V(U+"/api/public/settings?publicApiKey="+encodeURIComponent(H));if(!c.ok)return c.status===404&&R(Ce,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var p=await c.json();return R(Ce,JSON.stringify({t:Date.now(),v:p})),p}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var Ot=60*1e3;async function Ke(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||U,d=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),o=await V(d);if(o.ok)return await o.json()}catch(f){}return null}r=r||"newest",i=i||1;var c="ikr_reviews_"+H+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),p=null,m=Ue(c);if(m)try{var s=JSON.parse(m);if(s&&s.t!==void 0&&s.v){if(Date.now()-s.t<Ot)return s.v;p=s.v,R(c,"")}else R(c,"")}catch(f){R(c,"")}try{var l=U+"/api/public/reviews?storeId="+encodeURIComponent(H)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await V(l);if(!k.ok)return p||null;var v=await k.json();return R(c,JSON.stringify({t:Date.now(),v})),v}catch(f){return console.error("[ikr] fetchReviews error:",f),p||null}}var Tr={};async function He(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!Tr[e]){Tr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var d=await Lr();if(!d)return;var o=d.widgets&&d.widgets.reviews||a,c=d.widgets&&d.widgets.badge||n;if(o.enabled===!1)return;Me("newest"),Ne(1),We(null);var p=await Ke(e,"newest",1,null);await xe(e,o,p,r,"newest",1,c)}catch(m){console.error("[ikr] bootstrap error:",m),await xe(e,a,null,r,void 0,void 0,n)}finally{delete Tr[e]}}}function Ar(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function Ei(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=P(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||rr.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Ye).forEach(function(i){e[i]=Ye[i]}),e}var Ht=300*1e3,Ti=50;async function Li(e){var r="ikr_ratings_"+H,i={},t=Ue(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<Ht?i=a.v||{}:R(r,"")}catch(p){R(r,"")}var n=e.filter(function(p){return!i[p]});if(!n.length)return i;for(var d=[],o=0;o<n.length;o+=Ti)d.push(n.slice(o,o+Ti));var c=await Promise.all(d.map(function(p){var m=U+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(H)+"&slugs="+p.map(encodeURIComponent).join(",");return V(m).then(function(s){return s.ok?s.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return c.forEach(function(p){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(p).forEach(function(m){i[m]=p[m]})}),R(r,JSON.stringify({t:Date.now(),v:i})),i}var Ft="var(--ikr-badge-color,#f59e0b)",Ai=13,qt="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function jt(e){var r=Ve("star","classic"),i="width:"+Ai+"px;height:"+Ai+"px;";return'<span style="color:'+Ft+';display:inline-flex;align-items:center;">'+de(e,r,{sizeStyle:i})+"</span>"}function Ze(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=qt+"justify-content:"+(r||"flex-start")+";",i.innerHTML=jt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var Ni=".product-name",Ii=".add-to-basket-modal",_i="h1.product-name",dr=".single-product-container-main",Nr=".single-product-product-name",Bi=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Mi=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Ri='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Dt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Ir(e,r){var i=e.querySelector(Ni);if(i)return i;if(e.matches&&e.matches(Ri))return e;var t=e.querySelector(Ri);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var d=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<d.length;o++){var c=d[o],p=c.textContent.trim();if(!(!p||p.length<2||p.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(p)&&!Dt.test(p)&&!(c.closest("figure")||c.closest("picture"))&&!(c.children.length>1))return c}return null}function Yt(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=P(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(dr)&&!e.closest(Nr)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(Nr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Bi)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),d=Array.from(e.childNodes).filter(function(v){return v.nodeType===3}).map(function(v){return v.textContent.trim()}).join("").trim(),o=!!Ir(e,i);if(!d&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(v){v.setAttribute("data-ikr-badge","1")});var c=Ir(e,i);if(!c||c.querySelector("[data-ikr-listing-badge]"))return;var p=window.getComputedStyle(c).textAlign;c.appendChild(Ze(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"));return}var m=Ir(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var s=window.getComputedStyle(m).textAlign;m.appendChild(Ze(r,s==="center"?"center":s==="right"?"flex-end":"flex-start"))}else{var l=Ze(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(l,k):e.appendChild(l)}}}function Gt(e,r){var i=document.querySelector(Ii);if(i){var t=i.querySelector(_i);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Ge&&r[Ge]&&(a=Ge),!a){var n=P(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var d=t.textContent.trim();Object.keys(e).forEach(function(s){if(!a){var l=e[s];l&&l.trim()===d&&r[s]&&(a=s)}})}if(!a){var o=document.querySelector(dr);if(o){var c=o.querySelector("a[href]");if(c){var p=P(c.href);p&&r[p]&&(a=p)}}}if(!a){var m=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(s){if(!a&&!(s.closest("header")||s.closest("nav"))&&!s.closest(dr)){var l=s.textContent.trim().toLowerCase();if(l&&l===m){var k=P(s.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(Ze(r[a],"flex-start"))}}}function Pi(e,r){var i=P(window.location.pathname),t=document.querySelectorAll(Mi),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(d){a.push(d)})}),Object.keys(e).forEach(function(n){var d=r[n];if(!(!d||d._empty||d.count===0)){var o=e[n];a.forEach(function(c){P(c.href)===n&&Yt(c,d,o,i)})}}),Gt(e,r)}async function Fe(){if(B.inProgress){B.queued=!0;return}if(!B.rendered){B.rendered=!0,B.inProgress=!0;try{var e=B.navCleanup;e&&(B.navCleanup=!1);var r=Ei();if(!Object.keys(r).length){B.rendered=!1;return}var i=await Promise.all([Lr(),Li(Object.keys(r))]),t=i[0];if(!t){B.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},d=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){B.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",d),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),Pi(r,a)}finally{B.inProgress=!1,B.queued&&(B.queued=!1,B.rendered=!1,Fe())}}}var Oi=!1,Hi=!1;function ji(){Hi||(Hi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=P(r.href);!i||i.length<3||jr(i)}},!0))}var Fi=!1,qi=typeof location!="undefined"?location.pathname:"";function sr(){try{if(location.pathname===qi)return;qi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function Ut(){if(!Fi){Fi=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return sr(),i},history.replaceState=function(){var i=r.apply(this,arguments);return sr(),i},window.addEventListener("popstate",sr),window.addEventListener("hashchange",sr)}}function _r(){if(Ut(),window.IkasEvents){if(Oi)return;Oi=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var d=n.data&&n.data.productDetails;Array.isArray(d)&&d.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(Ye[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var o=n.data&&n.data.productDetail&&n.data.productDetail.id,c=n.data&&n.data.productDetail&&n.data.productDetail.name;o&&(R("ikr_reviews_"+H+"_"+o,""),He(o,c))}if(n&&n.type==="PAGE_VIEW"){var p=Date.now();if(B.lastPageView&&p-B.lastPageView<800)return;B.lastPageView=p,B.navCleanup=!0,B.rendered=!1,Fe()}}});var e=Ar();if(e)He(e.id,e.name);else{let n=function(){var d=Ar();d?He(d.id,d.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){B.rendered||Fe()},2e3)}else{let n=function(){window.IkasEvents?_r():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var Di=null;function Yi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Di),Di=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=P(a.href);return n&&n.length>=3&&!rr.test(n)});t&&(B.rendered=!1,Fe())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Vt=window.__ikasPreviewMode===!0;if(Vt){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){He("mock-product","\xD6rnek \xDCr\xFCn"),e()};Kt=e,Zt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!N)){var n=Object.assign({},N,a);xe(te,n,ur,ze,oe,je)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(H){let e=function(){_r(),ji(),Yi()};Wt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Kt,Zt,Wt;})();
