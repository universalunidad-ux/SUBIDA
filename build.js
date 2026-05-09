// =========================================================
// build.js v2.2 — EXPIRITI ROBOT ARMADOR (BLINDADO)
// - Ensambla parciales
// - Normaliza <head> (charset + viewport + expiriti-base)
// - Lazy load
// - Copia estáticos
// - Minifica JS (Terser) + CSS (cssnano)
// - Debug contextual si Terser falla
// =========================================================

import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { resolve, dirname } from "path";
import { glob } from "glob";
import { minify as terserMinify } from "terser";
import postcss from "postcss";
import cssnano from "cssnano";
import { minify as htmlMinify } from "html-minifier-terser";

// ---------------- CONFIG ----------------
const PARTIALS_DIR = "PARTIALS";
const BUILD_DIR = "dist";
const EXPIRITI_BASE = "/";
// ----------------------------------------

console.log("🤖 Iniciando robot armador Expiriti v2.2...");

/* =========================================================
   DEBUG: muestra contexto cuando Terser falla
========================================================= */
function showContext(src, line, col, radius = 4){
  const L = Number(line||0), C = Number(col||0);
  const lines = src.split(/\r?\n/);
  const start = Math.max(0, L-1-radius);
  const end = Math.min(lines.length, L-1+radius+1);
  const block = lines.slice(start,end).map((t,i)=>{
    const n = start+i+1;
    return `${n===L?" >>":"   "} ${String(n).padStart(4," ")} | ${t}`;
  }).join("\n");
  console.log(block);
  if(L>0) console.log(" ".repeat(9+C)+"^");
}

/* =========================================================
   Minificación JS robusta (Terser)
========================================================= */
async function minifyJsOrThrow(file, src){
  try{
    const r = await terserMinify(src,{
      ecma:2020,module:false,
      compress:true,mangle:true,
      format:{comments:false}
    });
    if(!r || typeof r.code!=="string")
      throw new Error("Terser no devolvió código");
    return r.code;
  }catch(e){
    console.error(`\n❌ Terser error: ${file}`);
    console.error(`${e.name||"Error"}: ${e.message||e}`);
    if(typeof e.line==="number"){
      console.error(`Línea ${e.line}, Col ${e.col||0}\n`);
      showContext(src,e.line,e.col||0);
      console.error("\n💡 Suele ser coma faltante o texto no-JS incrustado.");
    }
    throw e;
  }
}

/* =========================================================
   HEAD NORMALIZER — BLINDADO
   Inserta metas SOLO si faltan
========================================================= */
const RX = {
  head:/<head(\s[^>]*)?>/i,
  charset:/<meta\b[^>]*charset=/i,
  viewport:/<meta\b[^>]*name=["']viewport["']/i,
  base:/<meta\b[^>]*name=["']expiriti-base["']/i
};

function normalizeHead(html,file){
  if(!RX.head.test(html)) return html;
  const adds=[];
  if(!RX.charset.test(html)) adds.push(`<meta charset="utf-8" />`);
  if(!RX.base.test(html)) adds.push(`<meta name="expiriti-base" content="${EXPIRITI_BASE}" />`);
  if(!RX.viewport.test(html)) adds.push(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
  if(!adds.length) return html;

  console.log(`🔧 HEAD normalized: ${file} (+${adds.length})`);
  return html.replace(RX.head,m=>`${m}\n  ${adds.join("\n  ")}\n`);
}

/* =========================================================
   BUILD PIPELINE
========================================================= */
async function buildSite(){
try{
  // ---------- 1) Parciales ----------
  const header = await readFile(resolve(PARTIALS_DIR,"global-header.html"),"utf8");
  const footer = await readFile(resolve(PARTIALS_DIR,"global-footer.html"),"utf8");
  console.log("⚙️ 1/4 Parciales cargados.");

  // ---------- 2) HTML ----------
  const htmlFiles = await glob("**/*.html",{
    ignore:[`${PARTIALS_DIR}/**`,`${BUILD_DIR}/**`,"node_modules/**"]
  });

  console.log(`⚙️ 2/4 Procesando ${htmlFiles.length} HTML...`);
  for(const file of htmlFiles){
    let html = await readFile(file,"utf8");

    // Normaliza HEAD (ANTES de header/footer)
    html = normalizeHead(html,file);

    // Inserta parciales
    html = html.replace(/<div id="header-placeholder"><\/div>/g,header);
    html = html.replace(/<div id="footer-placeholder"><\/div>/g,footer);

    // Quita loaders viejos de parciales/rutas
    html=html.replace(/<script>\s*\(?async\s*\(\)\s*=>\s*\{[\s\S]*?header-placeholder[\s\S]*?footer-placeholder[\s\S]*?<\/script>/g,"");
    html=html.replace(/<script>[\s\S]*?(loadPartials|PARTIALS LOAD|NORMALIZADOR DE RUTAS|Normalización de rutas|Loader ÚNICO|Cargador ÚNICO)[\s\S]*?<\/script>/g,"");
     
    // Lazy / preload
    html = html
      .replace(/<iframe(?!.*loading="lazy")/g,'<iframe loading="lazy"')
      .replace(/<video(?!.*preload="none")/g,'<video preload="none"')
      .replace(/<img(?!.*loading="lazy")/g,'<img loading="lazy"');

    html=await htmlMinify(html,{collapseWhitespace:true,removeComments:true,removeRedundantAttributes:true,removeEmptyAttributes:false,removeOptionalTags:false,minifyCSS:true,minifyJS:false,keepClosingSlash:true});
    const out=resolve(BUILD_DIR,file);
    await mkdir(dirname(out),{recursive:true});
    await writeFile(out,html,"utf8");
  }
  console.log("✅ HTML ensamblado.");

  // ---------- 3) Estáticos ----------
  const assets = await glob("**/*.{png,jpg,jpeg,webp,svg,ico,json,webmanifest,pdf}",{
    ignore:[
      `${PARTIALS_DIR}/**`,`${BUILD_DIR}/**`,
      "node_modules/**","build.js","package*.json"
    ]
  });

  console.log(`⚙️ 3/4 Copiando ${assets.length} assets...`);
  for(const f of assets){
    const out = resolve(BUILD_DIR,f);
    await mkdir(dirname(out),{recursive:true});
    await copyFile(f,out);
  }
  console.log("✅ Assets copiados.");

  // ---------- 4) Minificación ----------
  console.log("⚙️ 4/4 Minificando CSS + JS...");
  const code = await glob("**/*.{js,css}",{
    ignore:[
      `${BUILD_DIR}/**`,`node_modules/**`,
      "build.js","**/*.min.js","**/*.min.css"
    ]
  });

  for(const file of code){
    const src = await readFile(resolve(file),"utf8");
    const out = resolve(BUILD_DIR,file);
    let min="";

    if(file.endsWith(".js")){
      min = await minifyJsOrThrow(file,src);
    }else{
      const r = await postcss([cssnano]).process(src,{from:file,to:out});
      min = r.css;
    }

    await mkdir(dirname(out),{recursive:true});
    await writeFile(out,min,"utf8");
  }

  console.log("✅ CSS y JS minificados.");
  console.log("\n🚀 Build Expiriti v2.2 COMPLETADO");
  console.log(`📦 Output: /${BUILD_DIR}`);

}catch(err){
  console.error("❌ Build falló:",err);
  process.exit(1);
}}

buildSite();
