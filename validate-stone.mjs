import {loadScripts,scriptsFromIndexThrough} from './validation-loader.mjs';

globalThis.window=globalThis;

/* Carga la capa pétrea en el orden público, antes de LA VEGA. */
const files=scriptsFromIndexThrough('stone-mesostic.js');
if(files.includes('matrix-la-vega.js')){
  throw new Error('PIEDRA: index.html aplica LA VEGA antes de congelar la matriz pétrea');
}
loadScripts([...files,'laboratorio/validacion-piedra.js']);

const report=globalThis.GRANADA_STONE_REPORT;
if(!report) throw new Error('No se generó GRANADA_STONE_REPORT');

const redesign=globalThis.GRANADA_STONE_MESOSTIC_REDESIGN;
if(!redesign||redesign.count!==5) throw new Error('No se cargaron las cinco voces mesósticas rediseñadas');

const expected={
  P03:'NOTA NACE DENTRO',
  P05:'LA FORMA RESPIRA',
  H14:'EL SILENCIO SUENA BAJO LA TIERRA',
  P19:'AÚN NACE MEMORIA',
  P27:'AGUA CRUZA SIGLO'
};

const voices=globalThis.GRANADA_STONE_MESOSTIC_VOICES;
const actual={
  P03:voices[3].v,
  P05:voices[5].v,
  H14:voices[14].h,
  P19:voices[19].v,
  P27:voices[27].v
};

const assertions=[
  ['estructura pétrea completa',report.structuralStable===true],
  ['matriz 27×27',report.matrix.valid===true],
  ['27 horizontales',report.horizontals.valid===true],
  ['2 diagonales intactas',report.diagonals.valid===true],
  ['radial nuevo válido',report.radial.valid===true],
  ['Loa I / acróstico válido',report.loaI.valid===true],
  ['Loa II / teléstico válido',report.loaII.valid===true],
  ['54 de 54 mesósticos válidos',report.mesostics.validCount===54&&report.mesostics.invalidCount===0&&report.mesostics.complete===true],
  ['cinco voces nuevas exactas',JSON.stringify(actual)===JSON.stringify(expected)]
];

const failed=assertions.filter(([,ok])=>!ok);
console.log(JSON.stringify({
  structuralStable:report.structuralStable,
  source:globalThis.GRANADA_STONE.source,
  relationToSurface:globalThis.GRANADA_STONE.relationToSurface,
  center:report.matrix.center,
  horizontals:report.horizontals,
  diagonals:{total:report.diagonals.total,valid:report.diagonals.valid},
  radial:{valid:report.radial.valid,center:report.radial.center},
  loaI:{valid:report.loaI.valid,text:report.loaI.text},
  loaII:{valid:report.loaII.valid,text:report.loaII.text,relocatedMark:report.loaII.relocatedMark},
  mesostics:{
    total:report.mesostics.total,
    validCount:report.mesostics.validCount,
    invalidCount:report.mesostics.invalidCount,
    complete:report.mesostics.complete,
    redesigned:actual
  },
  assertions:assertions.map(([name,ok])=>({name,ok}))
},null,2));

if(failed.length){
  console.error('\nFallan:',failed.map(([name])=>name).join(' | '));
  process.exit(1);
}
