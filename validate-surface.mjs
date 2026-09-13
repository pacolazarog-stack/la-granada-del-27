import fs from 'node:fs';
import vm from 'node:vm';

globalThis.window=globalThis;

const files=[
  'matrix-core.js','matrix-1.js','matrix-2.js','matrix-3.js','matrix-la-vega.js',
  'laboratorio/granada-1927-libre.js',
  'laboratorio/el-rinconcillo-libre.js',
  'laboratorio/don-manuel-libre.js',
  'laboratorio/federico-libre.js',
  'laboratorio/hermenegildo-libre.js',
  'laboratorio/manuel-angeles-libre.js',
  'laboratorio/los-titeres-libre.js',
  'laboratorio/la-puerta-del-vino-libre.js',
  'laboratorio/antes-de-saberlo-libre.js',
  'laboratorio/agosto-libre.js',
  'laboratorio/el-barranco-libre.js',
  'laboratorio/la-ciudad-callo-libre.js',
  'laboratorio/la-casa-cerrada-libre.js',
  'laboratorio/gran-via-libre.js',
  'laboratorio/alhambra-sa-libre.js',
  'laboratorio/habitacion-con-turistas-libre.js',
  'laboratorio/cien-anos-libre.js',
  'laboratorio/granada-2027-libre.js',
  'laboratorio/el-nuevo-rinconcillo-libre.js',
  'laboratorio/gallo-vuelve-a-cantar-libre.js',
  'laboratorio/los-otros-libre.js',
  'laboratorio/las-que-faltaban-libre.js',
  'laboratorio/cancion-para-quien-acaba-de-llegar-libre.js',
  'laboratorio/la-ciudad-que-todavia-puede-ser-libre.js',
  'laboratorio/que-vuelva-a-ocurrir-libre.js',
  'laboratorio/un-siglo-despues-libre.js',
  'surface-poems.js'
];

for(const file of files){
  const code=fs.readFileSync(new URL(`./${file}`,import.meta.url),'utf8');
  vm.runInThisContext(code,{filename:file});
}

const poems=globalThis.GRANADA_SURFACE_POEMS;
if(!Array.isArray(poems)||poems.length!==27) throw new Error(`SUPERFICIE: ${poems?.length??0} poemas`);
if(poems.some((p,i)=>p.number!==i+1||!Array.isArray(p.verses)||!p.verses.length)) throw new Error('SUPERFICIE: orden o contenido inválido');
if(poems.some((p,i)=>p.title!==globalThis.GRANADA_TITLES[i])) throw new Error('SUPERFICIE: títulos fuera de orden');
if(poems[13].verses.length!==27||poems[13].verses[13]!=='Late bajo la cal la acequia hundida.') throw new Error('SUPERFICIE: LA VEGA perdió el centro');
if(poems[13].verses[19]!=='Por el taller avanza barro espeso.') throw new Error('SUPERFICIE: verso 20 de LA VEGA no actualizado');
if(poems[26].verses.at(-1)!=='Granada sucede — sucede Granada.') throw new Error('SUPERFICIE: falta la tercera junta palindrómica en P27');
for(let i=0;i<13;i++){
  if(poems[i].mirror!==27-i||poems[26-i].mirror!==i+1) throw new Error(`SUPERFICIE: espejo roto ${i+1}↔${27-i}`);
}
console.log(JSON.stringify({
  count:poems.length,
  titles:poems.map(p=>p.title),
  lengths:poems.map(p=>p.verses.length),
  center:poems[13].verses[13],
  laVegaVerse20:poems[13].verses[19],
  final:poems[26].verses.at(-1),
  mirrorPairs:13
},null,2));
