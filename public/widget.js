/* ikas Reviews Widget — built 2026-04-19T18:17:01.273Z | theme: default */
"use strict";(()=>{var yt=Object.defineProperty;var ke=(e,r)=>{for(var t in r)yt(e,t,{get:r[t],enumerable:!0})};var wr=document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})(),er=wr?wr.src:"",wt=new URLSearchParams(er.split("?")[1]||""),M=wt.get("publicApiKey"),V=er?er.split("?")[0].replace(/\/widget\.js$/,""):"";var K="newest",Le=1,pe=null,me=!1,Q=null,B=null,rr=null,he=null,tr=null;function xe(e){K=e}function ue(e){Le=e}function je(e){pe=e}function ir(e){me=e}function Cr(e){Q=e}function Sr(e){B=e}function Er(e){rr=e}function Tr(e){he=e}function zr(e){tr=e}var ar=!1,Ae=null;function De(e){ar=e}function Fe(e){Ae=e}var L={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},_e={},Ne=null;function Lr(e){Ne=e}var Ar={};function Be(e){try{return sessionStorage.getItem(e)}catch(r){return Ar[e]||null}}function N(e,r){try{sessionStorage.setItem(e,r)}catch(t){Ar[e]=r}}var ie="0 -960 960 960",Z={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};var _r={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+Z.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+Z.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+Z.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+Z.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Z.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+Z.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Z.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+Z.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+Z.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+ie+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+Z.heartOutline+'"/></g></svg>'}}}};function Ct(e){var r=String(e||"star"),t=r.indexOf(":");return t===-1?{type:r,style:null}:{type:r.slice(0,t),style:r.slice(t+1)}}function Re(e,r){var t=_r[e]||_r.star,i=t.styles;return i[r]||i[Object.keys(i)[0]]}function Ie(e){var r=e&&e.reviewIcon||"star",t=Ct(r),i=t.style||e&&e.reviewIconStyle||"classic";return Re(t.type,i)}function Nr(e,r,t){for(var i=Math.round(parseFloat(e))||0,a=Ie(r),n=t&&t.sizePx,s=n?"width:"+n+"px;height:"+n+"px;":"",l="",d=1;d<=5;d++){var c=d<=i;l+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(c?a.filled:a.empty)+"</span>"}return l}var Ye="var(--ikr-review-star-color,#f59e0b)",Ue=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function R(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function Pe(e,r){var t="color:"+Ye+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+t+'">'+Nr(e,r)+"</span>"}function F(e,r,t){for(var i=Math.max(0,Math.min(5,parseFloat(e)||0)),a=i/5*100,n=t&&t.sizeStyle||"",s="",l="",d=0;d<5;d++)s+='<span class="ikr-icon" style="'+n+'">'+r.empty+"</span>",l+='<span class="ikr-icon" style="'+n+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+s+'</span><span class="ikr-stars-partial-fill" style="width:'+a+'%;">'+l+"</span></span>"}function Oe(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function St(e){var r=/^#([0-9A-Fa-f]{6})$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Et(e){var r=/^#[0-9A-Fa-f]{6}$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var t=St(r);document.documentElement.style.setProperty("--ikr-color-light",t?"rgba("+t[0]+","+t[1]+","+t[2]+",0.07)":"rgba(17,17,17,0.07)")}function Rr(e,r){var t=document.getElementById("ikr-styles");t||(t=document.createElement("style"),t.id="ikr-styles",document.head.appendChild(t)),t.textContent=r,Et(e)}function ae(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Ir(e,r,t,i){var a=Ie(i),n="ikr-rating-"+Math.random().toString(36).slice(2,9),s=document.createElement("div");if(s.className="ikr-rating"+(r?" ikr-rating-interactive":""),s.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){s.style.flexDirection="row";for(var l=1;l<=5;l++){var d=document.createElement("span");d.className="ikr-icon",d.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(l<=e?Ye:"#ddd")+";",d.innerHTML=l<=e?a.filled:a.empty,s.appendChild(d)}return s}for(var c=5;c>=1;c--)(function(o){var p=document.createElement("input");p.type="radio",p.name=n,p.value=String(o),p.id=n+"-"+o,p.className="ikr-rating-input",o===e&&(p.checked=!0),p.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",p.addEventListener("change",function(){t&&t(o)});var m=document.createElement("label");m.htmlFor=p.id,m.className="ikr-rating-label",m.setAttribute("aria-label",o+" y\u0131ld\u0131z"),m.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",m.addEventListener("click",function(f){f.preventDefault();for(var u=s.querySelectorAll(".ikr-rating-input"),k=0;k<u.length;k++)u[k].checked=!1;p.checked=!0,t&&t(o)}),m.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+Ye+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",m.style.position="relative",s.appendChild(p),s.appendChild(m)})(c);return Tt(),s}var Br=!1;function Tt(){if(!Br){Br=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+Ye+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function W(e,r,t){var i=new AbortController,a=setTimeout(function(){i.abort()},t||8e3);return fetch(e,Object.assign({},r,{signal:i.signal})).finally(function(){clearTimeout(a)})}function Pr(e,r,t){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e)}function zt(e){var r=document.createElement("div");r.className="ikr-modal-right";var t=document.createElement("div");t.className="ikr-modal-scroll-content";var i=document.createElement("div");i.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=Pe(e.rating,B);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=Oe(e.createdAt),i.appendChild(a),i.appendChild(n),t.appendChild(i);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",t.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",t.appendChild(l);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var c=document.createElement("div");c.className="ikr-modal-reply";var o=document.createElement("div");o.className="ikr-modal-reply-label",o.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",c.appendChild(o),c.appendChild(p),c.style.display=e.merchantReply?"":"none",t.appendChild(c),r.appendChild(t),r}function Lt(e,r){var t=e.querySelector(".ikr-modal-scroll-content");t.querySelector(".ikr-modal-stars").innerHTML=Pe(r.rating,B),t.querySelector(".ikr-modal-date").textContent=Oe(r.createdAt);var i=t.querySelector(".ikr-modal-title");i.textContent=r.title||"",i.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var a=t.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=t.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function nr(e,r,t,i,a,n,s,l){var d=e.images&&Array.isArray(e.images)?e.images.filter(function(E){return E&&(E.indexOf("https://")===0||E.indexOf("data:image/")===0)}):[],c=Math.min(t,d.length-1),o=document.createElement("div");o.className="ikr-modal-left";var p=document.createElement("img"),m=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(m?" "+m:""),p.src=ae(d[c]||""),p.alt="Yorum foto\u011Fraf\u0131",o.appendChild(p);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(E){E.stopPropagation(),n()},o.appendChild(f);var u=0;if(o.addEventListener("touchstart",function(E){u=E.touches[0].clientX},{passive:!0}),o.addEventListener("touchend",function(E){var S=u-E.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(h)ee(e,r,c+1,i,a,n,!0,"next",l);else if(w){var A=i[r+1];ee(A,r+1,0,i,a,n,!1,"next",l)}}else if(g)ee(e,r,c-1,i,a,n,!0,"prev",l);else if(v){var _=i[r-1],j=(_.images||[]).filter(function(U){return U&&(U.indexOf("https://")===0||U.indexOf("data:image/")===0)});ee(_,r-1,j.length-1,i,a,n,!1,"prev",l)}}},{passive:!0}),d.length>1){var k=document.createElement("div");k.className="ikr-modal-thumbs",d.forEach(function(E,S){var A=document.createElement("img");A.src=ae(E),A.className="ikr-modal-thumb"+(S===c?" ikr-modal-thumb-active":""),A.alt="K\xFC\xE7\xFCk resim "+(S+1),(function(_){A.onclick=function(){ee(e,r,_,i,a,n,!0,null,l)}})(S),k.appendChild(A)}),o.appendChild(k)}var g=c>0,h=c<d.length-1,v=r>0,w=r<i.length-1,x=g||v,b=h||w;if(x||b){var T=document.createElement("button");T.className="ikr-modal-nav ikr-modal-nav-prev",T.innerHTML="&#8249;",T.setAttribute("aria-label","\xD6nceki"),T.style.opacity=x?"1":"0.3",T.onclick=function(E){if(E.stopPropagation(),g)ee(e,r,c-1,i,a,n,!0,"prev",l);else if(v){var S=i[r-1],A=(S.images||[]).filter(function(_){return _&&_.indexOf("https://")===0});ee(S,r-1,A.length-1,i,a,n,!1,"prev",l)}},o.appendChild(T);var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-next",y.innerHTML="&#8250;",y.setAttribute("aria-label","Sonraki"),y.style.opacity=b?"1":"0.3",y.onclick=function(E){if(E.stopPropagation(),h)ee(e,r,c+1,i,a,n,!0,"next",l);else if(w){var S=i[r+1];ee(S,r+1,0,i,a,n,!1,"next",l)}},o.appendChild(y)}return o}function Or(e,r){[-1,1].forEach(function(t){var i=r[e+t];if(i){var a=(i.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=ae(a[0]))}})}function ee(e,r,t,i,a,n,s,l,d){if(s){var c=nr(e,r,t,i,a,n,l,d);a.firstChild&&a.replaceChild(c,a.firstChild)}else{var c=nr(e,r,t,i,a,n,l,d),o=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(c,a.firstChild),o&&Lt(o,e);var p=d&&d.querySelector(".ikr-modal-wrap");p&&(p.scrollTop=0)}Or(r,i)}function Ge(e,r,t){var i=(t||[]).filter(function(g){return g.images&&Array.isArray(g.images)&&g.images.some(function(h){return h&&(h.indexOf("https://")===0||h.indexOf("data:image/")===0)})}),a=i.findIndex(function(g){return g===e||g.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(g){return g&&(g.indexOf("https://")===0||g.indexOf("data:image/")===0)}):[],s=Math.max(0,n.indexOf(r)),l=document.createElement("div");l.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var c=!1;function o(){c||(c=!0,Pr(l,p,o))}function p(g){g.key==="Escape"&&m()}function m(){c||(c=!0,history.go(-1),Pr(l,p,o))}document.addEventListener("keydown",p);var f=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=f+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",o),l.onclick=function(){m()},d.onclick=function(g){g.stopPropagation()},d.appendChild(nr(e,a,s,i,d,m,null,l)),d.appendChild(zt(e)),Or(a,i);var u=document.createElement("div");u.className="ikr-modal-wrap",u.appendChild(d);var k=document.createElement("button");k.className="ikr-modal-close",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(g){g.stopPropagation(),m()},u.appendChild(k),l.appendChild(u),document.body.appendChild(l)}function Mr(e,r){var t=document.createElement("div");t.className="ikr-form",t.id="ikr-form-section",t.setAttribute("aria-label","Yorum formu"),t.setAttribute("role","form"),t.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var i=0,a=[],n=Ir(0,!0,function(m){i=m},B);t.querySelector("#ikr-stars-input").appendChild(n);var s=t.querySelector("#ikr-file-input"),l=t.querySelector("#ikr-photo-previews"),d=!1,c=t.querySelector("label.ikr-photo-btn"),o=3;function p(){var m=a.length;m>=o?(s.disabled=!0,c&&(c.style.opacity="0.4")):(s.disabled=!1,c&&(c.style.opacity="1"))}return s.onchange=async function(m){if(!d){d=!0,s.disabled=!0;var f=o-a.length,u=Array.from(m.target.files).slice(0,f);for(let g=0;g<u.length;g++){let h=u[g];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let v=document.createElement("div");v.className="ikr-preview-item";let w=URL.createObjectURL(h);v.innerHTML='<img class="ikr-preview-img" src="'+w+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',l.appendChild(v);let x=v.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(w),x.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){x.style.opacity="0",x.style.transition="opacity 0.4s",setTimeout(function(){x.style.display="none";let b=document.createElement("button");b.className="ikr-preview-remove",b.innerHTML="&#x2715;",b.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),b.onclick=function(){a=a.filter(function(T){return T!==w}),v.remove(),p()},v.appendChild(b)},400)},800);continue}try{let b=await W(V+"/api/public/upload/sign",{method:"POST"});if(!b.ok)throw b.status===429?new Error("rate_limit"):new Error("sign failed");let T=await b.json(),y=new FormData;y.append("file",h),y.append("api_key",T.api_key),y.append("timestamp",T.timestamp),y.append("signature",T.signature),y.append("folder","review_images");let S=await(await fetch("https://api.cloudinary.com/v1_1/"+T.cloud_name+"/image/upload",{method:"POST",body:y})).json();if(S.secure_url){let A=S.secure_url;a.push(A),x.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){x.style.opacity="0",x.style.transition="opacity 0.4s",setTimeout(function(){x.style.display="none";let _=document.createElement("button");_.className="ikr-preview-remove",_.innerHTML="&#x2715;",_.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),_.onclick=function(){a=a.filter(function(j){return j!==A}),v.remove(),p()},v.appendChild(_)},400)},800)}}catch(b){console.error("[ikr] Image upload failed:",b);var k=b.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";x.innerHTML='<span class="ikr-upload-error">\u2717 '+k+"</span>"}}d=!1,s.value="",p()}},t.querySelector("#ikr-submit").onclick=async function(){var m=this,f=t.querySelector("#ikr-name").value.trim(),u=t.querySelector("#ikr-title").value.trim(),k=t.querySelector("#ikr-comment").value.trim(),g=t.querySelector("#ikr-msg");if(!i){g.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!f){g.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(m.disabled=!0,m.textContent="G\xF6nderiliyor\u2026",g.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=R(window.location.href),v=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),w=await W(V+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:M,productId:e,slug:h||null,productName:v,author:f,title:u||null,comment:k,rating:i,images:a})},15e3);if(w.ok)t.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var x=await w.json().catch(function(){return{}});throw new Error(x.error||"Yorum kaydedilemedi.")}}catch(E){var b=E&&(E.name==="AbortError"||/signal/i.test(E.message||"")),T=b?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":E.message||"Yorum g\xF6nderilemedi.",y=document.createElement("div");y.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",y.textContent=T,g.innerHTML="",g.appendChild(y),m.disabled=!1,m.textContent="G\xF6nder"}},t}function Hr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<r.length;t++){var i=r[t];if(i.children.length===0&&i.textContent.trim()===e&&i.tagName!=="TITLE"&&!i.closest("[data-ikr-listing-badge]")&&!i.closest("#ikas-reviews")&&!i.closest("nav")&&!i.closest("header")&&!i.closest('[class*="breadcrumb"]')&&!i.closest('[aria-label*="breadcrumb"]'))return i}return document.querySelector("h1")}var qr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function At(e,r,t,i,a){var n=Re(r,t),s="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+i+';display:inline-flex;align-items:center;line-height:1;">'+F(e,n,{sizeStyle:s})+"</span>"}function jr(e,r,t,i){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(i&&i.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var l=Hr(t);if(!(!l||!l.parentNode)){var d=i&&i.icon||"star",c=i&&i.iconStyle||"classic",o=i&&i.size||"medium",p=i&&i.color||"#f59e0b",m=qr[o]||qr.medium,f=document.createElement("a");f.id="ikr-rating-badge",f.href="#ikas-reviews";var u=window.getComputedStyle(l).textAlign,k=u==="center"?"center":u==="right"?"flex-end":"flex-start";f.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+k+";",f.innerHTML=At(e,d,c,p,m.icon)+'<span style="font-size:'+m.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",f.onclick=function(g){g.preventDefault();var h=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(h){var v=document.querySelector("header"),w=v?v.getBoundingClientRect().height:0,x=h.getBoundingClientRect().top+window.pageYOffset-w-16;window.scrollTo({top:x,behavior:"smooth"})}},l.parentNode.insertBefore(f,l.nextSibling)}}}var Dr=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:var(--ikr-text,rgba(0,0,0,1));background:var(--ikr-widget-bg,var(--ikr-bg,transparent));border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* Yorum metni ve ma\u011Faza yan\u0131t\u0131 \u2014 70ch ile okunabilir tutulur, inner 1200 olsa
     bile sat\u0131rlar 800-900px civar\u0131nda kal\u0131r. Ba\u015Fl\u0131k, summary, galeri serbest. */
  #ikas-reviews-widget .ikr-body,
  #ikas-reviews-widget .ikr-reply-text{max-width:70ch;}
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

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:center;gap:var(--ikr-col-gap);
    padding:3px 6px;box-sizing:border-box;
  }
  .ikr-write-btn{flex:1 1 auto;min-width:0;background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:700;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;}
  .ikr-filter-wrap{flex:0 0 var(--ikr-col-count);position:relative;display:flex;justify-content:flex-end;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--ikr-radius,6px);border:2px solid var(--ikr-filter-btn-border,var(--ikr-color,#000));background:var(--ikr-filter-btn-bg,var(--ikr-color,#000));color:var(--ikr-filter-btn-text,var(--ikr-color-text,#fff));cursor:pointer;}
  .ikr-filter-btn-active{opacity:0.85;}

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
  .ikr-photo-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .ikr-photo-section-title{font-size:14px;font-weight:600;color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-photo-strip-wrap{position:relative;}
  .ikr-photo-strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-thumb{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));transition:transform 0.2s,border-color 0.2s;flex-shrink:0;}
  @media(hover:hover){.ikr-photo-thumb:hover{transform:scale(1.03);border-color:var(--ikr-color,#000);}}

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-bg,var(--ikr-surface,rgba(255,255,255,0.95)));border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.12)));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-photo-bg,var(--ikr-surface,#fff));transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  .ikr-review{padding:20px 0;border-bottom:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  .ikr-review-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:6px;}
  .ikr-date{color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;}
  .ikr-img{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:var(--ikr-form-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-form-border,var(--ikr-border,rgba(0,0,0,0.08)));padding:25px;border-radius:var(--ikr-radius,6px);margin:16px auto;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-form label{font-size:14px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;background:var(--ikr-input-bg-color,var(--ikr-input-bg,#fff));border:1px solid var(--ikr-input-border,var(--ikr-border,rgba(0,0,0,0.20)));border-radius:var(--ikr-radius,6px);font-size:14px;box-sizing:border-box;color:var(--ikr-input-text-color,var(--ikr-input-text,rgba(0,0,0,0.90)));}
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
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 4px;display:block;}
  .ikr-photo-section-header{margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
  .ikr-photo-section-title{font-size:var(--ikr-photo-title-size,16px);font-weight:600;color:var(--ikr-text,#121926);}
  .ikr-photo-strip-container{position:relative;margin:0 -4px;}
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid rgba(0,0,0,0.05);}
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
  .ikr-modal-right{flex:1;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));white-space:nowrap;flex-shrink:0;}
  .ikr-modal-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-review-author,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;gap:6px;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-reply{margin-top:8px;padding:12px 16px;background:var(--ikr-modal-reply-bg,var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03))));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-modal-reply-border,var(--ikr-reply-border,var(--ikr-color,#000)));}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-reply-label,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));line-height:1.6;}

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
    .ikr-summary{padding:16px;gap:14px;--ikr-col-label:92px;--ikr-col-count:32px;}
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-btn{width:100%;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var or={};ke(or,{meta:()=>Rt,render:()=>It});function be(e){var r=e.ratingCounts,t=e.allCount,i=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,c=t>0?Math.round(d/t*100):0,o=a===l,p=document.createElement("div");p.className="ikr-bar-row"+(o?" ikr-bar-active":""),a&&!o&&(p.style.opacity="0.35");for(var m="",f=1;f<=5;f++){var u=f<=l;m+='<span class="ikr-bar-star ikr-icon '+(u?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(u?i.filled:i.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+m+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(k){p.onclick=function(){n(k)}})(l),s.appendChild(p)}return s}var J=[],Fr=!1;function _t(e){for(var r=J.length-1;r>=0;r--){var t=J[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function Nt(e){if(e.key==="Escape")for(var r=J.length-1;r>=0;r--)J[r].close()}function Bt(){Fr||typeof document=="undefined"||(document.addEventListener("click",_t,!0),document.addEventListener("keydown",Nt),Fr=!0)}function Ve(e){for(var r=0;r<J.length;r++)J[r]!==e&&J[r].close()}function Ke(e){Bt();var r={trigger:e.trigger,element:e.element,close:e.close};return J.push(r),function(){var i=J.indexOf(r);i!==-1&&J.splice(i,1)}}function X(e){var r=e.widget,t=e.currentOrderBy,i=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent="Yorum Yap",l.onclick=a,s.appendChild(l);var d=document.createElement("div");d.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele"),c.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';var o=document.createElement("div");o.className="ikr-filter-menu";var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function m(){o.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function f(){Ve(u),o.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}p.forEach(function(k){var g=k[2],h=g?i:!i&&(t||"newest")===k[0],v=document.createElement("div");v.className="ikr-filter-item"+(h?" ikr-filter-item-active":""),v.textContent=k[1],v.onclick=function(){m(),n(k[0],g)},o.appendChild(v)}),c.onclick=function(){o.classList.contains("ikr-open")?m():f()};var u=Ke({trigger:d,element:o,close:m});return d.appendChild(c),d.appendChild(o),s.appendChild(d),s}function q(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var t=document.querySelector("header"),i=t?t.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-i-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}var Rt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function It(e){var r=e.widget,t=e.data,i=e.settings,a=e.iconPair,n=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,c=e.currentOrderBy,o=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,f=document.createElement("div");f.className="ikr-summary";var u=(s[3]||0)+(s[4]||0),k=n>0?Math.round(u/n*100):0,g=document.createElement("div");g.className="ikr-summary-block ikr-summary-avg",g.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",f.appendChild(g);var h=document.createElement("div");if(h.className="ikr-summary-block ikr-summary-count",h.textContent=n.toLocaleString("tr-TR")+" Yorum",f.appendChild(h),i.showRecommendation!==!1&&k>0){var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-recommend",v.innerHTML='<span class="ikr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",f.appendChild(v)}return f.appendChild(be({ratingCounts:s,allCount:n,iconPair:a,currentRatingFilter:d,onFilterChange:p})),f.appendChild(X({widget:r,currentOrderBy:c,currentHasImages:o,onWriteClick:q,onSortChange:m})),f}var lr={};ke(lr,{css:()=>Ot,meta:()=>Pt,render:()=>Mt});var Yr=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 */
  .ikr-title-compact{text-align:left;}

  /* Compact'te ana .ikr-summary padding'ini s\u0131f\u0131rla \u2014 y\u0131ld\u0131zlar ba\u015Fl\u0131k ile ayn\u0131 sol kenar */
  .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding:0;}

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
  .ikr-compact-trigger-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
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
  .ikr-compact-actions-slot .ikr-filter-wrap{flex:0 0 auto;}
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
    .ikr-compact-header{gap:8px;align-items:center;}
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
`;var Pt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)"},Ot=Yr;function Mt(e){var r=e.widget,t=e.settings,i=e.iconPair,a=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-compact";var f=document.createElement("div");f.className="ikr-compact-header";var u=document.createElement("div");u.className="ikr-compact-trigger-wrap";var k=document.createElement("button");k.className="ikr-compact-trigger",k.type="button",k.setAttribute("aria-expanded","false"),k.innerHTML='<span class="ikr-compact-trigger-stars">'+F(s,i)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',u.appendChild(k),f.appendChild(u);var g=X({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:q,onSortChange:p}),h=g.querySelector(".ikr-filter-wrap"),v=g.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-compact-actions-slot",v&&w.appendChild(v),h&&w.appendChild(h),f.appendChild(w),m.appendChild(f);var x=document.createElement("div");x.className="ikr-compact-panel",x.setAttribute("role","dialog"),x.setAttribute("aria-hidden","true");var b=document.createElement("div");b.className="ikr-compact-panel-inner";var T=document.createElement("div");T.className="ikr-compact-avg",T.innerHTML='<span class="ikr-icon">'+i.filled+"</span><span>"+s+"</span>",b.appendChild(T),b.appendChild(be({ratingCounts:n,allCount:a,iconPair:i,currentRatingFilter:l,onFilterChange:o})),x.appendChild(b);var y=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function E(P){var oe=P?m:u;x.parentNode!==oe&&(x.classList.contains("ikr-open")&&(x.classList.remove("ikr-open"),x.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")),oe.appendChild(x))}if(E(y?y.matches:!1),y){var S=function(P){E(P.matches)};y.addEventListener?y.addEventListener("change",S):y.addListener&&y.addListener(S)}if(v){var A=document.createElement("button");A.className="ikr-write-btn",A.textContent="Yorum Yap",A.onclick=q;var _=document.createElement("div");_.className="ikr-compact-write-row",_.appendChild(A),m.appendChild(_)}function j(){x.classList.remove("ikr-open"),x.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")}function U(){Ve(G),x.classList.add("ikr-open"),x.setAttribute("aria-hidden","false"),k.setAttribute("aria-expanded","true")}k.onclick=function(){x.classList.contains("ikr-open")?j():U()};var G=null;function te(P){G&&(G(),G=null),P||(G=Ke({trigger:u,element:x,close:j}))}if(te(y?y.matches:!1),y){var fe=function(P){te(P.matches)};y.addEventListener?y.addEventListener("change",fe):y.addListener&&y.addListener(fe)}if(t.showRecommendation!==!1){var Ce=(n[3]||0)+(n[4]||0),ve=a>0?Math.round(Ce/a*100):0;if(ve>0){var D=document.createElement("div");D.className="ikr-summary-block ikr-summary-recommend",D.style.marginTop="8px",D.innerHTML='<span class="ikr-recommend-pct">%'+ve+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",b.appendChild(D)}}return m}var sr={};ke(sr,{css:()=>qt,meta:()=>Ht,render:()=>jt});var Ur=`
  .ikr-title-split{text-align:center;}

  /* Ana grid \u2014 base .ikr-summary'nin column flex'ini override et */
  .ikr-summary-split{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:16px 0;
  }

  .ikr-split-col{
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    min-width:0;
  }

  /* Sol: ortalama puan + y\u0131ld\u0131zlar + toplam yorum */
  .ikr-split-left{flex:0 0 auto;gap:6px;text-align:center;}
  .ikr-split-left-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-split-left-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
  }
  .ikr-split-left-avg{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:500;
  }
  .ikr-split-left-count{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;
  }

  /* Orta: bar chart \u2014 kendi max-width'i (340px) korunur */
  .ikr-split-mid{
    flex:1 1 auto;align-items:stretch;
  }
  .ikr-split-mid .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0 auto;
  }

  /* Sa\u011F: filter + write dikey */
  .ikr-split-right{
    flex:0 0 auto;gap:8px;align-items:stretch;min-width:160px;
  }
  .ikr-split-right .ikr-write-btn{
    width:100%;flex:0 0 auto;
  }
  .ikr-split-right .ikr-filter-wrap{
    align-self:flex-end;
  }

  @media(max-width:768px){
    /* Mobile: 3 kolon alt alta */
    .ikr-summary-split{
      flex-direction:column;align-items:center;gap:16px;padding:12px 0;
    }
    .ikr-split-col{width:100%;}
    .ikr-split-mid .ikr-summary-bars{max-width:100%;}
    .ikr-split-right{min-width:0;}
    .ikr-split-right .ikr-filter-wrap{align-self:flex-end;}
  }
`;var Ht={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},qt=Ur;function jt(e){var r=e.widget,t=e.settings,i=e.iconPair,a=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-split";var f=document.createElement("div");f.className="ikr-split-col ikr-split-left";var u=document.createElement("div");u.className="ikr-split-left-stars",u.innerHTML=F(s,i),f.appendChild(u);var k=document.createElement("div");k.className="ikr-split-left-avg",k.textContent=s+" / 5",f.appendChild(k);var g=document.createElement("div");g.className="ikr-split-left-count",g.textContent=a.toLocaleString("tr-TR")+" yorum",f.appendChild(g),m.appendChild(f);var h=document.createElement("div");h.className="ikr-split-col ikr-split-mid",h.appendChild(be({ratingCounts:n,allCount:a,iconPair:i,currentRatingFilter:l,onFilterChange:o})),m.appendChild(h);var v=X({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:q,onSortChange:p}),w=v.querySelector(".ikr-filter-wrap"),x=v.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-split-col ikr-split-right",w&&b.appendChild(w),x&&b.appendChild(x),m.appendChild(b),t.showRecommendation!==!1){var T=(n[3]||0)+(n[4]||0),y=a>0?Math.round(T/a*100):0;if(y>0){var E=document.createElement("div");E.className="ikr-summary-block ikr-summary-recommend",E.style.marginTop="4px",E.innerHTML='<span class="ikr-recommend-pct">%'+y+"</span> tavsiye ediyor",f.appendChild(E)}}return m}var dr={};ke(dr,{css:()=>Ft,meta:()=>Dt,render:()=>Yt});var Gr=`
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
    /* Write btn alta tek ba\u015F\u0131na d\xFC\u015Fer, filter sa\u011F \xFCstte info'nun yan\u0131nda kal\u0131r */
    .ikr-minimal-actions .ikr-write-btn{display:none;}
    .ikr-minimal-write-row{display:flex;width:100%;}
    .ikr-minimal-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-minimal-write-row{display:none;}
  }
`;var Dt={id:"minimal",name:"Minimal (Yal\u0131n)",defaultTitle:""},Ft=Gr;function Yt(e){var r=e.widget,t=e.iconPair,i=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var o=document.createElement("div");o.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=a,o.appendChild(p);var m=document.createElement("span");m.className="ikr-minimal-stars",m.innerHTML=F(a,t),o.appendChild(m),c.appendChild(o);var f=document.createElement("div");f.className="ikr-minimal-count",f.textContent=i.toLocaleString("tr-TR")+" yorum \xFCzerinden",c.appendChild(f),d.appendChild(c);var u=X({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:q,onSortChange:l}),k=u.querySelector(".ikr-filter-wrap"),g=u.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-minimal-actions",g&&h.appendChild(g),k&&h.appendChild(k),d.appendChild(h),g){var v=document.createElement("button");v.className="ikr-write-btn",v.textContent="Yorum Yap",v.onclick=q;var w=document.createElement("div");w.className="ikr-minimal-write-row",w.appendChild(v),d.appendChild(w)}return d}var cr={};ke(cr,{css:()=>Gt,meta:()=>Ut,render:()=>Vt});var Vr=`
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
    .ikr-hero-actions .ikr-write-btn{display:none;}
    .ikr-hero-write-row{display:flex;width:100%;}
    .ikr-hero-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;var Ut={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",defaultTitle:""},Gt=Vr;function Vt(e){var r=e.widget,t=e.iconPair,i=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var o=document.createElement("span");o.className="ikr-hero-avg",o.textContent=a,c.appendChild(o);var p=document.createElement("div");p.className="ikr-hero-meta";var m=document.createElement("span");m.className="ikr-hero-stars",m.innerHTML=F(a,t),p.appendChild(m);var f=document.createElement("div");f.className="ikr-hero-count",f.textContent=i.toLocaleString("tr-TR")+" yorum \xFCzerinden",p.appendChild(f),c.appendChild(p),d.appendChild(c);var u=X({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:q,onSortChange:l}),k=u.querySelector(".ikr-filter-wrap"),g=u.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-hero-actions",g&&h.appendChild(g),k&&h.appendChild(k),d.appendChild(h),g){var v=document.createElement("button");v.className="ikr-write-btn",v.textContent="Yorum Yap",v.onclick=q;var w=document.createElement("div");w.className="ikr-hero-write-row",w.appendChild(v),d.appendChild(w)}return d}var Ze={classic:or,compact:lr,split:sr,minimal:dr,hero:cr};function pr(e){return Ze[e]||Ze.classic}function Kr(){return Object.keys(Ze).map(function(e){return Ze[e].css||""}).join(`
`)}var mr={};ke(mr,{css:()=>Zt,meta:()=>Kt,render:()=>Wt});var Kt={id:"card",name:"Kart (Varsay\u0131lan)"},Zt="";function Wt(e,r){var t=document.createElement("div");t.className="ikr-review ikr-review-card";var i=document.createElement("div");i.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");if(n.className="ikr-review-stars",n.innerHTML=Pe(e.rating,B),a.appendChild(n),e.title){var s=document.createElement("span");s.className="ikr-review-title",s.textContent=e.title,a.appendChild(s)}var l=document.createElement("span");l.className="ikr-date",l.textContent=Oe(e.createdAt),i.appendChild(a),i.appendChild(l),t.appendChild(i);var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",t.appendChild(d);var c=(e.comment||"").trim();if(c){var o=document.createElement("div");o.className="ikr-body ikr-body-clamped",o.textContent=c,t.appendChild(o);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",t.appendChild(p),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2){p.style.display="inline";var h=!1;p.onclick=function(){h=!h,o.classList.toggle("ikr-body-clamped",!h),p.textContent=h?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var m=document.createElement("div");m.className="ikr-gallery",e.images.forEach(function(h){if(!(!h||h.indexOf("https://")!==0&&h.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=ae(h),v.className="ikr-img",v.setAttribute("data-ikr-img-url",h),(function(w){v.onclick=function(){Ge(e,w,r)}})(h),m.appendChild(v)}}),t.appendChild(m)}if(e.merchantReply){var f=document.createElement("div");f.className="ikr-reply";var u=document.createElement("div");u.className="ikr-reply-header";var k=document.createElement("span");k.className="ikr-reply-label",k.textContent="Ma\u011Faza Sahibi",u.appendChild(k);var g=document.createElement("div");g.className="ikr-reply-text",g.textContent=e.merchantReply,f.appendChild(u),f.appendChild(g),t.appendChild(f)}return t}var We={card:mr};function ur(e){return We[e]||We.card}function Zr(){return Object.keys(We).map(function(e){return We[e].css||""}).join(`
`)}function I(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var i=parseInt(t[1],16),a=parseInt(t[2],16),n=parseInt(t[3],16);return"rgba("+i+","+a+","+n+","+r+")"}var Wr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:12,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:14,authorSize:14,replyNameSize:14,replyTextSize:14,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:16,authorSize:16,replyNameSize:16,replyTextSize:16,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},Jr={small:60,medium:90,large:120};function Jt(e,r){var t=r.bgColor||"#ffffff",i=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",s=r.widgetBgColor||t,l=r.widgetBorderColor||"transparent",d=r.separatorColor||I(i,.08),c=r.headerTitleColor||i,o=r.headerAvgColor||i,p=r.headerCountColor||i,m=r.headerRecommendColor||i,f=r.barLabelColor||i,u=r.barFillColor||i,k=r.barTrackColor||I(i,.1),g=r.barCountColor||i,h=r.barHoverBgColor||I(i,.05),v=r.primaryColor||"#111111",w=r.primaryTextColor||"#ffffff",x=r.btnBgColor||v,b=r.btnTextColor||w,T=r.btnBorderColor||v,y=r.filterBtnBgColor||v,E=r.filterBtnTextColor||w,S=r.filterBtnBorderColor||v,A=r.filterMenuBgColor||t,_=r.filterMenuBorderColor||I(i,.12),j=r.filterItemTextColor||i,U=r.filterItemHoverBgColor||I(v,.07),G=r.filterItemActiveColor||v,te=r.reviewTitleColor||i,fe=r.reviewAuthorColor||i,Ce=r.reviewDateColor||i,ve=r.reviewBodyColor||i,D=r.reviewBorderColor||I(i,.08),P=r.reviewStarColor||"#f59e0b",oe=r.replyBgColor||a,ge=r.replyBorderColor||v,Se=r.replyLabelColor||i,Ee=r.replyTextColor||i,le=r.photoBgColor||I(i,.03),qe=r.photoBorderColor||I(i,.1),se=r.photoTitleColor||i,de=r.formBgColor||t,ce=r.formBorderColor||I(i,.08),Te=r.inputBgColor||n,$e=r.inputTextColor||i,Qe=r.inputBorderColor||I(i,.2),H=r.placeholderColor||I(i,.35),$=r.loadMoreBgColor||t,C=r.loadMoreTextColor||i,z=r.loadMoreBorderColor||I(i,.3),O=r.modalBgColor||t,Y=r.modalTextColor||i,ze=r.modalCloseBgColor||v,vt=r.modalCloseTextColor||w,gt=r.modalCloseBorderColor||v,kt=r.modalNavBgColor||"rgba(0,0,0,0.45)",ht=r.modalNavTextColor||"#ffffff",xt=r.modalReplyBgColor||a,bt=r.modalReplyBorderColor||v,br={"--ikr-widget-bg":s,"--ikr-widget-border":l,"--ikr-separator":d,"--ikr-header-title":c,"--ikr-header-avg":o,"--ikr-header-count":p,"--ikr-header-recommend":m,"--ikr-bar-label":f,"--ikr-bar-fill":u,"--ikr-bar-track":k,"--ikr-bar-count":g,"--ikr-bar-hover-bg":h,"--ikr-btn-bg":x,"--ikr-btn-text":b,"--ikr-btn-border":T,"--ikr-filter-btn-bg":y,"--ikr-filter-btn-text":E,"--ikr-filter-btn-border":S,"--ikr-filter-menu-bg":A,"--ikr-filter-menu-border":_,"--ikr-filter-item-text":j,"--ikr-filter-item-hover-bg":U,"--ikr-filter-item-active":G,"--ikr-review-title":te,"--ikr-review-author":fe,"--ikr-review-date":Ce,"--ikr-review-body":ve,"--ikr-review-border":D,"--ikr-review-star-color":P,"--ikr-reply-bg-color":oe,"--ikr-reply-border":ge,"--ikr-reply-label":Se,"--ikr-reply-text":Ee,"--ikr-photo-bg":le,"--ikr-photo-border":qe,"--ikr-photo-title":se,"--ikr-form-bg":de,"--ikr-form-border":ce,"--ikr-input-bg-color":Te,"--ikr-input-text-color":$e,"--ikr-input-border":Qe,"--ikr-placeholder":H,"--ikr-load-more-bg":$,"--ikr-load-more-text":C,"--ikr-load-more-border":z,"--ikr-modal-bg":O,"--ikr-modal-text":Y,"--ikr-modal-close-bg":ze,"--ikr-modal-close-text":vt,"--ikr-modal-close-border":gt,"--ikr-modal-nav-bg":kt,"--ikr-modal-nav-text":ht,"--ikr-modal-reply-bg":xt,"--ikr-modal-reply-border":bt,"--ikr-bg":t,"--ikr-surface":t,"--ikr-text":i,"--ikr-text-faint":I(i,.45),"--ikr-border":I(i,.12),"--ikr-track-bg":I(i,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":i};Object.keys(br).forEach(function(yr){e.style.setProperty(yr,br[yr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=t)}async function re(e,r,t,i,a,n,s){if(ar){Fe({productId:e,settings:r,reviewsData:t,productName:i,orderBy:a,page:n,badgeSettings:s});return}De(!0),Cr(e),Sr(r),s!==void 0&&Er(s),Tr(i),a&&xe(a),n&&ue(n),t!=null&&zr(t);try{var l=pr(r.summaryLayout),d=l.meta&&l.meta.defaultTitle!==void 0?l.meta.defaultTitle:"M\xFC\u015Fteri Yorumlar\u0131",c=d===""?"":r.title!==void 0?r.title:d,o=document.documentElement;Jt(o,r);var p=r.primaryColor||"#111111",m=r.primaryTextColor||"#ffffff";Rr(p,Dr+Kr()+Zr());var f=r.borderRadius!==void 0?r.borderRadius:8,u=Wr[r.size]||Wr.medium,k=Jr[r.thumbnailSize]||Jr.medium;o.style.setProperty("--ikr-title-size",u.titleSize+"px"),o.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),o.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),o.style.setProperty("--ikr-author-size",u.authorSize+"px"),o.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),o.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),o.style.setProperty("--ikr-color-text",m),o.style.setProperty("--ikr-radius",f+"px"),o.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),o.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),o.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),o.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),o.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),o.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),o.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),o.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),o.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),o.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),o.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),o.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),o.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),o.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),o.style.setProperty("--ikr-thumbnail-size",k+"px");var g=/^#[0-9A-Fa-f]{6}$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--ikr-review-star-color",g),o.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),o.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px");var h=Ie(r),v=document.getElementById("ikas-reviews");if(!v){var w=document.getElementById("ikas-reviews-anchor");if(!w)return;v=document.createElement("div"),v.id="ikas-reviews",v.style.minHeight="200px",w.appendChild(v)}if(r.enabled===!1){v.style.minHeight="auto",v.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',De(!1);var x=Ae;Fe(null),x&&re(x.productId,x.settings,x.reviewsData,x.productName,x.orderBy,x.page,x.badgeSettings);return}v.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var b=t||{},T=b.data&&b.data.reviews||[],y=b.data&&b.data.totalCount||0,E=v.cloneNode(!1);v.parentNode.replaceChild(E,v),v=E;var S=document.createElement("div");if(S.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),c){var A=document.createElement("div"),_=r.summaryLayout||"classic";A.className="ikr-title ikr-title-"+_,A.textContent=c,S.appendChild(A)}var j=b.data&&b.data.allCount||0,U=b.data&&b.data.ratingCounts||null,G=U||[0,0,0,0,0],te=b.data&&b.data.avgRating||"0.0";if(!U&&T.length>0){T.forEach(function(C){C.rating>=1&&C.rating<=5&&G[C.rating-1]++});var fe=T.reduce(function(C,z){return C+z.rating},0);te=(fe/T.length).toFixed(1)}if(j>0){var Ce=pr(r.summaryLayout),ve=Ce.render({widget:S,data:b,settings:r,iconPair:h,allCount:j,ratingCounts:G,avgRatingVal:te,currentRatingFilter:pe,currentOrderBy:K,currentHasImages:me,onFilterChange:async function(C){je(pe===C?null:C),ue(1);var z=await Me(Q,K,1,pe,me);await re(Q,B,z,he,K,1)},onSortChange:async function(C,z){ue(1),z?(ir(!0),xe("newest")):(ir(!1),xe(C));var O=await Me(Q,K,1,pe,me);await re(Q,B,O,he,K,1)}});S.appendChild(ve)}else{var D=document.createElement("button");D.className="ikr-write-btn",D.style.cssText="display:block;margin:16px auto 0;",D.textContent="Yorum Yap",D.onclick=function(){var C=document.getElementById("ikr-form-accordion");if(C){var z=C.style.maxHeight&&C.style.maxHeight!=="0px";z?(C.style.maxHeight="0px",C.style.opacity="0"):(C.style.maxHeight=C.scrollHeight+"px",C.style.opacity="1",setTimeout(function(){C.style.maxHeight="none"},360),setTimeout(function(){var O=document.querySelector("header"),Y=O?O.getBoundingClientRect().height:0,ze=C.getBoundingClientRect().top+window.pageYOffset-Y-16;window.scrollTo({top:ze,behavior:"smooth"})},50))}},S.appendChild(D)}var P=document.createElement("div");P.id="ikr-form-accordion",P.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",P.appendChild(Mr(e,i)),S.appendChild(P);var oe=T.filter(function(C){return C.images&&Array.isArray(C.images)&&C.images.some(function(z){return z&&(z.indexOf("https://")===0||z.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!me&&oe.length>0){var ge=document.createElement("div");ge.className="ikr-photo-section";var Se=document.createElement("div");Se.className="ikr-photo-section-header";var Ee=document.createElement("span");Ee.className="ikr-photo-section-title",Ee.textContent="Foto\u011Frafl\u0131 Yorumlar",Se.appendChild(Ee),ge.appendChild(Se);var le=document.createElement("div");le.className="ikr-photo-strip";var qe=0;oe.forEach(function(C){if(!(qe>=10)){var z=C.images.find(function(Y){return Y&&(Y.indexOf("https://")===0||Y.indexOf("data:image/")===0)});if(z){var O=document.createElement("img");O.src=ae(z),O.className="ikr-photo-strip-thumb",O.alt="Yorum foto\u011Fraf\u0131",(function(Y,ze){O.onclick=function(){Ge(ze,Y,T)}})(z,C),le.appendChild(O),qe++}}});var se=document.createElement("button");se.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",se.innerHTML="&#8249;",se.setAttribute("aria-label","\xD6nceki"),se.onclick=function(){le.scrollBy({left:-200,behavior:"smooth"})};var de=document.createElement("button");de.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",de.innerHTML="&#8250;",de.setAttribute("aria-label","Sonraki"),de.onclick=function(){le.scrollBy({left:200,behavior:"smooth"})};var ce=document.createElement("div");ce.className="ikr-photo-strip-wrap",ce.appendChild(se),ce.appendChild(le),ce.appendChild(de),ge.appendChild(ce),S.appendChild(ge)}if(T.length===0){var Te=document.createElement("p");Te.className="ikr-state-msg",Te.textContent="Hen\xFCz yorum yok.",S.appendChild(Te)}else{var $e=ur(r.reviewLayout);T.forEach(function(C){S.appendChild($e.render(C,T))})}var Qe=b.data&&b.data.hasMore;if(Qe){var H=document.createElement("button");H.className="ikr-load-more",H.textContent="Daha Fazla G\xF6ster",H.onclick=async function(){H.disabled=!0,H.textContent="Y\xFCkleniyor...";var C=Le+1,z=await Me(Q,K,C,pe,me);if(z&&z.data&&z.data.reviews){ue(C);var O=ur(B.reviewLayout);z.data.reviews.forEach(function(Y){S.insertBefore(O.render(Y,z.data.reviews),H)}),z.data.hasMore?(H.disabled=!1,H.textContent="Daha Fazla G\xF6ster"):H.remove()}else H.remove()},S.appendChild(H)}v.appendChild(S),jr(j>0?te:null,y,i,rr)}catch(C){console.error("[ikr] render error:",C),v.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(De(!1),Ae){var $=Ae;Fe(null),re($.productId,$.settings,$.reviewsData,$.productName,$.orderBy,$.page,$.badgeSettings)}}}var ne="ikr_settings_"+M,Xt=300*1e3,$t=30*1e3;async function vr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||V,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",t={};if(r)try{t=JSON.parse(r)}catch(o){}var i=await W(e+"/api/preview/settings");if(i.ok){var a=await i.json();return a.widgets&&a.widgets.reviews&&Object.keys(t).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,t)),a}}catch(o){}return null}var n=null,s=Be(ne);if(s)try{var l=JSON.parse(s);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<$t)return null;N(ne,"")}else if(l.v){if(Date.now()-l.t<Xt)return l.v;n=l.v,N(ne,"")}else N(ne,"");else N(ne,"")}catch(o){N(ne,"")}try{var d=await W(V+"/api/public/settings?publicApiKey="+encodeURIComponent(M));if(!d.ok)return d.status===404&&N(ne,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await d.json();return N(ne,JSON.stringify({t:Date.now(),v:c})),c}catch(o){return console.error("[ikr] fetchSettings error:",o),n||null}}var Qt=60*1e3;async function Me(e,r,t,i,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||V,s=n+"/api/preview/reviews?page="+encodeURIComponent(t||1),l=await W(s);if(l.ok)return await l.json()}catch(k){}return null}r=r||"newest",t=t||1;var d="ikr_reviews_"+M+"_"+e+"_"+r+"_"+t+"_"+(i||"")+"_"+(a?"1":"0"),c=null,o=Be(d);if(o)try{var p=JSON.parse(o);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<Qt)return p.v;c=p.v,N(d,"")}else N(d,"")}catch(k){N(d,"")}try{var m=V+"/api/public/reviews?storeId="+encodeURIComponent(M)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(i?"&rating="+encodeURIComponent(i):"")+(a?"&hasImages=true":""),f=await W(m);if(!f.ok)return c||null;var u=await f.json();return N(d,JSON.stringify({t:Date.now(),v:u})),u}catch(k){return console.error("[ikr] fetchReviews error:",k),c||null}}var fr={};async function ye(e,r){var t=document.getElementById("ikr-rating-badge");t&&t.remove();var i=document.getElementById("ikr-jsonld");if(i&&i.remove(),!fr[e]){fr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await vr();if(!s)return;var l=s.widgets&&s.widgets.reviews||a,d=s.widgets&&s.widgets.badge||n;if(l.enabled===!1)return;xe("newest"),ue(1),je(null);var c=await Me(e,"newest",1,null);await re(e,l,c,r,"newest",1,d)}catch(o){console.error("[ikr] bootstrap error:",o),await re(e,a,null,r,void 0,void 0,n)}finally{delete fr[e]}}}function gr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(i){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var t=new URLSearchParams(window.location.search).get("productId");return t?{id:t,name:null}:null}function Xr(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(t){try{var i=t.getAttribute("href");if(!i||i.charAt(0)==="#"||i.charAt(0)==="?")return;var a=R(t.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Ue.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(_e).forEach(function(t){e[t]=_e[t]}),e}var ei=300*1e3,$r=50;async function Qr(e){var r="ikr_ratings_"+M,t={},i=Be(r);if(i)try{var a=JSON.parse(i);a&&a.t!==void 0&&Date.now()-a.t<ei?t=a.v||{}:N(r,"")}catch(c){N(r,"")}var n=e.filter(function(c){return!t[c]});if(!n.length)return t;for(var s=[],l=0;l<n.length;l+=$r)s.push(n.slice(l,l+$r));var d=await Promise.all(s.map(function(c){var o=V+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(M)+"&slugs="+c.map(encodeURIComponent).join(",");return W(o).then(function(p){return p.ok?p.json().then(function(m){return m.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(c){n.forEach(function(o){t[o]||(t[o]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(o){t[o]=c[o]})}),N(r,JSON.stringify({t:Date.now(),v:t})),t}var ri="var(--ikr-badge-color,#f59e0b)",et=13,ti="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function ii(e){var r=Re("star","classic"),t="width:"+et+"px;height:"+et+"px;";return'<span style="color:'+ri+';display:inline-flex;align-items:center;">'+F(e,r,{sizeStyle:t})+"</span>"}function He(e,r){var t=document.createElement("div");return t.setAttribute("data-ikr-listing-badge","1"),t.style.cssText=ti+"justify-content:"+(r||"flex-start")+";",t.innerHTML=ii(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",t}var rt=".product-name",tt=".add-to-basket-modal",it="h1.product-name",Je=".single-product-container-main",kr=".single-product-product-name",at=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),nt=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var ot='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',ai=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function hr(e,r){var t=e.querySelector(rt);if(t)return t;if(e.matches&&e.matches(ot))return e;var i=e.querySelector(ot);if(i)return i;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<s.length;l++){var d=s[l],c=d.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!ai.test(c)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function ni(e,r,t,i){if(!e.getAttribute("data-ikr-badge")){var a=R(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===i&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Je)&&!e.closest(kr)){e.setAttribute("data-ikr-badge","1");return}if(a===i&&e.closest(kr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(at)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(u){return u.nodeType===3}).map(function(u){return u.textContent.trim()}).join("").trim(),l=!!hr(e,t);if(!s&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(u){u.setAttribute("data-ikr-badge","1")});var d=hr(e,t);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(d).textAlign;d.appendChild(He(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var o=hr(e,t);if(!(o&&o.querySelector("[data-ikr-listing-badge]")))if(o){var p=window.getComputedStyle(o).textAlign;o.appendChild(He(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var m=He(r,"flex-start"),f=e.firstElementChild;f?e.insertBefore(m,f):e.appendChild(m)}}}function oi(e,r){var t=document.querySelector(tt);if(t){var i=t.querySelector(it);if(!(!i||i.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Ne&&r[Ne]&&(a=Ne),!a){var n=R(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var s=i.textContent.trim();Object.keys(e).forEach(function(p){if(!a){var m=e[p];m&&m.trim()===s&&r[p]&&(a=p)}})}if(!a){var l=document.querySelector(Je);if(l){var d=l.querySelector("a[href]");if(d){var c=R(d.href);c&&r[c]&&(a=c)}}}if(!a){var o=i.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!a&&!(p.closest("header")||p.closest("nav"))&&!p.closest(Je)){var m=p.textContent.trim().toLowerCase();if(m&&m===o){var f=R(p.href);f&&r[f]&&(a=f)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||i.appendChild(He(r[a],"flex-start"))}}}function lt(e,r){var t=R(window.location.pathname),i=document.querySelectorAll(nt),a=[];i.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(s){a.push(s)})}),Object.keys(e).forEach(function(n){var s=r[n];if(!(!s||s._empty||s.count===0)){var l=e[n];a.forEach(function(d){R(d.href)===n&&ni(d,s,l,t)})}}),oi(e,r)}async function we(){if(L.inProgress){L.queued=!0;return}if(!L.rendered){L.rendered=!0,L.inProgress=!0;try{var e=L.navCleanup;e&&(L.navCleanup=!1);var r=Xr();if(!Object.keys(r).length){L.rendered=!1;return}var t=await Promise.all([vr(),Qr(Object.keys(r))]),i=t[0];if(!i){L.rendered=!1;return}var a=t[1],n=i&&i.widgets||{},s=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){L.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),lt(r,a)}finally{L.inProgress=!1,L.queued&&(L.queued=!1,L.rendered=!1,we())}}}var st=!1,dt=!1;function mt(){dt||(dt=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var t=R(r.href);!t||t.length<3||Lr(t)}},!0))}var ct=!1,pt=typeof location!="undefined"?location.pathname:"";function Xe(){try{if(location.pathname===pt)return;pt=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(t){}}function li(){if(!ct){ct=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var t=e.apply(this,arguments);return Xe(),t},history.replaceState=function(){var t=r.apply(this,arguments);return Xe(),t},window.addEventListener("popstate",Xe),window.addEventListener("hashchange",Xe)}}function xr(){if(li(),window.IkasEvents){if(st)return;st=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var s=n.data&&n.data.productDetails;Array.isArray(s)&&s.forEach(function(o){o&&o.metaData&&o.metaData.slug&&o.name&&(_e[o.metaData.slug]=o.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,d=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(N("ikr_reviews_"+M+"_"+l,""),ye(l,d))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(L.lastPageView&&c-L.lastPageView<800)return;L.lastPageView=c,L.navCleanup=!0,L.rendered=!1,we()}}});var e=gr();if(e)ye(e.id,e.name);else{let n=function(){var s=gr();s?ye(s.id,s.name):r<20&&(r++,setTimeout(n,100))};var i=n,r=0;setTimeout(n,100)}setTimeout(function(){L.rendered||we()},2e3)}else{let n=function(){window.IkasEvents?xr():t<100&&(t++,setTimeout(n,50))};var a=n,t=0;setTimeout(n,50)}}var ut=null;function ft(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var t=r.some(function(i){return Array.from(i.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});t&&(clearTimeout(ut),ut=setTimeout(function(){var i=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=R(a.href);return n&&n.length>=3&&!Ue.test(n)});i&&(L.rendered=!1,we())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var si=window.__ikasPreviewMode===!0;if(si){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(t){}},r=function(){ye("mock-product","\xD6rnek \xDCr\xFCn"),e()};di=e,ci=r,window.addEventListener("message",function(t){var i=t.data;if(!(!i||i.type!=="IKR_SETTINGS_UPDATE")){var a=i.settings;if(!(!a||!B)){var n=Object.assign({},B,a);re(Q,n,tr,he,K,Le)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(M){let e=function(){xr(),mt(),ft()};pi=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var di,ci,pi;})();
