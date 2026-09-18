import fs from 'node:fs';
import vm from 'node:vm';

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const source=fs.readFileSync('cube-canon.js','utf8');
const store=new Map();
const sandbox={
  window:null,
  globalThis:null,
  localStorage:{
    getItem:k=>store.has(k)?store.get(k):null,
    setItem:(k,v)=>store.set(k,String(v))
  },
  Math,JSON,Object,Array,Number,String,Set,Map,RegExp,Uint32Array,
  console,
  crypto:{getRandomValues:a=>{a[0]=123456789;return a;}}
};
sandbox.window=sandbox;sandbox.globalThis=sandbox;
vm.createContext(sandbox);
vm.runInContext(source,sandbox,{filename:'cube-canon.js'});
const C=sandbox.GRANADA_CUBE_27;

assert(C,'GRANADA_CUBE_27 no declarado');
assert(C.size===27,'size debe ser 27');
assert(C.positions===19683,'27³ debe producir 19.683 posiciones');
assert(C.center===14,'centro debe ser 14');
assert(C.envelopes===13,'debe haber 13 envolventes alrededor del centro');
assert(C.index27.length===27,'INDICE_27 debe tener 27 países');
assert(C.poemRoute.length===27,'RUTA_POEMA_27 debe tener 27 pasos');
assert(C.languages.length===27,'deben existir 27 lenguas: 24 oficiales de la UE + catalán, gallego y euskera');
assert(new Set(C.languages.map(x=>x.code)).size===27,'los códigos lingüísticos deben ser únicos');
for(const code of ['es','ca','gl','eu'])assert(C.languages.some(x=>x.code===code),'deben estar las cuatro lenguas españolas: '+code);
assert(Math.abs(Object.values(C.weights).reduce((a,b)=>a+b,0)-1)<1e-9,'los pesos deben sumar 1');

const p13=C.poemPoint(13),p14=C.poemPoint(14),p15=C.poemPoint(15);
assert(p13.x===3&&p13.y===21&&p13.z===13,'POEMA z13 debe ser Francia↔Lituania');
assert(p14.x===14&&p14.y===14&&p14.z===14&&p14.country==='España','POEMA z14 debe ser España en 14·14·14');
assert(p15.x===21&&p15.y===3&&p15.z===15,'POEMA z15 debe ser Lituania↔Francia');
const m=C.mirrorPoint({x:3,y:21,z:13});
assert(m.x===21&&m.y===3&&m.z===15,'M(x,y,z)=(y,x,28-z)');
assert(C.envelope(14,14,14)===0,'el centro debe tener k=0');
assert(C.envelope(1,1,1)===13,'la frontera debe tener k=13');
assert(C.traces.names.join('|')==='POEMA|AGUA|ARTISTAS|LEGADO|1927↔2027','deben constar las cinco trazas');
assert(C.traces.xyCoincidences===11,'deben conservarse 11 coincidencias XY');
assert(C.traces.envelopeDensity[13]===24,'k=13 debe registrar 24 nodos');
assert(C.traces.exactRoutesAvailable.length===1&&C.traces.exactRoutesAvailable[0]==='POEMA','solo POEMA puede declararse ruta exacta mientras no esté el XLSX fuente');

const atlas=fs.readFileSync('atlas.html','utf8');
assert(atlas.includes('data-mode="cube"'),'atlas.html debe exponer CUBO');
assert(atlas.includes('cube-canon.js'),'atlas.html debe cargar cube-canon.js');
assert(atlas.includes('atlas-cube.js'),'atlas.html debe cargar atlas-cube.js');
assert(atlas.includes('chance-listen'),'AZAR debe incluir Oír Z');
assert(atlas.includes('chance-language'),'AZAR debe incluir recompensa lingüística');

const chance=fs.readFileSync('chance.js','utf8');
for(const token of ["key:'X'","key:'Y'","key:'CENTRO'","key:'Z'"])assert(chance.includes(token),'AZAR⁴ debe contener '+token);
assert(chance.includes('chooseLanguageReward'),'AZAR debe usar recompensa lingüística ponderada');
assert(chance.includes('musicalidad 50 %'),'la musicalidad debe ser el factor principal');

console.log('OK · CUBO 27³ · 19.683 posiciones');
console.log('OK · centro 14·14·14 · 13 envolventes · espejo (y,x,28-z)');
console.log('OK · 5 trazas · POEMA exacta · 27 lenguas (24 UE + ca/gl/eu)');
console.log('OK · AZAR⁴ = X + Y + CENTRO + Z');
