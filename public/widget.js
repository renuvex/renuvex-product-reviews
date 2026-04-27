/* ikas Reviews Widget — built 2026-04-27T13:37:42.317Z | theme: default */
"use strict";(()=>{var Hi=Object.defineProperty;var de=(e,r)=>{for(var i in r)Hi(e,i,{get:r[i],enumerable:!0})};var _r=document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})(),dr=_r?_r.src:"",qi=new URLSearchParams(dr.split("?")[1]||""),H=qi.get("publicApiKey"),Z=dr?dr.split("?")[0].replace(/\/widget\.js$/,""):"";var V="newest",_e=1,he=null,xe=!1,U=null,N=null,cr=null,ce=null,pr=null;function Se(e){V=e}function ye(e){_e=e}function Ge(e){he=e}function mr(e){xe=e}function Ir(e){U=e}function Or(e){N=e}function Pr(e){cr=e}function Mr(e){ce=e}function Hr(e){pr=e}var ur=!1,Ie=null;function Ue(e){ur=e}function Ke(e){Ie=e}var B={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Oe={},Pe=null;function qr(e){Pe=e}var Fr={};function Me(e){try{return sessionStorage.getItem(e)}catch(r){return Fr[e]||null}}function _(e,r){try{sessionStorage.setItem(e,r)}catch(i){Fr[e]=r}}var te="0 -960 960 960",W={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function Ze(e){return'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var jr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starFill+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+W.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+W.starFill+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+W.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+W.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+W.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+W.heartOutline+'"/></g></svg>'}}}};function Fi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function He(e,r){var i=jr[e]||jr.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function qe(e){var r=e&&e.reviewIcon||"star",i=Fi(r),t=i.style||e&&e.reviewIconStyle||"classic";return He(i.type,t)}function Yr(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=qe(r),n=i&&i.sizePx,o=n?"width:"+n+"px;height:"+n+"px;":"",l="",d=1;d<=5;d++){var s=d<=t;l+='<span class="ikr-icon '+(s?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+o+'">'+(s?a.filled:a.empty)+"</span>"}return l}var Ve={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},Dr={lines:{label:"\xC7izgili",svg:Ze(Ve.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:Ze(Ve.linesAlt)},funnel:{label:"Huni",svg:Ze(Ve.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:Ze(Ve.dense)}};function Gr(e){var r=Dr[e]||Dr.lines;return r.svg}var We="var(--ikr-review-star-color,#f59e0b)",Xe=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function O(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ae(e,r){var i="color:"+We+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Yr(e,r)+"</span>"}function X(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,o=n<.25?a:n<.75?a+.5:a+1,l=o/5*100,d=i&&i.sizeStyle||"",s="",m="",c=0;c<5;c++)s+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>",m+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+s+'</span><span class="ikr-stars-partial-fill" style="width:'+l+'%;">'+m+"</span></span>"}function ne(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function ji(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Di(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=ji(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Kr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Di(e)}function Y(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Zr(e,r,i,t){var a=qe(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),o=document.createElement("div");if(o.className="ikr-rating"+(r?" ikr-rating-interactive":""),o.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){o.style.flexDirection="row";for(var l=1;l<=5;l++){var d=document.createElement("span");d.className="ikr-icon",d.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(l<=e?We:"#ddd")+";",d.innerHTML=l<=e?a.filled:a.empty,o.appendChild(d)}return o}for(var s=5;s>=1;s--)(function(m){var c=document.createElement("input");c.type="radio",c.name=n,c.value=String(m),c.id=n+"-"+m,c.className="ikr-rating-input",m===e&&(c.checked=!0),c.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",c.addEventListener("change",function(){i&&i(m)});var p=document.createElement("label");p.htmlFor=c.id,p.className="ikr-rating-label",p.setAttribute("aria-label",m+" y\u0131ld\u0131z"),p.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",p.addEventListener("click",function(k){k.preventDefault();for(var f=o.querySelectorAll(".ikr-rating-input"),v=0;v<f.length;v++)f[v].checked=!1;c.checked=!0,i&&i(m)}),p.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+We+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",p.style.position="relative",o.appendChild(c),o.appendChild(p)})(s);return Yi(),o}var Ur=!1;function Yi(){if(!Ur){Ur=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+We+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function J(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Vr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Gi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=ae(e.rating,N);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ne(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var o=document.createElement("div");o.className="ikr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",i.appendChild(o);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(d);var s=document.createElement("div");s.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="ikr-modal-reply-text",c.textContent=e.merchantReply||"",s.appendChild(m),s.appendChild(c),s.style.display=e.merchantReply?"":"none",i.appendChild(s),r.appendChild(i),r}function Ui(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ae(r.rating,N),i.querySelector(".ikr-modal-date").textContent=ne(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function vr(e,r,i,t,a,n,o,l){var d=e.images&&Array.isArray(e.images)?e.images.filter(function(y){return y&&(y.indexOf("https://")===0||y.indexOf("data:image/")===0)}):[],s=Math.min(i,d.length-1),m=document.createElement("div");m.className="ikr-modal-left";var c=document.createElement("img"),p=o==="next"?"ikr-modal-img-enter-right":o==="prev"?"ikr-modal-img-enter-left":"";c.className="ikr-modal-main-img"+(p?" "+p:""),c.src=Y(d[s]||""),c.alt="Yorum foto\u011Fraf\u0131",m.appendChild(c);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(y){y.stopPropagation(),n()},m.appendChild(k);var f=0;if(m.addEventListener("touchstart",function(y){f=y.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(y){var T=f-y.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(b)oe(e,r,s+1,t,a,n,!0,"next",l);else if(w){var E=t[r+1];oe(E,r+1,0,t,a,n,!1,"next",l)}}else if(u)oe(e,r,s-1,t,a,n,!0,"prev",l);else if(x){var S=t[r-1],q=(S.images||[]).filter(function(D){return D&&(D.indexOf("https://")===0||D.indexOf("data:image/")===0)});oe(S,r-1,q.length-1,t,a,n,!1,"prev",l)}}},{passive:!0}),d.length>1){var v=document.createElement("div");v.className="ikr-modal-thumbs",d.forEach(function(y,T){var E=document.createElement("img");E.src=Y(y),E.className="ikr-modal-thumb"+(T===s?" ikr-modal-thumb-active":""),E.alt="K\xFC\xE7\xFCk resim "+(T+1),(function(S){E.onclick=function(){oe(e,r,S,t,a,n,!0,null,l)}})(T),v.appendChild(E)}),m.appendChild(v)}var u=s>0,b=s<d.length-1,x=r>0,w=r<t.length-1,h=u||x,L=b||w;if(h||L){var z=document.createElement("button");z.className="ikr-modal-nav ikr-modal-nav-prev",z.innerHTML="&#8249;",z.setAttribute("aria-label","\xD6nceki"),z.style.opacity=h?"1":"0.3",z.onclick=function(y){if(y.stopPropagation(),u)oe(e,r,s-1,t,a,n,!0,"prev",l);else if(x){var T=t[r-1],E=(T.images||[]).filter(function(S){return S&&S.indexOf("https://")===0});oe(T,r-1,E.length-1,t,a,n,!1,"prev",l)}},m.appendChild(z);var g=document.createElement("button");g.className="ikr-modal-nav ikr-modal-nav-next",g.innerHTML="&#8250;",g.setAttribute("aria-label","Sonraki"),g.style.opacity=L?"1":"0.3",g.onclick=function(y){if(y.stopPropagation(),b)oe(e,r,s+1,t,a,n,!0,"next",l);else if(w){var T=t[r+1];oe(T,r+1,0,t,a,n,!1,"next",l)}},m.appendChild(g)}return m}function Wr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=Y(a[0]))}})}function oe(e,r,i,t,a,n,o,l,d){if(o){var s=vr(e,r,i,t,a,n,l,d);a.firstChild&&a.replaceChild(s,a.firstChild)}else{var s=vr(e,r,i,t,a,n,l,d),m=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(s,a.firstChild),m&&Ui(m,e);var c=d&&d.querySelector(".ikr-modal-wrap");c&&(c.scrollTop=0)}Wr(r,t)}function $(e,r,i){var t=(i||[]).filter(function(u){return u.images&&Array.isArray(u.images)&&u.images.some(function(b){return b&&(b.indexOf("https://")===0||b.indexOf("data:image/")===0)})}),a=t.findIndex(function(u){return u===e||u.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(u){return u&&(u.indexOf("https://")===0||u.indexOf("data:image/")===0)}):[],o=Math.max(0,n.indexOf(r)),l=document.createElement("div");l.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var s=!1;function m(){s||(s=!0,Vr(l,c,m))}function c(u){u.key==="Escape"&&p()}function p(){s||(s=!0,history.go(-1),Vr(l,c,m))}document.addEventListener("keydown",c);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),l.onclick=function(){p()},d.onclick=function(u){u.stopPropagation()},d.appendChild(vr(e,a,o,t,d,p,null,l)),d.appendChild(Gi(e)),Wr(a,t);var f=document.createElement("div");f.className="ikr-modal-wrap",f.appendChild(d);var v=document.createElement("button");v.className="ikr-modal-close",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(u){u.stopPropagation(),p()},f.appendChild(v),l.appendChild(f),document.body.appendChild(l)}function Xr(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),o=i.querySelector("#ikr-comment-counter");function l(){var v=n.value.length;o.textContent=v+"/2000",o.classList.toggle("ikr-char-counter--max",v>=2e3)}n.addEventListener("input",l);var d=Zr(0,!0,function(v){t=v},N);i.querySelector("#ikr-stars-input").appendChild(d);var s=i.querySelector("#ikr-file-input"),m=i.querySelector("#ikr-photo-previews"),c=!1,p=i.querySelector("label.ikr-photo-btn"),k=3;function f(){var v=a.length;v>=k?(s.disabled=!0,p&&(p.style.opacity="0.4")):(s.disabled=!1,p&&(p.style.opacity="1"))}return s.onchange=async function(v){if(!c){c=!0,s.disabled=!0;var u=k-a.length,b=Array.from(v.target.files).slice(0,u);for(let w=0;w<b.length;w++){let h=b[w];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let L=document.createElement("div");L.className="ikr-preview-item";let z=URL.createObjectURL(h);L.innerHTML='<img class="ikr-preview-img" src="'+z+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',m.appendChild(L);let g=L.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(z),g.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){g.style.opacity="0",g.style.transition="opacity 0.4s",setTimeout(function(){g.style.display="none";let y=document.createElement("button");y.className="ikr-preview-remove",y.innerHTML="&#x2715;",y.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),y.onclick=function(){a=a.filter(function(T){return T!==z}),L.remove(),f()},L.appendChild(y)},400)},800);continue}try{let y=await J(Z+"/api/public/upload/sign",{method:"POST"});if(!y.ok)throw y.status===429?new Error("rate_limit"):new Error("sign failed");let T=await y.json(),E=new FormData;E.append("file",h),E.append("api_key",T.api_key),E.append("timestamp",T.timestamp),E.append("signature",T.signature),E.append("folder","review_images");let q=await(await fetch("https://api.cloudinary.com/v1_1/"+T.cloud_name+"/image/upload",{method:"POST",body:E})).json();if(q.secure_url){let D=q.secure_url;a.push(D),g.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){g.style.opacity="0",g.style.transition="opacity 0.4s",setTimeout(function(){g.style.display="none";let I=document.createElement("button");I.className="ikr-preview-remove",I.innerHTML="&#x2715;",I.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),I.onclick=function(){a=a.filter(function(re){return re!==D}),L.remove(),f()},L.appendChild(I)},400)},800)}}catch(y){console.error("[ikr] Image upload failed:",y);var x=y.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";g.innerHTML='<span class="ikr-upload-error">\u2717 '+x+"</span>"}}c=!1,s.value="",f()}},i.querySelector("#ikr-submit").onclick=async function(){var v=this,u=i.querySelector("#ikr-name").value.trim(),b=i.querySelector("#ikr-title").value.trim(),x=i.querySelector("#ikr-comment").value.trim(),w=i.querySelector("#ikr-msg");if(!t){w.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!u){w.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(v.disabled=!0,v.textContent="G\xF6nderiliyor\u2026",w.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=O(window.location.href),L=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),z=await J(Z+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:e,slug:h||null,productName:L,author:u,title:b||null,comment:x,rating:t,images:a})},15e3);if(z.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var g=await z.json().catch(function(){return{}});throw new Error(g.error||"Yorum kaydedilemedi.")}}catch(S){var y=S&&(S.name==="AbortError"||/signal/i.test(S.message||"")),T=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":S.message||"Yorum g\xF6nderilemedi.",E=document.createElement("div");E.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",E.textContent=T,w.innerHTML="",w.appendChild(E),v.disabled=!1,v.textContent="G\xF6nder"}},i}function Jr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var $r={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Ki(e,r,i,t,a){var n=He(r,i),o="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+X(e,n,{sizeStyle:o})+"</span>"}function Qr(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var o=document.createElement("script");o.id="ikr-jsonld",o.type="application/ld+json",o.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(o);var l=Jr(i);if(!(!l||!l.parentNode)){var d=t&&t.icon||"star",s=t&&t.iconStyle||"classic",m=t&&t.size||"medium",c=t&&t.color||"#f59e0b",p=$r[m]||$r.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var f=window.getComputedStyle(l).textAlign,v=f==="center"?"center":f==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+v+";",k.innerHTML=Ki(e,d,s,c,p.icon)+'<span style="font-size:'+p.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(u){u.preventDefault();var b=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(b){var x=document.querySelector("header"),w=x?x.getBoundingClientRect().height:0,h=b.getBoundingClientRect().top+window.pageYOffset-w-16;window.scrollTo({top:h,behavior:"smooth"})}},l.parentNode.insertBefore(k,l.nextSibling)}}}var ei=`
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
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.45);border:none;color:#fff;width:32px;height:32px;border-radius:var(--ikr-radius,6px);font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{background:rgba(0,0,0,0.70);}}
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
`;var fr={};de(fr,{meta:()=>Qi,render:()=>et});function ze(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,o=document.createElement("div");o.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,s=i>0?Math.round(d/i*100):0,m=a===l,c=document.createElement("div");c.className="ikr-bar-row"+(m?" ikr-bar-active":""),a&&!m&&(c.style.opacity="0.35");for(var p="",k=1;k<=5;k++){var f=k<=l;p+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?t.filled:t.empty)+"</span>"}c.innerHTML='<span class="ikr-bar-label">'+p+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+s+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(v){c.onclick=function(){n(v)}})(l),o.appendChild(c)}return o}var Q=[],ri=!1;function Zi(e){for(var r=Q.length-1;r>=0;r--){var i=Q[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Vi(e){if(e.key==="Escape")for(var r=Q.length-1;r>=0;r--)Q[r].close()}function Wi(){ri||typeof document=="undefined"||(document.addEventListener("click",Zi,!0),document.addEventListener("keydown",Vi),ri=!0)}function Je(e){for(var r=0;r<Q.length;r++)Q[r]!==e&&Q[r].close()}function $e(e){Wi();var r={trigger:e.trigger,element:e.element,close:e.close};return Q.push(r),function(){var t=Q.indexOf(r);t!==-1&&Q.splice(t,1)}}function ee(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,o=document.createElement("div");o.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent="Yorum Yap",l.onclick=a,o.appendChild(l);var d=document.createElement("div");d.className="ikr-filter-wrap";var s=document.createElement("button");s.className="ikr-filter-btn",s.setAttribute("aria-label","Filtrele");var m=N&&N.filterIcon||"lines";s.innerHTML=Gr(m);var c=document.createElement("div");c.className="ikr-filter-menu";var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){c.classList.remove("ikr-open"),s.classList.remove("ikr-filter-btn-active")}function f(){Je(v),c.classList.add("ikr-open"),s.classList.add("ikr-filter-btn-active")}p.forEach(function(u){var b=u[2],x=b?t:!t&&(i||"newest")===u[0],w=document.createElement("div");w.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),w.textContent=u[1],w.onclick=function(){k(),n(u[0],b)},c.appendChild(w)}),s.onclick=function(){c.classList.contains("ikr-open")?k():f()};var v=$e({trigger:d,element:c,close:k});return d.appendChild(s),d.appendChild(c),o.appendChild(d),o}function ii(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");var a=document.createElement("div");a.className="ikr-fwizard",t.appendChild(a);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML="\u2715",a.appendChild(n);var o=document.createElement("div");o.className="ikr-fwizard-content",a.appendChild(o);var l=!1,d="",s="";function m(){var u=window.innerWidth-document.documentElement.clientWidth;d=document.body.style.overflow,s=document.body.style.paddingRight,document.body.style.overflow="hidden",u>0&&(document.body.style.paddingRight=u+"px")}function c(){document.body.style.overflow=d,document.body.style.paddingRight=s}function p(){l||(l=!0,document.removeEventListener("keydown",k),t.removeEventListener("click",f),n.removeEventListener("click",p),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),c();try{r()}catch(u){}},200))}function k(u){u.key==="Escape"&&p()}function f(u){u.target===t&&i&&p()}document.addEventListener("keydown",k),t.addEventListener("click",f),n.addEventListener("click",p);function v(u){u&&o.appendChild(u),document.body.appendChild(t),m(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open")})}return{open:v,close:p,content:o,setAllowOutsideClose:function(u){i=!!u}}}var ti=`
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

  /* Modal kutusu \u2014 desktop'ta max 480px, mobile'da viewport'a s\u0131\u011Far */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:480px;
    max-height:90vh;
    background:var(--ikr-fwizard-bg, #ffffff);
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    border:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    border-radius:12px;
    box-shadow:0 16px 48px rgba(0,0,0,0.25);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    /* A\xE7\u0131l\u0131\u015F scale animasyonu */
    transform:scale(0.96);
    transition:transform 0.2s ease;
  }
  .ikr-fwizard-overlay.ikr-fwizard-open .ikr-fwizard{
    transform:scale(1);
  }

  /* Close (X) butonu \u2014 sa\u011F \xFCst k\xF6\u015Fe */
  .ikr-fwizard-close{
    position:absolute;
    top:12px;
    right:12px;
    width:32px;
    height:32px;
    border-radius:8px;
    border:none;
    background:var(--ikr-fwizard-close-bg, rgba(0,0,0,0.06));
    color:var(--ikr-fwizard-close-text, rgb(17,17,17));
    cursor:pointer;
    font-size:18px;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1;
    transition:background 0.15s;
  }
  @media(hover:hover){
    .ikr-fwizard-close:hover{
      background:var(--ikr-fwizard-close-bg-hover, rgba(0,0,0,0.10));
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

  /* Step ba\u015Fl\u0131\u011F\u0131 */
  .ikr-fwizard-step-title{
    font-size:18px;
    font-weight:600;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* \u2500\u2500\u2500 Step 1: Y\u0131ld\u0131z sat\u0131r\u0131 \u2500\u2500\u2500 */
  .ikr-fwizard-stars{
    display:inline-flex;
    gap:8px;
    align-items:center;
  }
  .ikr-fwizard-star{
    width:44px;
    height:44px;
    padding:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:var(--ikr-fwizard-star-empty, rgba(0,0,0,0.18));
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
    color:var(--ikr-fwizard-star-color, #f59e0b);
  }

  /* \u2500\u2500\u2500 Footer + Progress bar \u2500\u2500\u2500 */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px 24px;
    border-top:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
  }
  .ikr-fwizard-progress-seg{
    flex:1 1 auto;
    height:4px;
    border-radius:2px;
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.10));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
  }

  /* Mobile d\xFCzenlemeleri */
  @media(max-width:600px){
    .ikr-fwizard-overlay{
      padding:8px;
    }
    .ikr-fwizard{
      max-width:none;
      max-height:95vh;
    }
    .ikr-fwizard-step-wrap{
      padding:36px 20px 28px;
    }
    .ikr-fwizard-step{
      gap:24px;
    }
    .ikr-fwizard-star{
      width:40px;
      height:40px;
    }
    .ikr-fwizard-stars{
      gap:6px;
    }
    .ikr-fwizard-footer{
      padding:12px 20px;
    }
  }
`;var kr=3;function ai(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(a){try{a(i)}catch(n){}})}return{get:function(){return i},set:function(a){Object.assign(i,a),t()},goNext:function(){i.currentStep<kr&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(a){return r.push(a),function(){r=r.filter(function(n){return n!==a})}}}}function ni(){var e=document.createElement("div");e.className="ikr-fwizard-progress";for(var r=[],i=0;i<kr;i++){var t=document.createElement("span");t.className="ikr-fwizard-progress-seg",e.appendChild(t),r.push(t)}return{el:e,update:function(a){r.forEach(function(n,o){o+1<=a?n.classList.add("ikr-fwizard-progress-seg-active"):n.classList.remove("ikr-fwizard-progress-seg-active")})}}}function oi(e){var r=document.createElement("div");r.className="ikr-fwizard-step ikr-fwizard-step-rating";var i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",r.appendChild(i);var t=document.createElement("div");t.className="ikr-fwizard-stars",t.setAttribute("role","radiogroup"),t.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var a=[],n=0;function o(d){a.forEach(function(s,m){m<d?s.classList.add("ikr-fwizard-star-active"):s.classList.remove("ikr-fwizard-star-active")})}for(var l=1;l<=5;l++)(function(d){var s=document.createElement("button");s.type="button",s.className="ikr-fwizard-star",s.setAttribute("role","radio"),s.setAttribute("aria-label",d+" y\u0131ld\u0131z"),s.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2.5l2.9 6.55 7.1.62-5.4 4.7L18.2 21.5 12 17.77 5.8 21.5l1.6-7.13L2 9.67l7.1-.62L12 2.5z"/></svg>',s.addEventListener("mouseenter",function(){n=d,o(d)}),s.addEventListener("mouseleave",function(){n=0,o(e.get().rating)}),s.addEventListener("click",function(){e.set({rating:d}),o(d),setTimeout(function(){e.goNext()},280)}),a.push(s),t.appendChild(s)})(l);return o(e.get().rating),r.appendChild(t),{el:r,destroy:function(){}}}var li=!1;function Xi(){if(!li){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ti,document.head.appendChild(e),li=!0}}function Ji(e,r){if(e===1)return oi(r);var i=document.createElement("div");return i.className="ikr-fwizard-step ikr-fwizard-step-placeholder",i.innerHTML='<div class="ikr-fwizard-step-title">Ad\u0131m '+e+'</div><div style="margin-top:16px;color:rgba(0,0,0,0.55);font-size:14px;">Bu ad\u0131m yak\u0131nda eklenecek.</div>',{el:i,destroy:function(){}}}function si(e){e=e||{},Xi();var r=ai({productId:e.productId,productName:e.productName}),i=ii({onClose:e.onClose,allowOutsideClose:!0}),t=document.createElement("div");t.className="ikr-fwizard-step-wrap";var a=ni();a.el.classList.add("ikr-fwizard-footer");var n=document.createElement("div");n.className="ikr-fwizard-layout",n.appendChild(t),n.appendChild(a.el);var o=null;function l(){o&&o.destroy&&o.destroy(),t.innerHTML="",o=Ji(r.get().currentStep,r),t.appendChild(o.el),a.update(r.get().currentStep)}l();var d=r.get().currentStep;return r.onChange(function(s){s.currentStep!==d&&(d=s.currentStep,l())}),i.open(n),{close:i.close}}function $i(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}function j(){var e=N&&N.reviewFormStyle||"accordion";if(e==="modal"){si({productId:U||"",productName:ce||""});return}$i()}var Qi={id:"classic",name:"Klasik (A\xE7\u0131k)"};function et(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,s=e.currentOrderBy,m=e.currentHasImages,c=e.onFilterChange,p=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var f=(o[3]||0)+(o[4]||0),v=n>0?Math.round(f/n*100):0,u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",k.appendChild(u);var b=document.createElement("div");if(b.className="ikr-summary-block ikr-summary-count",b.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(b),t.showRecommendation!==!1&&v>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(x)}return k.appendChild(ze({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:d,onFilterChange:c})),k.appendChild(ee({widget:r,currentOrderBy:s,currentHasImages:m,onWriteClick:j,onSortChange:p})),k}var gr={};de(gr,{css:()=>it,meta:()=>rt,render:()=>tt});var di=`
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
`;var rt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},it=di;function tt(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,s=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange,p=document.createElement("div");p.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var v=document.createElement("button");v.className="ikr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="ikr-compact-trigger-stars">'+X(o,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(v),k.appendChild(f);var u=ee({widget:r,currentOrderBy:d,currentHasImages:s,onWriteClick:j,onSortChange:c}),b=u.querySelector(".ikr-filter-wrap"),x=u.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-compact-actions-slot",x&&w.appendChild(x),b&&w.appendChild(b),k.appendChild(w),p.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var L=document.createElement("div");L.className="ikr-compact-panel-inner";var z=document.createElement("div");z.className="ikr-compact-avg",z.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+o+"</span>",L.appendChild(z),L.appendChild(ze({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:m})),h.appendChild(L);var g=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function y(G){var K=G?p:f;h.parentNode!==K&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),K.appendChild(h))}if(y(g?g.matches:!1),g){var T=function(G){y(G.matches)};g.addEventListener?g.addEventListener("change",T):g.addListener&&g.addListener(T)}if(x){var E=document.createElement("button");E.className="ikr-write-btn",E.textContent="Yorum Yap",E.onclick=j;var S=document.createElement("div");S.className="ikr-compact-write-row",S.appendChild(E),p.appendChild(S)}function q(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function D(){Je(I),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){h.classList.contains("ikr-open")?q():D()};var I=null;function re(G){I&&(I(),I=null),G||(I=$e({trigger:f,element:h,close:q}))}if(re(g?g.matches:!1),g){var me=function(G){re(G.matches)};g.addEventListener?g.addEventListener("change",me):g.addListener&&g.addListener(me)}if(i.showRecommendation!==!1){var ue=(n[3]||0)+(n[4]||0),be=a>0?Math.round(ue/a*100):0;if(be>0){var se=document.createElement("div");se.className="ikr-summary-block ikr-summary-recommend",se.style.marginTop="8px",se.innerHTML='<span class="ikr-recommend-pct">%'+be+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",L.appendChild(se)}}return p}var hr={};de(hr,{css:()=>nt,meta:()=>at,render:()=>ot});var ci=`
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
`;var at={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},nt=ci;function ot(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,s=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange,p=document.createElement("div");p.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(f);var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-count ikr-split-left-count",v.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(v),p.appendChild(k);var u=document.createElement("div");u.className="ikr-split-col ikr-split-mid",u.appendChild(ze({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:m})),p.appendChild(u);var b=ee({widget:r,currentOrderBy:d,currentHasImages:s,onWriteClick:j,onSortChange:c}),x=b.querySelector(".ikr-filter-wrap"),w=b.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-split-col ikr-split-right",w&&h.appendChild(w),x&&h.appendChild(x),p.appendChild(h),i.showRecommendation!==!1){var L=(n[3]||0)+(n[4]||0),z=a>0?Math.round(L/a*100):0;if(z>0){var g=document.createElement("div");g.className="ikr-summary-block ikr-summary-recommend",g.innerHTML='<span class="ikr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(g)}}return p}var xr={};de(xr,{css:()=>st,meta:()=>lt,render:()=>dt});var pi=`
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
`;var lt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1}},st=pi;function dt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var s=document.createElement("div");s.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var c=document.createElement("span");c.className="ikr-minimal-avg",c.textContent=a,m.appendChild(c);var p=document.createElement("span");p.className="ikr-minimal-stars",p.innerHTML=X(a,i),m.appendChild(p);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),s.appendChild(m),d.appendChild(s);var f=ee({widget:r,currentOrderBy:n,currentHasImages:o,onWriteClick:j,onSortChange:l}),v=f.querySelector(".ikr-filter-wrap"),u=f.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-minimal-actions",u&&b.appendChild(u),v&&b.appendChild(v),d.appendChild(b),u){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=j;var w=document.createElement("div");w.className="ikr-minimal-write-row",w.appendChild(x),d.appendChild(w)}return d}var yr={};de(yr,{css:()=>pt,meta:()=>ct,render:()=>mt});var mi=`
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
`;var ct={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1}},pt=mi;function mt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var s=document.createElement("div");s.className="ikr-hero-info";var m=document.createElement("span");m.className="ikr-hero-avg",m.textContent=a,s.appendChild(m);var c=document.createElement("div");c.className="ikr-hero-meta";var p=document.createElement("span");p.className="ikr-hero-stars",p.innerHTML=X(a,i),c.appendChild(p);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",c.appendChild(k),s.appendChild(c),d.appendChild(s);var f=ee({widget:r,currentOrderBy:n,currentHasImages:o,onWriteClick:j,onSortChange:l}),v=f.querySelector(".ikr-filter-wrap"),u=f.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-hero-actions",u&&b.appendChild(u),v&&b.appendChild(v),d.appendChild(b),u){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=j;var w=document.createElement("div");w.className="ikr-hero-write-row",w.appendChild(x),d.appendChild(w)}return d}var Qe={classic:fr,compact:gr,split:hr,minimal:xr,hero:yr};function er(e){return Qe[e]||Qe.classic}function ui(){return Object.keys(Qe).map(function(e){return Qe[e].css||""}).join(`
`)}var br={};de(br,{css:()=>vt,meta:()=>ut,render:()=>kt});function Ee(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var o=document.createElement("span");return o.className="ikr-read-more ikr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",i.appendChild(o),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,n.classList.toggle("ikr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var ut={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},vt="";function kt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ae(e.rating,N),a.appendChild(n);var o=document.createElement("span");if(o.className="ikr-date",o.textContent=ne(e.createdAt),t.appendChild(a),t.appendChild(o),i.appendChild(t),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",i.appendChild(d);var s=(e.comment||"").trim();if(s){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=s,i.appendChild(m);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",i.appendChild(c),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){c.style.display="inline";var f=!1;c.onclick=function(){f=!f,m.classList.toggle("ikr-body-clamped",!f),c.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var p=document.createElement("div");p.className="ikr-gallery",e.images.forEach(function(f){if(!(!f||f.indexOf("https://")!==0&&f.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=Y(f),v.className="ikr-img",v.setAttribute("data-ikr-img-url",f),(function(u){v.onclick=function(){$(e,u,r)}})(f),p.appendChild(v)}}),i.appendChild(p)}var k=Ee(e.merchantReply);return k&&i.appendChild(k),i}var wr={};de(wr,{css:()=>gt,meta:()=>ft,render:()=>ht});var vi=`
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
`;var ft={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},gt=vi;function ht(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ae(e.rating,N),a.appendChild(n);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",a.appendChild(o);var l=document.createElement("span");l.className="ikr-date ikr-review-list-author-date",l.textContent=ne(e.createdAt),a.appendChild(l),t.appendChild(a);var d=document.createElement("div");if(d.className="ikr-review-list-content",e.title){var s=document.createElement("div");s.className="ikr-review-list-title",s.textContent=e.title,d.appendChild(s)}var m=(e.comment||"").trim();if(m){var c=document.createElement("div");c.className="ikr-review-list-body ikr-body-clamped",c.textContent=m,d.appendChild(c);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",d.appendChild(p),requestAnimationFrame(function(){if(c.scrollHeight>c.clientHeight+2){p.style.display="inline";var v=!1;p.onclick=function(){v=!v,c.classList.toggle("ikr-body-clamped",!v),p.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Ee(e.merchantReply);if(k&&d.appendChild(k),t.appendChild(d),i){var f=document.createElement("div");f.className="ikr-review-list-media",e.images.forEach(function(v){if(!(!v||v.indexOf("https://")!==0&&v.indexOf("data:image/")!==0)){var u=document.createElement("img");u.src=Y(v),u.setAttribute("data-ikr-img-url",v),(function(b){u.onclick=function(){$(e,b,r)}})(v),f.appendChild(u)}}),t.appendChild(f)}return t}var Cr={};de(Cr,{css:()=>yt,meta:()=>xt,render:()=>bt});var ki=`
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
`;var xt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},yt=ki;function bt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ae(e.rating,N),a.appendChild(n),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,a.appendChild(o)}var l=document.createElement("div");l.className="ikr-review-gallery-author",l.textContent=e.author||"",a.appendChild(l);var d=document.createElement("div");d.className="ikr-review-gallery-date",d.textContent=ne(e.createdAt),a.appendChild(d);var s=(e.comment||"").trim();if(s){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=s,a.appendChild(m);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",c.style.cursor="pointer",c.onclick=function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;$(e,u,r)},a.appendChild(c),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(c.style.display="inline")})}if(t.appendChild(a),i){var p=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var f=document.createElement("img");f.src=Y(p),f.loading="lazy",f.setAttribute("data-ikr-img-url",p),f.onclick=function(){$(e,p,r)},k.appendChild(f),t.appendChild(k)}var v=Ee(e.merchantReply,function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;$(e,u,r)});return v&&(v.classList.add("ikr-review-gallery-reply"),t.appendChild(v)),t}var rr={card:br,list:wr,gallery:Cr};function ir(e){return rr[e]||rr.card}function fi(){return Object.keys(rr).map(function(e){return rr[e].css||""}).join(`
`)}function P(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var gi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},hi={small:80,medium:110,large:140};function wt(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",o=r.widgetBgColor||i,l=r.widgetBorderColor||"transparent",d=r.separatorColor||P(t,.08),s=r.headerTitleColor||t,m=r.headerAvgColor||t,c=r.headerCountColor||t,p=r.headerRecommendColor||t,k=r.barLabelColor||t,f=r.barFillColor||t,v=r.barTrackColor||P(t,.1),u=r.barCountColor||t,b=r.barHoverBgColor||P(t,.05),x=r.primaryColor||"#111111",w=r.primaryTextColor||"#ffffff",h=r.btnBgColor||x,L=r.btnTextColor||w,z=r.btnBorderColor||x,g=r.filterBtnBgColor||x,y=r.filterBtnTextColor||w,T=r.filterBtnBorderColor||x,E=r.filterMenuBgColor||i,S=r.filterMenuBorderColor||P(t,.12),q=r.filterItemTextColor||t,D=r.filterItemHoverBgColor||P(x,.07),I=r.filterItemActiveColor||x,re=r.reviewTitleColor||t,me=r.reviewAuthorColor||t,ue=r.reviewDateColor||t,be=r.reviewBodyColor||t,se=r.reviewBorderColor||P(t,.08),G=r.reviewStarColor||"#f59e0b",K=r.replyBgColor||a,we=r.replyBorderColor||x,De=r.replyLabelColor||t,Ce=r.replyTextColor||t,nr=r.photoBgColor||P(t,.03),Ae=r.photoBorderColor||P(t,.1),or=r.photoTitleColor||t,ve=r.formBgColor||i,Ye=r.formBorderColor||P(t,.08),ke=r.inputBgColor||n,fe=r.inputTextColor||t,ge=r.inputBorderColor||P(t,.2),Ne=r.placeholderColor||P(t,.35),lr=r.loadMoreBgColor||i,sr=r.loadMoreTextColor||t,F=r.loadMoreBorderColor||P(t,.3),ie=r.modalBgColor||i,Nr=r.modalTextColor||t,Be=r.modalCloseBgColor||x,C=r.modalCloseTextColor||w,A=r.modalCloseBorderColor||x,R=r.modalNavBgColor||"rgba(0,0,0,0.45)",M=r.modalNavTextColor||"#ffffff",Re=r.modalReplyBgColor||a,Mi=r.modalReplyBorderColor||x,Br={"--ikr-widget-bg":o,"--ikr-widget-border":l,"--ikr-separator":d,"--ikr-header-title":s,"--ikr-header-avg":m,"--ikr-header-count":c,"--ikr-header-recommend":p,"--ikr-bar-label":k,"--ikr-bar-fill":f,"--ikr-bar-track":v,"--ikr-bar-count":u,"--ikr-bar-hover-bg":b,"--ikr-btn-bg":h,"--ikr-btn-text":L,"--ikr-btn-border":z,"--ikr-filter-btn-bg":g,"--ikr-filter-btn-text":y,"--ikr-filter-btn-border":T,"--ikr-filter-menu-bg":E,"--ikr-filter-menu-border":S,"--ikr-filter-item-text":q,"--ikr-filter-item-hover-bg":D,"--ikr-filter-item-active":I,"--ikr-review-title":re,"--ikr-review-author":me,"--ikr-review-date":ue,"--ikr-review-body":be,"--ikr-review-border":se,"--ikr-review-star-color":G,"--ikr-reply-bg-color":K,"--ikr-reply-border":we,"--ikr-reply-label":De,"--ikr-reply-text":Ce,"--ikr-photo-bg":nr,"--ikr-photo-border":Ae,"--ikr-photo-title":or,"--ikr-form-bg":ve,"--ikr-form-border":Ye,"--ikr-input-bg-color":ke,"--ikr-input-text-color":fe,"--ikr-input-border":ge,"--ikr-placeholder":Ne,"--ikr-load-more-bg":lr,"--ikr-load-more-text":sr,"--ikr-load-more-border":F,"--ikr-modal-bg":ie,"--ikr-modal-text":Nr,"--ikr-modal-close-bg":Be,"--ikr-modal-close-text":C,"--ikr-modal-close-border":A,"--ikr-modal-nav-bg":R,"--ikr-modal-nav-text":M,"--ikr-modal-reply-bg":Re,"--ikr-modal-reply-border":Mi,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":P(t,.45),"--ikr-border":P(t,.12),"--ikr-track-bg":P(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(Br).forEach(function(Rr){e.style.setProperty(Rr,Br[Rr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function le(e,r,i,t,a,n,o){if(ur){Ke({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:o});return}Ue(!0),Ir(e),Or(r),o!==void 0&&Pr(o),Mr(t),a&&Se(a),n&&ye(n),i!=null&&Hr(i);try{let Be=function(C,A){if(!(!C||!C.meta||!C.meta.sizeOverrides)){var R=C.meta.sizeOverrides[A];R&&Object.keys(R).forEach(function(M){p.style.setProperty(M,R[M])})}};var Nr=Be,l=er(r.summaryLayout),d=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),s=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=d&&s?m:"",p=document.documentElement;wt(p,r);var k=r.primaryColor||"#111111",f=r.primaryTextColor||"#ffffff";Kr(k,ei+ui()+fi());var v=r.borderRadius!==void 0?r.borderRadius:8,u=gi[r.size]||gi.medium,b=hi[r.thumbnailSize]||hi.medium;p.style.setProperty("--ikr-title-size",u.titleSize+"px"),p.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),p.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),p.style.setProperty("--ikr-author-size",u.authorSize+"px"),p.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),p.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),p.style.setProperty("--ikr-color-text",f),p.style.setProperty("--ikr-radius",v+"px"),p.style.setProperty("--ikr-radius-sm",Math.max(0,v-4)+"px"),p.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),p.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),p.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),p.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),p.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),p.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),p.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),p.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),p.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),p.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),p.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),p.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),p.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),p.style.setProperty("--ikr-thumbnail-size",b+"px");var x=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";p.style.setProperty("--ikr-review-star-color",x),p.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),p.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),Be(er(r.summaryLayout),r.size),Be(ir(r.reviewLayout),r.size);var w=qe(r),h=document.getElementById("ikas-reviews");if(!h){var L=document.getElementById("ikas-reviews-anchor");if(!L)return;h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px",L.appendChild(h)}if(r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ue(!1);var z=Ie;Ke(null),z&&le(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var g=i||{},y=g.data&&g.data.reviews||[],T=g.data&&g.data.totalCount||0,E=h.cloneNode(!1);h.parentNode.replaceChild(E,h),h=E;var S=document.createElement("div");if(S.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),c){var q=document.createElement("div"),D=r.summaryLayout||"classic";q.className="ikr-title ikr-title-"+D,q.textContent=c,S.appendChild(q)}var I=g.data&&g.data.allCount||0,re=g.data&&g.data.ratingCounts||null,me=re||[0,0,0,0,0],ue=g.data&&g.data.avgRating||"0.0";if(!re&&y.length>0){y.forEach(function(C){C.rating>=1&&C.rating<=5&&me[C.rating-1]++});var be=y.reduce(function(C,A){return C+A.rating},0);ue=(be/y.length).toFixed(1)}if(I>0){var se=er(r.summaryLayout),G=se.render({widget:S,data:g,settings:r,iconPair:w,allCount:I,ratingCounts:me,avgRatingVal:ue,currentRatingFilter:he,currentOrderBy:V,currentHasImages:xe,onFilterChange:async function(C){Ge(he===C?null:C),ye(1);var A=await Fe(U,V,1,he,xe);await le(U,N,A,ce,V,1)},onSortChange:async function(C,A){ye(1),A?(mr(!0),Se("newest")):(mr(!1),Se(C));var R=await Fe(U,V,1,he,xe);await le(U,N,R,ce,V,1)}});S.appendChild(G)}else{var K=document.createElement("button");K.className="ikr-write-btn",K.style.cssText="display:block;margin:16px auto 0;",K.textContent="Yorum Yap",K.onclick=function(){var C=document.getElementById("ikr-form-accordion");if(C){var A=C.style.maxHeight&&C.style.maxHeight!=="0px";A?(C.style.maxHeight="0px",C.style.opacity="0"):(C.style.maxHeight=C.scrollHeight+"px",C.style.opacity="1",setTimeout(function(){C.style.maxHeight="none"},360),setTimeout(function(){var R=document.querySelector("header"),M=R?R.getBoundingClientRect().height:0,Re=C.getBoundingClientRect().top+window.pageYOffset-M-16;window.scrollTo({top:Re,behavior:"smooth"})},50))}},S.appendChild(K)}var we=document.createElement("div");we.id="ikr-form-accordion",we.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",we.appendChild(Xr(e,t)),S.appendChild(we);var De=y.filter(function(C){return C.images&&Array.isArray(C.images)&&C.images.some(function(A){return A&&(A.indexOf("https://")===0||A.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!xe&&De.length>0){var Ce=document.createElement("div");if(Ce.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var nr=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",Ae=document.createElement("div");Ae.className="ikr-photo-title",Ae.textContent=nr,Ce.appendChild(Ae)}var or=r.reviewLayout==="card"?"1/1":"3/4";p.style.setProperty("--ikr-photo-thumb-aspect",or);var ve=document.createElement("div");ve.className="ikr-photo-strip";var Ye=0;De.forEach(function(C){if(!(Ye>=10)){var A=C.images.find(function(M){return M&&(M.indexOf("https://")===0||M.indexOf("data:image/")===0)});if(A){var R=document.createElement("img");R.src=Y(A),R.className="ikr-photo-strip-thumb",R.alt="Yorum foto\u011Fraf\u0131",(function(M,Re){R.onclick=function(){$(Re,M,y)}})(A,C),ve.appendChild(R),Ye++}}});var ke=document.createElement("button");ke.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ke.innerHTML="&#8249;",ke.setAttribute("aria-label","\xD6nceki"),ke.onclick=function(){ve.scrollBy({left:-200,behavior:"smooth"})};var fe=document.createElement("button");fe.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",fe.innerHTML="&#8250;",fe.setAttribute("aria-label","Sonraki"),fe.onclick=function(){ve.scrollBy({left:200,behavior:"smooth"})};var ge=document.createElement("div");ge.className="ikr-photo-strip-wrap",ge.appendChild(ke),ge.appendChild(ve),ge.appendChild(fe),Ce.appendChild(ge),S.appendChild(Ce)}if(y.length===0){var Ne=document.createElement("p");Ne.className="ikr-state-msg",Ne.textContent="Hen\xFCz yorum yok.",S.appendChild(Ne)}else{var lr=ir(r.reviewLayout);y.forEach(function(C){S.appendChild(lr.render(C,y))})}var sr=g.data&&g.data.hasMore;if(sr){var F=document.createElement("button");F.className="ikr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var C=_e+1,A=await Fe(U,V,C,he,xe);if(A&&A.data&&A.data.reviews){ye(C);var R=ir(N.reviewLayout);A.data.reviews.forEach(function(M){S.insertBefore(R.render(M,A.data.reviews),F)}),A.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.remove()},S.appendChild(F)}h.appendChild(S),Qr(I>0?ue:null,T,t,cr)}catch(C){console.error("[ikr] render error:",C),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ue(!1),Ie){var ie=Ie;Ke(null),le(ie.productId,ie.settings,ie.reviewsData,ie.productName,ie.orderBy,ie.page,ie.badgeSettings)}}}var pe="ikr_settings_"+H,Ct=300*1e3,St=30*1e3;async function zr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||Z,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var t=await J(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(m){}return null}var n=null,o=Me(pe);if(o)try{var l=JSON.parse(o);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<St)return null;_(pe,"")}else if(l.v){if(Date.now()-l.t<Ct)return l.v;n=l.v,_(pe,"")}else _(pe,"");else _(pe,"")}catch(m){_(pe,"")}try{var d=await J(Z+"/api/public/settings?publicApiKey="+encodeURIComponent(H));if(!d.ok)return d.status===404&&_(pe,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var s=await d.json();return _(pe,JSON.stringify({t:Date.now(),v:s})),s}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var zt=60*1e3;async function Fe(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||Z,o=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),l=await J(o);if(l.ok)return await l.json()}catch(v){}return null}r=r||"newest",i=i||1;var d="ikr_reviews_"+H+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),s=null,m=Me(d);if(m)try{var c=JSON.parse(m);if(c&&c.t!==void 0&&c.v){if(Date.now()-c.t<zt)return c.v;s=c.v,_(d,"")}else _(d,"")}catch(v){_(d,"")}try{var p=Z+"/api/public/reviews?storeId="+encodeURIComponent(H)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await J(p);if(!k.ok)return s||null;var f=await k.json();return _(d,JSON.stringify({t:Date.now(),v:f})),f}catch(v){return console.error("[ikr] fetchReviews error:",v),s||null}}var Sr={};async function Te(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!Sr[e]){Sr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var o=await zr();if(!o)return;var l=o.widgets&&o.widgets.reviews||a,d=o.widgets&&o.widgets.badge||n;if(l.enabled===!1)return;Se("newest"),ye(1),Ge(null);var s=await Fe(e,"newest",1,null);await le(e,l,s,r,"newest",1,d)}catch(m){console.error("[ikr] bootstrap error:",m),await le(e,a,null,r,void 0,void 0,n)}finally{delete Sr[e]}}}function Er(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function xi(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=O(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Xe.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Oe).forEach(function(i){e[i]=Oe[i]}),e}var Et=300*1e3,yi=50;async function bi(e){var r="ikr_ratings_"+H,i={},t=Me(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<Et?i=a.v||{}:_(r,"")}catch(s){_(r,"")}var n=e.filter(function(s){return!i[s]});if(!n.length)return i;for(var o=[],l=0;l<n.length;l+=yi)o.push(n.slice(l,l+yi));var d=await Promise.all(o.map(function(s){var m=Z+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(H)+"&slugs="+s.map(encodeURIComponent).join(",");return J(m).then(function(c){return c.ok?c.json().then(function(p){return p.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(s){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(s).forEach(function(m){i[m]=s[m]})}),_(r,JSON.stringify({t:Date.now(),v:i})),i}var Tt="var(--ikr-badge-color,#f59e0b)",wi=13,Lt="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function At(e){var r=He("star","classic"),i="width:"+wi+"px;height:"+wi+"px;";return'<span style="color:'+Tt+';display:inline-flex;align-items:center;">'+X(e,r,{sizeStyle:i})+"</span>"}function je(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=Lt+"justify-content:"+(r||"flex-start")+";",i.innerHTML=At(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var Ci=".product-name",Si=".add-to-basket-modal",zi="h1.product-name",tr=".single-product-container-main",Tr=".single-product-product-name",Ei=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Ti=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Li='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Nt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Lr(e,r){var i=e.querySelector(Ci);if(i)return i;if(e.matches&&e.matches(Li))return e;var t=e.querySelector(Li);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var o=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<o.length;l++){var d=o[l],s=d.textContent.trim();if(!(!s||s.length<2||s.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(s)&&!Nt.test(s)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function Bt(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=O(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(tr)&&!e.closest(Tr)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(Tr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ei)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),o=Array.from(e.childNodes).filter(function(f){return f.nodeType===3}).map(function(f){return f.textContent.trim()}).join("").trim(),l=!!Lr(e,i);if(!o&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(f){f.setAttribute("data-ikr-badge","1")});var d=Lr(e,i);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var s=window.getComputedStyle(d).textAlign;d.appendChild(je(r,s==="center"?"center":s==="right"?"flex-end":"flex-start"));return}var m=Lr(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var c=window.getComputedStyle(m).textAlign;m.appendChild(je(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"))}else{var p=je(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(p,k):e.appendChild(p)}}}function Rt(e,r){var i=document.querySelector(Si);if(i){var t=i.querySelector(zi);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Pe&&r[Pe]&&(a=Pe),!a){var n=O(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var o=t.textContent.trim();Object.keys(e).forEach(function(c){if(!a){var p=e[c];p&&p.trim()===o&&r[c]&&(a=c)}})}if(!a){var l=document.querySelector(tr);if(l){var d=l.querySelector("a[href]");if(d){var s=O(d.href);s&&r[s]&&(a=s)}}}if(!a){var m=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(c){if(!a&&!(c.closest("header")||c.closest("nav"))&&!c.closest(tr)){var p=c.textContent.trim().toLowerCase();if(p&&p===m){var k=O(c.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(je(r[a],"flex-start"))}}}function Ai(e,r){var i=O(window.location.pathname),t=document.querySelectorAll(Ti),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(o){a.push(o)})}),Object.keys(e).forEach(function(n){var o=r[n];if(!(!o||o._empty||o.count===0)){var l=e[n];a.forEach(function(d){O(d.href)===n&&Bt(d,o,l,i)})}}),Rt(e,r)}async function Le(){if(B.inProgress){B.queued=!0;return}if(!B.rendered){B.rendered=!0,B.inProgress=!0;try{var e=B.navCleanup;e&&(B.navCleanup=!1);var r=xi();if(!Object.keys(r).length){B.rendered=!1;return}var i=await Promise.all([zr(),bi(Object.keys(r))]),t=i[0];if(!t){B.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},o=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){B.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",o),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),Ai(r,a)}finally{B.inProgress=!1,B.queued&&(B.queued=!1,B.rendered=!1,Le())}}}var Ni=!1,Bi=!1;function Ii(){Bi||(Bi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=O(r.href);!i||i.length<3||qr(i)}},!0))}var Ri=!1,_i=typeof location!="undefined"?location.pathname:"";function ar(){try{if(location.pathname===_i)return;_i=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function _t(){if(!Ri){Ri=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return ar(),i},history.replaceState=function(){var i=r.apply(this,arguments);return ar(),i},window.addEventListener("popstate",ar),window.addEventListener("hashchange",ar)}}function Ar(){if(_t(),window.IkasEvents){if(Ni)return;Ni=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var o=n.data&&n.data.productDetails;Array.isArray(o)&&o.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(Oe[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,d=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(_("ikr_reviews_"+H+"_"+l,""),Te(l,d))}if(n&&n.type==="PAGE_VIEW"){var s=Date.now();if(B.lastPageView&&s-B.lastPageView<800)return;B.lastPageView=s,B.navCleanup=!0,B.rendered=!1,Le()}}});var e=Er();if(e)Te(e.id,e.name);else{let n=function(){var o=Er();o?Te(o.id,o.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){B.rendered||Le()},2e3)}else{let n=function(){window.IkasEvents?Ar():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var Oi=null;function Pi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Oi),Oi=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=O(a.href);return n&&n.length>=3&&!Xe.test(n)});t&&(B.rendered=!1,Le())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var It=window.__ikasPreviewMode===!0;if(It){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Te("mock-product","\xD6rnek \xDCr\xFCn"),e()};Ot=e,Pt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!N)){var n=Object.assign({},N,a);le(U,n,pr,ce,V,_e)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(H){let e=function(){Ar(),Ii(),Pi()};Mt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Ot,Pt,Mt;})();
