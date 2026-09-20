import {loadScripts,scriptsFromHtmlThrough} from './validation-loader.mjs';

globalThis.window=globalThis;

/* La superficie formal y su relación con la piedra se validan en atlas.html.
   LA VEGA de superficie es ahora un tríptico 14+14+14 anclado por un único
   verso central; su texto completo puede permanecer retirado de la edición
   pública sin alterar la matriz profunda.
*/
loadScripts(scriptsFromHtmlThrough('atlas.html','surface-poems.js'));

const poems=globalThis.GRANADA_SURFACE_POEMS;
const surface=globalThis.GRANADA_SURFACE;
const activeVega=globalThis.GRANADA_LA_VEGA_ACTIVE;
const stone=globalThis.GRANADA_STONE_ROWS;
const core=globalThis.GRANADA_LAB_BAJO_LA_CAL;
const meso=globalThis.GRANADA_STONE_MESOSTIC_REPORT;
const CENTER='Late bajo la cal la acequia hundida.';

if(!Array.isArray(poems)||poems.length!==27) throw new Error(`SUPERFICIE: ${poems?.length??0} poemas`);
if(poems.some((p,i)=>p.number!==i+1||!Array.isArray(p.verses)||!p.verses.length)) throw new Error('SUPERFICIE: orden o contenido inválido');
if(poems.some((p,i)=>p.title!==globalThis.GRANADA_TITLES[i])) throw new Error('SUPERFICIE: títulos fuera de orden');

const vega=poems[13];
if(vega.kind!=='triptych') throw new Error('SUPERFICIE: LA VEGA no está declarada como tríptico');
if(vega.canonicalVerseCount!==42) throw new Error('SUPERFICIE: LA VEGA debe conservar 42 versos canónicos');
if(JSON.stringify(vega.sectionVerseCounts)!==JSON.stringify([14,14,14])) throw new Error('SUPERFICIE: LA VEGA debe ser 14+14+14');
if(vega.centralVerse!==CENTER||vega.threshold!==CENTER||vega.closure!==CENTER) throw new Error('SUPERFICIE: LA VEGA perdió el verso central único');
if(!vega.presentation||vega.presentation.canonical!=='single-page-triptych'||vega.presentation.background!=='pale-green'||vega.presentation.titleReflection!==true) throw new Error('SUPERFICIE: falta la presentación canónica del tríptico');
if(!surface||surface.centerPoem!==14||surface.centerVerse!==CENTER) throw new Error('SUPERFICIE: el centro conceptual no es P14 / verso central');
if(JSON.stringify(surface.centerMatrix)!==JSON.stringify([14,14])||JSON.stringify(surface.centerCube)!==JSON.stringify([14,14,14])) throw new Error('SUPERFICIE: anclajes 14×14 / 14×14×14 inválidos');
if(!activeVega||activeVega.withheldFromPublicEdition!==true||activeVega.published!==false) throw new Error('SUPERFICIE: LA VEGA debe permanecer retenida de la salida pública mientras published=false');

if(poems[26].verses.at(-1)!=='Granada sucede — sucede Granada.') throw new Error('SUPERFICIE: falta la tercera junta palindrómica en P27');
for(let i=0;i<13;i++){
  if(poems[i].mirror!==27-i||poems[26-i].mirror!==i+1) throw new Error(`SUPERFICIE: espejo roto ${i+1}↔${27-i}`);
}

if(!Array.isArray(stone)||stone.length!==27||stone.some(r=>r.verses.length!==27)) throw new Error('PIEDRA: la matriz no es 27×27');
if(stone[13].verses[13]!==CENTER) throw new Error('PIEDRA: centro 14×14 alterado');
if(!core||stone[13].verses.some((v,i)=>v!==core.verses[i])) throw new Error('PIEDRA: H14 no coincide con BAJO LA CAL');
if(!meso?.valid||meso.total!==54) throw new Error(`PIEDRA: mesósticos ${meso?.valid?'válidos':'inválidos'} · total ${meso?.total??0}`);
if(globalThis.GRANADA_STONE_ACROSTIC?.H14?.word!=='VEINTISIETE') throw new Error('PIEDRA: Loa I perdió el centro');
if(globalThis.GRANADA_STONE_TELESTIC?.P14?.word!=='VEINTISIETE') throw new Error('PIEDRA: Loa II perdió el centro');

console.log(JSON.stringify({
  assembly:'atlas.html',
  surface:{
    count:poems.length,
    laVega:{
      kind:vega.kind,
      canonicalVerseCount:vega.canonicalVerseCount,
      sections:vega.sectionVerseCounts,
      publicTextWithheld:vega.withheldFromPublicEdition,
      centralVerse:vega.centralVerse,
      presentation:vega.presentation
    },
    final:poems[26].verses.at(-1),
    mirrorPairs:13
  },
  stone:{
    rows:stone.length,
    columns:stone[0].verses.length,
    center:stone[13].verses[13],
    h14:'BAJO LA CAL',
    mesostics:meso.total,
    loaI:globalThis.GRANADA_STONE_ACROSTIC.H14.word,
    loaII:globalThis.GRANADA_STONE_TELESTIC.P14.word
  },
  cubeCenter:[14,14,14],
  joint:'LA VEGA ↔ piedra ↔ cubo = un único verso central'
},null,2));
