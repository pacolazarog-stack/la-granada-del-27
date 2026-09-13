import fs from 'node:fs';
import vm from 'node:vm';

const projectRoot=new URL('./',import.meta.url);

export function scriptsFromIndexThrough(lastFile){
  const html=fs.readFileSync(new URL('index.html',projectRoot),'utf8');
  const scripts=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .map(([,src])=>src);
  const matches=scripts.reduce((out,file,index)=>file===lastFile?[...out,index]:out,[]);
  if(matches.length!==1){
    throw new Error(`ENSAMBLAJE: index.html debe declarar una vez ${lastFile}; encontrado ${matches.length}`);
  }
  return scripts.slice(0,matches[0]+1);
}

export function loadScripts(files){
  const missing=files.filter(file=>!fs.existsSync(new URL(file,projectRoot)));
  if(missing.length){
    throw new Error(`ENSAMBLAJE: faltan archivos requeridos: ${missing.join(', ')}`);
  }
  for(const file of files){
    try{
      const code=fs.readFileSync(new URL(file,projectRoot),'utf8');
      vm.runInThisContext(code,{filename:file});
    }catch(error){
      error.message=`ENSAMBLAJE: error al cargar ${file}: ${error.message}`;
      throw error;
    }
  }
}
