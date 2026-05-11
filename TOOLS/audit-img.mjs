import {readdir,readFile,writeFile,mkdir,rename,stat} from "fs/promises";
import {existsSync} from "fs";
import {join,relative,basename,extname} from "path";
import crypto from "crypto";

const ROOT=process.cwd(),IMG_DIR=join(ROOT,"IMG"),UNUSED_DIR=join(IMG_DIR,"_unused");
const CODE_EXT=new Set([".html",".css",".js",".json",".webmanifest"]);
const IMG_EXT=new Set([".png",".jpg",".jpeg",".webp",".svg",".ico",".avif"]);
const IGNORE_DIRS=new Set(["node_modules","dist",".git","_unused"]);
const norm=s=>decodeURIComponent(String(s||"").replace(/\\/g,"/").replace(/^https?:\/\/[^/]+/i,"").replace(/^\/+/,"")).trim();
const walk=async(dir,out=[])=>{for(const e of await readdir(dir,{withFileTypes:true})){if(IGNORE_DIRS.has(e.name))continue;const p=join(dir,e.name);if(e.isDirectory())await walk(p,out);else out.push(p)}return out};
const files=await walk(ROOT),imgFiles=files.filter(f=>f.startsWith(IMG_DIR)&&IMG_EXT.has(extname(f).toLowerCase()));
const codeFiles=files.filter(f=>CODE_EXT.has(extname(f).toLowerCase()));
const codeText=(await Promise.all(codeFiles.map(async f=>await readFile(f,"utf8").catch(()=>"")))).join("\n");
const refs=new Set();
const patterns=[
  /(?:src|href|data-src|data-href|content)=["']([^"']*?IMG\/[^"']+)["']/gi,
  /url\(["']?([^"')]*?IMG\/[^"')]+)["']?\)/gi,
  /["'`](\/?IMG\/[^"'`)\s]+)["'`]/gi
];
for(const rx of patterns){let m;while((m=rx.exec(codeText))){let r=norm(m[1]).split(/[?#]/)[0];if(r.startsWith("IMG/"))refs.add(r)}}
const allImgs=imgFiles.map(f=>norm(relative(ROOT,f)));
const used=allImgs.filter(f=>refs.has(f));
const unused=allImgs.filter(f=>!refs.has(f));
const missing=[...refs].filter(r=>!allImgs.includes(r));
const byHash=new Map();
for(const f of imgFiles){const b=await readFile(f);const h=crypto.createHash("sha1").update(b).digest("hex");const key=h+":"+b.length;(byHash.get(key)||byHash.set(key,[]).get(key)).push(norm(relative(ROOT,f)))}
const dupes=[...byHash.values()].filter(a=>a.length>1);
await writeFile("img-used.txt",used.sort().join("\n"),"utf8");
await writeFile("img-unused.txt",unused.sort().join("\n"),"utf8");
await writeFile("img-missing.txt",missing.sort().join("\n"),"utf8");
await writeFile("img-duplicates.txt",dupes.map(g=>g.join("\n")).join("\n\n---\n\n"),"utf8");
console.log(`IMG total: ${allImgs.length}`);
console.log(`Usadas: ${used.length}`);
console.log(`No usadas: ${unused.length}`);
console.log(`Faltantes referenciadas: ${missing.length}`);
console.log(`Duplicados exactos: ${dupes.length}`);
console.log("Reportes: img-used.txt, img-unused.txt, img-missing.txt, img-duplicates.txt");

if(process.argv.includes("--move-unused")){
  await mkdir(UNUSED_DIR,{recursive:true});
  for(const r of unused){
    const src=join(ROOT,r),dst=join(UNUSED_DIR,basename(r));
    if(existsSync(src)&&!existsSync(dst))await rename(src,dst);
  }
  console.log(`Movidas a IMG/_unused: ${unused.length}`);
}
