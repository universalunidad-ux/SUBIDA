 // main.js (al inicio)
if (/[?&]freeze=1\b/.test(location.search)) {
  document.body.classList.add('debug-freeze');
}

/* =========================================================
 ExpIRI Ti - main.js (FINAL) v2026.01.08-r2 (COMPACTO + COMENTARIOS)
 - FIX: evita que 1 error rompa TODO (módulos con try/catch)
 - FIX: bloque 10 (CALC) rearmado (cierre de llaves seguro)
 - GATE: Calc/Compact/Icons solo si DOM esperado existe
========================================================= */
window.__EXP_SAFE__=/(?:\?|&)safe=1\b/.test(location.search);

(()=>{"use strict";
if(window.__EXP_SAFE__){console.warn("[SAFE MODE] main.js detenido");return;}
if(window.__EXP_MAIN_FINAL__)return;window.__EXP_MAIN_FINAL__=1;

const D=document,W=window;
const TRY=(name,fn)=>{try{fn()}catch(e){console.warn("[main.js] módulo falló:",name,e)}};

      /* 0) BASE PROD ROOT */
TRY("base_prod",()=>{const abs=p=>{if(!p)return p;if(/^https?:\/\//i.test(p)||/^(mailto:|tel:|data:|blob:|javascript:)/i.test(p))return p;if(p.startsWith("/"))return p;if(p.startsWith("../"))return"/"+p.replace(/^(\.\.\/)+/,"");if(p.startsWith("./"))return"/"+p.replace(/^\.\//,"");return"/"+p};W.__EXP_ABS__=abs;W.__EXP_BASE__="/";const y=D.getElementById("gf-year")||D.getElementById("year");if(y)y.textContent=(new Date).getFullYear()});
      

/* =========================================================
 1.5) CATALOGO SISTEMAS (GLOBAL)
========================================================= */
TRY("catalog_sistemas",()=>{const W=window;W.CATALOG_SISTEMAS=[{name:"CONTPAQi Contabilidad",img:"IMG/contabilidadsq.webp",imgLogo:"IMG/contabilidad.webp"},{name:"CONTPAQi Bancos",img:"IMG/bancossq.webp",imgLogo:"IMG/bancos.webp"},{name:"CONTPAQi Nóminas",img:"IMG/nominassq.webp",imgLogo:"IMG/nominas.webp"},{name:"CONTPAQi XML en Línea",img:"IMG/xmlsq.webp",imgLogo:"IMG/xml.webp",noDiscount:!0},{name:"CONTPAQi Comercial START",img:"IMG/comercialstartsq.webp",imgLogo:"IMG/comercialstart.webp"},{name:"CONTPAQi Comercial PRO",img:"IMG/comercialprosq.webp",imgLogo:"IMG/comercialpro.webp"},{name:"CONTPAQi Comercial PREMIUM",img:"IMG/comercialpremiumsq.webp",imgLogo:"IMG/comercialpremium.webp"},{name:"CONTPAQi Factura Electrónica",img:"IMG/facturasq.webp",imgLogo:"IMG/factura.webp"}].map(x=>({...x,img:(W.__EXP_ABS__?W.__EXP_ABS__(x.img):x.img),imgLogo:(W.__EXP_ABS__?W.__EXP_ABS__(x.imgLogo):x.imgLogo)}))});
TRY("pricing_nube_json",()=>{const Q=(s,c=D)=>c.querySelector(s),money=n=>"$"+Number(n||0).toLocaleString("es-MX"),txt=v=>v===undefined||v===null?"—":String(v),isNube=()=>D.body&&D.body.getAttribute("data-calc")==="nube",PR=()=>W.preciosContpaqi||null,recommendedBySystem={"CONTPAQi Evalúa":"Equipos","CONTPAQi Contabiliza":"Equipos","CONTPAQi Personia":"Equipos","CONTPAQi Analiza":"Equipos","CONTPAQi Optimiza":"Equipos","CONTPAQi Anticipa":"Equipos","CONTPAQi Vende":"Equipos"},descBySystem={"CONTPAQi Evalúa":{Inicial:"Ideal para comenzar evaluación laboral",Equipos:"Para áreas o equipos medianos",Empresarial:"Para operación más amplia",Corporativo:"Máxima capacidad y cobertura"},"CONTPAQi Contabiliza":{Inicial:"Ideal para operación básica",Equipos:"Más capacidad para crecer",Empresarial:"Para empresas medianas",Corporativo:"Administración avanzada"},"CONTPAQi Personia":{Inicial:"Ideal para pequeñas empresas",Equipos:"Más capacidad para crecer",Empresarial:"Para empresas medianas",Corporativo:"Administración avanzada"},"CONTPAQi Analiza":{Trial:"Prueba 20 días",Inicial:"Para iniciar BI con CONTPAQi",Equipos:"Colaboración y más RFC",Empresarial:"Para operación multiárea",Corporativo:"Máxima capacidad"},"CONTPAQi Optimiza":{Demo:"Prueba 20 días",Inicial:"Control esencial de flujo",Equipos:"Visión estratégica PYME",Empresarial:"Mayor capacidad operativa",Corporativo:"Poder total e ilimitado"},"CONTPAQi Anticipa":{Demo:"Prueba 20 días",Inicial:"Protección inicial",Equipos:"Más RFC y colaboración",Empresarial:"Para operación multiárea",Corporativo:"Cobertura avanzada"},"CONTPAQi Vende":{LIGHT:"Entrada / operaciones básicas",Inicial:"Para facturar y cobrar sin complicarte",Equipos:"Para operar con 2 usuarios",Empresarial:"Operación multiusuario",Corporativo:"Máxima capacidad"}},recBadge=(sys,plan)=>recommendedBySystem[sys]===plan?`<span class="plan-rec">Recomendado</span>`:"",planLabel=(sys,plan)=>`<span class="plan-name">${plan}${recBadge(sys,plan)}${descBySystem[sys]&&descBySystem[sys][plan]?`<div class="plan-desc">${descBySystem[sys][plan]}</div>`:""}</span>`,row=(cells,cls="")=>`<tr${cls?` class="${cls}"`:""}>${cells.map(x=>`<td>${x}</td>`).join("")}</tr>`,noteText=html=>`<div class="pricing-table-note">${html}</div>`,wrapTable=(thead,tbody,tfoot="",after="",note="")=>`<div class="pricing-table-nube-wrap"><table class="pricing-table-nube" aria-describedby="calc">${thead}<tbody>${tbody}</tbody>${tfoot}</table></div>${after}${note}`,extrasBar=items=>items&&items.length?`<div class="pricing-nube-extras">${items.map(x=>`<div class="pricing-nube-extra"><div><span class="k">${x.k}</span>${x.v?`<span class="v">${x.v}</span>`:""}</div><span class="price">${x.p}</span></div>`).join("")}</div>`:"",NOTE="Precios en Moneda Nacional (MXN) + IVA, conforme a la lista de precios CONTPAQi 2026.",builders={"CONTPAQi Evalúa":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Evalúa",k),txt(x.usuarios_incluidos==="multi"?"Multiusuario":x.usuarios_incluidos),`${txt(x.empleados_incluidos)} empleados`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"");x.empleado_adicional&&extras.push({k:`Empleado adicional ${k}`,v:"Costo por empleado",p:money(x.empleado_adicional)})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios incluidos</th><th>Empleados incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Contabiliza":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Contabiliza",k),`${txt(x.usuarios_incluidos)} Usuario${Number(x.usuarios_incluidos)===1?"":"s"}`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Personia":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Personia",k),txt(x.usuarios_incluidos==="multi"?"Multiusuario":x.usuarios_incluidos),`${txt(x.empleados_incluidos)} empleados`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"");x.empleado_adicional&&extras.push({k:`Empleado adicional ${k}`,v:"Costo por empleado",p:money(x.empleado_adicional)})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th>Empleados Incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Analiza":p=>{const n=p.nube||{},o=["Trial","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Analiza",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),txt(x.carga_xml==="ilimitado"?"Ilimitado":x.carga_xml),`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&typeof n.rfc_adicional==="object"&&["Inicial","Equipos","Empresarial","Corporativo"].forEach(k=>{n.rfc_adicional[k]&&extras.push({k:`RFC adicional ${k}`,v:"Costo anual",p:money(n.rfc_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th>Carga XML</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Optimiza":p=>{const n=p.nube||{},o=["Demo","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Optimiza",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),`${txt(x.almacenamiento_gb)} GB`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&extras.push({k:"RFC adicional",v:"Costo anual",p:money(n.rfc_adicional)});n.espacio_adicional&&typeof n.espacio_adicional==="object"&&Object.keys(n.espacio_adicional).forEach(k=>{extras.push({k:`Espacio adicional ${k}`,v:"Almacenamiento extra",p:money(n.espacio_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th>Almacenamiento</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Anticipa":p=>{const n=p.nube||{},o=["Demo","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Anticipa",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&typeof n.rfc_adicional==="object"&&["Inicial","Equipos","Empresarial","Corporativo"].forEach(k=>{n.rfc_adicional[k]&&extras.push({k:`RFC adicional ${k}`,v:"Costo anual",p:money(n.rfc_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Vende":p=>{const n=p.nube||{},o=["LIGHT","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;const m={LIGHT:"Funciones esenciales",Inicial:"Para la mayoría de PyMEs",Equipos:"Mejor para equipos",Empresarial:"Para equipos con más volumen",Corporativo:"Operación avanzada"};b+=row([planLabel("CONTPAQi Vende",k),`${txt(x.usuarios_incluidos)} Usuario${Number(x.usuarios_incluidos)===1?"":"s"}`,m[k]||"—",`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Licenciamiento anual",p:money(n.usuario_adicional)});n.addendas===!0&&extras.push({k:"Addendas",v:"Incluidas",p:"Sin costo"});n.complementos===!0&&extras.push({k:"Complementos",v:"Incluidos",p:"Sin costo"});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th>Notas</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))}},render=()=>{if(!isNube())return;const a=Q("#app"),s=Q("#calculadora-section"),d=PR();if(!a||!s||!d)return;const sys=(a.dataset.system||"").trim();if(!sys)return;const product=d[sys],build=builders[sys];if(!product||!product.nube||typeof build!=="function")return;Q(".hint",s)?.remove();Q(".hint",Q(".card.body",s)||s)?.remove();const card=Q(".card.body",s);if(!card)return;const html=build(product);if(!html)return;const oldWrap=Q(".pricing-table-nube-wrap",card),oldExtras=Q(".pricing-nube-extras",card),oldNote=Q(".pricing-table-note",card),oldTable=Q(".pricing-table-nube",card);if(oldWrap){oldWrap.outerHTML=html;oldExtras&&oldExtras.remove();oldNote&&oldNote.remove()}else if(oldTable){oldTable.outerHTML=html;oldExtras&&oldExtras.remove();oldNote&&oldNote.remove()}else card.insertAdjacentHTML("afterbegin",html)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",render,{once:!0}):render();W.addEventListener("pageshow",render,{passive:!0})});TRY("pricing_nube_refine",()=>{const mark=()=>{D.querySelectorAll(".pricing-table-nube").forEach(t=>{const rows=[...t.querySelectorAll("tbody tr")];let cut=!1;rows.forEach(r=>{r.classList.remove("first-extra");if(r.classList.contains("row-soft")&&!cut){r.classList.add("first-extra");cut=!0}})})};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",mark,{once:!0}):mark();W.addEventListener("pageshow",mark,{passive:!0})});

/* =========================================================
 2) VIDEOS: AGRUPAR EN SLIDES DE 2 (solo si existe #carouselVideos)
========================================================= */
TRY("videos_group2",()=>{
  const q=(s,c=D)=>c.querySelector(s),qa=(s,c=D)=>Array.from(c.querySelectorAll(s));

  const groupVideos2=()=>{
    const car=D.getElementById("carouselVideos");
    if(!car||car.dataset.grp2==="1")return;

    const track=q(".carousel-track",car);
    if(!track){car.dataset.grp2="1";return;}

    if(qa(":scope > .carousel-slide",track).length){car.dataset.grp2="1";return;}

    const kids=qa(":scope > *",track).filter(n=>n&&n.nodeType===1);
    const items=kids.filter(n=>!n.classList.contains("carousel-nav")&&!n.classList.contains("yt-titlesbar"));
    if(!items.length){car.dataset.grp2="1";return;}

    track.innerHTML="";
    for(let i=0;i<items.length;i+=2){
      const slide=D.createElement("div");
      slide.className="carousel-slide vid-slide";
      slide.appendChild(items[i]);
      if(items[i+1]) slide.appendChild(items[i+1]);
      else slide.classList.add("is-single");
      track.appendChild(slide);
    }

    car.dataset.grp2="1";
    if(car._grpObs){ try{car._grpObs.disconnect()}catch{} car._grpObs=null; }
  };

  const boot=()=>groupVideos2();

  D.readyState==="loading"
    ? D.addEventListener("DOMContentLoaded",boot,{once:!0})
    : boot();

  W.addEventListener("load",boot,{passive:!0});
  W.addEventListener("pageshow",boot,{passive:!0});

  const car=D.getElementById("carouselVideos");
  if(car && !car._grpObs){
    car._grpObs=new MutationObserver(()=>groupVideos2());
    car._grpObs.observe(car,{childList:!0,subtree:!0});
  }
});

/* =========================================================
 3) YOUTUBE MANAGER (pause real + lazy + hook iframes)
========================================================= */
TRY("yt_manager",()=>{
  if(W.__EXP_YT_MGR__)return;W.__EXP_YT_MGR__=1;W.exPlayers=W.exPlayers||[];
  W.pauseAllYTIframes=function(except){
    (W.exPlayers||[]).forEach(p=>{
      if(!p||p===except||typeof p.pauseVideo!=="function")return;
      try{const s=p.getPlayerState();if(s===1||s===3)p.pauseVideo()}catch{}
    });
  };
  const onState=e=>{if(e&&e.data===1)W.pauseAllYTIframes(e.target)};
  const ensureAPI=()=>{if(W.__EXP_YT_API_REQ__)return;W.__EXP_YT_API_REQ__=1;const s=D.createElement("script");s.src="https://www.youtube.com/iframe_api";D.head.appendChild(s)};
  const whenYT=cb=>{if(W.YT&&W.YT.Player){cb();return}ensureAPI();let t=0;const it=setInterval(()=>{t++;if(W.YT&&W.YT.Player){clearInterval(it);cb();return}if(t>80)clearInterval(it)},100)};
  const registerIframe=ifr=>{
    if(!ifr||ifr.dataset.ytInit)return;ifr.dataset.ytInit="1";
    let src=ifr.src||"";
    if(src&&!src.includes("enablejsapi=1")){src+=(src.includes("?")?"&":"?")+"enablejsapi=1";ifr.src=src}
    try{const p=new YT.Player(ifr,{events:{onStateChange:onState}});W.exPlayers.push(p)}catch{}
  };
const poster=id=>[
  `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi_webp/${id}/sddefault.webp`,
  `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
  `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  `https://i.ytimg.com/vi_webp/${id}/mqdefault.webp`,
  `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  `https://i.ytimg.com/vi_webp/${id}/default.webp`,
  `https://i.ytimg.com/vi/${id}/default.jpg`
];

  const markReady=wrap=>{if(!wrap||!wrap.classList)return;wrap.classList.add("is-ready","has-iframe")};

  const mountLazy=wrap=>{
    if(!wrap||wrap.dataset.ytMounted)return;
    const existing=wrap.querySelector("iframe");
    if(existing){
      wrap.dataset.ytMounted="1";wrap.classList.add("has-iframe");
      existing.addEventListener("load",()=>markReady(wrap),{once:!0});setTimeout(()=>markReady(wrap),120);
      whenYT(()=>registerIframe(existing));
      return;
    }
    const id=wrap.getAttribute("data-ytid");if(!id)return;
    wrap.dataset.ytMounted="0";
    if(!wrap.style.position||wrap.style.position==="static")wrap.style.position="relative";
    wrap.style.overflow="hidden";wrap.style.backgroundColor="#000";

    const img=D.createElement("img");
    img.alt="Miniatura de video";img.loading="lazy";
    img.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;cursor:pointer";
const srcs=poster(id);
let k=0;
    img.setAttribute("referrerpolicy","origin");
img.style.imageRendering="auto";
const next=()=>{
  if(k < srcs.length){ img.src = srcs[k++]; return; }
  wrap.classList.add("yt-no-thumb");
};
img.addEventListener("error", next);
next();


    wrap.appendChild(img);

    const btn=D.createElement("button");
    btn.type="button";btn.setAttribute("aria-label","Reproducir video");
    btn.style.cssText="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:none;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center";
    btn.innerHTML='<svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true"><rect x="1" y="7" width="66" height="36" rx="12" fill="#FF0000"></rect><polygon points="28,17 28,31 42,24" fill="#FFFFFF"></polygon></svg>';
    wrap.appendChild(btn);

    const load=()=>{
      if(wrap.dataset.ytMounted==="1")return;wrap.dataset.ytMounted="1";
      W.pauseAllYTIframes();
      wrap.innerHTML="";
      const ifr=D.createElement("iframe");
      ifr.loading="lazy";
      ifr.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      ifr.allowFullscreen=!0;
      ifr.title=wrap.getAttribute("data-title")||"YouTube video";
      ifr.src=`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1&enablejsapi=1&vq=hd1080`;
      wrap.appendChild(ifr);wrap.classList.add("has-iframe");
      ifr.addEventListener("load",()=>markReady(wrap),{once:!0});setTimeout(()=>markReady(wrap),200);
      whenYT(()=>registerIframe(ifr));
    };
    btn.addEventListener("click",load);img.addEventListener("click",load);
  };

  const init=()=>{
    D.querySelectorAll(".yt-wrap[data-ytid],.reel-embed[data-ytid]").forEach(mountLazy);
    D.querySelectorAll('iframe[src*="youtube"],iframe[src*="youtube-nocookie"]').forEach(ifr=>{
      const wrap=ifr.closest(".yt-wrap,.reel-embed");
      if(wrap){ifr.addEventListener("load",()=>markReady(wrap),{once:!0});setTimeout(()=>markReady(wrap),120)}
      whenYT(()=>registerIframe(ifr));
    });
  };

  const prevReady=W.onYouTubeIframeAPIReady;
  W.onYouTubeIframeAPIReady=function(){
    try{prevReady&&prevReady()}catch{}
    D.querySelectorAll('iframe[src*="youtube"],iframe[src*="youtube-nocookie"]').forEach(registerIframe);
  };

  D.readyState==="loading"?D.addEventListener("DOMContentLoaded",init,{once:!0}):init();
});

/* =========================================================
 4) CARRUSEL UNIVERSAL (.carousel)
========================================================= */
TRY("carousel_universal",()=>{const pause=()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes()};const syncDots=(r,l)=>{const n=r.querySelector(".carousel-nav");if(!n)return[];let d=[...n.querySelectorAll(".dot")];for(;d.length<l;){const b=D.createElement("button");b.type="button";b.className="dot";b.setAttribute("aria-label",`Ir al slide ${d.length+1}`);n.appendChild(b);d.push(b)}for(;d.length>l;){const x=d.pop();x&&x.remove()}return d};const hideUI=(r,l)=>{const p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),v=r.querySelector(".carousel-nav"),s=l<=1;if(p){p.disabled=s;p.style.display=s?"none":""}if(n){n.disabled=s;n.style.display=s?"none":""}if(v)v.style.display=s?"none":"";r.toggleAttribute("data-single",s)};const titlesFor=c=>{const sel=c.getAttribute("data-titles");if(sel){const n=[...D.querySelectorAll(sel)];if(n.length)return n}const a=c.closest("aside");if(a){const t=[...a.querySelectorAll(":scope > .reel-title")];return t.length?t:null}const p=c.parentElement||D,t=[...p.querySelectorAll(".reel-title")];return t.length?t:null};const slideReelTitle=s=>{if(!s)return"";const w=s.querySelector(".reel-embed[data-title],.yt-wrap[data-title]");if(w){const x=(w.getAttribute("data-title")||"").trim();if(x)return x}const i=s.querySelector("iframe[title]");if(i){const x=(i.getAttribute("title")||"").trim();if(x)return x}const h=s.querySelector("h4,h3");return h?(h.textContent||"").trim():""};const applyMarquee=h=>{if(!h)return;if(h.dataset.mqInit==="1")return;const t=(h.textContent||"").trim();if(!t)return;h.textContent=t;if(h.dataset.mqTouch!=="1"){h.dataset.mqTouch="1";h.addEventListener("pointerdown",()=>{h.classList.add("mq-paused")},{passive:!0});h.addEventListener("pointerup",()=>{setTimeout(()=>h.classList.remove("mq-paused"),600)},{passive:!0});h.addEventListener("pointercancel",()=>{h.classList.remove("mq-paused")},{passive:!0});h.addEventListener("touchstart",()=>{h.classList.add("mq-paused")},{passive:!0});h.addEventListener("touchend",()=>{setTimeout(()=>h.classList.remove("mq-paused"),600)},{passive:!0})}requestAnimationFrame(()=>{const sw=h.scrollWidth,cw=h.clientWidth;if(sw<=cw+8){h.classList.remove("is-marquee");return}const tr=document.createElement("span");tr.className="__mqTrack";const a=document.createElement("span");a.textContent=t;const b=document.createElement("span");b.textContent=t;tr.append(a,b);h.innerHTML="";h.appendChild(tr);h.style.setProperty("--mq-dur",Math.min(18,Math.max(10,t.length*.22))+"s");h.classList.add("is-marquee");h.dataset.mqInit="1"})};const ensureVideosBar=c=>{if(!c||c.dataset.vbarInit==="1")return;c.dataset.vbarInit="1";const t=c.querySelector(".carousel-track");if(!t)return;const bar=D.createElement("div");bar.className="yt-titlesbar";bar.setAttribute("role","presentation");const l=D.createElement("div"),r=D.createElement("div");l.className="yt-tab";r.className="yt-tab";bar.append(l,r);t.parentElement.insertBefore(bar,t);c._vbar={bar,left:l,right:r}};const slideVideoTitles=s=>{if(!s)return[];const h=[...s.querySelectorAll(".yt-title")].map(x=>(x.textContent||"").trim()).filter(Boolean);if(h.length)return h;const d=[...s.querySelectorAll(".yt-wrap[data-title],.reel-embed[data-title]")].map(x=>(x.getAttribute("data-title")||"").trim()).filter(Boolean);if(d.length)return d;return[...s.querySelectorAll("iframe[title]")].map(x=>(x.getAttribute("title")||"").trim()).filter(Boolean)};const updateVideosBar=(c,i)=>{if(!c||c.id!=="carouselVideos")return;ensureVideosBar(c);c.querySelectorAll(".yt-title").forEach(h=>h.classList.add("yt-title--hidden"));const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[];if(!s.length)return;const sl=s[i]||s[0],tt=slideVideoTitles(sl),a=tt[0]||"",b=tt[1]||"",v=c._vbar;if(!v)return;v.left.textContent=a;v.right.textContent=b;v.right.style.display=b?"":"none";v.bar.style.gridTemplateColumns=b?"1fr 1fr":"1fr"};const initCar=(r,onChange)=>{const t=r.querySelector(".carousel-track");if(!t||r.dataset.cInit==="1")return;r.dataset.cInit="1";const p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),s=[...t.querySelectorAll(":scope > .carousel-slide")],l=s.length;let d=syncDots(r,l);hideUI(r,l);let i=0,lock=0;const paint=x=>d.forEach((o,k)=>o.classList.toggle("active",k===x)),leftFor=x=>(s[x]?.offsetLeft)||0,set=(x,b)=>{if(l<=0)return;i=(x+l)%l;paint(i);lock=1;t.scrollTo({left:leftFor(i),behavior:b||"smooth"});setTimeout(()=>{lock=0},120);onChange&&onChange(i)};if(l<=1){paint(0);onChange&&onChange(0);return}d.forEach((o,k)=>o.addEventListener("click",()=>{pause();set(k)}));p&&p.addEventListener("click",()=>{pause();set(i-1)});n&&n.addEventListener("click",()=>{pause();set(i+1)});t.addEventListener("scroll",()=>{if(lock)return;const pos=t.scrollLeft;let best=0,dist=1e18;for(let k=0;k<l;k++){const dd=Math.abs(leftFor(k)-pos);if(dd<dist){dist=dd;best=k}}if(best!==i){i=best;paint(i);onChange&&onChange(i)}},{passive:!0});set(0,"auto")};const boot=()=>{D.querySelectorAll(".carousel").forEach(c=>{const titles=titlesFor(c);initCar(c,i=>{if(titles&&c.id!=="carouselVideos"){const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[],sl=s[i]||s[0];if(titles.length===1){const txt=slideReelTitle(sl);if(txt){titles[0].dataset.mqInit="0";titles[0].textContent=txt;applyMarquee(titles[0])}titles[0].classList.add("active")}else titles.forEach((x,k)=>x.classList.toggle("active",k===i))}if(c.id==="carouselVideos")updateVideosBar(c,i)});if(titles&&c.id!=="carouselVideos"&&titles.length===1){const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[],txt=slideReelTitle(s[0]);if(txt){titles[0].dataset.mqInit="0";titles[0].textContent=txt;applyMarquee(titles[0])}titles[0].classList.add("active")}if(c.id==="carouselVideos")updateVideosBar(c,0)})};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:!0}):boot()});
      

/* =========================================================
 6) LIST SLIDER (.listSlider)
========================================================= */
TRY("listSlider",()=>{
  D.querySelectorAll(".listSlider").forEach(w=>{
    const t=w.querySelector(".listTrack"),p=w.querySelector(".arrowCircle.prev"),n=w.querySelector(".arrowCircle.next");
    if(!t||!p||!n)return;
    let i=0,len=t.children.length||1;
    const go=x=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();i=(x+len)%len;t.scrollTo({left:w.clientWidth*i,behavior:"smooth"})};
    p.addEventListener("click",()=>go(i-1));
    n.addEventListener("click",()=>go(i+1));
    W.addEventListener("resize",()=>go(i),{passive:!0});
  });
});

/* =========================================================
 9) CAROUSEL SISTEMAS (.carouselX) — SINGLE OWNER
========================================================= */
TRY("carouselX",()=>{
  const QA=(s,c=D)=>Array.from(c.querySelectorAll(s));
  const abs=p=>W.__EXP_ABS__?W.__EXP_ABS__(p):p;
  const ensureUI=r=>{
    let p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),d=r.querySelector(".group-dots");
    if(!p){p=D.createElement("button");p.type="button";p.className="arrowCircle prev";p.setAttribute("aria-label","Anterior");p.innerHTML='<span class="chev">‹</span>';r.appendChild(p)}
    if(!n){n=D.createElement("button");n.type="button";n.className="arrowCircle next";n.setAttribute("aria-label","Siguiente");n.innerHTML='<span class="chev">›</span>';r.appendChild(n)}
    if(!d){d=D.createElement("div");d.className="group-dots";d.setAttribute("aria-label","Paginación carrusel");r.appendChild(d)}
    return{p,n,d};
  };

  QA(".carouselX").forEach(root=>{
    if(root.dataset.cxInit==="1")return;root.dataset.cxInit="1";
    const track=root.querySelector(".track");if(!track)return;
    const items=QA(".sys",root);if(!items.length)return;
    const ui=ensureUI(root),prev=ui.p,next=ui.n,dotsWrap=ui.d;
    const isMob=()=>W.matchMedia&&W.matchMedia("(max-width: 768px)").matches;

items.forEach(it=>{
  it.setAttribute("role","link");
  it.setAttribute("tabindex","0");

  const nav=()=>{
    const href=it.getAttribute("data-href");
    if(!href)return;
    location.href=abs(href);
  };

  it.addEventListener("touchstart",()=>{
    if(isMob()) it.classList.add("show-hover");
  },{passive:true});

  it.addEventListener("touchend",()=>{
    if(isMob()) setTimeout(()=>it.classList.remove("show-hover"),180);
  },{passive:true});

  it.addEventListener("click",e=>{
    e.preventDefault();
    nav();
  },{passive:false});

  it.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      nav();
    }
  });
});
    const perView=()=>W.innerWidth<=980?1:3;
    const vw=()=>track.clientWidth||root.clientWidth||1;
    const pages=()=>Math.max(1,Math.ceil((track.scrollWidth-1)/vw()));

    let idx=0,dots=[];
    const build=()=>{
      dotsWrap.innerHTML="";
      const total=pages();
      dots=Array.from({length:total}).map((_,j)=>{
        const b=D.createElement("button");b.type="button";b.className="dot"+(j===0?" active":"");
        b.setAttribute("aria-label","Ir a página "+(j+1));
        b.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(j)},{passive:!0});
        dotsWrap.appendChild(b);
        return b;
      });
    };
    const paint=j=>dots.forEach((d,i)=>d.classList.toggle("active",i===j));
    const toggle=()=>{
      const few=items.length<3;
      if(few){
        prev.style.display="none";next.style.display="none";dotsWrap.style.display="none";
        track.style.justifyContent="center";track.style.scrollSnapType="none";track.style.overflowX="hidden";
        return;
      }
      track.style.justifyContent="flex-start";track.style.overflowX="auto";
      const multi=pages()>1;
      prev.style.display=multi?"":"none";next.style.display=multi?"":"none";dotsWrap.style.display=multi?"":"none";
    };
    const go=j=>{
      const total=pages();idx=((j%total)+total)%total;
      const start=Math.min(idx*perView(),items.length-1),el=items[start];
      const base=idx===0?0:(el?el.offsetLeft-(track.firstElementChild?track.firstElementChild.offsetLeft:0):idx*vw());
      const max=Math.max(0,track.scrollWidth-vw());
      track.scrollTo({left:Math.min(Math.max(0,base),max),behavior:"smooth"});
      paint(idx);toggle();
    };

    build();toggle();go(0);

    prev.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(idx-1)},{passive:!0});
    next.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(idx+1)},{passive:!0});
    track.addEventListener("scroll",()=>{const w=vw();if(!w)return;const i=Math.round(track.scrollLeft/w);if(i!==idx){idx=Math.max(0,Math.min(pages()-1,i));paint(idx)}},{passive:!0});
    W.addEventListener("resize",()=>{const now=pages();if(dots.length!==now)build();toggle();requestAnimationFrame(()=>go(idx))},{passive:!0});
    requestAnimationFrame(()=>{track.scrollTo({left:0,behavior:"auto"});idx=0;paint(0);toggle()});
    W.addEventListener("pageshow",e=>{if(e&&e.persisted){track.scrollTo({left:0,behavior:"auto"});idx=0;paint(0);toggle()}});
  });
});
/* =========================================================
 7) PÍLDORAS (filtros cards)
========================================================= */
TRY("pills",()=>{const Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>Array.from(c.querySelectorAll(s)),C="__span2",upd=s=>{const g=Q(".feature-grid",s);if(!g)return;const c=QA(".fcard",g);c.forEach(x=>x.classList.remove(C));const v=c.filter(x=>x.offsetParent!==null&&getComputedStyle(x).display!=="none"&&!x.hidden);v.length&&v.length%2===1&&v[v.length-1].classList.add(C)};QA("#caracteristicas").forEach(s=>{const pills=QA(".pillbar .pill",s),g=Q(".feature-grid",s);if(!pills.length||!g)return;const cards=QA(".fcard",g),apply=t=>{cards.forEach(x=>x.style.display=!t||x.classList.contains("tag-"+t)?"":"none");upd(s)};pills.forEach(p=>p.addEventListener("click",()=>{pills.forEach(x=>x.classList.remove("active"));p.classList.add("active");apply(p.dataset.filter||"")}));const first=pills[0];first?(first.classList.add("active"),apply(first.dataset.filter||"")):upd(s)})});


