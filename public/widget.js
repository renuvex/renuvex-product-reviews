/* ikas Reviews Widget — built 2026-04-29T13:14:14.564Z | theme: default */
"use strict";(()=>{var Yi=Object.defineProperty;var xe=(e,r)=>{for(var i in r)Yi(e,i,{get:r[i],enumerable:!0})};var Gi=typeof document!="undefined",Rr=Gi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,sr=Rr?Rr.src:"",Ui=new URLSearchParams(sr.split("?")[1]||""),H=Ui.get("publicApiKey"),Y=sr?sr.split("?")[0].replace(/\/widget\.js$/,""):"";var ae="newest",He=1,ze=null,Ce=!1,ee=null,A=null,cr=null,ye=null,pr=null;function Le(e){ae=e}function Se(e){He=e}function Ve(e){ze=e}function mr(e){Ce=e}function Mr(e){ee=e}function Pr(e){A=e}function Or(e){cr=e}function Hr(e){ye=e}function Fr(e){pr=e}var ur=!1,Fe=null;function Ke(e){ur=e}function Ze(e){Fe=e}var B={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},je={},qe=null;function jr(e){qe=e}var qr={};function De(e){try{return sessionStorage.getItem(e)}catch(r){return qr[e]||null}}function P(e,r){try{sessionStorage.setItem(e,r)}catch(i){qr[e]=r}}var fe="0 -960 960 960",ne={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};function We(e){return'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Dr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starFill+'"/></g></svg>',empty:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ne.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ne.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+ne.starFill+'"/></g></svg>',empty:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ne.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+ne.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+ne.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+fe+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+ne.heartOutline+'"/></g></svg>'}}}};function Vi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Ye(e,r){var i=Dr[e]||Dr.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function Ee(e){var r=e&&e.reviewIcon||"star",i=Vi(r),t=i.style||e&&e.reviewIconStyle||"classic";return Ye(i.type,t)}function Gr(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=Ee(r),n=i&&i.sizePx,d=n?"width:"+n+"px;height:"+n+"px;":"",o="",s=1;s<=5;s++){var c=s<=t;o+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+d+'">'+(c?a.filled:a.empty)+"</span>"}return o}var Xe={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},Yr={lines:{label:"\xC7izgili",svg:We(Xe.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:We(Xe.linesAlt)},funnel:{label:"Huni",svg:We(Xe.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:We(Xe.dense)}};function Ur(e){var r=Yr[e]||Yr.lines;return r.svg}var Je="var(--ikr-review-star-color,#f59e0b)",$e=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function O(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ve(e,r){var i="color:"+Je+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Gr(e,r)+"</span>"}function oe(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,d=n<.25?a:n<.75?a+.5:a+1,o=d/5*100,s=i&&i.sizeStyle||"",c="",p="",m=0;m<5;m++)c+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>",p+='<span class="ikr-icon" style="'+s+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+c+'</span><span class="ikr-stars-partial-fill" style="width:'+o+'%;">'+p+"</span></span>"}function ke(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Ki(e){var r=/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Zi(e){var r=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Ki(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Kr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Zi(e)}function J(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Zr(e,r,i,t){var a=Ee(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),d=document.createElement("div");if(d.className="ikr-rating"+(r?" ikr-rating-interactive":""),d.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){d.style.flexDirection="row";for(var o=1;o<=5;o++){var s=document.createElement("span");s.className="ikr-icon",s.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(o<=e?Je:"#ddd")+";",s.innerHTML=o<=e?a.filled:a.empty,d.appendChild(s)}return d}for(var c=5;c>=1;c--)(function(p){var m=document.createElement("input");m.type="radio",m.name=n,m.value=String(p),m.id=n+"-"+p,m.className="ikr-rating-input",p===e&&(m.checked=!0),m.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",m.addEventListener("change",function(){i&&i(p)});var l=document.createElement("label");l.htmlFor=m.id,l.className="ikr-rating-label",l.setAttribute("aria-label",p+" y\u0131ld\u0131z"),l.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",l.addEventListener("click",function(k){k.preventDefault();for(var v=d.querySelectorAll(".ikr-rating-input"),f=0;f<v.length;f++)v[f].checked=!1;m.checked=!0,i&&i(p)}),l.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+Je+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",l.style.position="relative",d.appendChild(m),d.appendChild(l)})(c);return Wi(),d}var Vr=!1;function Wi(){if(!Vr){Vr=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+Je+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function G(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Wr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Xi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=ve(e.rating,A);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ke(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var d=document.createElement("div");d.className="ikr-modal-title",d.textContent=e.title||"",d.style.display=e.title?"":"none",i.appendChild(d);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",i.appendChild(o);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(s);var c=document.createElement("div");c.className="ikr-modal-reply";var p=document.createElement("div");p.className="ikr-modal-reply-label",p.textContent="Ma\u011Faza Sahibi";var m=document.createElement("div");return m.className="ikr-modal-reply-text",m.textContent=e.merchantReply||"",c.appendChild(p),c.appendChild(m),c.style.display=e.merchantReply?"":"none",i.appendChild(c),r.appendChild(i),r}function Ji(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ve(r.rating,A),i.querySelector(".ikr-modal-date").textContent=ke(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function fr(e,r,i,t,a,n,d,o){var s=e.images&&Array.isArray(e.images)?e.images.filter(function(w){return w&&(w.indexOf("https://")===0||w.indexOf("data:image/")===0)}):[],c=Math.min(i,s.length-1),p=document.createElement("div");p.className="ikr-modal-left";var m=document.createElement("img"),l=d==="next"?"ikr-modal-img-enter-right":d==="prev"?"ikr-modal-img-enter-left":"";m.className="ikr-modal-main-img"+(l?" "+l:""),m.src=J(s[c]||""),m.alt="Yorum foto\u011Fraf\u0131",p.appendChild(m);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(w){w.stopPropagation(),n()},p.appendChild(k);var v=0;if(p.addEventListener("touchstart",function(w){v=w.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(w){var L=v-w.changedTouches[0].clientX;if(!(Math.abs(L)<50)){if(L>0){if(x)ge(e,r,c+1,t,a,n,!0,"next",o);else if(g){var E=t[r+1];ge(E,r+1,0,t,a,n,!1,"next",o)}}else if(u)ge(e,r,c-1,t,a,n,!0,"prev",o);else if(b){var S=t[r-1],R=(S.images||[]).filter(function(I){return I&&(I.indexOf("https://")===0||I.indexOf("data:image/")===0)});ge(S,r-1,R.length-1,t,a,n,!1,"prev",o)}}},{passive:!0}),s.length>1){var f=document.createElement("div");f.className="ikr-modal-thumbs",s.forEach(function(w,L){var E=document.createElement("img");E.src=J(w),E.className="ikr-modal-thumb"+(L===c?" ikr-modal-thumb-active":""),E.alt="K\xFC\xE7\xFCk resim "+(L+1),(function(S){E.onclick=function(){ge(e,r,S,t,a,n,!0,null,o)}})(L),f.appendChild(E)}),p.appendChild(f)}var u=c>0,x=c<s.length-1,b=r>0,g=r<t.length-1,h=u||b,C=x||g;if(h||C){var z=document.createElement("button");z.className="ikr-modal-nav ikr-modal-nav-prev",z.innerHTML="&#8249;",z.setAttribute("aria-label","\xD6nceki"),z.style.opacity=h?"1":"0.3",z.onclick=function(w){if(w.stopPropagation(),u)ge(e,r,c-1,t,a,n,!0,"prev",o);else if(b){var L=t[r-1],E=(L.images||[]).filter(function(S){return S&&S.indexOf("https://")===0});ge(L,r-1,E.length-1,t,a,n,!1,"prev",o)}},p.appendChild(z);var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-next",y.innerHTML="&#8250;",y.setAttribute("aria-label","Sonraki"),y.style.opacity=C?"1":"0.3",y.onclick=function(w){if(w.stopPropagation(),x)ge(e,r,c+1,t,a,n,!0,"next",o);else if(g){var L=t[r+1];ge(L,r+1,0,t,a,n,!1,"next",o)}},p.appendChild(y)}return p}function Xr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=J(a[0]))}})}function ge(e,r,i,t,a,n,d,o,s){if(d){var c=fr(e,r,i,t,a,n,o,s);a.firstChild&&a.replaceChild(c,a.firstChild)}else{var c=fr(e,r,i,t,a,n,o,s),p=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(c,a.firstChild),p&&Ji(p,e);var m=s&&s.querySelector(".ikr-modal-wrap");m&&(m.scrollTop=0)}Xr(r,t)}function le(e,r,i){var t=(i||[]).filter(function(u){return u.images&&Array.isArray(u.images)&&u.images.some(function(x){return x&&(x.indexOf("https://")===0||x.indexOf("data:image/")===0)})}),a=t.findIndex(function(u){return u===e||u.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(u){return u&&(u.indexOf("https://")===0||u.indexOf("data:image/")===0)}):[],d=Math.max(0,n.indexOf(r)),o=document.createElement("div");o.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var c=!1;function p(){c||(c=!0,Wr(o,m,p))}function m(u){u.key==="Escape"&&l()}function l(){c||(c=!0,history.go(-1),Wr(o,m,p))}document.addEventListener("keydown",m);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",p),o.onclick=function(){l()},s.onclick=function(u){u.stopPropagation()},s.appendChild(fr(e,a,d,t,s,l,null,o)),s.appendChild(Xi(e)),Xr(a,t);var v=document.createElement("div");v.className="ikr-modal-wrap",v.appendChild(s);var f=document.createElement("button");f.className="ikr-modal-close",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(u){u.stopPropagation(),l()},v.appendChild(f),o.appendChild(v),document.body.appendChild(o)}function Jr(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),d=i.querySelector("#ikr-comment-counter");function o(){var f=n.value.length;d.textContent=f+"/2000",d.classList.toggle("ikr-char-counter--max",f>=2e3)}n.addEventListener("input",o);var s=Zr(0,!0,function(f){t=f},A);i.querySelector("#ikr-stars-input").appendChild(s);var c=i.querySelector("#ikr-file-input"),p=i.querySelector("#ikr-photo-previews"),m=!1,l=i.querySelector("label.ikr-photo-btn"),k=3;function v(){var f=a.length;f>=k?(c.disabled=!0,l&&(l.style.opacity="0.4")):(c.disabled=!1,l&&(l.style.opacity="1"))}return c.onchange=async function(f){if(!m){m=!0,c.disabled=!0;var u=k-a.length,x=Array.from(f.target.files).slice(0,u);for(let g=0;g<x.length;g++){let h=x[g];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let C=document.createElement("div");C.className="ikr-preview-item";let z=URL.createObjectURL(h);C.innerHTML='<img class="ikr-preview-img" src="'+z+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',p.appendChild(C);let y=C.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(z),y.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){y.style.opacity="0",y.style.transition="opacity 0.4s",setTimeout(function(){y.style.display="none";let w=document.createElement("button");w.className="ikr-preview-remove",w.innerHTML="&#x2715;",w.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),w.onclick=function(){a=a.filter(function(L){return L!==z}),C.remove(),v()},C.appendChild(w)},400)},800);continue}try{let w=await G(Y+"/api/public/upload/sign",{method:"POST"});if(!w.ok)throw w.status===429?new Error("rate_limit"):new Error("sign failed");let L=await w.json(),E=new FormData;E.append("file",h),E.append("api_key",L.api_key),E.append("timestamp",L.timestamp),E.append("signature",L.signature),E.append("folder","review_images");let R=await(await fetch("https://api.cloudinary.com/v1_1/"+L.cloud_name+"/image/upload",{method:"POST",body:E})).json();if(R.secure_url){let I=R.secure_url;a.push(I),y.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){y.style.opacity="0",y.style.transition="opacity 0.4s",setTimeout(function(){y.style.display="none";let _=document.createElement("button");_.className="ikr-preview-remove",_.innerHTML="&#x2715;",_.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),_.onclick=function(){a=a.filter(function($){return $!==I}),C.remove(),v()},C.appendChild(_)},400)},800)}}catch(w){console.error("[ikr] Image upload failed:",w);var b=w.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";y.innerHTML='<span class="ikr-upload-error">\u2717 '+b+"</span>"}}m=!1,c.value="",v()}},i.querySelector("#ikr-submit").onclick=async function(){var f=this,u=i.querySelector("#ikr-name").value.trim(),x=i.querySelector("#ikr-title").value.trim(),b=i.querySelector("#ikr-comment").value.trim(),g=i.querySelector("#ikr-msg");if(!t){g.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!u){g.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(f.disabled=!0,f.textContent="G\xF6nderiliyor\u2026",g.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=O(window.location.href),C=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),z=await G(Y+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:e,slug:h||null,productName:C,author:u,title:x||null,comment:b,rating:t,images:a})},15e3);if(z.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var y=await z.json().catch(function(){return{}});throw new Error(y.error||"Yorum kaydedilemedi.")}}catch(S){var w=S&&(S.name==="AbortError"||/signal/i.test(S.message||"")),L=w?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":S.message||"Yorum g\xF6nderilemedi.",E=document.createElement("div");E.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",E.textContent=L,g.innerHTML="",g.appendChild(E),f.disabled=!1,f.textContent="G\xF6nder"}},i}function $r(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var Qr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function $i(e,r,i,t,a){var n=Ye(r,i),d="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+oe(e,n,{sizeStyle:d})+"</span>"}function ei(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var d=document.createElement("script");d.id="ikr-jsonld",d.type="application/ld+json",d.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(d);var o=$r(i);if(!(!o||!o.parentNode)){var s=t&&t.icon||"star",c=t&&t.iconStyle||"classic",p=t&&t.size||"medium",m=t&&t.color||"#f59e0b",l=Qr[p]||Qr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var v=window.getComputedStyle(o).textAlign,f=v==="center"?"center":v==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+f+";",k.innerHTML=$i(e,s,c,m,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(u){u.preventDefault();var x=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(x){var b=document.querySelector("header"),g=b?b.getBoundingClientRect().height:0,h=x.getBoundingClientRect().top+window.pageYOffset-g-16;window.scrollTo({top:h,behavior:"smooth"})}},o.parentNode.insertBefore(k,o.nextSibling)}}}var ri=`
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
`;var gr={};xe(gr,{meta:()=>ct,render:()=>pt});function Ae(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var s=r[o-1]||0,c=i>0?Math.round(s/i*100):0,p=a===o,m=document.createElement("div");m.className="ikr-bar-row"+(p?" ikr-bar-active":""),a&&!p&&(m.style.opacity="0.35");for(var l="",k=1;k<=5;k++){var v=k<=o;l+='<span class="ikr-bar-star ikr-icon '+(v?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(v?t.filled:t.empty)+"</span>"}m.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(f){m.onclick=function(){n(f)}})(o),d.appendChild(m)}return d}var de=[],ii=!1;function Qi(e){for(var r=de.length-1;r>=0;r--){var i=de[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function et(e){if(e.key==="Escape")for(var r=de.length-1;r>=0;r--)de[r].close()}function rt(){ii||typeof document=="undefined"||(document.addEventListener("click",Qi,!0),document.addEventListener("keydown",et),ii=!0)}function Qe(e){for(var r=0;r<de.length;r++)de[r]!==e&&de[r].close()}function er(e){rt();var r={trigger:e.trigger,element:e.element,close:e.close};return de.push(r),function(){var t=de.indexOf(r);t!==-1&&de.splice(t,1)}}function se(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,d=document.createElement("div");d.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent="Yorum Yap",o.onclick=a,d.appendChild(o);var s=document.createElement("div");s.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var p=A&&A.filterIcon||"lines";c.innerHTML=Ur(p);var m=document.createElement("div");m.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){m.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function v(){Qe(f),m.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}l.forEach(function(u){var x=u[2],b=x?t:!t&&(i||"newest")===u[0],g=document.createElement("div");g.className="ikr-filter-item"+(b?" ikr-filter-item-active":""),g.textContent=u[1],g.onclick=function(){k(),n(u[0],x)},m.appendChild(g)}),c.onclick=function(){m.classList.contains("ikr-open")?k():v()};var f=er({trigger:s,element:m,close:k});return s.appendChild(c),s.appendChild(m),d.appendChild(s),d}function ti(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");var a=document.createElement("div");a.className="ikr-fwizard",t.appendChild(a);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-content",a.appendChild(d);var o=!1,s="",c="";function p(){var u=window.innerWidth-document.documentElement.clientWidth;s=document.body.style.overflow,c=document.body.style.paddingRight,document.body.style.overflow="hidden",u>0&&(document.body.style.paddingRight=u+"px")}function m(){document.body.style.overflow=s,document.body.style.paddingRight=c}function l(){o||(o=!0,document.removeEventListener("keydown",k),t.removeEventListener("click",v),n.removeEventListener("click",l),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),m();try{r()}catch(u){}},200))}function k(u){u.key==="Escape"&&l()}function v(u){u.target===t&&i&&l()}document.addEventListener("keydown",k),t.addEventListener("click",v),n.addEventListener("click",l);function f(u){u&&d.appendChild(u),document.body.appendChild(t),p(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open")})}return{open:f,close:l,content:d,setAllowOutsideClose:function(u){i=!!u},setStepAttr:function(u){a.setAttribute("data-step",String(u))}}}var ai=`
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
    animation:ikrStepEnter 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    will-change:transform, opacity;
  }
  .ikr-fwizard-step--exit{
    animation:ikrStepExit 0.35s cubic-bezier(0.4, 0, 1, 1) forwards;
    will-change:transform, opacity;
  }
  @keyframes ikrStepEnter{
    0%   { opacity:0; transform:translateY(30px) scale(0.95); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes ikrStepExit{
    0%   { opacity:1; transform:translateY(0) scale(1); }
    100% { opacity:0; transform:translateY(-20px) scale(0.98); }
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
    font-size:14px;
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
    resize:vertical;
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
    padding:16px 12px;
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
      padding:12px 20px;
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
      width:40px;
      height:40px;
    }
    .ikr-fwizard-stars{
      gap:6px;
    }
  }
`;var vr=4;function ni(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(a){try{a(i)}catch(n){}})}return{get:function(){return i},set:function(a){Object.assign(i,a),t()},goNext:function(){i.currentStep<vr&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(a){return r.push(a),function(){r=r.filter(function(n){return n!==a})}}}}var it='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function oi(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},a=e.onSkip||function(){},n=e.onNext||function(){},d=document.createElement("div");d.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=it+"<span>Geri</span>",o.addEventListener("click",function(){t()}),d.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-footer-progress";for(var c=[],p=0;p<vr;p++){var m=document.createElement("span");m.className="ikr-fwizard-progress-seg",s.appendChild(m),c.push(m)}d.appendChild(s);var l=document.createElement("button");l.type="button";var k=null;function v(u){k&&l.removeEventListener("click",k),k=u,u&&l.addEventListener("click",u)}d.appendChild(l);function f(u,x){var b=r.indexOf(u)!==-1,g=i.indexOf(u)!==-1,h=x&&x.images&&x.images.length>0;b?(u===2&&h?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",v(function(){n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",v(function(){a()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0):g?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0,v(function(){l.disabled||n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,v(null))}return{el:d,update:function(u,x){c.forEach(function(g,h){h+1<=u?g.classList.add("ikr-fwizard-progress-seg-active"):g.classList.remove("ikr-fwizard-progress-seg-active")});var b=u<=1;o.style.visibility=b?"hidden":"",o.style.pointerEvents=b?"none":"",o.tabIndex=b?-1:0,f(u,x)},setNextDisabled:function(u){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!u,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!u))},setThanksState:function(u){o.style.visibility="hidden",s.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),v(u)}}}function li(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var t=document.createElement("div");t.className="ikr-fwizard-step-title",t.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(t);var a=document.createElement("div");a.className="ikr-fwizard-stars",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var n=Ee(A||{}),d=[];function o(c){d.forEach(function(p,m){var l=m<c;p.classList.toggle("ikr-fwizard-star-active",l),p.innerHTML=l?n.filled:n.empty})}for(var s=1;s<=5;s++)(function(c){var p=document.createElement("button");p.type="button",p.className="ikr-fwizard-star",p.setAttribute("role","radio"),p.setAttribute("aria-label",c+" y\u0131ld\u0131z"),p.innerHTML=n.empty,p.addEventListener("mouseenter",function(){o(c)}),p.addEventListener("mouseleave",function(){o(e.get().rating)}),p.addEventListener("click",function(){e.set({rating:c}),o(c),setTimeout(function(){var m=!r.canNavigate||r.canNavigate();m&&e.goNext()},280)}),d.push(p),a.appendChild(p)})(s);return o(e.get().rating),i.appendChild(a),{el:i,destroy:function(){}}}var di=3,tt=5*1024*1024;function si(e,r){r=r||{};var i=!1,t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-photos";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",t.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",t.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-photo-card";var o=document.createElement("label");o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",o.appendChild(s),d.appendChild(o);var c=document.createElement("div");c.className="ikr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),d.appendChild(c),t.appendChild(d);var p=r.blobMap||{};function m(){if(!i){for(var b=e.get().images||[],g=e.get().pendingImages||[],h=b.map(function(y){return{url:y,isPending:!1}}).concat(g.map(function(y){return{url:y.url,isPending:!0,error:y.error}})),C=Array.from(c.children);C.length>h.length;){var z=C.pop();c.removeChild(z)}h.forEach(function(y,w){var L=p[y.url]||y.url;if(C[w])k(C[w],y,L);else{var E=l(y,L);c.appendChild(E)}}),u()}}function l(b,g){var h=document.createElement("div");h.className="ikr-fwizard-photo-thumb",h.innerHTML='<img src="'+g+'" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';var C=document.createElement("div");C.className="ikr-fwizard-photo-loading",C.style.display="none",h.appendChild(C);var z=document.createElement("button");return z.type="button",z.className="ikr-fwizard-photo-remove",z.innerHTML="&#x2715;",h.appendChild(z),k(h,b,g),h}function k(b,g,h){var C=b.querySelector("img");C.src!==h&&(C.src=h);var z=b.querySelector(".ikr-fwizard-photo-loading");g.isPending&&g.error?(z.style.display="flex",z.innerHTML='<span class="ikr-upload-error">\u2717 '+g.error+"</span>"):z.style.display="none";var y=b.querySelector(".ikr-fwizard-photo-remove");y.onclick=function(){if(g.url.startsWith("blob:")&&URL.revokeObjectURL(g.url),g.isPending){var w=(e.get().pendingImages||[]).filter(function(E){return E.url!==g.url});e.set({pendingImages:w})}else{var L=(e.get().images||[]).filter(function(E){return E!==g.url});e.set({images:L})}}}var v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',f='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function u(){var b=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,h=b+g,C=h>=di,z=g>0;h>0?(d.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=f):(d.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=v+"<span>Foto\u011Fraf Ekle</span>"),C?(o.style.display="none",s.disabled=!0):(o.style.display="flex",s.disabled=z,o.classList.toggle("ikr-fwizard-photo-add--disabled",z),o.appendChild(s))}s.onchange=async function(b){var g=(e.get().pendingImages||[]).length;if(!(g>0)){var h=e.get().images||[],C=h.length,z=di-h.length,y=Array.from(b.target.files).slice(0,z);if(y.length!==0){for(var w=[],L=[],E=0;E<y.length;E++){var S=y[E];if(S.size>tt){alert(S.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}var R=URL.createObjectURL(S);w.push({url:R,file:S,error:null}),L.push({url:R,file:S})}if(w.length!==0){var I=(e.get().pendingImages||[]).concat(w),_=async function(){for(var Q=0;Q<L.length;Q++){var re=L[Q],be=re.file,j=re.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var U=(e.get().pendingImages||[]).filter(function(q){return q.url!==j}),V=(e.get().images||[]).slice();V.push(j),e.set({pendingImages:U,images:V});continue}try{var ie=await G(Y+"/api/public/upload/sign",{method:"POST"});if(!ie.ok)throw ie.status===429?new Error("rate_limit"):new Error("sign failed");var ce=await ie.json(),K=new FormData;K.append("file",be),K.append("api_key",ce.api_key),K.append("timestamp",ce.timestamp),K.append("signature",ce.signature),K.append("folder","review_images");var _e=await fetch("https://api.cloudinary.com/v1_1/"+ce.cloud_name+"/image/upload",{method:"POST",body:K}),pe=await _e.json();if(pe.secure_url){p[pe.secure_url]=j;var Re=(e.get().pendingImages||[]).filter(function(q){return q.url!==j}),te=(e.get().images||[]).slice();te.push(pe.secure_url),e.set({pendingImages:Re,images:te})}}catch(q){console.error("[ikr] Image upload failed:",q);var Te=q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.",me=(e.get().pendingImages||[]).map(function(X){return X.url===j?{url:X.url,file:X.file,error:Te}:X});e.set({pendingImages:me})}}};if(C===0){i=!0;var $=!r.canNavigate||r.canNavigate();$&&e.goNext()}e.set({pendingImages:I}),_(),s.value=""}}}};var x=e.onChange(m);return m(),{el:t,destroy:function(){i=!0,s.onchange=null,x&&x()}}}var kr=2e3,at=60;function ci(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",t.appendChild(a);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var d=document.createElement("input");d.type="text",d.className="ikr-fwizard-input",d.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",d.maxLength=at,d.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),d.value=e.get().title||"",d.addEventListener("input",function(){e.set({title:d.value})}),n.appendChild(d);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=kr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",n.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-char-counter",s.setAttribute("aria-live","polite"),n.appendChild(s);function c(){var m=o.value.length;s.textContent=m+"/"+kr,s.classList.toggle("ikr-fwizard-char-counter--max",m>=kr)}function p(){return o.value.trim().length>0}return o.addEventListener("input",function(){e.set({comment:o.value}),c(),i(p())}),t.appendChild(n),c(),setTimeout(function(){i(p())},0),{el:t,destroy:function(){}}}var nt=40;function pi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=r.onSuccess||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",a.appendChild(n);var d=document.createElement("div");d.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var s=document.createElement("label");s.className="ikr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.maxLength=nt,c.setAttribute("aria-required","true"),c.value=e.get().author||"",o.appendChild(s),o.appendChild(c),d.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-field";var m=document.createElement("label");m.className="ikr-fwizard-label",m.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",p.appendChild(m),p.appendChild(l),d.appendChild(p);var k=document.createElement("div");k.className="ikr-fwizard-notice",k.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",d.appendChild(k);var v=document.createElement("div");v.className="ikr-fwizard-msg",v.setAttribute("role","alert"),v.setAttribute("aria-live","assertive"),d.appendChild(v);var f=document.createElement("button");f.type="button",f.className="ikr-fwizard-submit-btn",f.textContent="G\xF6nder",d.appendChild(f),a.appendChild(d);function u(){return c.value.trim().length>0}function x(){var g=!u(),h=(e.get().pendingImages||[]).length,C=h>0;C?(f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled"),f.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(f.disabled=g,f.classList.toggle("ikr-fwizard-submit-btn--disabled",g),f.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),x(),i(u())}),l.addEventListener("input",function(){e.set({email:l.value})}),x(),setTimeout(function(){i(u())},0),f.onclick=async function(){if(!f.disabled){var g=e.get(),h=(g.author||"").trim(),C=(g.comment||"").trim();if(!h){v.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(!g.rating){v.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled");var z=f.textContent;if(f.textContent="G\xF6nderiliyor\u2026",v.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t()},600);return}try{var y=O(window.location.href),w=g.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),L=await G(Y+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:g.productId||null,slug:y||null,productName:w,author:h,title:(g.title||"").trim()||null,comment:C||null,rating:g.rating,images:g.images||[]})},15e3);if(L.ok)t();else{var E=await L.json().catch(function(){return{}});throw new Error(E.error||"Yorum kaydedilemedi.")}}catch(I){var S=I&&(I.name==="AbortError"||/signal/i.test(I.message||"")),R=S?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":I.message||"Yorum g\xF6nderilemedi.";v.innerHTML='<div class="ikr-fwizard-msg-error">'+R+"</div>",f.disabled=!1,f.classList.remove("ikr-fwizard-submit-btn--disabled"),f.textContent=z}}};var b=e.onChange(x);return{el:a,destroy:function(){f.onclick=null,b&&b()}}}var mi=!1;function ot(){if(!mi){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ai,document.head.appendChild(e),mi=!0}}function lt(e,r,i){if(i=i||{},e===1)return li(r,{canNavigate:i.canNavigate});if(e===2)return si(r,{canNavigate:i.canNavigate,blobMap:i.blobMap});if(e===3)return ci(r,{onValidityChange:i.onValidityChange});if(e===4)return pi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:t,destroy:function(){}}}function dt(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function ui(e){e=e||{},ot();var r=ni({productId:e.productId,productName:e.productName}),i={},t=ti({onClose:function(){Object.keys(i).forEach(function(f){var u=i[f];u&&u.startsWith("blob:")&&URL.revokeObjectURL(u)}),e.onClose&&e.onClose()},allowOutsideClose:!0}),a=document.createElement("div");a.className="ikr-fwizard-step-wrap";var n=oi({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),d=document.createElement("div");d.className="ikr-fwizard-layout",d.appendChild(a),d.appendChild(n.el);var o=null,s="idle",c=null,p=!0;function m(f,u){a.innerHTML="";var x=lt(f,r,{canNavigate:function(){return s==="idle"},blobMap:i,onValidityChange:function(h){n.setNextDisabled(!h)},onSuccess:l});if(o=x,n.update(f,r.get()),u){s="entering",x.el.classList.add("ikr-fwizard-step--enter");var b=null,g=function(){b&&clearTimeout(b),x.el.removeEventListener("animationend",g),x.el.classList.remove("ikr-fwizard-step--enter"),s="idle",c!==null&&k()};x.el.addEventListener("animationend",g),b=setTimeout(g,550)}else s="idle";a.appendChild(x.el),t.setStepAttr&&t.setStepAttr(f),f===3&&n.setNextDisabled(!0)}function l(){o&&o.destroy&&o.destroy(),o=null,s="idle",c=null,a.innerHTML="",a.appendChild(dt()),t.setStepAttr("thanks"),n.setThanksState(t.close)}function k(){var f=r.get().currentStep;if(s!=="idle"){c=f;return}if(!o){var u=!p;p=!1,m(f,u);return}var x=o;s="exiting",x.el.classList.add("ikr-fwizard-step--exit");var b=null,g=function(){if(b&&clearTimeout(b),x.el.removeEventListener("animationend",g),x.destroy)try{x.destroy()}catch(C){}if(o===x){a.innerHTML="",o=null;var h=c!==null?c:r.get().currentStep;c=null,m(h,!0)}};x.el.addEventListener("animationend",g),b=setTimeout(g,450)}k();var v=r.get().currentStep;return r.onChange(function(f){f.currentStep!==v?(v=f.currentStep,k()):n.update(f.currentStep,f)}),t.open(d),{close:t.close}}function st(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}function W(){var e=A&&A.reviewFormStyle||"accordion";if(e==="modal"){ui({productId:ee||"",productName:ye||""});return}st()}var ct={id:"classic",name:"Klasik (A\xE7\u0131k)"};function pt(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,d=e.ratingCounts,o=e.avgRatingVal,s=e.currentRatingFilter,c=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,l=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var v=(d[3]||0)+(d[4]||0),f=n>0?Math.round(v/n*100):0,u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+o+"</span>",k.appendChild(u);var x=document.createElement("div");if(x.className="ikr-summary-block ikr-summary-count",x.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(x),t.showRecommendation!==!1&&f>0){var b=document.createElement("div");b.className="ikr-summary-block ikr-summary-recommend",b.innerHTML='<span class="ikr-recommend-pct">%'+f+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(b)}return k.appendChild(Ae({ratingCounts:d,allCount:n,iconPair:a,currentRatingFilter:s,onFilterChange:m})),k.appendChild(se({widget:r,currentOrderBy:c,currentHasImages:p,onWriteClick:W,onSortChange:l})),k}var hr={};xe(hr,{css:()=>ut,meta:()=>mt,render:()=>ft});var fi=`
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
`;var mt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},ut=fi;function ft(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var v=document.createElement("div");v.className="ikr-compact-trigger-wrap";var f=document.createElement("button");f.className="ikr-compact-trigger",f.type="button",f.setAttribute("aria-expanded","false"),f.innerHTML='<span class="ikr-compact-trigger-stars">'+oe(d,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',v.appendChild(f),k.appendChild(v);var u=se({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:W,onSortChange:m}),x=u.querySelector(".ikr-filter-wrap"),b=u.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-compact-actions-slot",b&&g.appendChild(b),x&&g.appendChild(x),k.appendChild(g),l.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="ikr-compact-panel-inner";var z=document.createElement("div");z.className="ikr-compact-avg",z.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+d+"</span>",C.appendChild(z),C.appendChild(Ae({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:p})),h.appendChild(C);var y=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function w(U){var V=U?l:v;h.parentNode!==V&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")),V.appendChild(h))}if(w(y?y.matches:!1),y){var L=function(U){w(U.matches)};y.addEventListener?y.addEventListener("change",L):y.addListener&&y.addListener(L)}if(b){var E=document.createElement("button");E.className="ikr-write-btn",E.textContent="Yorum Yap",E.onclick=W;var S=document.createElement("div");S.className="ikr-compact-write-row",S.appendChild(E),l.appendChild(S)}function R(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")}function I(){Qe(_),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),f.setAttribute("aria-expanded","true")}f.onclick=function(){h.classList.contains("ikr-open")?R():I()};var _=null;function $(U){_&&(_(),_=null),U||(_=er({trigger:v,element:h,close:R}))}if($(y?y.matches:!1),y){var Q=function(U){$(U.matches)};y.addEventListener?y.addEventListener("change",Q):y.addListener&&y.addListener(Q)}if(i.showRecommendation!==!1){var re=(n[3]||0)+(n[4]||0),be=a>0?Math.round(re/a*100):0;if(be>0){var j=document.createElement("div");j.className="ikr-summary-block ikr-summary-recommend",j.style.marginTop="8px",j.innerHTML='<span class="ikr-recommend-pct">%'+be+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",C.appendChild(j)}}return l}var br={};xe(br,{css:()=>kt,meta:()=>vt,render:()=>gt});var vi=`
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
`;var vt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},kt=vi;function gt(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,c=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+d+"</span>",k.appendChild(v);var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-count ikr-split-left-count",f.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(f),l.appendChild(k);var u=document.createElement("div");u.className="ikr-split-col ikr-split-mid",u.appendChild(Ae({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:o,onFilterChange:p})),l.appendChild(u);var x=se({widget:r,currentOrderBy:s,currentHasImages:c,onWriteClick:W,onSortChange:m}),b=x.querySelector(".ikr-filter-wrap"),g=x.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-split-col ikr-split-right",g&&h.appendChild(g),b&&h.appendChild(b),l.appendChild(h),i.showRecommendation!==!1){var C=(n[3]||0)+(n[4]||0),z=a>0?Math.round(C/a*100):0;if(z>0){var y=document.createElement("div");y.className="ikr-summary-block ikr-summary-recommend",y.innerHTML='<span class="ikr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(y)}}return l}var xr={};xe(xr,{css:()=>bt,meta:()=>ht,render:()=>xt});var ki=`
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
`;var ht={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1}},bt=ki;function xt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var p=document.createElement("div");p.className="ikr-minimal-row";var m=document.createElement("span");m.className="ikr-minimal-avg",m.textContent=a,p.appendChild(m);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=oe(a,i),p.appendChild(l);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",p.appendChild(k),c.appendChild(p),s.appendChild(c);var v=se({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:W,onSortChange:o}),f=v.querySelector(".ikr-filter-wrap"),u=v.querySelector(".ikr-write-btn"),x=document.createElement("div");if(x.className="ikr-minimal-actions",u&&x.appendChild(u),f&&x.appendChild(f),s.appendChild(x),u){var b=document.createElement("button");b.className="ikr-write-btn",b.textContent="Yorum Yap",b.onclick=W;var g=document.createElement("div");g.className="ikr-minimal-write-row",g.appendChild(b),s.appendChild(g)}return s}var yr={};xe(yr,{css:()=>wt,meta:()=>yt,render:()=>zt});var gi=`
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
`;var yt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1}},wt=gi;function zt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=a,c.appendChild(p);var m=document.createElement("div");m.className="ikr-hero-meta";var l=document.createElement("span");l.className="ikr-hero-stars",l.innerHTML=oe(a,i),m.appendChild(l);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),c.appendChild(m),s.appendChild(c);var v=se({widget:r,currentOrderBy:n,currentHasImages:d,onWriteClick:W,onSortChange:o}),f=v.querySelector(".ikr-filter-wrap"),u=v.querySelector(".ikr-write-btn"),x=document.createElement("div");if(x.className="ikr-hero-actions",u&&x.appendChild(u),f&&x.appendChild(f),s.appendChild(x),u){var b=document.createElement("button");b.className="ikr-write-btn",b.textContent="Yorum Yap",b.onclick=W;var g=document.createElement("div");g.className="ikr-hero-write-row",g.appendChild(b),s.appendChild(g)}return s}var rr={classic:gr,compact:hr,split:br,minimal:xr,hero:yr};function ir(e){return rr[e]||rr.classic}function hi(){return Object.keys(rr).map(function(e){return rr[e].css||""}).join(`
`)}var wr={};xe(wr,{css:()=>St,meta:()=>Ct,render:()=>Et});function Ne(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var d=document.createElement("span");return d.className="ikr-read-more ikr-reply-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",i.appendChild(d),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(d.style.display="inline",typeof r=="function")d.onclick=r;else{var o=!1;d.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),d.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var Ct={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},St="";function Et(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ve(e.rating,A),a.appendChild(n);var d=document.createElement("span");if(d.className="ikr-date",d.textContent=ke(e.createdAt),t.appendChild(a),t.appendChild(d),i.appendChild(t),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,i.appendChild(o)}var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",i.appendChild(s);var c=(e.comment||"").trim();if(c){var p=document.createElement("div");p.className="ikr-body ikr-body-clamped",p.textContent=c,i.appendChild(p);var m=document.createElement("span");m.className="ikr-read-more",m.textContent="Devam\u0131n\u0131 oku",m.style.display="none",i.appendChild(m),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){m.style.display="inline";var v=!1;m.onclick=function(){v=!v,p.classList.toggle("ikr-body-clamped",!v),m.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var l=document.createElement("div");l.className="ikr-gallery",e.images.forEach(function(v){if(!(!v||v.indexOf("https://")!==0&&v.indexOf("data:image/")!==0)){var f=document.createElement("img");f.src=J(v),f.className="ikr-img",f.setAttribute("data-ikr-img-url",v),(function(u){f.onclick=function(){le(e,u,r)}})(v),l.appendChild(f)}}),i.appendChild(l)}var k=Ne(e.merchantReply);return k&&i.appendChild(k),i}var zr={};xe(zr,{css:()=>Lt,meta:()=>Tt,render:()=>At});var bi=`
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
`;var Tt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"90px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"120px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},Lt=bi;function At(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ve(e.rating,A),a.appendChild(n);var d=document.createElement("span");d.className="ikr-review-list-author-name",d.textContent=e.author||"",a.appendChild(d);var o=document.createElement("span");o.className="ikr-date ikr-review-list-author-date",o.textContent=ke(e.createdAt),a.appendChild(o),t.appendChild(a);var s=document.createElement("div");if(s.className="ikr-review-list-content",e.title){var c=document.createElement("div");c.className="ikr-review-list-title",c.textContent=e.title,s.appendChild(c)}var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-review-list-body ikr-body-clamped",m.textContent=p,s.appendChild(m);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",s.appendChild(l),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){l.style.display="inline";var f=!1;l.onclick=function(){f=!f,m.classList.toggle("ikr-body-clamped",!f),l.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Ne(e.merchantReply);if(k&&s.appendChild(k),t.appendChild(s),i){var v=document.createElement("div");v.className="ikr-review-list-media",e.images.forEach(function(f){if(!(!f||f.indexOf("https://")!==0&&f.indexOf("data:image/")!==0)){var u=document.createElement("img");u.src=J(f),u.setAttribute("data-ikr-img-url",f),(function(x){u.onclick=function(){le(e,x,r)}})(f),v.appendChild(u)}}),t.appendChild(v)}return t}var Cr={};xe(Cr,{css:()=>Bt,meta:()=>Nt,render:()=>It});var xi=`
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
`;var Nt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"120px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Bt=xi;function It(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=ve(e.rating,A),a.appendChild(n),e.title){var d=document.createElement("div");d.className="ikr-review-gallery-title",d.textContent=e.title,a.appendChild(d)}var o=document.createElement("div");o.className="ikr-review-gallery-author",o.textContent=e.author||"",a.appendChild(o);var s=document.createElement("div");s.className="ikr-review-gallery-date",s.textContent=ke(e.createdAt),a.appendChild(s);var c=(e.comment||"").trim();if(c){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=c,a.appendChild(p);var m=document.createElement("span");m.className="ikr-read-more",m.textContent="Devam\u0131n\u0131 oku",m.style.display="none",m.style.cursor="pointer",m.onclick=function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;le(e,u,r)},a.appendChild(m),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(m.style.display="inline")})}if(t.appendChild(a),i){var l=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var v=document.createElement("img");v.src=J(l),v.loading="lazy",v.setAttribute("data-ikr-img-url",l),v.onclick=function(){le(e,l,r)},k.appendChild(v),t.appendChild(k)}var f=Ne(e.merchantReply,function(){var u=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;le(e,u,r)});return f&&(f.classList.add("ikr-review-gallery-reply"),t.appendChild(f)),t}var tr={card:wr,list:zr,gallery:Cr};function ar(e){return tr[e]||tr.card}function yi(){return Object.keys(tr).map(function(e){return tr[e].css||""}).join(`
`)}function F(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var wi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},zi={small:80,medium:110,large:140};function _t(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",d=r.widgetBgColor||i,o=r.widgetBorderColor||"transparent",s=r.separatorColor||F(t,.08),c=r.headerTitleColor||t,p=r.headerAvgColor||t,m=r.headerCountColor||t,l=r.headerRecommendColor||t,k=r.barLabelColor||t,v=r.barFillColor||t,f=r.barTrackColor||F(t,.1),u=r.barCountColor||t,x=r.barHoverBgColor||F(t,.05),b=r.primaryColor||"#111111",g=r.primaryTextColor||"#ffffff",h=r.btnBgColor||b,C=r.btnTextColor||g,z=r.btnBorderColor||b,y=r.filterBtnBgColor||b,w=r.filterBtnTextColor||g,L=r.filterBtnBorderColor||b,E=r.filterMenuBgColor||i,S=r.filterMenuBorderColor||F(t,.12),R=r.filterItemTextColor||t,I=r.filterItemHoverBgColor||F(b,.07),_=r.filterItemActiveColor||b,$=r.reviewTitleColor||t,Q=r.reviewAuthorColor||t,re=r.reviewDateColor||t,be=r.reviewBodyColor||t,j=r.reviewBorderColor||F(t,.08),U=r.reviewStarColor||"#f59e0b",V=r.replyBgColor||a,ie=r.replyBorderColor||b,ce=r.replyLabelColor||t,K=r.replyTextColor||t,_e=r.photoBgColor||F(t,.03),pe=r.photoBorderColor||F(t,.1),Re=r.photoTitleColor||t,te=r.formBgColor||i,Te=r.formBorderColor||F(t,.08),me=r.inputBgColor||n,q=r.inputTextColor||t,X=r.inputBorderColor||F(t,.2),Me=r.placeholderColor||F(t,.35),lr=r.loadMoreBgColor||i,dr=r.loadMoreTextColor||t,Z=r.loadMoreBorderColor||F(t,.3),ue=r.modalBgColor||i,Br=r.modalTextColor||t,Pe=r.modalCloseBgColor||b,T=r.modalCloseTextColor||g,N=r.modalCloseBorderColor||b,M=r.modalNavBgColor||"rgba(0,0,0,0.45)",D=r.modalNavTextColor||"#ffffff",Oe=r.modalReplyBgColor||a,Di=r.modalReplyBorderColor||b,Ir={"--ikr-widget-bg":d,"--ikr-widget-border":o,"--ikr-separator":s,"--ikr-header-title":c,"--ikr-header-avg":p,"--ikr-header-count":m,"--ikr-header-recommend":l,"--ikr-bar-label":k,"--ikr-bar-fill":v,"--ikr-bar-track":f,"--ikr-bar-count":u,"--ikr-bar-hover-bg":x,"--ikr-btn-bg":h,"--ikr-btn-text":C,"--ikr-btn-border":z,"--ikr-filter-btn-bg":y,"--ikr-filter-btn-text":w,"--ikr-filter-btn-border":L,"--ikr-filter-menu-bg":E,"--ikr-filter-menu-border":S,"--ikr-filter-item-text":R,"--ikr-filter-item-hover-bg":I,"--ikr-filter-item-active":_,"--ikr-review-title":$,"--ikr-review-author":Q,"--ikr-review-date":re,"--ikr-review-body":be,"--ikr-review-border":j,"--ikr-review-star-color":U,"--ikr-reply-bg-color":V,"--ikr-reply-border":ie,"--ikr-reply-label":ce,"--ikr-reply-text":K,"--ikr-photo-bg":_e,"--ikr-photo-border":pe,"--ikr-photo-title":Re,"--ikr-form-bg":te,"--ikr-form-border":Te,"--ikr-input-bg-color":me,"--ikr-input-text-color":q,"--ikr-input-border":X,"--ikr-placeholder":Me,"--ikr-load-more-bg":lr,"--ikr-load-more-text":dr,"--ikr-load-more-border":Z,"--ikr-modal-bg":ue,"--ikr-modal-text":Br,"--ikr-modal-close-bg":Pe,"--ikr-modal-close-text":T,"--ikr-modal-close-border":N,"--ikr-modal-nav-bg":M,"--ikr-modal-nav-text":D,"--ikr-modal-reply-bg":Oe,"--ikr-modal-reply-border":Di,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":F(t,.45),"--ikr-border":F(t,.12),"--ikr-track-bg":F(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(Ir).forEach(function(_r){e.style.setProperty(_r,Ir[_r])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function he(e,r,i,t,a,n,d){if(ur){Ze({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:d});return}Ke(!0),Mr(e),Pr(r),d!==void 0&&Or(d),Hr(t),a&&Le(a),n&&Se(n),i!=null&&Fr(i);try{let Pe=function(T,N){if(!(!T||!T.meta||!T.meta.sizeOverrides)){var M=T.meta.sizeOverrides[N];M&&Object.keys(M).forEach(function(D){l.style.setProperty(D,M[D])})}};var Br=Pe,o=ir(r.summaryLayout),s=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),c=r.showTitle!==!1,p=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",m=s&&c?p:"",l=document.documentElement;_t(l,r);var k=r.primaryColor||"#111111",v=r.primaryTextColor||"#ffffff";Kr(k,ri+hi()+yi());var f=r.borderRadius!==void 0?r.borderRadius:8,u=wi[r.size]||wi.medium,x=zi[r.thumbnailSize]||zi.medium;l.style.setProperty("--ikr-title-size",u.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",u.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),l.style.setProperty("--ikr-color-text",v),l.style.setProperty("--ikr-radius",f+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),l.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),l.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",x+"px");var b=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",b),l.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),Pe(ir(r.summaryLayout),r.size),Pe(ar(r.reviewLayout),r.size);var g=Ee(r),h=document.getElementById("ikas-reviews");if(!h){var C=document.getElementById("ikas-reviews-anchor");if(!C)return;h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px",C.appendChild(h)}if(r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ke(!1);var z=Fe;Ze(null),z&&he(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var y=i||{},w=y.data&&y.data.reviews||[],L=y.data&&y.data.totalCount||0,E=h.cloneNode(!1);h.parentNode.replaceChild(E,h),h=E;var S=document.createElement("div");if(S.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),m){var R=document.createElement("div"),I=r.summaryLayout||"classic";R.className="ikr-title ikr-title-"+I,R.textContent=m,S.appendChild(R)}var _=y.data&&y.data.allCount||0,$=y.data&&y.data.ratingCounts||null,Q=$||[0,0,0,0,0],re=y.data&&y.data.avgRating||"0.0";if(!$&&w.length>0){w.forEach(function(T){T.rating>=1&&T.rating<=5&&Q[T.rating-1]++});var be=w.reduce(function(T,N){return T+N.rating},0);re=(be/w.length).toFixed(1)}if(_>0){var j=ir(r.summaryLayout),U=j.render({widget:S,data:y,settings:r,iconPair:g,allCount:_,ratingCounts:Q,avgRatingVal:re,currentRatingFilter:ze,currentOrderBy:ae,currentHasImages:Ce,onFilterChange:async function(T){Ve(ze===T?null:T),Se(1);var N=await Ge(ee,ae,1,ze,Ce);await he(ee,A,N,ye,ae,1)},onSortChange:async function(T,N){Se(1),N?(mr(!0),Le("newest")):(mr(!1),Le(T));var M=await Ge(ee,ae,1,ze,Ce);await he(ee,A,M,ye,ae,1)}});S.appendChild(U)}else{var V=document.createElement("button");V.className="ikr-write-btn",V.style.cssText="display:block;margin:16px auto 0;",V.textContent="Yorum Yap",V.onclick=function(){var T=document.getElementById("ikr-form-accordion");if(T){var N=T.style.maxHeight&&T.style.maxHeight!=="0px";N?(T.style.maxHeight="0px",T.style.opacity="0"):(T.style.maxHeight=T.scrollHeight+"px",T.style.opacity="1",setTimeout(function(){T.style.maxHeight="none"},360),setTimeout(function(){var M=document.querySelector("header"),D=M?M.getBoundingClientRect().height:0,Oe=T.getBoundingClientRect().top+window.pageYOffset-D-16;window.scrollTo({top:Oe,behavior:"smooth"})},50))}},S.appendChild(V)}var ie=document.createElement("div");ie.id="ikr-form-accordion",ie.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",ie.appendChild(Jr(e,t)),S.appendChild(ie);var ce=w.filter(function(T){return T.images&&Array.isArray(T.images)&&T.images.some(function(N){return N&&(N.indexOf("https://")===0||N.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!Ce&&ce.length>0){var K=document.createElement("div");if(K.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var _e=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",pe=document.createElement("div");pe.className="ikr-photo-title",pe.textContent=_e,K.appendChild(pe)}var Re=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",Re);var te=document.createElement("div");te.className="ikr-photo-strip";var Te=0;ce.forEach(function(T){if(!(Te>=10)){var N=T.images.find(function(D){return D&&(D.indexOf("https://")===0||D.indexOf("data:image/")===0)});if(N){var M=document.createElement("img");M.src=J(N),M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",(function(D,Oe){M.onclick=function(){le(Oe,D,w)}})(N,T),te.appendChild(M),Te++}}});var me=document.createElement("button");me.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",me.innerHTML="&#8249;",me.setAttribute("aria-label","\xD6nceki"),me.onclick=function(){te.scrollBy({left:-200,behavior:"smooth"})};var q=document.createElement("button");q.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",q.innerHTML="&#8250;",q.setAttribute("aria-label","Sonraki"),q.onclick=function(){te.scrollBy({left:200,behavior:"smooth"})};var X=document.createElement("div");X.className="ikr-photo-strip-wrap",X.appendChild(me),X.appendChild(te),X.appendChild(q),K.appendChild(X),S.appendChild(K)}if(w.length===0){var Me=document.createElement("p");Me.className="ikr-state-msg",Me.textContent="Hen\xFCz yorum yok.",S.appendChild(Me)}else{var lr=ar(r.reviewLayout);w.forEach(function(T){S.appendChild(lr.render(T,w))})}var dr=y.data&&y.data.hasMore;if(dr){var Z=document.createElement("button");Z.className="ikr-load-more",Z.textContent="Daha Fazla G\xF6ster",Z.onclick=async function(){Z.disabled=!0,Z.textContent="Y\xFCkleniyor...";var T=He+1,N=await Ge(ee,ae,T,ze,Ce);if(N&&N.data&&N.data.reviews){Se(T);var M=ar(A.reviewLayout);N.data.reviews.forEach(function(D){S.insertBefore(M.render(D,N.data.reviews),Z)}),N.data.hasMore?(Z.disabled=!1,Z.textContent="Daha Fazla G\xF6ster"):Z.remove()}else Z.remove()},S.appendChild(Z)}h.appendChild(S),ei(_>0?re:null,L,t,cr)}catch(T){console.error("[ikr] render error:",T),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ke(!1),Fe){var ue=Fe;Ze(null),he(ue.productId,ue.settings,ue.reviewsData,ue.productName,ue.orderBy,ue.page,ue.badgeSettings)}}}var we="ikr_settings_"+H,Rt=300*1e3,Mt=30*1e3;async function Er(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||Y,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(p){}var t=await G(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(p){}return null}var n=null,d=De(we);if(d)try{var o=JSON.parse(d);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<Mt)return null;P(we,"")}else if(o.v){if(Date.now()-o.t<Rt)return o.v;n=o.v,P(we,"")}else P(we,"");else P(we,"")}catch(p){P(we,"")}try{var s=await G(Y+"/api/public/settings?publicApiKey="+encodeURIComponent(H));if(!s.ok)return s.status===404&&P(we,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await s.json();return P(we,JSON.stringify({t:Date.now(),v:c})),c}catch(p){return console.error("[ikr] fetchSettings error:",p),n||null}}var Pt=60*1e3;async function Ge(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||Y,d=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),o=await G(d);if(o.ok)return await o.json()}catch(f){}return null}r=r||"newest",i=i||1;var s="ikr_reviews_"+H+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),c=null,p=De(s);if(p)try{var m=JSON.parse(p);if(m&&m.t!==void 0&&m.v){if(Date.now()-m.t<Pt)return m.v;c=m.v,P(s,"")}else P(s,"")}catch(f){P(s,"")}try{var l=Y+"/api/public/reviews?storeId="+encodeURIComponent(H)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await G(l);if(!k.ok)return c||null;var v=await k.json();return P(s,JSON.stringify({t:Date.now(),v})),v}catch(f){return console.error("[ikr] fetchReviews error:",f),c||null}}var Sr={};async function Be(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!Sr[e]){Sr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var d=await Er();if(!d)return;var o=d.widgets&&d.widgets.reviews||a,s=d.widgets&&d.widgets.badge||n;if(o.enabled===!1)return;Le("newest"),Se(1),Ve(null);var c=await Ge(e,"newest",1,null);await he(e,o,c,r,"newest",1,s)}catch(p){console.error("[ikr] bootstrap error:",p),await he(e,a,null,r,void 0,void 0,n)}finally{delete Sr[e]}}}function Tr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function Ci(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=O(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||$e.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(je).forEach(function(i){e[i]=je[i]}),e}var Ot=300*1e3,Si=50;async function Ei(e){var r="ikr_ratings_"+H,i={},t=De(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<Ot?i=a.v||{}:P(r,"")}catch(c){P(r,"")}var n=e.filter(function(c){return!i[c]});if(!n.length)return i;for(var d=[],o=0;o<n.length;o+=Si)d.push(n.slice(o,o+Si));var s=await Promise.all(d.map(function(c){var p=Y+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(H)+"&slugs="+c.map(encodeURIComponent).join(",");return G(p).then(function(m){return m.ok?m.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return s.forEach(function(c){n.forEach(function(p){i[p]||(i[p]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(p){i[p]=c[p]})}),P(r,JSON.stringify({t:Date.now(),v:i})),i}var Ht="var(--ikr-badge-color,#f59e0b)",Ti=13,Ft="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function jt(e){var r=Ye("star","classic"),i="width:"+Ti+"px;height:"+Ti+"px;";return'<span style="color:'+Ht+';display:inline-flex;align-items:center;">'+oe(e,r,{sizeStyle:i})+"</span>"}function Ue(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=Ft+"justify-content:"+(r||"flex-start")+";",i.innerHTML=jt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var Li=".product-name",Ai=".add-to-basket-modal",Ni="h1.product-name",nr=".single-product-container-main",Lr=".single-product-product-name",Bi=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Ii=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var _i='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',qt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Ar(e,r){var i=e.querySelector(Li);if(i)return i;if(e.matches&&e.matches(_i))return e;var t=e.querySelector(_i);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var d=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<d.length;o++){var s=d[o],c=s.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!qt.test(c)&&!(s.closest("figure")||s.closest("picture"))&&!(s.children.length>1))return s}return null}function Dt(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=O(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(nr)&&!e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(Lr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Bi)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),d=Array.from(e.childNodes).filter(function(v){return v.nodeType===3}).map(function(v){return v.textContent.trim()}).join("").trim(),o=!!Ar(e,i);if(!d&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(v){v.setAttribute("data-ikr-badge","1")});var s=Ar(e,i);if(!s||s.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(s).textAlign;s.appendChild(Ue(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var p=Ar(e,i);if(!(p&&p.querySelector("[data-ikr-listing-badge]")))if(p){var m=window.getComputedStyle(p).textAlign;p.appendChild(Ue(r,m==="center"?"center":m==="right"?"flex-end":"flex-start"))}else{var l=Ue(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(l,k):e.appendChild(l)}}}function Yt(e,r){var i=document.querySelector(Ai);if(i){var t=i.querySelector(Ni);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(qe&&r[qe]&&(a=qe),!a){var n=O(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var d=t.textContent.trim();Object.keys(e).forEach(function(m){if(!a){var l=e[m];l&&l.trim()===d&&r[m]&&(a=m)}})}if(!a){var o=document.querySelector(nr);if(o){var s=o.querySelector("a[href]");if(s){var c=O(s.href);c&&r[c]&&(a=c)}}}if(!a){var p=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(m){if(!a&&!(m.closest("header")||m.closest("nav"))&&!m.closest(nr)){var l=m.textContent.trim().toLowerCase();if(l&&l===p){var k=O(m.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(Ue(r[a],"flex-start"))}}}function Ri(e,r){var i=O(window.location.pathname),t=document.querySelectorAll(Ii),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(d){a.push(d)})}),Object.keys(e).forEach(function(n){var d=r[n];if(!(!d||d._empty||d.count===0)){var o=e[n];a.forEach(function(s){O(s.href)===n&&Dt(s,d,o,i)})}}),Yt(e,r)}async function Ie(){if(B.inProgress){B.queued=!0;return}if(!B.rendered){B.rendered=!0,B.inProgress=!0;try{var e=B.navCleanup;e&&(B.navCleanup=!1);var r=Ci();if(!Object.keys(r).length){B.rendered=!1;return}var i=await Promise.all([Er(),Ei(Object.keys(r))]),t=i[0];if(!t){B.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},d=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){B.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",d),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),Ri(r,a)}finally{B.inProgress=!1,B.queued&&(B.queued=!1,B.rendered=!1,Ie())}}}var Mi=!1,Pi=!1;function Fi(){Pi||(Pi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=O(r.href);!i||i.length<3||jr(i)}},!0))}var Oi=!1,Hi=typeof location!="undefined"?location.pathname:"";function or(){try{if(location.pathname===Hi)return;Hi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function Gt(){if(!Oi){Oi=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return or(),i},history.replaceState=function(){var i=r.apply(this,arguments);return or(),i},window.addEventListener("popstate",or),window.addEventListener("hashchange",or)}}function Nr(){if(Gt(),window.IkasEvents){if(Mi)return;Mi=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var d=n.data&&n.data.productDetails;Array.isArray(d)&&d.forEach(function(p){p&&p.metaData&&p.metaData.slug&&p.name&&(je[p.metaData.slug]=p.name)})}if(n&&n.type==="PRODUCT_VIEW"){var o=n.data&&n.data.productDetail&&n.data.productDetail.id,s=n.data&&n.data.productDetail&&n.data.productDetail.name;o&&(P("ikr_reviews_"+H+"_"+o,""),Be(o,s))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(B.lastPageView&&c-B.lastPageView<800)return;B.lastPageView=c,B.navCleanup=!0,B.rendered=!1,Ie()}}});var e=Tr();if(e)Be(e.id,e.name);else{let n=function(){var d=Tr();d?Be(d.id,d.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){B.rendered||Ie()},2e3)}else{let n=function(){window.IkasEvents?Nr():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var ji=null;function qi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(ji),ji=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=O(a.href);return n&&n.length>=3&&!$e.test(n)});t&&(B.rendered=!1,Ie())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Ut=window.__ikasPreviewMode===!0;if(Ut){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Be("mock-product","\xD6rnek \xDCr\xFCn"),e()};Vt=e,Kt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!A)){var n=Object.assign({},A,a);he(ee,n,pr,ye,ae,He)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(H){let e=function(){Nr(),Fi(),qi()};Zt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Vt,Kt,Zt;})();
