/* ikas Reviews Widget — built 2026-04-27T20:08:04.596Z | theme: default */
"use strict";(()=>{var Di=Object.defineProperty;var ce=(e,r)=>{for(var i in r)Di(e,i,{get:r[i],enumerable:!0})};var Yi=typeof document!="undefined",Rr=Yi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,sr=Rr?Rr.src:"",Gi=new URLSearchParams(sr.split("?")[1]||""),j=Gi.get("publicApiKey"),Y=sr?sr.split("?")[0].replace(/\/widget\.js$/,""):"";var J="newest",Re=1,he=null,xe=!1,Z=null,A=null,cr=null,pe=null,pr=null;function Se(e){J=e}function ye(e){Re=e}function Ge(e){he=e}function mr(e){xe=e}function Or(e){Z=e}function Pr(e){A=e}function Mr(e){cr=e}function Hr(e){pe=e}function qr(e){pr=e}var ur=!1,Oe=null;function Ue(e){ur=e}function Ve(e){Oe=e}var B={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Pe={},Me=null;function jr(e){Me=e}var Fr={};function He(e){try{return sessionStorage.getItem(e)}catch(r){return Fr[e]||null}}function R(e,r){try{sessionStorage.setItem(e,r)}catch(i){Fr[e]=r}}var ae="0 -960 960 960",$={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function Ke(e){return'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Dr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+$.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+$.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+$.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+$.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+$.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+$.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+$.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+$.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+$.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+$.heartOutline+'"/></g></svg>'}}}};function Ui(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function qe(e,r){var i=Dr[e]||Dr.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function be(e){var r=e&&e.reviewIcon||"star",i=Ui(r),t=i.style||e&&e.reviewIconStyle||"classic";return qe(i.type,t)}function Gr(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=be(r),n=i&&i.sizePx,o=n?"width:"+n+"px;height:"+n+"px;":"",l="",s=1;s<=5;s++){var d=s<=t;l+='<span class="ikr-icon '+(d?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+o+'">'+(d?a.filled:a.empty)+"</span>"}return l}var Ze={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},Yr={lines:{label:"\xC7izgili",svg:Ke(Ze.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:Ke(Ze.linesAlt)},funnel:{label:"Huni",svg:Ke(Ze.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:Ke(Ze.dense)}};function Ur(e){var r=Yr[e]||Yr.lines;return r.svg}var We="var(--ikr-review-star-color,#f59e0b)",Xe=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function M(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ne(e,r){var i="color:"+We+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Gr(e,r)+"</span>"}function Q(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,o=n<.25?a:n<.75?a+.5:a+1,l=o/5*100,s=i&&i.sizeStyle||"",d="",p="",c=0;c<5;c++)d+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>",p+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+d+'</span><span class="ikr-stars-partial-fill" style="width:'+l+'%;">'+p+"</span></span>"}function oe(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Vi(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Ki(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Vi(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Kr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Ki(e)}function G(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Zr(e,r,i,t){var a=be(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),o=document.createElement("div");if(o.className="ikr-rating"+(r?" ikr-rating-interactive":""),o.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){o.style.flexDirection="row";for(var l=1;l<=5;l++){var s=document.createElement("span");s.className="ikr-icon",s.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(l<=e?We:"#ddd")+";",s.innerHTML=l<=e?a.filled:a.empty,o.appendChild(s)}return o}for(var d=5;d>=1;d--)(function(p){var c=document.createElement("input");c.type="radio",c.name=n,c.value=String(p),c.id=n+"-"+p,c.className="ikr-rating-input",p===e&&(c.checked=!0),c.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",c.addEventListener("change",function(){i&&i(p)});var m=document.createElement("label");m.htmlFor=c.id,m.className="ikr-rating-label",m.setAttribute("aria-label",p+" y\u0131ld\u0131z"),m.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",m.addEventListener("click",function(k){k.preventDefault();for(var f=o.querySelectorAll(".ikr-rating-input"),u=0;u<f.length;u++)f[u].checked=!1;c.checked=!0,i&&i(p)}),m.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+We+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",m.style.position="relative",o.appendChild(c),o.appendChild(m)})(d);return Zi(),o}var Vr=!1;function Zi(){if(!Vr){Vr=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+We+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function U(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Wr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Wi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=ne(e.rating,A);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=oe(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var o=document.createElement("div");o.className="ikr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",i.appendChild(o);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(s);var d=document.createElement("div");d.className="ikr-modal-reply";var p=document.createElement("div");p.className="ikr-modal-reply-label",p.textContent="Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="ikr-modal-reply-text",c.textContent=e.merchantReply||"",d.appendChild(p),d.appendChild(c),d.style.display=e.merchantReply?"":"none",i.appendChild(d),r.appendChild(i),r}function Xi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ne(r.rating,A),i.querySelector(".ikr-modal-date").textContent=oe(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function vr(e,r,i,t,a,n,o,l){var s=e.images&&Array.isArray(e.images)?e.images.filter(function(w){return w&&(w.indexOf("https://")===0||w.indexOf("data:image/")===0)}):[],d=Math.min(i,s.length-1),p=document.createElement("div");p.className="ikr-modal-left";var c=document.createElement("img"),m=o==="next"?"ikr-modal-img-enter-right":o==="prev"?"ikr-modal-img-enter-left":"";c.className="ikr-modal-main-img"+(m?" "+m:""),c.src=G(s[d]||""),c.alt="Yorum foto\u011Fraf\u0131",p.appendChild(c);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(w){w.stopPropagation(),n()},p.appendChild(k);var f=0;if(p.addEventListener("touchstart",function(w){f=w.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(w){var T=f-w.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(g)le(e,r,d+1,t,a,n,!0,"next",l);else if(b){var S=t[r+1];le(S,r+1,0,t,a,n,!1,"next",l)}}else if(v)le(e,r,d-1,t,a,n,!0,"prev",l);else if(h){var z=t[r-1],O=(z.images||[]).filter(function(P){return P&&(P.indexOf("https://")===0||P.indexOf("data:image/")===0)});le(z,r-1,O.length-1,t,a,n,!1,"prev",l)}}},{passive:!0}),s.length>1){var u=document.createElement("div");u.className="ikr-modal-thumbs",s.forEach(function(w,T){var S=document.createElement("img");S.src=G(w),S.className="ikr-modal-thumb"+(T===d?" ikr-modal-thumb-active":""),S.alt="K\xFC\xE7\xFCk resim "+(T+1),(function(z){S.onclick=function(){le(e,r,z,t,a,n,!0,null,l)}})(T),u.appendChild(S)}),p.appendChild(u)}var v=d>0,g=d<s.length-1,h=r>0,b=r<t.length-1,y=v||h,L=g||b;if(y||L){var E=document.createElement("button");E.className="ikr-modal-nav ikr-modal-nav-prev",E.innerHTML="&#8249;",E.setAttribute("aria-label","\xD6nceki"),E.style.opacity=y?"1":"0.3",E.onclick=function(w){if(w.stopPropagation(),v)le(e,r,d-1,t,a,n,!0,"prev",l);else if(h){var T=t[r-1],S=(T.images||[]).filter(function(z){return z&&z.indexOf("https://")===0});le(T,r-1,S.length-1,t,a,n,!1,"prev",l)}},p.appendChild(E);var x=document.createElement("button");x.className="ikr-modal-nav ikr-modal-nav-next",x.innerHTML="&#8250;",x.setAttribute("aria-label","Sonraki"),x.style.opacity=L?"1":"0.3",x.onclick=function(w){if(w.stopPropagation(),g)le(e,r,d+1,t,a,n,!0,"next",l);else if(b){var T=t[r+1];le(T,r+1,0,t,a,n,!1,"next",l)}},p.appendChild(x)}return p}function Xr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=G(a[0]))}})}function le(e,r,i,t,a,n,o,l,s){if(o){var d=vr(e,r,i,t,a,n,l,s);a.firstChild&&a.replaceChild(d,a.firstChild)}else{var d=vr(e,r,i,t,a,n,l,s),p=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(d,a.firstChild),p&&Xi(p,e);var c=s&&s.querySelector(".ikr-modal-wrap");c&&(c.scrollTop=0)}Xr(r,t)}function ee(e,r,i){var t=(i||[]).filter(function(v){return v.images&&Array.isArray(v.images)&&v.images.some(function(g){return g&&(g.indexOf("https://")===0||g.indexOf("data:image/")===0)})}),a=t.findIndex(function(v){return v===e||v.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(v){return v&&(v.indexOf("https://")===0||v.indexOf("data:image/")===0)}):[],o=Math.max(0,n.indexOf(r)),l=document.createElement("div");l.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var d=!1;function p(){d||(d=!0,Wr(l,c,p))}function c(v){v.key==="Escape"&&m()}function m(){d||(d=!0,history.go(-1),Wr(l,c,p))}document.addEventListener("keydown",c);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",p),l.onclick=function(){m()},s.onclick=function(v){v.stopPropagation()},s.appendChild(vr(e,a,o,t,s,m,null,l)),s.appendChild(Wi(e)),Xr(a,t);var f=document.createElement("div");f.className="ikr-modal-wrap",f.appendChild(s);var u=document.createElement("button");u.className="ikr-modal-close",u.textContent="\u2715",u.setAttribute("aria-label","Kapat"),u.onclick=function(v){v.stopPropagation(),m()},f.appendChild(u),l.appendChild(f),document.body.appendChild(l)}function Jr(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),o=i.querySelector("#ikr-comment-counter");function l(){var u=n.value.length;o.textContent=u+"/2000",o.classList.toggle("ikr-char-counter--max",u>=2e3)}n.addEventListener("input",l);var s=Zr(0,!0,function(u){t=u},A);i.querySelector("#ikr-stars-input").appendChild(s);var d=i.querySelector("#ikr-file-input"),p=i.querySelector("#ikr-photo-previews"),c=!1,m=i.querySelector("label.ikr-photo-btn"),k=3;function f(){var u=a.length;u>=k?(d.disabled=!0,m&&(m.style.opacity="0.4")):(d.disabled=!1,m&&(m.style.opacity="1"))}return d.onchange=async function(u){if(!c){c=!0,d.disabled=!0;var v=k-a.length,g=Array.from(u.target.files).slice(0,v);for(let b=0;b<g.length;b++){let y=g[b];if(y.size>5*1024*1024){alert(y.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let L=document.createElement("div");L.className="ikr-preview-item";let E=URL.createObjectURL(y);L.innerHTML='<img class="ikr-preview-img" src="'+E+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',p.appendChild(L);let x=L.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(E),x.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){x.style.opacity="0",x.style.transition="opacity 0.4s",setTimeout(function(){x.style.display="none";let w=document.createElement("button");w.className="ikr-preview-remove",w.innerHTML="&#x2715;",w.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),w.onclick=function(){a=a.filter(function(T){return T!==E}),L.remove(),f()},L.appendChild(w)},400)},800);continue}try{let w=await U(Y+"/api/public/upload/sign",{method:"POST"});if(!w.ok)throw w.status===429?new Error("rate_limit"):new Error("sign failed");let T=await w.json(),S=new FormData;S.append("file",y),S.append("api_key",T.api_key),S.append("timestamp",T.timestamp),S.append("signature",T.signature),S.append("folder","review_images");let O=await(await fetch("https://api.cloudinary.com/v1_1/"+T.cloud_name+"/image/upload",{method:"POST",body:S})).json();if(O.secure_url){let P=O.secure_url;a.push(P),x.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){x.style.opacity="0",x.style.transition="opacity 0.4s",setTimeout(function(){x.style.display="none";let _=document.createElement("button");_.className="ikr-preview-remove",_.innerHTML="&#x2715;",_.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),_.onclick=function(){a=a.filter(function(V){return V!==P}),L.remove(),f()},L.appendChild(_)},400)},800)}}catch(w){console.error("[ikr] Image upload failed:",w);var h=w.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";x.innerHTML='<span class="ikr-upload-error">\u2717 '+h+"</span>"}}c=!1,d.value="",f()}},i.querySelector("#ikr-submit").onclick=async function(){var u=this,v=i.querySelector("#ikr-name").value.trim(),g=i.querySelector("#ikr-title").value.trim(),h=i.querySelector("#ikr-comment").value.trim(),b=i.querySelector("#ikr-msg");if(!t){b.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!v){b.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(u.disabled=!0,u.textContent="G\xF6nderiliyor\u2026",b.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var y=M(window.location.href),L=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await U(Y+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:j,productId:e,slug:y||null,productName:L,author:v,title:g||null,comment:h,rating:t,images:a})},15e3);if(E.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var x=await E.json().catch(function(){return{}});throw new Error(x.error||"Yorum kaydedilemedi.")}}catch(z){var w=z&&(z.name==="AbortError"||/signal/i.test(z.message||"")),T=w?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":z.message||"Yorum g\xF6nderilemedi.",S=document.createElement("div");S.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",S.textContent=T,b.innerHTML="",b.appendChild(S),u.disabled=!1,u.textContent="G\xF6nder"}},i}function $r(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var Qr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Ji(e,r,i,t,a){var n=qe(r,i),o="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+Q(e,n,{sizeStyle:o})+"</span>"}function ei(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var o=document.createElement("script");o.id="ikr-jsonld",o.type="application/ld+json",o.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(o);var l=$r(i);if(!(!l||!l.parentNode)){var s=t&&t.icon||"star",d=t&&t.iconStyle||"classic",p=t&&t.size||"medium",c=t&&t.color||"#f59e0b",m=Qr[p]||Qr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var f=window.getComputedStyle(l).textAlign,u=f==="center"?"center":f==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+u+";",k.innerHTML=Ji(e,s,d,c,m.icon)+'<span style="font-size:'+m.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(v){v.preventDefault();var g=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(g){var h=document.querySelector("header"),b=h?h.getBoundingClientRect().height:0,y=g.getBoundingClientRect().top+window.pageYOffset-b-16;window.scrollTo({top:y,behavior:"smooth"})}},l.parentNode.insertBefore(k,l.nextSibling)}}}var ri=`
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
`;var gr={};ce(gr,{meta:()=>ot,render:()=>lt});function Ee(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,o=document.createElement("div");o.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var s=r[l-1]||0,d=i>0?Math.round(s/i*100):0,p=a===l,c=document.createElement("div");c.className="ikr-bar-row"+(p?" ikr-bar-active":""),a&&!p&&(c.style.opacity="0.35");for(var m="",k=1;k<=5;k++){var f=k<=l;m+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?t.filled:t.empty)+"</span>"}c.innerHTML='<span class="ikr-bar-label">'+m+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+d+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(u){c.onclick=function(){n(u)}})(l),o.appendChild(c)}return o}var re=[],ii=!1;function $i(e){for(var r=re.length-1;r>=0;r--){var i=re[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Qi(e){if(e.key==="Escape")for(var r=re.length-1;r>=0;r--)re[r].close()}function et(){ii||typeof document=="undefined"||(document.addEventListener("click",$i,!0),document.addEventListener("keydown",Qi),ii=!0)}function Je(e){for(var r=0;r<re.length;r++)re[r]!==e&&re[r].close()}function $e(e){et();var r={trigger:e.trigger,element:e.element,close:e.close};return re.push(r),function(){var t=re.indexOf(r);t!==-1&&re.splice(t,1)}}function ie(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,o=document.createElement("div");o.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent="Yorum Yap",l.onclick=a,o.appendChild(l);var s=document.createElement("div");s.className="ikr-filter-wrap";var d=document.createElement("button");d.className="ikr-filter-btn",d.setAttribute("aria-label","Filtrele");var p=A&&A.filterIcon||"lines";d.innerHTML=Ur(p);var c=document.createElement("div");c.className="ikr-filter-menu";var m=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){c.classList.remove("ikr-open"),d.classList.remove("ikr-filter-btn-active")}function f(){Je(u),c.classList.add("ikr-open"),d.classList.add("ikr-filter-btn-active")}m.forEach(function(v){var g=v[2],h=g?t:!t&&(i||"newest")===v[0],b=document.createElement("div");b.className="ikr-filter-item"+(h?" ikr-filter-item-active":""),b.textContent=v[1],b.onclick=function(){k(),n(v[0],g)},c.appendChild(b)}),d.onclick=function(){c.classList.contains("ikr-open")?k():f()};var u=$e({trigger:s,element:c,close:k});return s.appendChild(d),s.appendChild(c),o.appendChild(s),o}function ti(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");var a=document.createElement("div");a.className="ikr-fwizard",t.appendChild(a);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML="\u2715",a.appendChild(n);var o=document.createElement("div");o.className="ikr-fwizard-content",a.appendChild(o);var l=!1,s="",d="";function p(){var v=window.innerWidth-document.documentElement.clientWidth;s=document.body.style.overflow,d=document.body.style.paddingRight,document.body.style.overflow="hidden",v>0&&(document.body.style.paddingRight=v+"px")}function c(){document.body.style.overflow=s,document.body.style.paddingRight=d}function m(){l||(l=!0,document.removeEventListener("keydown",k),t.removeEventListener("click",f),n.removeEventListener("click",m),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),c();try{r()}catch(v){}},200))}function k(v){v.key==="Escape"&&m()}function f(v){v.target===t&&i&&m()}document.addEventListener("keydown",k),t.addEventListener("click",f),n.addEventListener("click",m);function u(v){v&&o.appendChild(v),document.body.appendChild(t),p(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open")})}return{open:u,close:m,content:o,setAllowOutsideClose:function(v){i=!!v}}}var ai=`
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

  /* Modal kutusu \u2014 720\xD7612, max 85vh */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:720px;
    height:612px;
    max-height:85vh;
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
    font-weight:400;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* Step alt ba\u015Fl\u0131\u011F\u0131 \u2014 ba\u015Fl\u0131\u011F\u0131n hemen alt\u0131nda, daha s\xF6n\xFCk */
  .ikr-fwizard-step-subtitle{
    margin-top:-20px;
    font-size:14px;
    font-weight:400;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.55));
    line-height:1.4;
  }

  /* \u2500\u2500\u2500 Step 2: Foto kart\u0131 \u2500\u2500\u2500 */
  .ikr-fwizard-photo-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.12));
    border-radius:12px;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:16px;
    box-sizing:border-box;
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
    transition:opacity 0.15s;
  }
  .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-add--disabled{
    opacity:0.4;
    cursor:not-allowed;
    pointer-events:none;
  }
  .ikr-fwizard-photo-add svg{
    flex-shrink:0;
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
    border:1px solid rgba(0,0,0,0.06);
  }
  .ikr-fwizard-photo-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
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
  .ikr-fwizard-photo-remove{
    position:absolute;
    top:-6px;
    right:-6px;
    width:20px;
    height:20px;
    border-radius:50%;
    background:#fff;
    border:1px solid rgba(0,0,0,0.15);
    color:rgba(0,0,0,0.65);
    font-size:11px;
    line-height:1;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:0 1px 4px rgba(0,0,0,0.12);
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
    border:1px solid var(--ikr-fwizard-input-border, rgba(0,0,0,0.15));
    border-radius:8px;
    font-size:14px;
    font-family:inherit;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
    border-color:var(--ikr-fwizard-input-focus, rgba(0,0,0,0.55));
  }
  .ikr-fwizard-textarea{
    resize:vertical;
    min-height:140px;
    line-height:1.5;
  }
  .ikr-fwizard-char-counter{
    font-size:12px;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.50));
    text-align:right;
  }
  .ikr-fwizard-char-counter--max{
    color:#dc2626;
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
    width:44px;
    height:44px;
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

  /* \u2500\u2500\u2500 Footer: [Geri]  [progress]  [Atla] \u2500\u2500\u2500 */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px 24px;
    border-top:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    display:grid;
    grid-template-columns:1fr 2fr 1fr;
    align-items:center;
    gap:16px;
  }
  .ikr-fwizard-footer-back{
    justify-self:start;
  }
  .ikr-fwizard-footer-progress{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
  }
  .ikr-fwizard-footer-right{
    justify-self:end;
    display:flex;
    align-items:center;
    gap:8px;
  }
  .ikr-fwizard-footer-skip{
    justify-self:end;
  }
  .ikr-fwizard-cta-btn{
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border:none;
    border-radius:8px;
    padding:10px 22px;
    font-size:14px;
    font-weight:500;
    cursor:pointer;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
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
    flex:1 1 auto;
    height:4px;
    border-radius:2px;
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.10));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
  }
  .ikr-fwizard-nav-btn{
    background:transparent;
    border:none;
    padding:6px 4px;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.60));
    font-size:14px;
    font-weight:500;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    gap:4px;
    border-radius:6px;
  }
  .ikr-fwizard-nav-btn:hover{
    color:var(--ikr-fwizard-text, rgb(17,17,17));
  }
  .ikr-fwizard-nav-btn[hidden]{
    display:none;
  }

  /* Mobile d\xFCzenlemeleri */
  @media(max-width:640px){
    .ikr-fwizard-overlay{
      padding:8px;
    }
    .ikr-fwizard{
      max-width:none;
      height:auto;
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
`;var fr=4;function ni(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(a){try{a(i)}catch(n){}})}return{get:function(){return i},set:function(a){Object.assign(i,a),t()},goNext:function(){i.currentStep<fr&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(a){return r.push(a),function(){r=r.filter(function(n){return n!==a})}}}}function oi(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},a=e.onSkip||function(){},n=e.onNext||function(){},o=document.createElement("div");o.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg><span>Geri</span>',l.onclick=function(){t()},o.appendChild(l);var s=document.createElement("div");s.className="ikr-fwizard-footer-progress";for(var d=[],p=0;p<fr;p++){var c=document.createElement("span");c.className="ikr-fwizard-progress-seg",s.appendChild(c),d.push(c)}o.appendChild(s);var m=document.createElement("div");m.className="ikr-fwizard-footer-right";var k=document.createElement("button");k.type="button",k.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",k.setAttribute("aria-label","Atla"),k.innerHTML='<span>Atla</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',k.onclick=function(){a()};var f=document.createElement("button");return f.type="button",f.className="ikr-fwizard-cta-btn",f.textContent="Sonraki",f.onclick=function(){f.disabled||n()},m.appendChild(k),m.appendChild(f),o.appendChild(m),{el:o,update:function(u){d.forEach(function(h,b){b+1<=u?h.classList.add("ikr-fwizard-progress-seg-active"):h.classList.remove("ikr-fwizard-progress-seg-active")}),l.hidden=u<=1;var v=r.indexOf(u)!==-1,g=i.indexOf(u)!==-1;k.hidden=!v,f.hidden=!g},setNextDisabled:function(u){f.disabled=!!u,f.classList.toggle("ikr-fwizard-cta-btn--disabled",!!u)}}}function li(e){var r=document.createElement("div");r.className="ikr-fwizard-step ikr-fwizard-step-rating";var i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",r.appendChild(i);var t=document.createElement("div");t.className="ikr-fwizard-stars",t.setAttribute("role","radiogroup"),t.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var a=be(A||{}),n=[];function o(s){n.forEach(function(d,p){var c=p<s;d.classList.toggle("ikr-fwizard-star-active",c),d.innerHTML=c?a.filled:a.empty})}for(var l=1;l<=5;l++)(function(s){var d=document.createElement("button");d.type="button",d.className="ikr-fwizard-star",d.setAttribute("role","radio"),d.setAttribute("aria-label",s+" y\u0131ld\u0131z"),d.innerHTML=a.empty,d.addEventListener("mouseenter",function(){o(s)}),d.addEventListener("mouseleave",function(){o(e.get().rating)}),d.addEventListener("click",function(){e.set({rating:s}),o(s),setTimeout(function(){e.goNext()},280)}),n.push(d),t.appendChild(d)})(l);return o(e.get().rating),r.appendChild(t),{el:r,destroy:function(){}}}var di=3,rt=5*1024*1024;function si(e){var r=document.createElement("div");r.className="ikr-fwizard-step ikr-fwizard-step-photos";var i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",r.appendChild(i);var t=document.createElement("div");t.className="ikr-fwizard-step-subtitle",t.textContent="Foto\u011Fraf ekleyebilirsiniz.",r.appendChild(t);var a=document.createElement("div");a.className="ikr-fwizard-photo-card";var n=document.createElement("label");n.className="ikr-fwizard-photo-add",n.setAttribute("aria-label","Foto\u011Fraf ekle"),n.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var o=document.createElement("input");o.type="file",o.accept="image/*",o.multiple=!0,o.style.display="none",n.appendChild(o),a.appendChild(n);var l=document.createElement("div");l.className="ikr-fwizard-photo-previews",l.setAttribute("aria-live","polite"),a.appendChild(l),r.appendChild(a);var s=!1;function d(){var f=e.get().images||[];f.forEach(function(u){c(u)}),p()}function p(){var f=(e.get().images||[]).length;f>=di?(o.disabled=!0,n.classList.add("ikr-fwizard-photo-add--disabled")):(o.disabled=!1,n.classList.remove("ikr-fwizard-photo-add--disabled"))}function c(f){var u=document.createElement("div");u.className="ikr-fwizard-photo-thumb",u.innerHTML='<img src="'+f+'" alt="">';var v=document.createElement("button");v.type="button",v.className="ikr-fwizard-photo-remove",v.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),v.innerHTML="&#x2715;",v.onclick=function(){var g=(e.get().images||[]).filter(function(h){return h!==f});e.set({images:g}),u.remove(),p()},u.appendChild(v),l.appendChild(u)}function m(f){var u=document.createElement("div");return u.className="ikr-fwizard-photo-thumb",u.innerHTML='<img src="'+f+'" alt=""><div class="ikr-fwizard-photo-loading"><div class="ikr-spinner"></div></div>',l.appendChild(u),u}o.onchange=async function(f){if(!s){s=!0,o.disabled=!0;for(var u=e.get().images||[],v=di-u.length,g=Array.from(f.target.files).slice(0,v),h=0;h<g.length;h++){var b=g[h];if(b.size>rt){alert(b.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}var y=URL.createObjectURL(b),L=m(y),E=L.querySelector(".ikr-fwizard-photo-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){var x=(e.get().images||[]).slice();x.push(y),e.set({images:x}),k(L,E,y);continue}try{var w=await U(Y+"/api/public/upload/sign",{method:"POST"});if(!w.ok)throw w.status===429?new Error("rate_limit"):new Error("sign failed");var T=await w.json(),S=new FormData;S.append("file",b),S.append("api_key",T.api_key),S.append("timestamp",T.timestamp),S.append("signature",T.signature),S.append("folder","review_images");var z=await fetch("https://api.cloudinary.com/v1_1/"+T.cloud_name+"/image/upload",{method:"POST",body:S}),O=await z.json();if(O.secure_url){var P=O.secure_url,_=(e.get().images||[]).slice();_.push(P),e.set({images:_}),k(L,E,P)}}catch(W){console.error("[ikr] Image upload failed:",W);var V=W.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";E.innerHTML='<span class="ikr-upload-error">\u2717 '+V+"</span>"}}s=!1,o.value="",p()}};function k(f,u,v){u.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){u.style.opacity="0",u.style.transition="opacity 0.4s",setTimeout(function(){u.style.display="none";var g=document.createElement("button");g.type="button",g.className="ikr-fwizard-photo-remove",g.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),g.innerHTML="&#x2715;",g.onclick=function(){var h=(e.get().images||[]).filter(function(b){return b!==v});e.set({images:h}),f.remove(),p()},f.appendChild(g)},400)},600),p()}return d(),{el:r,destroy:function(){o.onchange=null}}}var kr=2e3,it=60;function ci(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var a=document.createElement("div");a.className="ikr-fwizard-step-title",a.textContent="Deneyiminizi anlat\u0131n",t.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="ikr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=it,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),n.appendChild(o);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=kr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",n.appendChild(l);var s=document.createElement("div");s.className="ikr-fwizard-char-counter",s.setAttribute("aria-live","polite"),n.appendChild(s);function d(){var c=l.value.length;s.textContent=c+"/"+kr,s.classList.toggle("ikr-fwizard-char-counter--max",c>=kr)}function p(){return l.value.trim().length>0}return l.addEventListener("input",function(){e.set({comment:l.value}),d(),i(p())}),t.appendChild(n),d(),setTimeout(function(){i(p())},0),{el:t,destroy:function(){}}}var pi=!1;function tt(){if(!pi){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ai,document.head.appendChild(e),pi=!0}}function at(e,r,i){if(i=i||{},e===1)return li(r);if(e===2)return si(r);if(e===3)return ci(r,{onValidityChange:i.onValidityChange});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",t.innerHTML='<div class="ikr-fwizard-step-title">Ad\u0131m '+e+'</div><div style="margin-top:16px;color:rgba(0,0,0,0.55);font-size:14px;">Bu ad\u0131m yak\u0131nda eklenecek.</div>',{el:t,destroy:function(){}}}function mi(e){e=e||{},tt();var r=ni({productId:e.productId,productName:e.productName}),i=ti({onClose:e.onClose,allowOutsideClose:!0}),t=document.createElement("div");t.className="ikr-fwizard-step-wrap";var a=oi({skippableSteps:[2],nextableSteps:[3],onBack:function(){r.goBack()},onSkip:function(){r.goNext()},onNext:function(){r.goNext()}}),n=document.createElement("div");n.className="ikr-fwizard-layout",n.appendChild(t),n.appendChild(a.el);var o=null;function l(){o&&o.destroy&&o.destroy(),t.innerHTML="";var d=r.get().currentStep;o=at(d,r,{onValidityChange:function(p){a.setNextDisabled(!p)}}),t.appendChild(o.el),a.update(d),d===3&&a.setNextDisabled(!0)}l();var s=r.get().currentStep;return r.onChange(function(d){d.currentStep!==s&&(s=d.currentStep,l())}),i.open(n),{close:i.close}}function nt(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}function D(){var e=A&&A.reviewFormStyle||"accordion";if(e==="modal"){mi({productId:Z||"",productName:pe||""});return}nt()}var ot={id:"classic",name:"Klasik (A\xE7\u0131k)"};function lt(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,s=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,c=e.onFilterChange,m=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var f=(o[3]||0)+(o[4]||0),u=n>0?Math.round(f/n*100):0,v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",k.appendChild(v);var g=document.createElement("div");if(g.className="ikr-summary-block ikr-summary-count",g.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(g),t.showRecommendation!==!1&&u>0){var h=document.createElement("div");h.className="ikr-summary-block ikr-summary-recommend",h.innerHTML='<span class="ikr-recommend-pct">%'+u+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(h)}return k.appendChild(Ee({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:s,onFilterChange:c})),k.appendChild(ie({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:D,onSortChange:m})),k}var hr={};ce(hr,{css:()=>st,meta:()=>dt,render:()=>ct});var ui=`
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
`;var dt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},st=ui;function ct(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,d=e.currentHasImages,p=e.onFilterChange,c=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var u=document.createElement("button");u.className="ikr-compact-trigger",u.type="button",u.setAttribute("aria-expanded","false"),u.innerHTML='<span class="ikr-compact-trigger-stars">'+Q(o,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(u),k.appendChild(f);var v=ie({widget:r,currentOrderBy:s,currentHasImages:d,onWriteClick:D,onSortChange:c}),g=v.querySelector(".ikr-filter-wrap"),h=v.querySelector(".ikr-write-btn"),b=document.createElement("div");b.className="ikr-compact-actions-slot",h&&b.appendChild(h),g&&b.appendChild(g),k.appendChild(b),m.appendChild(k);var y=document.createElement("div");y.className="ikr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var L=document.createElement("div");L.className="ikr-compact-panel-inner";var E=document.createElement("div");E.className="ikr-compact-avg",E.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+o+"</span>",L.appendChild(E),L.appendChild(Ee({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:p})),y.appendChild(L);var x=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function w(K){var X=K?m:f;y.parentNode!==X&&(y.classList.contains("ikr-open")&&(y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")),X.appendChild(y))}if(w(x?x.matches:!1),x){var T=function(K){w(K.matches)};x.addEventListener?x.addEventListener("change",T):x.addListener&&x.addListener(T)}if(h){var S=document.createElement("button");S.className="ikr-write-btn",S.textContent="Yorum Yap",S.onclick=D;var z=document.createElement("div");z.className="ikr-compact-write-row",z.appendChild(S),m.appendChild(z)}function O(){y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")}function P(){Je(_),y.classList.add("ikr-open"),y.setAttribute("aria-hidden","false"),u.setAttribute("aria-expanded","true")}u.onclick=function(){y.classList.contains("ikr-open")?O():P()};var _=null;function V(K){_&&(_(),_=null),K||(_=$e({trigger:f,element:y,close:O}))}if(V(x?x.matches:!1),x){var W=function(K){V(K.matches)};x.addEventListener?x.addEventListener("change",W):x.addListener&&x.addListener(W)}if(i.showRecommendation!==!1){var ue=(n[3]||0)+(n[4]||0),we=a>0?Math.round(ue/a*100):0;if(we>0){var se=document.createElement("div");se.className="ikr-summary-block ikr-summary-recommend",se.style.marginTop="8px",se.innerHTML='<span class="ikr-recommend-pct">%'+we+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",L.appendChild(se)}}return m}var xr={};ce(xr,{css:()=>mt,meta:()=>pt,render:()=>ut});var vi=`
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
`;var pt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},mt=vi;function ut(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,d=e.currentHasImages,p=e.onFilterChange,c=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(f);var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-count ikr-split-left-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(u),m.appendChild(k);var v=document.createElement("div");v.className="ikr-split-col ikr-split-mid",v.appendChild(Ee({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:p})),m.appendChild(v);var g=ie({widget:r,currentOrderBy:s,currentHasImages:d,onWriteClick:D,onSortChange:c}),h=g.querySelector(".ikr-filter-wrap"),b=g.querySelector(".ikr-write-btn"),y=document.createElement("div");if(y.className="ikr-split-col ikr-split-right",b&&y.appendChild(b),h&&y.appendChild(h),m.appendChild(y),i.showRecommendation!==!1){var L=(n[3]||0)+(n[4]||0),E=a>0?Math.round(L/a*100):0;if(E>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+E+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(x)}}return m}var yr={};ce(yr,{css:()=>ft,meta:()=>vt,render:()=>kt});var fi=`
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
`;var vt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1}},ft=fi;function kt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var d=document.createElement("div");d.className="ikr-minimal-info";var p=document.createElement("div");p.className="ikr-minimal-row";var c=document.createElement("span");c.className="ikr-minimal-avg",c.textContent=a,p.appendChild(c);var m=document.createElement("span");m.className="ikr-minimal-stars",m.innerHTML=Q(a,i),p.appendChild(m);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",p.appendChild(k),d.appendChild(p),s.appendChild(d);var f=ie({widget:r,currentOrderBy:n,currentHasImages:o,onWriteClick:D,onSortChange:l}),u=f.querySelector(".ikr-filter-wrap"),v=f.querySelector(".ikr-write-btn"),g=document.createElement("div");if(g.className="ikr-minimal-actions",v&&g.appendChild(v),u&&g.appendChild(u),s.appendChild(g),v){var h=document.createElement("button");h.className="ikr-write-btn",h.textContent="Yorum Yap",h.onclick=D;var b=document.createElement("div");b.className="ikr-minimal-write-row",b.appendChild(h),s.appendChild(b)}return s}var br={};ce(br,{css:()=>ht,meta:()=>gt,render:()=>xt});var ki=`
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
`;var gt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1}},ht=ki;function xt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var d=document.createElement("div");d.className="ikr-hero-info";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=a,d.appendChild(p);var c=document.createElement("div");c.className="ikr-hero-meta";var m=document.createElement("span");m.className="ikr-hero-stars",m.innerHTML=Q(a,i),c.appendChild(m);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",c.appendChild(k),d.appendChild(c),s.appendChild(d);var f=ie({widget:r,currentOrderBy:n,currentHasImages:o,onWriteClick:D,onSortChange:l}),u=f.querySelector(".ikr-filter-wrap"),v=f.querySelector(".ikr-write-btn"),g=document.createElement("div");if(g.className="ikr-hero-actions",v&&g.appendChild(v),u&&g.appendChild(u),s.appendChild(g),v){var h=document.createElement("button");h.className="ikr-write-btn",h.textContent="Yorum Yap",h.onclick=D;var b=document.createElement("div");b.className="ikr-hero-write-row",b.appendChild(h),s.appendChild(b)}return s}var Qe={classic:gr,compact:hr,split:xr,minimal:yr,hero:br};function er(e){return Qe[e]||Qe.classic}function gi(){return Object.keys(Qe).map(function(e){return Qe[e].css||""}).join(`
`)}var wr={};ce(wr,{css:()=>bt,meta:()=>yt,render:()=>wt});function Te(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var o=document.createElement("span");return o.className="ikr-read-more ikr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",i.appendChild(o),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,n.classList.toggle("ikr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var yt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},bt="";function wt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ne(e.rating,A),a.appendChild(n);var o=document.createElement("span");if(o.className="ikr-date",o.textContent=oe(e.createdAt),t.appendChild(a),t.appendChild(o),i.appendChild(t),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",i.appendChild(s);var d=(e.comment||"").trim();if(d){var p=document.createElement("div");p.className="ikr-body ikr-body-clamped",p.textContent=d,i.appendChild(p);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",i.appendChild(c),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){c.style.display="inline";var f=!1;c.onclick=function(){f=!f,p.classList.toggle("ikr-body-clamped",!f),c.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var m=document.createElement("div");m.className="ikr-gallery",e.images.forEach(function(f){if(!(!f||f.indexOf("https://")!==0&&f.indexOf("data:image/")!==0)){var u=document.createElement("img");u.src=G(f),u.className="ikr-img",u.setAttribute("data-ikr-img-url",f),(function(v){u.onclick=function(){ee(e,v,r)}})(f),m.appendChild(u)}}),i.appendChild(m)}var k=Te(e.merchantReply);return k&&i.appendChild(k),i}var Cr={};ce(Cr,{css:()=>zt,meta:()=>Ct,render:()=>St});var hi=`
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
`;var Ct={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},zt=hi;function St(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ne(e.rating,A),a.appendChild(n);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",a.appendChild(o);var l=document.createElement("span");l.className="ikr-date ikr-review-list-author-date",l.textContent=oe(e.createdAt),a.appendChild(l),t.appendChild(a);var s=document.createElement("div");if(s.className="ikr-review-list-content",e.title){var d=document.createElement("div");d.className="ikr-review-list-title",d.textContent=e.title,s.appendChild(d)}var p=(e.comment||"").trim();if(p){var c=document.createElement("div");c.className="ikr-review-list-body ikr-body-clamped",c.textContent=p,s.appendChild(c);var m=document.createElement("span");m.className="ikr-read-more",m.textContent="Devam\u0131n\u0131 oku",m.style.display="none",s.appendChild(m),requestAnimationFrame(function(){if(c.scrollHeight>c.clientHeight+2){m.style.display="inline";var u=!1;m.onclick=function(){u=!u,c.classList.toggle("ikr-body-clamped",!u),m.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Te(e.merchantReply);if(k&&s.appendChild(k),t.appendChild(s),i){var f=document.createElement("div");f.className="ikr-review-list-media",e.images.forEach(function(u){if(!(!u||u.indexOf("https://")!==0&&u.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=G(u),v.setAttribute("data-ikr-img-url",u),(function(g){v.onclick=function(){ee(e,g,r)}})(u),f.appendChild(v)}}),t.appendChild(f)}return t}var zr={};ce(zr,{css:()=>Tt,meta:()=>Et,render:()=>Lt});var xi=`
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
`;var Et={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Tt=xi;function Lt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ne(e.rating,A),a.appendChild(n),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,a.appendChild(o)}var l=document.createElement("div");l.className="ikr-review-gallery-author",l.textContent=e.author||"",a.appendChild(l);var s=document.createElement("div");s.className="ikr-review-gallery-date",s.textContent=oe(e.createdAt),a.appendChild(s);var d=(e.comment||"").trim();if(d){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=d,a.appendChild(p);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",c.style.cursor="pointer",c.onclick=function(){var v=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;ee(e,v,r)},a.appendChild(c),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(c.style.display="inline")})}if(t.appendChild(a),i){var m=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var f=document.createElement("img");f.src=G(m),f.loading="lazy",f.setAttribute("data-ikr-img-url",m),f.onclick=function(){ee(e,m,r)},k.appendChild(f),t.appendChild(k)}var u=Te(e.merchantReply,function(){var v=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;ee(e,v,r)});return u&&(u.classList.add("ikr-review-gallery-reply"),t.appendChild(u)),t}var rr={card:wr,list:Cr,gallery:zr};function ir(e){return rr[e]||rr.card}function yi(){return Object.keys(rr).map(function(e){return rr[e].css||""}).join(`
`)}function H(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var bi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},wi={small:80,medium:110,large:140};function At(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",o=r.widgetBgColor||i,l=r.widgetBorderColor||"transparent",s=r.separatorColor||H(t,.08),d=r.headerTitleColor||t,p=r.headerAvgColor||t,c=r.headerCountColor||t,m=r.headerRecommendColor||t,k=r.barLabelColor||t,f=r.barFillColor||t,u=r.barTrackColor||H(t,.1),v=r.barCountColor||t,g=r.barHoverBgColor||H(t,.05),h=r.primaryColor||"#111111",b=r.primaryTextColor||"#ffffff",y=r.btnBgColor||h,L=r.btnTextColor||b,E=r.btnBorderColor||h,x=r.filterBtnBgColor||h,w=r.filterBtnTextColor||b,T=r.filterBtnBorderColor||h,S=r.filterMenuBgColor||i,z=r.filterMenuBorderColor||H(t,.12),O=r.filterItemTextColor||t,P=r.filterItemHoverBgColor||H(h,.07),_=r.filterItemActiveColor||h,V=r.reviewTitleColor||t,W=r.reviewAuthorColor||t,ue=r.reviewDateColor||t,we=r.reviewBodyColor||t,se=r.reviewBorderColor||H(t,.08),K=r.reviewStarColor||"#f59e0b",X=r.replyBgColor||a,Ce=r.replyBorderColor||h,De=r.replyLabelColor||t,ze=r.replyTextColor||t,nr=r.photoBgColor||H(t,.03),Ne=r.photoBorderColor||H(t,.1),or=r.photoTitleColor||t,ve=r.formBgColor||i,Ye=r.formBorderColor||H(t,.08),fe=r.inputBgColor||n,ke=r.inputTextColor||t,ge=r.inputBorderColor||H(t,.2),Be=r.placeholderColor||H(t,.35),lr=r.loadMoreBgColor||i,dr=r.loadMoreTextColor||t,F=r.loadMoreBorderColor||H(t,.3),te=r.modalBgColor||i,Br=r.modalTextColor||t,_e=r.modalCloseBgColor||h,C=r.modalCloseTextColor||b,N=r.modalCloseBorderColor||h,I=r.modalNavBgColor||"rgba(0,0,0,0.45)",q=r.modalNavTextColor||"#ffffff",Ie=r.modalReplyBgColor||a,Fi=r.modalReplyBorderColor||h,_r={"--ikr-widget-bg":o,"--ikr-widget-border":l,"--ikr-separator":s,"--ikr-header-title":d,"--ikr-header-avg":p,"--ikr-header-count":c,"--ikr-header-recommend":m,"--ikr-bar-label":k,"--ikr-bar-fill":f,"--ikr-bar-track":u,"--ikr-bar-count":v,"--ikr-bar-hover-bg":g,"--ikr-btn-bg":y,"--ikr-btn-text":L,"--ikr-btn-border":E,"--ikr-filter-btn-bg":x,"--ikr-filter-btn-text":w,"--ikr-filter-btn-border":T,"--ikr-filter-menu-bg":S,"--ikr-filter-menu-border":z,"--ikr-filter-item-text":O,"--ikr-filter-item-hover-bg":P,"--ikr-filter-item-active":_,"--ikr-review-title":V,"--ikr-review-author":W,"--ikr-review-date":ue,"--ikr-review-body":we,"--ikr-review-border":se,"--ikr-review-star-color":K,"--ikr-reply-bg-color":X,"--ikr-reply-border":Ce,"--ikr-reply-label":De,"--ikr-reply-text":ze,"--ikr-photo-bg":nr,"--ikr-photo-border":Ne,"--ikr-photo-title":or,"--ikr-form-bg":ve,"--ikr-form-border":Ye,"--ikr-input-bg-color":fe,"--ikr-input-text-color":ke,"--ikr-input-border":ge,"--ikr-placeholder":Be,"--ikr-load-more-bg":lr,"--ikr-load-more-text":dr,"--ikr-load-more-border":F,"--ikr-modal-bg":te,"--ikr-modal-text":Br,"--ikr-modal-close-bg":_e,"--ikr-modal-close-text":C,"--ikr-modal-close-border":N,"--ikr-modal-nav-bg":I,"--ikr-modal-nav-text":q,"--ikr-modal-reply-bg":Ie,"--ikr-modal-reply-border":Fi,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":H(t,.45),"--ikr-border":H(t,.12),"--ikr-track-bg":H(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(_r).forEach(function(Ir){e.style.setProperty(Ir,_r[Ir])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function de(e,r,i,t,a,n,o){if(ur){Ve({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:o});return}Ue(!0),Or(e),Pr(r),o!==void 0&&Mr(o),Hr(t),a&&Se(a),n&&ye(n),i!=null&&qr(i);try{let _e=function(C,N){if(!(!C||!C.meta||!C.meta.sizeOverrides)){var I=C.meta.sizeOverrides[N];I&&Object.keys(I).forEach(function(q){m.style.setProperty(q,I[q])})}};var Br=_e,l=er(r.summaryLayout),s=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),d=r.showTitle!==!1,p=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=s&&d?p:"",m=document.documentElement;At(m,r);var k=r.primaryColor||"#111111",f=r.primaryTextColor||"#ffffff";Kr(k,ri+gi()+yi());var u=r.borderRadius!==void 0?r.borderRadius:8,v=bi[r.size]||bi.medium,g=wi[r.thumbnailSize]||wi.medium;m.style.setProperty("--ikr-title-size",v.titleSize+"px"),m.style.setProperty("--ikr-review-text-size",v.reviewTextSize+"px"),m.style.setProperty("--ikr-review-title-size",v.reviewTitleSize+"px"),m.style.setProperty("--ikr-author-size",v.authorSize+"px"),m.style.setProperty("--ikr-reply-name-size",v.replyNameSize+"px"),m.style.setProperty("--ikr-reply-text-size",v.replyTextSize+"px"),m.style.setProperty("--ikr-color-text",f),m.style.setProperty("--ikr-radius",u+"px"),m.style.setProperty("--ikr-radius-sm",Math.max(0,u-4)+"px"),m.style.setProperty("--ikr-photo-title-size",v.photoTitleSize+"px"),m.style.setProperty("--ikr-avg-rating-size",v.avgRatingSize+"px"),m.style.setProperty("--ikr-review-count-size",v.reviewCountSize+"px"),m.style.setProperty("--ikr-recommend-size",v.recommendSize+"px"),m.style.setProperty("--ikr-btn-text-size",v.btnTextSize+"px"),m.style.setProperty("--ikr-bar-label-size",v.barLabelSize+"px"),m.style.setProperty("--ikr-minimal-avg-size",v.minimalAvgSize+"px"),m.style.setProperty("--ikr-hero-avg-size",v.heroAvgSize+"px"),m.style.setProperty("--ikr-bar-count-size",v.barCountSize+"px"),m.style.setProperty("--ikr-review-date-size",v.reviewDateSize+"px"),m.style.setProperty("--ikr-filter-text-size",v.filterTextSize+"px"),m.style.setProperty("--ikr-load-more-size",v.loadMoreSize+"px"),m.style.setProperty("--ikr-read-more-size",v.readMoreSize+"px"),m.style.setProperty("--ikr-thumbnail-size",g+"px");var h=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";m.style.setProperty("--ikr-review-star-color",h),m.style.setProperty("--ikr-star-size",v.reviewStarSize+"px"),m.style.setProperty("--ikr-avg-star-size",v.avgStarSize+"px"),_e(er(r.summaryLayout),r.size),_e(ir(r.reviewLayout),r.size);var b=be(r),y=document.getElementById("ikas-reviews");if(!y){var L=document.getElementById("ikas-reviews-anchor");if(!L)return;y=document.createElement("div"),y.id="ikas-reviews",y.style.minHeight="200px",L.appendChild(y)}if(r.enabled===!1){y.style.minHeight="auto",y.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ue(!1);var E=Oe;Ve(null),E&&de(E.productId,E.settings,E.reviewsData,E.productName,E.orderBy,E.page,E.badgeSettings);return}y.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var x=i||{},w=x.data&&x.data.reviews||[],T=x.data&&x.data.totalCount||0,S=y.cloneNode(!1);y.parentNode.replaceChild(S,y),y=S;var z=document.createElement("div");if(z.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(z.style.width="100%",z.style.maxWidth="100%",z.style.marginLeft="0",z.style.marginRight="0"),c){var O=document.createElement("div"),P=r.summaryLayout||"classic";O.className="ikr-title ikr-title-"+P,O.textContent=c,z.appendChild(O)}var _=x.data&&x.data.allCount||0,V=x.data&&x.data.ratingCounts||null,W=V||[0,0,0,0,0],ue=x.data&&x.data.avgRating||"0.0";if(!V&&w.length>0){w.forEach(function(C){C.rating>=1&&C.rating<=5&&W[C.rating-1]++});var we=w.reduce(function(C,N){return C+N.rating},0);ue=(we/w.length).toFixed(1)}if(_>0){var se=er(r.summaryLayout),K=se.render({widget:z,data:x,settings:r,iconPair:b,allCount:_,ratingCounts:W,avgRatingVal:ue,currentRatingFilter:he,currentOrderBy:J,currentHasImages:xe,onFilterChange:async function(C){Ge(he===C?null:C),ye(1);var N=await je(Z,J,1,he,xe);await de(Z,A,N,pe,J,1)},onSortChange:async function(C,N){ye(1),N?(mr(!0),Se("newest")):(mr(!1),Se(C));var I=await je(Z,J,1,he,xe);await de(Z,A,I,pe,J,1)}});z.appendChild(K)}else{var X=document.createElement("button");X.className="ikr-write-btn",X.style.cssText="display:block;margin:16px auto 0;",X.textContent="Yorum Yap",X.onclick=function(){var C=document.getElementById("ikr-form-accordion");if(C){var N=C.style.maxHeight&&C.style.maxHeight!=="0px";N?(C.style.maxHeight="0px",C.style.opacity="0"):(C.style.maxHeight=C.scrollHeight+"px",C.style.opacity="1",setTimeout(function(){C.style.maxHeight="none"},360),setTimeout(function(){var I=document.querySelector("header"),q=I?I.getBoundingClientRect().height:0,Ie=C.getBoundingClientRect().top+window.pageYOffset-q-16;window.scrollTo({top:Ie,behavior:"smooth"})},50))}},z.appendChild(X)}var Ce=document.createElement("div");Ce.id="ikr-form-accordion",Ce.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",Ce.appendChild(Jr(e,t)),z.appendChild(Ce);var De=w.filter(function(C){return C.images&&Array.isArray(C.images)&&C.images.some(function(N){return N&&(N.indexOf("https://")===0||N.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!xe&&De.length>0){var ze=document.createElement("div");if(ze.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var nr=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",Ne=document.createElement("div");Ne.className="ikr-photo-title",Ne.textContent=nr,ze.appendChild(Ne)}var or=r.reviewLayout==="card"?"1/1":"3/4";m.style.setProperty("--ikr-photo-thumb-aspect",or);var ve=document.createElement("div");ve.className="ikr-photo-strip";var Ye=0;De.forEach(function(C){if(!(Ye>=10)){var N=C.images.find(function(q){return q&&(q.indexOf("https://")===0||q.indexOf("data:image/")===0)});if(N){var I=document.createElement("img");I.src=G(N),I.className="ikr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",(function(q,Ie){I.onclick=function(){ee(Ie,q,w)}})(N,C),ve.appendChild(I),Ye++}}});var fe=document.createElement("button");fe.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",fe.innerHTML="&#8249;",fe.setAttribute("aria-label","\xD6nceki"),fe.onclick=function(){ve.scrollBy({left:-200,behavior:"smooth"})};var ke=document.createElement("button");ke.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",ke.innerHTML="&#8250;",ke.setAttribute("aria-label","Sonraki"),ke.onclick=function(){ve.scrollBy({left:200,behavior:"smooth"})};var ge=document.createElement("div");ge.className="ikr-photo-strip-wrap",ge.appendChild(fe),ge.appendChild(ve),ge.appendChild(ke),ze.appendChild(ge),z.appendChild(ze)}if(w.length===0){var Be=document.createElement("p");Be.className="ikr-state-msg",Be.textContent="Hen\xFCz yorum yok.",z.appendChild(Be)}else{var lr=ir(r.reviewLayout);w.forEach(function(C){z.appendChild(lr.render(C,w))})}var dr=x.data&&x.data.hasMore;if(dr){var F=document.createElement("button");F.className="ikr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var C=Re+1,N=await je(Z,J,C,he,xe);if(N&&N.data&&N.data.reviews){ye(C);var I=ir(A.reviewLayout);N.data.reviews.forEach(function(q){z.insertBefore(I.render(q,N.data.reviews),F)}),N.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.remove()},z.appendChild(F)}y.appendChild(z),ei(_>0?ue:null,T,t,cr)}catch(C){console.error("[ikr] render error:",C),y.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ue(!1),Oe){var te=Oe;Ve(null),de(te.productId,te.settings,te.reviewsData,te.productName,te.orderBy,te.page,te.badgeSettings)}}}var me="ikr_settings_"+j,Nt=300*1e3,Bt=30*1e3;async function Er(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||Y,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(p){}var t=await U(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(p){}return null}var n=null,o=He(me);if(o)try{var l=JSON.parse(o);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<Bt)return null;R(me,"")}else if(l.v){if(Date.now()-l.t<Nt)return l.v;n=l.v,R(me,"")}else R(me,"");else R(me,"")}catch(p){R(me,"")}try{var s=await U(Y+"/api/public/settings?publicApiKey="+encodeURIComponent(j));if(!s.ok)return s.status===404&&R(me,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var d=await s.json();return R(me,JSON.stringify({t:Date.now(),v:d})),d}catch(p){return console.error("[ikr] fetchSettings error:",p),n||null}}var _t=60*1e3;async function je(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||Y,o=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),l=await U(o);if(l.ok)return await l.json()}catch(u){}return null}r=r||"newest",i=i||1;var s="ikr_reviews_"+j+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),d=null,p=He(s);if(p)try{var c=JSON.parse(p);if(c&&c.t!==void 0&&c.v){if(Date.now()-c.t<_t)return c.v;d=c.v,R(s,"")}else R(s,"")}catch(u){R(s,"")}try{var m=Y+"/api/public/reviews?storeId="+encodeURIComponent(j)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await U(m);if(!k.ok)return d||null;var f=await k.json();return R(s,JSON.stringify({t:Date.now(),v:f})),f}catch(u){return console.error("[ikr] fetchReviews error:",u),d||null}}var Sr={};async function Le(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!Sr[e]){Sr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var o=await Er();if(!o)return;var l=o.widgets&&o.widgets.reviews||a,s=o.widgets&&o.widgets.badge||n;if(l.enabled===!1)return;Se("newest"),ye(1),Ge(null);var d=await je(e,"newest",1,null);await de(e,l,d,r,"newest",1,s)}catch(p){console.error("[ikr] bootstrap error:",p),await de(e,a,null,r,void 0,void 0,n)}finally{delete Sr[e]}}}function Tr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function Ci(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=M(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Xe.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Pe).forEach(function(i){e[i]=Pe[i]}),e}var It=300*1e3,zi=50;async function Si(e){var r="ikr_ratings_"+j,i={},t=He(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<It?i=a.v||{}:R(r,"")}catch(d){R(r,"")}var n=e.filter(function(d){return!i[d]});if(!n.length)return i;for(var o=[],l=0;l<n.length;l+=zi)o.push(n.slice(l,l+zi));var s=await Promise.all(o.map(function(d){var p=Y+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(j)+"&slugs="+d.map(encodeURIComponent).join(",");return U(p).then(function(c){return c.ok?c.json().then(function(m){return m.data||{}}):{}}).catch(function(){return{}})}));return s.forEach(function(d){n.forEach(function(p){i[p]||(i[p]={average:0,count:0,_empty:!0})}),Object.keys(d).forEach(function(p){i[p]=d[p]})}),R(r,JSON.stringify({t:Date.now(),v:i})),i}var Rt="var(--ikr-badge-color,#f59e0b)",Ei=13,Ot="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function Pt(e){var r=qe("star","classic"),i="width:"+Ei+"px;height:"+Ei+"px;";return'<span style="color:'+Rt+';display:inline-flex;align-items:center;">'+Q(e,r,{sizeStyle:i})+"</span>"}function Fe(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=Ot+"justify-content:"+(r||"flex-start")+";",i.innerHTML=Pt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var Ti=".product-name",Li=".add-to-basket-modal",Ai="h1.product-name",tr=".single-product-container-main",Lr=".single-product-product-name",Ni=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Bi=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var _i='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Mt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Ar(e,r){var i=e.querySelector(Ti);if(i)return i;if(e.matches&&e.matches(_i))return e;var t=e.querySelector(_i);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var o=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<o.length;l++){var s=o[l],d=s.textContent.trim();if(!(!d||d.length<2||d.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(d)&&!Mt.test(d)&&!(s.closest("figure")||s.closest("picture"))&&!(s.children.length>1))return s}return null}function Ht(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=M(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(tr)&&!e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ni)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),o=Array.from(e.childNodes).filter(function(f){return f.nodeType===3}).map(function(f){return f.textContent.trim()}).join("").trim(),l=!!Ar(e,i);if(!o&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(f){f.setAttribute("data-ikr-badge","1")});var s=Ar(e,i);if(!s||s.querySelector("[data-ikr-listing-badge]"))return;var d=window.getComputedStyle(s).textAlign;s.appendChild(Fe(r,d==="center"?"center":d==="right"?"flex-end":"flex-start"));return}var p=Ar(e,i);if(!(p&&p.querySelector("[data-ikr-listing-badge]")))if(p){var c=window.getComputedStyle(p).textAlign;p.appendChild(Fe(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"))}else{var m=Fe(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(m,k):e.appendChild(m)}}}function qt(e,r){var i=document.querySelector(Li);if(i){var t=i.querySelector(Ai);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Me&&r[Me]&&(a=Me),!a){var n=M(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var o=t.textContent.trim();Object.keys(e).forEach(function(c){if(!a){var m=e[c];m&&m.trim()===o&&r[c]&&(a=c)}})}if(!a){var l=document.querySelector(tr);if(l){var s=l.querySelector("a[href]");if(s){var d=M(s.href);d&&r[d]&&(a=d)}}}if(!a){var p=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(c){if(!a&&!(c.closest("header")||c.closest("nav"))&&!c.closest(tr)){var m=c.textContent.trim().toLowerCase();if(m&&m===p){var k=M(c.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(Fe(r[a],"flex-start"))}}}function Ii(e,r){var i=M(window.location.pathname),t=document.querySelectorAll(Bi),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(o){a.push(o)})}),Object.keys(e).forEach(function(n){var o=r[n];if(!(!o||o._empty||o.count===0)){var l=e[n];a.forEach(function(s){M(s.href)===n&&Ht(s,o,l,i)})}}),qt(e,r)}async function Ae(){if(B.inProgress){B.queued=!0;return}if(!B.rendered){B.rendered=!0,B.inProgress=!0;try{var e=B.navCleanup;e&&(B.navCleanup=!1);var r=Ci();if(!Object.keys(r).length){B.rendered=!1;return}var i=await Promise.all([Er(),Si(Object.keys(r))]),t=i[0];if(!t){B.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},o=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){B.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",o),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),Ii(r,a)}finally{B.inProgress=!1,B.queued&&(B.queued=!1,B.rendered=!1,Ae())}}}var Ri=!1,Oi=!1;function Hi(){Oi||(Oi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=M(r.href);!i||i.length<3||jr(i)}},!0))}var Pi=!1,Mi=typeof location!="undefined"?location.pathname:"";function ar(){try{if(location.pathname===Mi)return;Mi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function jt(){if(!Pi){Pi=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return ar(),i},history.replaceState=function(){var i=r.apply(this,arguments);return ar(),i},window.addEventListener("popstate",ar),window.addEventListener("hashchange",ar)}}function Nr(){if(jt(),window.IkasEvents){if(Ri)return;Ri=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var o=n.data&&n.data.productDetails;Array.isArray(o)&&o.forEach(function(p){p&&p.metaData&&p.metaData.slug&&p.name&&(Pe[p.metaData.slug]=p.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,s=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(R("ikr_reviews_"+j+"_"+l,""),Le(l,s))}if(n&&n.type==="PAGE_VIEW"){var d=Date.now();if(B.lastPageView&&d-B.lastPageView<800)return;B.lastPageView=d,B.navCleanup=!0,B.rendered=!1,Ae()}}});var e=Tr();if(e)Le(e.id,e.name);else{let n=function(){var o=Tr();o?Le(o.id,o.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){B.rendered||Ae()},2e3)}else{let n=function(){window.IkasEvents?Nr():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var qi=null;function ji(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(qi),qi=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=M(a.href);return n&&n.length>=3&&!Xe.test(n)});t&&(B.rendered=!1,Ae())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Ft=window.__ikasPreviewMode===!0;if(Ft){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Le("mock-product","\xD6rnek \xDCr\xFCn"),e()};Dt=e,Yt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!A)){var n=Object.assign({},A,a);de(Z,n,pr,pe,J,Re)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(j){let e=function(){Nr(),Hi(),ji()};Gt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Dt,Yt,Gt;})();