/* =========================================================
 8) FAQ (solo uno abierto)
========================================================= */
TRY("faq",()=>{
  const wrap=D.getElementById("faqWrap");if(!wrap)return;
  [...wrap.querySelectorAll(".faq-item")].forEach(it=>it.addEventListener("toggle",()=>{
    if(!it.open)return;
    [...wrap.querySelectorAll(".faq-item")].forEach(o=>{if(o!==it)o.removeAttribute("open")});
  }));
});

/* 10) CALCULADORA — COMPAT (ANTI-LOOP) */
TRY("calc_hooks",()=>{const has=()=>{const a=D.getElementById("app");return!!(a&&((a.dataset.system||"").trim())&&D.getElementById("calc-row"))},kick=()=>{if(!has())return;try{W.dispatchEvent(new Event("calc-recompute"))}catch{}};if(W.__EXP_CALC_KICKED__)return;W.__EXP_CALC_KICKED__=1;D.readyState==="loading"?D.addEventListener("DOMContentLoaded",kick,{once:!0}):kick()});

/* 10.5) ICONS CAROUSEL (-15%) — DEBOUNCE + THROTTLE */
TRY("icons_carousel",()=>{const has=()=>{const a=D.getElementById("app");return!!(a&&((a.dataset.system||"").trim())&&D.getElementById("calc-row"))},enhance=wrap=>{if(!wrap)return;const ensure=()=>{if(wrap.dataset.icInit==="1")return;if(!wrap.querySelector(".sys-icon"))return;wrap.dataset.icInit="1";const slot=wrap.closest("#calc-slot-2,.calc-container,.placeholder")||wrap.parentElement,note=slot&&slot.querySelector?slot.querySelector(".note"):null;note&&note.classList.add("note-center");let host=wrap.closest(".icons-carousel");host||(host=D.createElement("div"),host.className="icons-carousel",wrap.parentElement.insertBefore(host,wrap),host.appendChild(wrap));const mk=(cls,lab,chev)=>{const b=D.createElement("button");return b.type="button",b.className=`arrowCircle ${cls}`,b.setAttribute("aria-label",lab),b.innerHTML=`<span class="chev">${chev}</span>`,b},step=()=>Math.max(220,Math.round(((wrap.querySelector(".sys-icon")?.offsetWidth)||200)+18)),scroll=dir=>wrap.scrollBy({left:step()*dir,behavior:"smooth"});let prev=host.querySelector(".arrowCircle.prev"),next=host.querySelector(".arrowCircle.next");prev||(prev=mk("prev","Anterior","‹"),host.appendChild(prev));next||(next=mk("next","Siguiente","›"),host.appendChild(next));prev.onclick=()=>scroll(-1);next.onclick=()=>scroll(1);let raf=0;const paint=()=>{raf=0;const can=wrap.scrollWidth>wrap.clientWidth+4;prev.style.display=can?"":"none";next.style.display=can?"":"none";const c=wrap.closest(".calc-container")||slot;c&&c.classList.toggle("has-icons",wrap.children.length>0)},paintQ=()=>{raf||(raf=requestAnimationFrame(paint))};paintQ();if(!wrap.dataset.icResize){wrap.dataset.icResize="1";W.addEventListener("resize",paintQ,{passive:!0})}let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(paintQ,80)}).observe(wrap,{childList:!0,subtree:!1})};if(!wrap.dataset.icObs){wrap.dataset.icObs="1";let t2=0;new MutationObserver(()=>{clearTimeout(t2);t2=setTimeout(ensure,80)}).observe(wrap,{childList:!0,subtree:!1})}ensure()},boot=()=>{if(!has())return;enhance(D.getElementById("icons-sec-sys"));enhance(D.getElementById("icons-third-sys"))};let lock=0;const bootQ=()=>{if(lock)return;lock=1;setTimeout(()=>{lock=0;boot()},120)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",bootQ,{once:!0}):bootQ();W.addEventListener("calc-render",bootQ,{passive:!0})});

      /* =========================================================
 13) TOC (FIX “no abre”)
========================================================= */
TRY("toc",()=>{const e=D.getElementById("toc");if(!e)return;const t=D.getElementById("tocToggle")||e.querySelector(".toc-toggle"),n=e.querySelector(".toc-close"),c=Array.from(e.querySelectorAll("a[href^='#']")),O="open",R="collapsed",isOpen=()=>e.classList.contains(O)&&!e.classList.contains(R),set=a=>{e.classList.toggle(O,!!a);e.classList.toggle(R,!a);e.setAttribute("aria-hidden",a?"false":"true");t&&t.setAttribute("aria-expanded",a?"true":"false")},open=()=>set(!0),close=()=>set(!1),toggle=()=>isOpen()?close():open();set(!e.classList.contains(R));t&&t.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();toggle()},{passive:!1});n&&n.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();close()},{passive:!1});c.forEach(a=>a.addEventListener("click",close,{passive:!0}));D.addEventListener("keydown",ev=>{if(ev.key==="Escape")close()});D.addEventListener("click",ev=>{if(!isOpen())return;const trg=ev.target;if(e.contains(trg))return;if(t&&t.contains(trg))return;close()})});

})(); /* FIN IIFE PRINCIPAL */

