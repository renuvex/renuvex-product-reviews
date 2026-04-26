/* ikas Reviews Widget — built 2026-04-26T15:57:26.411Z | theme: default */
"use strict";(()=>{var Ni=Object.defineProperty;var de=(e,r)=>{for(var i in r)Ni(e,i,{get:r[i],enumerable:!0})};var Br=document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})(),dr=Br?Br.src:"",_i=new URLSearchParams(dr.split("?")[1]||""),H=_i.get("publicApiKey"),K=dr?dr.split("?")[0].replace(/\/widget\.js$/,""):"";var Z="newest",Re=1,fe=null,he=!1,ie=null,_=null,cr=null,Ce=null,pr=null;function Se(e){Z=e}function xe(e){Re=e}function Ge(e){fe=e}function mr(e){he=e}function Rr(e){ie=e}function Ir(e){_=e}function Or(e){cr=e}function Pr(e){Ce=e}function Mr(e){pr=e}var ur=!1,Ie=null;function Ue(e){ur=e}function Ke(e){Ie=e}var N={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Oe={},Pe=null;function Hr(e){Pe=e}var qr={};function Me(e){try{return sessionStorage.getItem(e)}catch(r){return qr[e]||null}}function R(e,r){try{sessionStorage.setItem(e,r)}catch(i){qr[e]=r}}var te="0 -960 960 960",V={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function Ze(e){return'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Dr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+V.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+V.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+V.starFill+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+V.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+V.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+V.starFill+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+V.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+V.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+V.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+te+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+V.heartOutline+'"/></g></svg>'}}}};function Bi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function He(e,r){var i=Dr[e]||Dr.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function qe(e){var r=e&&e.reviewIcon||"star",i=Bi(r),t=i.style||e&&e.reviewIconStyle||"classic";return He(i.type,t)}function jr(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=qe(r),n=i&&i.sizePx,l=n?"width:"+n+"px;height:"+n+"px;":"",o="",s=1;s<=5;s++){var c=s<=t;o+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+l+'">'+(c?a.filled:a.empty)+"</span>"}return o}var Ve={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},Fr={lines:{label:"\xC7izgili",svg:Ze(Ve.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:Ze(Ve.linesAlt)},funnel:{label:"Huni",svg:Ze(Ve.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:Ze(Ve.dense)}};function Yr(e){var r=Fr[e]||Fr.lines;return r.svg}var We="var(--ikr-review-star-color,#f59e0b)",Je=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function O(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ae(e,r){var i="color:"+We+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+jr(e,r)+"</span>"}function W(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,l=n<.25?a:n<.75?a+.5:a+1,o=l/5*100,s=i&&i.sizeStyle||"",c="",m="",d=0;d<5;d++)c+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>",m+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+c+'</span><span class="ikr-stars-partial-fill" style="width:'+o+'%;">'+m+"</span></span>"}function ne(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Ri(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Ii(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Ri(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Ur(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Ii(e)}function Y(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Kr(e,r,i,t){var a=qe(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),l=document.createElement("div");if(l.className="ikr-rating"+(r?" ikr-rating-interactive":""),l.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){l.style.flexDirection="row";for(var o=1;o<=5;o++){var s=document.createElement("span");s.className="ikr-icon",s.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(o<=e?We:"#ddd")+";",s.innerHTML=o<=e?a.filled:a.empty,l.appendChild(s)}return l}for(var c=5;c>=1;c--)(function(m){var d=document.createElement("input");d.type="radio",d.name=n,d.value=String(m),d.id=n+"-"+m,d.className="ikr-rating-input",m===e&&(d.checked=!0),d.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",d.addEventListener("change",function(){i&&i(m)});var p=document.createElement("label");p.htmlFor=d.id,p.className="ikr-rating-label",p.setAttribute("aria-label",m+" y\u0131ld\u0131z"),p.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",p.addEventListener("click",function(k){k.preventDefault();for(var g=l.querySelectorAll(".ikr-rating-input"),u=0;u<g.length;u++)g[u].checked=!1;d.checked=!0,i&&i(m)}),p.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+We+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",p.style.position="relative",l.appendChild(d),l.appendChild(p)})(c);return Oi(),l}var Gr=!1;function Oi(){if(!Gr){Gr=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+We+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function J(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Zr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Pi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=ae(e.rating,_);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ne(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var l=document.createElement("div");l.className="ikr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",i.appendChild(l);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(s);var c=document.createElement("div");c.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var d=document.createElement("div");return d.className="ikr-modal-reply-text",d.textContent=e.merchantReply||"",c.appendChild(m),c.appendChild(d),c.style.display=e.merchantReply?"":"none",i.appendChild(c),r.appendChild(i),r}function Mi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ae(r.rating,_),i.querySelector(".ikr-modal-date").textContent=ne(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function vr(e,r,i,t,a,n,l,o){var s=e.images&&Array.isArray(e.images)?e.images.filter(function(y){return y&&(y.indexOf("https://")===0||y.indexOf("data:image/")===0)}):[],c=Math.min(i,s.length-1),m=document.createElement("div");m.className="ikr-modal-left";var d=document.createElement("img"),p=l==="next"?"ikr-modal-img-enter-right":l==="prev"?"ikr-modal-img-enter-left":"";d.className="ikr-modal-main-img"+(p?" "+p:""),d.src=Y(s[c]||""),d.alt="Yorum foto\u011Fraf\u0131",m.appendChild(d);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(y){y.stopPropagation(),n()},m.appendChild(k);var g=0;if(m.addEventListener("touchstart",function(y){g=y.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(y){var T=g-y.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(b)oe(e,r,c+1,t,a,n,!0,"next",o);else if(w){var E=t[r+1];oe(E,r+1,0,t,a,n,!1,"next",o)}}else if(v)oe(e,r,c-1,t,a,n,!0,"prev",o);else if(x){var S=t[r-1],q=(S.images||[]).filter(function(j){return j&&(j.indexOf("https://")===0||j.indexOf("data:image/")===0)});oe(S,r-1,q.length-1,t,a,n,!1,"prev",o)}}},{passive:!0}),s.length>1){var u=document.createElement("div");u.className="ikr-modal-thumbs",s.forEach(function(y,T){var E=document.createElement("img");E.src=Y(y),E.className="ikr-modal-thumb"+(T===c?" ikr-modal-thumb-active":""),E.alt="K\xFC\xE7\xFCk resim "+(T+1),(function(S){E.onclick=function(){oe(e,r,S,t,a,n,!0,null,o)}})(T),u.appendChild(E)}),m.appendChild(u)}var v=c>0,b=c<s.length-1,x=r>0,w=r<t.length-1,h=v||x,L=b||w;if(h||L){var z=document.createElement("button");z.className="ikr-modal-nav ikr-modal-nav-prev",z.innerHTML="&#8249;",z.setAttribute("aria-label","\xD6nceki"),z.style.opacity=h?"1":"0.3",z.onclick=function(y){if(y.stopPropagation(),v)oe(e,r,c-1,t,a,n,!0,"prev",o);else if(x){var T=t[r-1],E=(T.images||[]).filter(function(S){return S&&S.indexOf("https://")===0});oe(T,r-1,E.length-1,t,a,n,!1,"prev",o)}},m.appendChild(z);var f=document.createElement("button");f.className="ikr-modal-nav ikr-modal-nav-next",f.innerHTML="&#8250;",f.setAttribute("aria-label","Sonraki"),f.style.opacity=L?"1":"0.3",f.onclick=function(y){if(y.stopPropagation(),b)oe(e,r,c+1,t,a,n,!0,"next",o);else if(w){var T=t[r+1];oe(T,r+1,0,t,a,n,!1,"next",o)}},m.appendChild(f)}return m}function Vr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=Y(a[0]))}})}function oe(e,r,i,t,a,n,l,o,s){if(l){var c=vr(e,r,i,t,a,n,o,s);a.firstChild&&a.replaceChild(c,a.firstChild)}else{var c=vr(e,r,i,t,a,n,o,s),m=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(c,a.firstChild),m&&Mi(m,e);var d=s&&s.querySelector(".ikr-modal-wrap");d&&(d.scrollTop=0)}Vr(r,t)}function X(e,r,i){var t=(i||[]).filter(function(v){return v.images&&Array.isArray(v.images)&&v.images.some(function(b){return b&&(b.indexOf("https://")===0||b.indexOf("data:image/")===0)})}),a=t.findIndex(function(v){return v===e||v.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(v){return v&&(v.indexOf("https://")===0||v.indexOf("data:image/")===0)}):[],l=Math.max(0,n.indexOf(r)),o=document.createElement("div");o.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var c=!1;function m(){c||(c=!0,Zr(o,d,m))}function d(v){v.key==="Escape"&&p()}function p(){c||(c=!0,history.go(-1),Zr(o,d,m))}document.addEventListener("keydown",d);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),o.onclick=function(){p()},s.onclick=function(v){v.stopPropagation()},s.appendChild(vr(e,a,l,t,s,p,null,o)),s.appendChild(Pi(e)),Vr(a,t);var g=document.createElement("div");g.className="ikr-modal-wrap",g.appendChild(s);var u=document.createElement("button");u.className="ikr-modal-close",u.textContent="\u2715",u.setAttribute("aria-label","Kapat"),u.onclick=function(v){v.stopPropagation(),p()},g.appendChild(u),o.appendChild(g),document.body.appendChild(o)}function Wr(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),l=i.querySelector("#ikr-comment-counter");function o(){var u=n.value.length;l.textContent=u+"/2000",l.classList.toggle("ikr-char-counter--max",u>=2e3)}n.addEventListener("input",o);var s=Kr(0,!0,function(u){t=u},_);i.querySelector("#ikr-stars-input").appendChild(s);var c=i.querySelector("#ikr-file-input"),m=i.querySelector("#ikr-photo-previews"),d=!1,p=i.querySelector("label.ikr-photo-btn"),k=3;function g(){var u=a.length;u>=k?(c.disabled=!0,p&&(p.style.opacity="0.4")):(c.disabled=!1,p&&(p.style.opacity="1"))}return c.onchange=async function(u){if(!d){d=!0,c.disabled=!0;var v=k-a.length,b=Array.from(u.target.files).slice(0,v);for(let w=0;w<b.length;w++){let h=b[w];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let L=document.createElement("div");L.className="ikr-preview-item";let z=URL.createObjectURL(h);L.innerHTML='<img class="ikr-preview-img" src="'+z+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',m.appendChild(L);let f=L.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(z),f.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){f.style.opacity="0",f.style.transition="opacity 0.4s",setTimeout(function(){f.style.display="none";let y=document.createElement("button");y.className="ikr-preview-remove",y.innerHTML="&#x2715;",y.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),y.onclick=function(){a=a.filter(function(T){return T!==z}),L.remove(),g()},L.appendChild(y)},400)},800);continue}try{let y=await J(K+"/api/public/upload/sign",{method:"POST"});if(!y.ok)throw y.status===429?new Error("rate_limit"):new Error("sign failed");let T=await y.json(),E=new FormData;E.append("file",h),E.append("api_key",T.api_key),E.append("timestamp",T.timestamp),E.append("signature",T.signature),E.append("folder","review_images");let q=await(await fetch("https://api.cloudinary.com/v1_1/"+T.cloud_name+"/image/upload",{method:"POST",body:E})).json();if(q.secure_url){let j=q.secure_url;a.push(j),f.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){f.style.opacity="0",f.style.transition="opacity 0.4s",setTimeout(function(){f.style.display="none";let I=document.createElement("button");I.className="ikr-preview-remove",I.innerHTML="&#x2715;",I.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),I.onclick=function(){a=a.filter(function(ee){return ee!==j}),L.remove(),g()},L.appendChild(I)},400)},800)}}catch(y){console.error("[ikr] Image upload failed:",y);var x=y.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";f.innerHTML='<span class="ikr-upload-error">\u2717 '+x+"</span>"}}d=!1,c.value="",g()}},i.querySelector("#ikr-submit").onclick=async function(){var u=this,v=i.querySelector("#ikr-name").value.trim(),b=i.querySelector("#ikr-title").value.trim(),x=i.querySelector("#ikr-comment").value.trim(),w=i.querySelector("#ikr-msg");if(!t){w.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!v){w.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(u.disabled=!0,u.textContent="G\xF6nderiliyor\u2026",w.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=O(window.location.href),L=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),z=await J(K+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:e,slug:h||null,productName:L,author:v,title:b||null,comment:x,rating:t,images:a})},15e3);if(z.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var f=await z.json().catch(function(){return{}});throw new Error(f.error||"Yorum kaydedilemedi.")}}catch(S){var y=S&&(S.name==="AbortError"||/signal/i.test(S.message||"")),T=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":S.message||"Yorum g\xF6nderilemedi.",E=document.createElement("div");E.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",E.textContent=T,w.innerHTML="",w.appendChild(E),u.disabled=!1,u.textContent="G\xF6nder"}},i}function Jr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var Xr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Hi(e,r,i,t,a){var n=He(r,i),l="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+W(e,n,{sizeStyle:l})+"</span>"}function $r(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var l=document.createElement("script");l.id="ikr-jsonld",l.type="application/ld+json",l.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(l);var o=Jr(i);if(!(!o||!o.parentNode)){var s=t&&t.icon||"star",c=t&&t.iconStyle||"classic",m=t&&t.size||"medium",d=t&&t.color||"#f59e0b",p=Xr[m]||Xr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var g=window.getComputedStyle(o).textAlign,u=g==="center"?"center":g==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+u+";",k.innerHTML=Hi(e,s,c,d,p.icon)+'<span style="font-size:'+p.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(v){v.preventDefault();var b=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(b){var x=document.querySelector("header"),w=x?x.getBoundingClientRect().height:0,h=b.getBoundingClientRect().top+window.pageYOffset-w-16;window.scrollTo({top:h,behavior:"smooth"})}},o.parentNode.insertBefore(k,o.nextSibling)}}}var Qr=`
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
    font-weight:600;
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
`;var kr={};de(kr,{meta:()=>ji,render:()=>Yi});function ze(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,l=document.createElement("div");l.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var s=r[o-1]||0,c=i>0?Math.round(s/i*100):0,m=a===o,d=document.createElement("div");d.className="ikr-bar-row"+(m?" ikr-bar-active":""),a&&!m&&(d.style.opacity="0.35");for(var p="",k=1;k<=5;k++){var g=k<=o;p+='<span class="ikr-bar-star ikr-icon '+(g?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(g?t.filled:t.empty)+"</span>"}d.innerHTML='<span class="ikr-bar-label">'+p+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(u){d.onclick=function(){n(u)}})(o),l.appendChild(d)}return l}var $=[],ei=!1;function qi(e){for(var r=$.length-1;r>=0;r--){var i=$[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Di(e){if(e.key==="Escape")for(var r=$.length-1;r>=0;r--)$[r].close()}function Fi(){ei||typeof document=="undefined"||(document.addEventListener("click",qi,!0),document.addEventListener("keydown",Di),ei=!0)}function Xe(e){for(var r=0;r<$.length;r++)$[r]!==e&&$[r].close()}function $e(e){Fi();var r={trigger:e.trigger,element:e.element,close:e.close};return $.push(r),function(){var t=$.indexOf(r);t!==-1&&$.splice(t,1)}}function Q(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,l=document.createElement("div");l.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent="Yorum Yap",o.onclick=a,l.appendChild(o);var s=document.createElement("div");s.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var m=_&&_.filterIcon||"lines";c.innerHTML=Yr(m);var d=document.createElement("div");d.className="ikr-filter-menu";var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){d.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function g(){Xe(u),d.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}p.forEach(function(v){var b=v[2],x=b?t:!t&&(i||"newest")===v[0],w=document.createElement("div");w.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),w.textContent=v[1],w.onclick=function(){k(),n(v[0],b)},d.appendChild(w)}),c.onclick=function(){d.classList.contains("ikr-open")?k():g()};var u=$e({trigger:s,element:d,close:k});return s.appendChild(c),s.appendChild(d),l.appendChild(s),l}function F(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}var ji={id:"classic",name:"Klasik (A\xE7\u0131k)"};function Yi(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,l=e.ratingCounts,o=e.avgRatingVal,s=e.currentRatingFilter,c=e.currentOrderBy,m=e.currentHasImages,d=e.onFilterChange,p=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var g=(l[3]||0)+(l[4]||0),u=n>0?Math.round(g/n*100):0,v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(v);var b=document.createElement("div");if(b.className="ikr-summary-block ikr-summary-count",b.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(b),t.showRecommendation!==!1&&u>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+u+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(x)}return k.appendChild(ze({ratingCounts:l,allCount:n,iconPair:a,currentRatingFilter:s,onFilterChange:d})),k.appendChild(Q({widget:r,currentOrderBy:c,currentHasImages:m,onWriteClick:F,onSortChange:p})),k}var gr={};de(gr,{css:()=>Ui,meta:()=>Gi,render:()=>Ki});var ri=`
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
`;var Gi={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},Ui=ri;function Ki(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,l=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange,p=document.createElement("div");p.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var g=document.createElement("div");g.className="ikr-compact-trigger-wrap";var u=document.createElement("button");u.className="ikr-compact-trigger",u.type="button",u.setAttribute("aria-expanded","false"),u.innerHTML='<span class="ikr-compact-trigger-stars">'+W(l,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',g.appendChild(u),k.appendChild(g);var v=Q({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:F,onSortChange:d}),b=v.querySelector(".ikr-filter-wrap"),x=v.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-compact-actions-slot",x&&w.appendChild(x),b&&w.appendChild(b),k.appendChild(w),p.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var L=document.createElement("div");L.className="ikr-compact-panel-inner";var z=document.createElement("div");z.className="ikr-compact-avg",z.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+l+"</span>",L.appendChild(z),L.appendChild(ze({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:m})),h.appendChild(L);var f=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function y(G){var U=G?p:g;h.parentNode!==U&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")),U.appendChild(h))}if(y(f?f.matches:!1),f){var T=function(G){y(G.matches)};f.addEventListener?f.addEventListener("change",T):f.addListener&&f.addListener(T)}if(x){var E=document.createElement("button");E.className="ikr-write-btn",E.textContent="Yorum Yap",E.onclick=F;var S=document.createElement("div");S.className="ikr-compact-write-row",S.appendChild(E),p.appendChild(S)}function q(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")}function j(){Xe(I),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),u.setAttribute("aria-expanded","true")}u.onclick=function(){h.classList.contains("ikr-open")?q():j()};var I=null;function ee(G){I&&(I(),I=null),G||(I=$e({trigger:g,element:h,close:q}))}if(ee(f?f.matches:!1),f){var pe=function(G){ee(G.matches)};f.addEventListener?f.addEventListener("change",pe):f.addListener&&f.addListener(pe)}if(i.showRecommendation!==!1){var me=(n[3]||0)+(n[4]||0),ye=a>0?Math.round(me/a*100):0;if(ye>0){var se=document.createElement("div");se.className="ikr-summary-block ikr-summary-recommend",se.style.marginTop="8px",se.innerHTML='<span class="ikr-recommend-pct">%'+ye+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",L.appendChild(se)}}return p}var fr={};de(fr,{css:()=>Vi,meta:()=>Zi,render:()=>Wi});var ii=`
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
`;var Zi={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Vi=ii;function Wi(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,l=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange,p=document.createElement("div");p.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var g=document.createElement("div");g.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",g.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+l+"</span>",k.appendChild(g);var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-count ikr-split-left-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(u),p.appendChild(k);var v=document.createElement("div");v.className="ikr-split-col ikr-split-mid",v.appendChild(ze({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:m})),p.appendChild(v);var b=Q({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:F,onSortChange:d}),x=b.querySelector(".ikr-filter-wrap"),w=b.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-split-col ikr-split-right",w&&h.appendChild(w),x&&h.appendChild(x),p.appendChild(h),i.showRecommendation!==!1){var L=(n[3]||0)+(n[4]||0),z=a>0?Math.round(L/a*100):0;if(z>0){var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-recommend",f.innerHTML='<span class="ikr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(f)}}return p}var hr={};de(hr,{css:()=>Xi,meta:()=>Ji,render:()=>$i});var ti=`
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
`;var Ji={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1}},Xi=ti;function $i(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,l=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var d=document.createElement("span");d.className="ikr-minimal-avg",d.textContent=a,m.appendChild(d);var p=document.createElement("span");p.className="ikr-minimal-stars",p.innerHTML=W(a,i),m.appendChild(p);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),c.appendChild(m),s.appendChild(c);var g=Q({widget:r,currentOrderBy:n,currentHasImages:l,onWriteClick:F,onSortChange:o}),u=g.querySelector(".ikr-filter-wrap"),v=g.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-minimal-actions",v&&b.appendChild(v),u&&b.appendChild(u),s.appendChild(b),v){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=F;var w=document.createElement("div");w.className="ikr-minimal-write-row",w.appendChild(x),s.appendChild(w)}return s}var xr={};de(xr,{css:()=>et,meta:()=>Qi,render:()=>rt});var ai=`
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
`;var Qi={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1}},et=ai;function rt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,l=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var m=document.createElement("span");m.className="ikr-hero-avg",m.textContent=a,c.appendChild(m);var d=document.createElement("div");d.className="ikr-hero-meta";var p=document.createElement("span");p.className="ikr-hero-stars",p.innerHTML=W(a,i),d.appendChild(p);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",d.appendChild(k),c.appendChild(d),s.appendChild(c);var g=Q({widget:r,currentOrderBy:n,currentHasImages:l,onWriteClick:F,onSortChange:o}),u=g.querySelector(".ikr-filter-wrap"),v=g.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-hero-actions",v&&b.appendChild(v),u&&b.appendChild(u),s.appendChild(b),v){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent="Yorum Yap",x.onclick=F;var w=document.createElement("div");w.className="ikr-hero-write-row",w.appendChild(x),s.appendChild(w)}return s}var Qe={classic:kr,compact:gr,split:fr,minimal:hr,hero:xr};function er(e){return Qe[e]||Qe.classic}function ni(){return Object.keys(Qe).map(function(e){return Qe[e].css||""}).join(`
`)}var yr={};de(yr,{css:()=>tt,meta:()=>it,render:()=>at});function Ee(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var l=document.createElement("span");return l.className="ikr-read-more ikr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",i.appendChild(l),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var o=!1;l.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),l.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var it={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},tt="";function at(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ae(e.rating,_),a.appendChild(n);var l=document.createElement("span");if(l.className="ikr-date",l.textContent=ne(e.createdAt),t.appendChild(a),t.appendChild(l),i.appendChild(t),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",i.appendChild(s);var c=(e.comment||"").trim();if(c){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=c,i.appendChild(m);var d=document.createElement("span");d.className="ikr-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",i.appendChild(d),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){d.style.display="inline";var g=!1;d.onclick=function(){g=!g,m.classList.toggle("ikr-body-clamped",!g),d.textContent=g?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var p=document.createElement("div");p.className="ikr-gallery",e.images.forEach(function(g){if(!(!g||g.indexOf("https://")!==0&&g.indexOf("data:image/")!==0)){var u=document.createElement("img");u.src=Y(g),u.className="ikr-img",u.setAttribute("data-ikr-img-url",g),(function(v){u.onclick=function(){X(e,v,r)}})(g),p.appendChild(u)}}),i.appendChild(p)}var k=Ee(e.merchantReply);return k&&i.appendChild(k),i}var br={};de(br,{css:()=>ot,meta:()=>nt,render:()=>lt});var oi=`
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
`;var nt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},ot=oi;function lt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ae(e.rating,_),a.appendChild(n);var l=document.createElement("span");l.className="ikr-review-list-author-name",l.textContent=e.author||"",a.appendChild(l);var o=document.createElement("span");o.className="ikr-date ikr-review-list-author-date",o.textContent=ne(e.createdAt),a.appendChild(o),t.appendChild(a);var s=document.createElement("div");if(s.className="ikr-review-list-content",e.title){var c=document.createElement("div");c.className="ikr-review-list-title",c.textContent=e.title,s.appendChild(c)}var m=(e.comment||"").trim();if(m){var d=document.createElement("div");d.className="ikr-review-list-body ikr-body-clamped",d.textContent=m,s.appendChild(d);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",s.appendChild(p),requestAnimationFrame(function(){if(d.scrollHeight>d.clientHeight+2){p.style.display="inline";var u=!1;p.onclick=function(){u=!u,d.classList.toggle("ikr-body-clamped",!u),p.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Ee(e.merchantReply);if(k&&s.appendChild(k),t.appendChild(s),i){var g=document.createElement("div");g.className="ikr-review-list-media",e.images.forEach(function(u){if(!(!u||u.indexOf("https://")!==0&&u.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=Y(u),v.setAttribute("data-ikr-img-url",u),(function(b){v.onclick=function(){X(e,b,r)}})(u),g.appendChild(v)}}),t.appendChild(g)}return t}var wr={};de(wr,{css:()=>dt,meta:()=>st,render:()=>ct});var li=`
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
`;var st={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},dt=li;function ct(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ae(e.rating,_),a.appendChild(n),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,a.appendChild(l)}var o=document.createElement("div");o.className="ikr-review-gallery-author",o.textContent=e.author||"",a.appendChild(o);var s=document.createElement("div");s.className="ikr-review-gallery-date",s.textContent=ne(e.createdAt),a.appendChild(s);var c=(e.comment||"").trim();if(c){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=c,a.appendChild(m);var d=document.createElement("span");d.className="ikr-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",d.style.cursor="pointer",d.onclick=function(){var v=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;X(e,v,r)},a.appendChild(d),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(d.style.display="inline")})}if(t.appendChild(a),i){var p=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var g=document.createElement("img");g.src=Y(p),g.loading="lazy",g.setAttribute("data-ikr-img-url",p),g.onclick=function(){X(e,p,r)},k.appendChild(g),t.appendChild(k)}var u=Ee(e.merchantReply,function(){var v=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;X(e,v,r)});return u&&(u.classList.add("ikr-review-gallery-reply"),t.appendChild(u)),t}var rr={card:yr,list:br,gallery:wr};function ir(e){return rr[e]||rr.card}function si(){return Object.keys(rr).map(function(e){return rr[e].css||""}).join(`
`)}function P(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var di={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},ci={small:80,medium:110,large:140};function pt(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",l=r.widgetBgColor||i,o=r.widgetBorderColor||"transparent",s=r.separatorColor||P(t,.08),c=r.headerTitleColor||t,m=r.headerAvgColor||t,d=r.headerCountColor||t,p=r.headerRecommendColor||t,k=r.barLabelColor||t,g=r.barFillColor||t,u=r.barTrackColor||P(t,.1),v=r.barCountColor||t,b=r.barHoverBgColor||P(t,.05),x=r.primaryColor||"#111111",w=r.primaryTextColor||"#ffffff",h=r.btnBgColor||x,L=r.btnTextColor||w,z=r.btnBorderColor||x,f=r.filterBtnBgColor||x,y=r.filterBtnTextColor||w,T=r.filterBtnBorderColor||x,E=r.filterMenuBgColor||i,S=r.filterMenuBorderColor||P(t,.12),q=r.filterItemTextColor||t,j=r.filterItemHoverBgColor||P(x,.07),I=r.filterItemActiveColor||x,ee=r.reviewTitleColor||t,pe=r.reviewAuthorColor||t,me=r.reviewDateColor||t,ye=r.reviewBodyColor||t,se=r.reviewBorderColor||P(t,.08),G=r.reviewStarColor||"#f59e0b",U=r.replyBgColor||a,be=r.replyBorderColor||x,je=r.replyLabelColor||t,we=r.replyTextColor||t,nr=r.photoBgColor||P(t,.03),Ae=r.photoBorderColor||P(t,.1),or=r.photoTitleColor||t,ue=r.formBgColor||i,Ye=r.formBorderColor||P(t,.08),ve=r.inputBgColor||n,ke=r.inputTextColor||t,ge=r.inputBorderColor||P(t,.2),Ne=r.placeholderColor||P(t,.35),lr=r.loadMoreBgColor||i,sr=r.loadMoreTextColor||t,D=r.loadMoreBorderColor||P(t,.3),re=r.modalBgColor||i,Ar=r.modalTextColor||t,_e=r.modalCloseBgColor||x,C=r.modalCloseTextColor||w,A=r.modalCloseBorderColor||x,B=r.modalNavBgColor||"rgba(0,0,0,0.45)",M=r.modalNavTextColor||"#ffffff",Be=r.modalReplyBgColor||a,Ai=r.modalReplyBorderColor||x,Nr={"--ikr-widget-bg":l,"--ikr-widget-border":o,"--ikr-separator":s,"--ikr-header-title":c,"--ikr-header-avg":m,"--ikr-header-count":d,"--ikr-header-recommend":p,"--ikr-bar-label":k,"--ikr-bar-fill":g,"--ikr-bar-track":u,"--ikr-bar-count":v,"--ikr-bar-hover-bg":b,"--ikr-btn-bg":h,"--ikr-btn-text":L,"--ikr-btn-border":z,"--ikr-filter-btn-bg":f,"--ikr-filter-btn-text":y,"--ikr-filter-btn-border":T,"--ikr-filter-menu-bg":E,"--ikr-filter-menu-border":S,"--ikr-filter-item-text":q,"--ikr-filter-item-hover-bg":j,"--ikr-filter-item-active":I,"--ikr-review-title":ee,"--ikr-review-author":pe,"--ikr-review-date":me,"--ikr-review-body":ye,"--ikr-review-border":se,"--ikr-review-star-color":G,"--ikr-reply-bg-color":U,"--ikr-reply-border":be,"--ikr-reply-label":je,"--ikr-reply-text":we,"--ikr-photo-bg":nr,"--ikr-photo-border":Ae,"--ikr-photo-title":or,"--ikr-form-bg":ue,"--ikr-form-border":Ye,"--ikr-input-bg-color":ve,"--ikr-input-text-color":ke,"--ikr-input-border":ge,"--ikr-placeholder":Ne,"--ikr-load-more-bg":lr,"--ikr-load-more-text":sr,"--ikr-load-more-border":D,"--ikr-modal-bg":re,"--ikr-modal-text":Ar,"--ikr-modal-close-bg":_e,"--ikr-modal-close-text":C,"--ikr-modal-close-border":A,"--ikr-modal-nav-bg":B,"--ikr-modal-nav-text":M,"--ikr-modal-reply-bg":Be,"--ikr-modal-reply-border":Ai,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":P(t,.45),"--ikr-border":P(t,.12),"--ikr-track-bg":P(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(Nr).forEach(function(_r){e.style.setProperty(_r,Nr[_r])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function le(e,r,i,t,a,n,l){if(ur){Ke({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:l});return}Ue(!0),Rr(e),Ir(r),l!==void 0&&Or(l),Pr(t),a&&Se(a),n&&xe(n),i!=null&&Mr(i);try{let _e=function(C,A){if(!(!C||!C.meta||!C.meta.sizeOverrides)){var B=C.meta.sizeOverrides[A];B&&Object.keys(B).forEach(function(M){p.style.setProperty(M,B[M])})}};var Ar=_e,o=er(r.summaryLayout),s=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),c=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",d=s&&c?m:"",p=document.documentElement;pt(p,r);var k=r.primaryColor||"#111111",g=r.primaryTextColor||"#ffffff";Ur(k,Qr+ni()+si());var u=r.borderRadius!==void 0?r.borderRadius:8,v=di[r.size]||di.medium,b=ci[r.thumbnailSize]||ci.medium;p.style.setProperty("--ikr-title-size",v.titleSize+"px"),p.style.setProperty("--ikr-review-text-size",v.reviewTextSize+"px"),p.style.setProperty("--ikr-review-title-size",v.reviewTitleSize+"px"),p.style.setProperty("--ikr-author-size",v.authorSize+"px"),p.style.setProperty("--ikr-reply-name-size",v.replyNameSize+"px"),p.style.setProperty("--ikr-reply-text-size",v.replyTextSize+"px"),p.style.setProperty("--ikr-color-text",g),p.style.setProperty("--ikr-radius",u+"px"),p.style.setProperty("--ikr-radius-sm",Math.max(0,u-4)+"px"),p.style.setProperty("--ikr-photo-title-size",v.photoTitleSize+"px"),p.style.setProperty("--ikr-avg-rating-size",v.avgRatingSize+"px"),p.style.setProperty("--ikr-review-count-size",v.reviewCountSize+"px"),p.style.setProperty("--ikr-recommend-size",v.recommendSize+"px"),p.style.setProperty("--ikr-btn-text-size",v.btnTextSize+"px"),p.style.setProperty("--ikr-bar-label-size",v.barLabelSize+"px"),p.style.setProperty("--ikr-minimal-avg-size",v.minimalAvgSize+"px"),p.style.setProperty("--ikr-hero-avg-size",v.heroAvgSize+"px"),p.style.setProperty("--ikr-bar-count-size",v.barCountSize+"px"),p.style.setProperty("--ikr-review-date-size",v.reviewDateSize+"px"),p.style.setProperty("--ikr-filter-text-size",v.filterTextSize+"px"),p.style.setProperty("--ikr-load-more-size",v.loadMoreSize+"px"),p.style.setProperty("--ikr-read-more-size",v.readMoreSize+"px"),p.style.setProperty("--ikr-thumbnail-size",b+"px");var x=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";p.style.setProperty("--ikr-review-star-color",x),p.style.setProperty("--ikr-star-size",v.reviewStarSize+"px"),p.style.setProperty("--ikr-avg-star-size",v.avgStarSize+"px"),_e(er(r.summaryLayout),r.size),_e(ir(r.reviewLayout),r.size);var w=qe(r),h=document.getElementById("ikas-reviews");if(!h){var L=document.getElementById("ikas-reviews-anchor");if(!L)return;h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px",L.appendChild(h)}if(r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ue(!1);var z=Ie;Ke(null),z&&le(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var f=i||{},y=f.data&&f.data.reviews||[],T=f.data&&f.data.totalCount||0,E=h.cloneNode(!1);h.parentNode.replaceChild(E,h),h=E;var S=document.createElement("div");if(S.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),d){var q=document.createElement("div"),j=r.summaryLayout||"classic";q.className="ikr-title ikr-title-"+j,q.textContent=d,S.appendChild(q)}var I=f.data&&f.data.allCount||0,ee=f.data&&f.data.ratingCounts||null,pe=ee||[0,0,0,0,0],me=f.data&&f.data.avgRating||"0.0";if(!ee&&y.length>0){y.forEach(function(C){C.rating>=1&&C.rating<=5&&pe[C.rating-1]++});var ye=y.reduce(function(C,A){return C+A.rating},0);me=(ye/y.length).toFixed(1)}if(I>0){var se=er(r.summaryLayout),G=se.render({widget:S,data:f,settings:r,iconPair:w,allCount:I,ratingCounts:pe,avgRatingVal:me,currentRatingFilter:fe,currentOrderBy:Z,currentHasImages:he,onFilterChange:async function(C){Ge(fe===C?null:C),xe(1);var A=await De(ie,Z,1,fe,he);await le(ie,_,A,Ce,Z,1)},onSortChange:async function(C,A){xe(1),A?(mr(!0),Se("newest")):(mr(!1),Se(C));var B=await De(ie,Z,1,fe,he);await le(ie,_,B,Ce,Z,1)}});S.appendChild(G)}else{var U=document.createElement("button");U.className="ikr-write-btn",U.style.cssText="display:block;margin:16px auto 0;",U.textContent="Yorum Yap",U.onclick=function(){var C=document.getElementById("ikr-form-accordion");if(C){var A=C.style.maxHeight&&C.style.maxHeight!=="0px";A?(C.style.maxHeight="0px",C.style.opacity="0"):(C.style.maxHeight=C.scrollHeight+"px",C.style.opacity="1",setTimeout(function(){C.style.maxHeight="none"},360),setTimeout(function(){var B=document.querySelector("header"),M=B?B.getBoundingClientRect().height:0,Be=C.getBoundingClientRect().top+window.pageYOffset-M-16;window.scrollTo({top:Be,behavior:"smooth"})},50))}},S.appendChild(U)}var be=document.createElement("div");be.id="ikr-form-accordion",be.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",be.appendChild(Wr(e,t)),S.appendChild(be);var je=y.filter(function(C){return C.images&&Array.isArray(C.images)&&C.images.some(function(A){return A&&(A.indexOf("https://")===0||A.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!he&&je.length>0){var we=document.createElement("div");if(we.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var nr=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",Ae=document.createElement("div");Ae.className="ikr-photo-title",Ae.textContent=nr,we.appendChild(Ae)}var or=r.reviewLayout==="card"?"1/1":"3/4";p.style.setProperty("--ikr-photo-thumb-aspect",or);var ue=document.createElement("div");ue.className="ikr-photo-strip";var Ye=0;je.forEach(function(C){if(!(Ye>=10)){var A=C.images.find(function(M){return M&&(M.indexOf("https://")===0||M.indexOf("data:image/")===0)});if(A){var B=document.createElement("img");B.src=Y(A),B.className="ikr-photo-strip-thumb",B.alt="Yorum foto\u011Fraf\u0131",(function(M,Be){B.onclick=function(){X(Be,M,y)}})(A,C),ue.appendChild(B),Ye++}}});var ve=document.createElement("button");ve.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ve.innerHTML="&#8249;",ve.setAttribute("aria-label","\xD6nceki"),ve.onclick=function(){ue.scrollBy({left:-200,behavior:"smooth"})};var ke=document.createElement("button");ke.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",ke.innerHTML="&#8250;",ke.setAttribute("aria-label","Sonraki"),ke.onclick=function(){ue.scrollBy({left:200,behavior:"smooth"})};var ge=document.createElement("div");ge.className="ikr-photo-strip-wrap",ge.appendChild(ve),ge.appendChild(ue),ge.appendChild(ke),we.appendChild(ge),S.appendChild(we)}if(y.length===0){var Ne=document.createElement("p");Ne.className="ikr-state-msg",Ne.textContent="Hen\xFCz yorum yok.",S.appendChild(Ne)}else{var lr=ir(r.reviewLayout);y.forEach(function(C){S.appendChild(lr.render(C,y))})}var sr=f.data&&f.data.hasMore;if(sr){var D=document.createElement("button");D.className="ikr-load-more",D.textContent="Daha Fazla G\xF6ster",D.onclick=async function(){D.disabled=!0,D.textContent="Y\xFCkleniyor...";var C=Re+1,A=await De(ie,Z,C,fe,he);if(A&&A.data&&A.data.reviews){xe(C);var B=ir(_.reviewLayout);A.data.reviews.forEach(function(M){S.insertBefore(B.render(M,A.data.reviews),D)}),A.data.hasMore?(D.disabled=!1,D.textContent="Daha Fazla G\xF6ster"):D.remove()}else D.remove()},S.appendChild(D)}h.appendChild(S),$r(I>0?me:null,T,t,cr)}catch(C){console.error("[ikr] render error:",C),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ue(!1),Ie){var re=Ie;Ke(null),le(re.productId,re.settings,re.reviewsData,re.productName,re.orderBy,re.page,re.badgeSettings)}}}var ce="ikr_settings_"+H,mt=300*1e3,ut=30*1e3;async function Sr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||K,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var t=await J(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(m){}return null}var n=null,l=Me(ce);if(l)try{var o=JSON.parse(l);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<ut)return null;R(ce,"")}else if(o.v){if(Date.now()-o.t<mt)return o.v;n=o.v,R(ce,"")}else R(ce,"");else R(ce,"")}catch(m){R(ce,"")}try{var s=await J(K+"/api/public/settings?publicApiKey="+encodeURIComponent(H));if(!s.ok)return s.status===404&&R(ce,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await s.json();return R(ce,JSON.stringify({t:Date.now(),v:c})),c}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var vt=60*1e3;async function De(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||K,l=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),o=await J(l);if(o.ok)return await o.json()}catch(u){}return null}r=r||"newest",i=i||1;var s="ikr_reviews_"+H+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),c=null,m=Me(s);if(m)try{var d=JSON.parse(m);if(d&&d.t!==void 0&&d.v){if(Date.now()-d.t<vt)return d.v;c=d.v,R(s,"")}else R(s,"")}catch(u){R(s,"")}try{var p=K+"/api/public/reviews?storeId="+encodeURIComponent(H)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await J(p);if(!k.ok)return c||null;var g=await k.json();return R(s,JSON.stringify({t:Date.now(),v:g})),g}catch(u){return console.error("[ikr] fetchReviews error:",u),c||null}}var Cr={};async function Te(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!Cr[e]){Cr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var l=await Sr();if(!l)return;var o=l.widgets&&l.widgets.reviews||a,s=l.widgets&&l.widgets.badge||n;if(o.enabled===!1)return;Se("newest"),xe(1),Ge(null);var c=await De(e,"newest",1,null);await le(e,o,c,r,"newest",1,s)}catch(m){console.error("[ikr] bootstrap error:",m),await le(e,a,null,r,void 0,void 0,n)}finally{delete Cr[e]}}}function zr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function pi(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=O(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Je.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Oe).forEach(function(i){e[i]=Oe[i]}),e}var kt=300*1e3,mi=50;async function ui(e){var r="ikr_ratings_"+H,i={},t=Me(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<kt?i=a.v||{}:R(r,"")}catch(c){R(r,"")}var n=e.filter(function(c){return!i[c]});if(!n.length)return i;for(var l=[],o=0;o<n.length;o+=mi)l.push(n.slice(o,o+mi));var s=await Promise.all(l.map(function(c){var m=K+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(H)+"&slugs="+c.map(encodeURIComponent).join(",");return J(m).then(function(d){return d.ok?d.json().then(function(p){return p.data||{}}):{}}).catch(function(){return{}})}));return s.forEach(function(c){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(m){i[m]=c[m]})}),R(r,JSON.stringify({t:Date.now(),v:i})),i}var gt="var(--ikr-badge-color,#f59e0b)",vi=13,ft="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function ht(e){var r=He("star","classic"),i="width:"+vi+"px;height:"+vi+"px;";return'<span style="color:'+gt+';display:inline-flex;align-items:center;">'+W(e,r,{sizeStyle:i})+"</span>"}function Fe(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=ft+"justify-content:"+(r||"flex-start")+";",i.innerHTML=ht(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var ki=".product-name",gi=".add-to-basket-modal",fi="h1.product-name",tr=".single-product-container-main",Er=".single-product-product-name",hi=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),xi=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var yi='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',xt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Tr(e,r){var i=e.querySelector(ki);if(i)return i;if(e.matches&&e.matches(yi))return e;var t=e.querySelector(yi);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var l=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<l.length;o++){var s=l[o],c=s.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!xt.test(c)&&!(s.closest("figure")||s.closest("picture"))&&!(s.children.length>1))return s}return null}function yt(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=O(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(tr)&&!e.closest(Er)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(Er)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(hi)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),l=Array.from(e.childNodes).filter(function(g){return g.nodeType===3}).map(function(g){return g.textContent.trim()}).join("").trim(),o=!!Tr(e,i);if(!l&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(g){g.setAttribute("data-ikr-badge","1")});var s=Tr(e,i);if(!s||s.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(s).textAlign;s.appendChild(Fe(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var m=Tr(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var d=window.getComputedStyle(m).textAlign;m.appendChild(Fe(r,d==="center"?"center":d==="right"?"flex-end":"flex-start"))}else{var p=Fe(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(p,k):e.appendChild(p)}}}function bt(e,r){var i=document.querySelector(gi);if(i){var t=i.querySelector(fi);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Pe&&r[Pe]&&(a=Pe),!a){var n=O(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var l=t.textContent.trim();Object.keys(e).forEach(function(d){if(!a){var p=e[d];p&&p.trim()===l&&r[d]&&(a=d)}})}if(!a){var o=document.querySelector(tr);if(o){var s=o.querySelector("a[href]");if(s){var c=O(s.href);c&&r[c]&&(a=c)}}}if(!a){var m=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(d){if(!a&&!(d.closest("header")||d.closest("nav"))&&!d.closest(tr)){var p=d.textContent.trim().toLowerCase();if(p&&p===m){var k=O(d.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(Fe(r[a],"flex-start"))}}}function bi(e,r){var i=O(window.location.pathname),t=document.querySelectorAll(xi),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(l){a.push(l)})}),Object.keys(e).forEach(function(n){var l=r[n];if(!(!l||l._empty||l.count===0)){var o=e[n];a.forEach(function(s){O(s.href)===n&&yt(s,l,o,i)})}}),bt(e,r)}async function Le(){if(N.inProgress){N.queued=!0;return}if(!N.rendered){N.rendered=!0,N.inProgress=!0;try{var e=N.navCleanup;e&&(N.navCleanup=!1);var r=pi();if(!Object.keys(r).length){N.rendered=!1;return}var i=await Promise.all([Sr(),ui(Object.keys(r))]),t=i[0];if(!t){N.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},l=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){N.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",l),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),bi(r,a)}finally{N.inProgress=!1,N.queued&&(N.queued=!1,N.rendered=!1,Le())}}}var wi=!1,Ci=!1;function Ei(){Ci||(Ci=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=O(r.href);!i||i.length<3||Hr(i)}},!0))}var Si=!1,zi=typeof location!="undefined"?location.pathname:"";function ar(){try{if(location.pathname===zi)return;zi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function wt(){if(!Si){Si=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return ar(),i},history.replaceState=function(){var i=r.apply(this,arguments);return ar(),i},window.addEventListener("popstate",ar),window.addEventListener("hashchange",ar)}}function Lr(){if(wt(),window.IkasEvents){if(wi)return;wi=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var l=n.data&&n.data.productDetails;Array.isArray(l)&&l.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(Oe[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var o=n.data&&n.data.productDetail&&n.data.productDetail.id,s=n.data&&n.data.productDetail&&n.data.productDetail.name;o&&(R("ikr_reviews_"+H+"_"+o,""),Te(o,s))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(N.lastPageView&&c-N.lastPageView<800)return;N.lastPageView=c,N.navCleanup=!0,N.rendered=!1,Le()}}});var e=zr();if(e)Te(e.id,e.name);else{let n=function(){var l=zr();l?Te(l.id,l.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){N.rendered||Le()},2e3)}else{let n=function(){window.IkasEvents?Lr():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var Ti=null;function Li(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Ti),Ti=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=O(a.href);return n&&n.length>=3&&!Je.test(n)});t&&(N.rendered=!1,Le())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Ct=window.__ikasPreviewMode===!0;if(Ct){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Te("mock-product","\xD6rnek \xDCr\xFCn"),e()};St=e,zt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!_)){var n=Object.assign({},_,a);le(ie,n,pr,Ce,Z,Re)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(H){let e=function(){Lr(),Ei(),Li()};Et=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var St,zt,Et;})();
