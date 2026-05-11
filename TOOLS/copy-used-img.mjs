import {readFile,readdir,copyFile,mkdir,writeFile,stat} from "fs/promises";
import {existsSync} from "fs";
import {join,dirname,extname,relative} from "path";

const ROOT=process.cwd();
const SOURCE=process.env.SOURCE_IMG||join(process.env.HOME,"Documents","unidaduniversal.github.io");
const CODE_EXT=new Set([".html",".css",".js"]);
const IMG_EXT=new Set([".webp",".png",".jpg",".jpeg",".svg",".ico",".avif"]);
const IGNORE=new Set(["node_modules","dist",".git","_unused"]);

const walk=async(dir,out=[])=>{
  for(const e of await readdir(dir,{withFileTypes:true})){
    if(IGNORE.has(e.name))continue;
    const p=join(dir,e.name);
    if(e.isDirectory())await walk(p,out);
    else out.push(p);
  }
  return out;
};

const clean=s=>{
  s=String(s||"").trim().replace(/^['"`(]+|['"`),;]+$/g,"");
  s=s.split(/[?#]/)[0];
  try{s=decodeURIComponent(s)}catch(e){}
  s=s.replace(/^https?:\/\/[^/]+/i,"").replace(/^\/+/,"");
  return s;
};

const codeFiles=(await walk(ROOT)).filter(f=>CODE_EXT.has(extname(f).toLowerCase()));
const refs=new Set();

for(const f of codeFiles){
  const txt=await readFile(f,"utf8").catch(()=>"");
  const patterns=[
    /(?:src|href|data-src|data-href|content)=["']([^"']*?IMG\/[^"']+)["']/gi,
    /url\(["']?([^"')]*?IMG\/[^"')]+)["']?\)/gi,
    /["'`](\/?IMG\/[^"'`\n\r]+?)["'`]/gi
  ];
  for(const rx of patterns){
    let m;
    while((m=rx.exec(txt))){
      const r=clean(m[1]);
      if(r.startsWith("IMG/")&&IMG_EXT.has(extname(r).toLowerCase())&&!r.includes("/_unused/"))refs.add(r);
    }
  }
}

let copied=[],missing=[];
await mkdir(join(ROOT,"IMG"),{recursive:true});

for(const r of [...refs].sort()){
  const src=join(SOURCE,r);
  const dst=join(ROOT,r);
  if(existsSync(src)){
    await mkdir(dirname(dst),{recursive:true});
    await copyFile(src,dst);
    copied.push(r);
  }else{
    missing.push(r);
  }
}

await writeFile("img-referencias-codigo.txt",[...refs].sort().join("\n"),"utf8");
await writeFile("img-copiadas.txt",copied.sort().join("\n"),"utf8");
await writeFile("img-faltantes-codigo.txt",missing.sort().join("\n"),"utf8");

console.log("Referencias en código:",refs.size);
console.log("Copiadas desde repo fuente:",copied.length);
console.log("Faltantes reales:",missing.length);
console.log("Fuente:",SOURCE);
console.log("Reportes: img-referencias-codigo.txt, img-copiadas.txt, img-faltantes-codigo.txt");