(()=>{try{const o=()=>{const abs=window.__EXP_ABS__||((t)=>t),app=document.getElementById("app");if(!app)return;const sys=(app.dataset.system||"").trim(),pdf=(app.dataset.pdf||"").trim(),wa=t=>"https://wa.me/5568437918?text="+encodeURIComponent(t),pdfFile=pdf||"AQUI_TU_ARCHIVO.pdf",pdfUrl=abs(`fichas/${pdfFile}`);if(document.getElementById("toc-actions"))return;const el=document.createElement("aside");el.id="toc-actions";el.className="toc collapsed";el.style.cssText="position:fixed;right:16px;bottom:72px;z-index:9999";el.innerHTML=`<button class="toc-toggle" aria-expanded="false" title="Más acciones">⚡</button><div class="toc-panel" hidden><a href="${wa(`Hola Expiriti, quiero comprar mi licencia de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Compra ahora</a><a href="${wa(`Hola Expiriti, quiero mi prueba gratis de 30 días de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Prueba gratis</a><a href="${wa(`Hola Expiriti, quiero agendar una demo de 45 min por Zoom de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Demo 45 min por Zoom</a><a href="${pdfUrl}" target="_blank" rel="noopener" title="Pon aquí tu PDF final en /fichas/ y cambia data-pdf en #app">Ficha técnica PDF</a></div>`;document.body.appendChild(el);const btn=el.querySelector(".toc-toggle"),panel=el.querySelector(".toc-panel");btn.addEventListener("click",e=>{e.preventDefault();const open=panel.hidden;panel.hidden=!open;btn.setAttribute("aria-expanded",open?"true":"false");el.classList.toggle("open",open);el.classList.toggle("collapsed",!open)});document.addEventListener("click",e=>{if(!el.contains(e.target)){panel.hidden=!0;btn.setAttribute("aria-expanded","false");el.classList.remove("open");el.classList.add("collapsed")}});document.addEventListener("keydown",e=>{"Escape"===e.key&&(panel.hidden=!0,btn.setAttribute("aria-expanded","false"),el.classList.remove("open"),el.classList.add("collapsed"))})};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o,{once:!0}):o()}catch(e){console.warn("[main.js] toc_actions falló",e)}})();

(()=>{const G=document.getElementById("impGrid");if(!G)return;const C=[...G.querySelectorAll(".fcard")];const V=()=>C.filter(el=>el.offsetParent!==null&&getComputedStyle(el).display!=="none");window.EX_impLayout=()=>{C.forEach(x=>x.classList.remove("__vLast1","__vLast2a","__vLast2b"));const a=V(),m=a.length%3;if(m===1&&a.length)a[a.length-1].classList.add("__vLast1");else if(m===2&&a.length>1){a[a.length-2].classList.add("__vLast2a");a[a.length-1].classList.add("__vLast2b")}};new MutationObserver(()=>EX_impLayout()).observe(G,{subtree:!0,attributes:!0,attributeFilter:["style","class"]});addEventListener("resize",()=>EX_impLayout(),{passive:!0});EX_impLayout()})();


/* EXPIRITI PARTIALS FALLBACK SISTEMAS */
(()=>{if(window.__EXP_PARTIALS_FALLBACK__)return;window.__EXP_PARTIALS_FALLBACK__=1;const isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",prefix=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;const base=isGh?repoBase+"/":depth;return(base+p).replace(/([^:]\/)\/+/g,"$1")},load=async(id,file)=>{const ph=document.getElementById(id);if(!ph)return;const urls=[prefix("PARTIALS/"+file),"/PARTIALS/"+file].filter(Boolean);for(const u of urls){try{const r=await fetch(u+"?v="+Date.now(),{cache:"no-store"});if(!r.ok)continue;ph.outerHTML=await r.text();return}catch(_){}}console.warn("[Expiriti] partial no cargó",file)},norm=()=>{document.querySelectorAll(".js-abs-src[data-src]").forEach(img=>{const raw=img.getAttribute("data-src")||"";if(raw){img.src=prefix(raw);img.style.opacity="1"}});document.querySelectorAll(".js-abs-href[data-href]").forEach(a=>{const raw=a.getAttribute("data-href")||"";if(raw)a.href=prefix(raw)});const y=document.getElementById("gf-year");if(y)y.textContent=new Date().getFullYear()};const boot=async()=>{await Promise.all([load("header-placeholder","global-header.html"),load("footer-placeholder","global-footer.html")]);norm()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* EXPIRITI GLOBAL HEADER FINAL BIND */
(()=>{if(window.__EXP_GH_FINAL_BIND__)return;window.__EXP_GH_FINAL_BIND__=1;const D=document,W=window,Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>[...c.querySelectorAll(s)],isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",path=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;if(p.startsWith("/"))return isGh?repoBase+p:p;return((isGh?repoBase+"/":depth)+p).replace(/([^:]\/)\/+/g,"$1")};function assets(root=D){QA(".js-img[data-src]",root).forEach(img=>{const raw=img.dataset.src;if(raw){img.src=path(raw);img.style.opacity="1"}});QA(".js-link[data-href]",root).forEach(a=>{const raw=a.dataset.href;if(raw)a.href=path(raw)});QA('a[href^="/"]',root).forEach(a=>a.href=path(a.getAttribute("href")));QA('img[src^="/"]',root).forEach(img=>img.src=path(img.getAttribute("src")));D.body.classList.add("has-gh");const y=Q("#gf-year");y&&(y.textContent=new Date().getFullYear())}function drawer(open){const h=Q("#gh-header"),dr=Q("#gh-drawer"),dim=Q("#gh-dim"),bg=Q("#gh-burger");if(!h||!dr||!dim||!bg)return;if(open){dr.hidden=false;dim.hidden=false;requestAnimationFrame(()=>{D.documentElement.classList.add("gh-open");D.body.classList.add("gh-open");dr.setAttribute("aria-hidden","false");bg.setAttribute("aria-expanded","true");D.body.style.overflow="hidden";assets(dr)})}else{D.documentElement.classList.remove("gh-open");D.body.classList.remove("gh-open");dr.setAttribute("aria-hidden","true");bg.setAttribute("aria-expanded","false");D.body.style.overflow="";setTimeout(()=>{if(!D.documentElement.classList.contains("gh-open")){dr.hidden=true;dim.hidden=true}},220)}}function mobileSystems(cat){const root=Q("#gh-msys"),track=Q("#gh-sysswipe");if(!root||!track)return;const order=["contables","comerciales","nube","prod"],i=Math.max(0,order.indexOf(cat));QA(".gh-cat",root).forEach(b=>{const on=(b.dataset.cat||"")===cat;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});track.scrollTo({left:i*(track.clientWidth||1),behavior:"smooth"});QA(".gh-sysdots .dot",root).forEach((d,k)=>d.classList.toggle("is-active",k===i))}function mobileServices(dir=1){const tr=Q("#gh-msvc .gh-svctrack");if(!tr)return;tr.scrollBy({left:dir*(tr.clientWidth||1),behavior:"smooth"})}function bind(){const h=Q("#gh-header");if(!h)return;assets(h);assets(D);if(!D.__ghFinalClicks){D.__ghFinalClicks=1;D.addEventListener("click",e=>{const b=e.target.closest("#gh-burger");if(b){e.preventDefault();e.stopImmediatePropagation();drawer(!D.documentElement.classList.contains("gh-open"));return}const c=e.target.closest("#gh-close,#gh-dim");if(c){e.preventDefault();e.stopImmediatePropagation();drawer(false);return}const t=e.target.closest("#gh-theme");if(t){e.preventDefault();e.stopImmediatePropagation();const cur=D.documentElement.getAttribute("data-theme")||localStorage.getItem("expiriti_theme")||"light",next=cur==="light"?"dark":"light";D.documentElement.setAttribute("data-theme",next);localStorage.setItem("expiriti_theme",next);t.setAttribute("aria-pressed",next==="dark"?"true":"false");return}const cat=e.target.closest("#gh-msys .gh-cat[data-cat]");if(cat){e.preventDefault();e.stopImmediatePropagation();mobileSystems(cat.dataset.cat);return}const svPrev=e.target.closest("#gh-msvc .gh-svcarrow.prev"),svNext=e.target.closest("#gh-msvc .gh-svcarrow.next");if(svPrev||svNext){e.preventDefault();e.stopImmediatePropagation();mobileServices(svPrev?-1:1);return}const link=e.target.closest("a.js-link[data-href]");if(link){const raw=link.dataset.href,want=path(raw);link.href=want;e.preventDefault();e.stopImmediatePropagation();if(link.closest("#gh-drawer"))drawer(false);if(e.metaKey||e.ctrlKey||link.target==="_blank")W.open(want,"_blank","noopener");else location.href=want;return}},true);D.addEventListener("keydown",e=>{if(e.key==="Escape")drawer(false)},{passive:true})}if(!D.__ghFinalHover){D.__ghFinalHover=1;QA("#gh-header .gh-dd-wrap").forEach(w=>{let tm=0;const open=()=>{if(W.matchMedia("(max-width:1023px)").matches)return;clearTimeout(tm);QA("#gh-header .gh-dd-wrap").forEach(x=>x!==w&&x.classList.remove("gh-open"));w.classList.add("gh-open")},close=()=>{clearTimeout(tm);tm=setTimeout(()=>w.classList.remove("gh-open"),160)};w.addEventListener("mouseenter",open);w.addEventListener("mouseleave",close)})}}const boot=()=>{bind();setTimeout(bind,120);setTimeout(bind,450)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();W.addEventListener("pageshow",boot,{passive:true})})();
