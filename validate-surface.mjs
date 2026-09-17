import {loadScripts,scriptsFromHtmlThrough} from './validation-loader.mjs';

globalThis.window=globalThis;

/* La superficie formal y su relación con la piedra se validan en atlas.html.
   La edición literaria principal permanece deliberadamente separada. */
loadScripts(scriptsFromHtmlThrough('atlas.html','surface-poems.js'));

const poems=globalThis.GRANADA_SURFACE_POEMS;
const stone=globalThis.GRANADA_STONE_ROWS;
const core=globalThis.GRANADA_LAB_BAJO_LA_CAL;
const meso=globalThis.GRANADA_STONE_MESOSTIC_REPORT;

if(!Array.isArray(poems)||poems.length!==27) throw new Error(`SUPERFICIE: ${poems?.length??0} poemas`);
if(poems.some((p,i)=>p.number!==i+1||!Array.isArray(p.verses)||!p.verses.length)) throw new Error('SUPERFICIE: orden o contenido inválido');
if(poems.some((p,i)=>p.title!==globalThis.GRANADA_TITLES[i])) throw new Error('SUPERFICIE: títulos fuera de orden');
if(poems[13].verses.length!==27||poems[13].verses[13]!=='Late bajo la cal la acequia hundida.') throw new Error('SUPERFICIE: LA VEGA perdió el centro');
if(poems[13].verses[19]!=='Por el taller avanza fango espeso.') throw new Error('SUPERFICIE: verso 20 de LA VEGA no actualizado');
if(poems[26].verses.at(-1)!=='Granada sucede — sucede Granada.') throw new Error('SUPERFICIE: falta la tercera junta palindrómica en P27');
for(let i=0;i<13;i++){
  if(poems[i].mirror!==27-i||poems[26-i].mirror!==i+1) throw new Error(`SUPERFICIE: espejo roto ${i+1}↔${27-i}`);
}

if(!Array.isArray(stone)||stone.length!==27||stone.some(r=>r.verses.length!==27)) throw new Error('PIEDRA: la matriz no es 27×27');
if(stone[13].verses[13]!=='Late bajo la cal la acequia hundida.') throw new Error('PIEDRA: centro 14×14 alterado');
if(!core||stone[13].verses.some((v,i)=>v!==core.verses[i])) throw new Error('PIEDRA: H14 no coincide con BAJO LA CAL');
if(!meso?.valid||meso.total!==54) throw new Error(`PIEDRA: mesósticos ${meso?.valid?'válidos':'inválidos'} · total ${meso?.total??0}`);
if(globalThis.GRANADA_STONE_ACROSTIC?.H14?.word!=='VEINTISIETE') throw new Error('PIEDRA: Loa I perdió el centro');
if(globalThis.GRANADA_STONE_TELESTIC?.P14?.word!=='VEINTISIETE') throw new Error('PIEDRA: Loa II perdió el centro');

console.log(JSON.stringify({
  assembly:'atlas.html',
  surface:{count:poems.length,lengths:poems.map(p=>p.verses.length),center:poems[13].verses[13],laVegaVerse20:poems[13].verses[19],final:poems[26].verses.at(-1),mirrorPairs:13},
  stone:{rows:stone.length,columns:stone[0].verses.length,center:stone[13].verses[13],h14:'BAJO LA CAL',mesostics:meso.total,loaI:globalThis.GRANADA_STONE_ACROSTIC.H14.word,loaII:globalThis.GRANADA_STONE_TELESTIC.P14.word},
  joint:'superficie ↔ piedra = 14×14'
},null,2));
