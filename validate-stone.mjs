import fs from 'node:fs';
import vm from 'node:vm';

globalThis.window=globalThis;

const files=[
  'matrix-core.js',
  'matrix-1.js',
  'matrix-2.js',
  'matrix-3.js',
  'matrix-la-vega.js',
  'matrix-secret.js',
  'matrix-secret-patch.js',
  'matrix-mesostic.js',
  'laboratorio/bajo-la-cal-nucleo.js',
  'laboratorio/piedra-matriz.js',
  'laboratorio/validacion-piedra.js'
];

for(const file of files){
  const code=fs.readFileSync(new URL(`./${file}`,import.meta.url),'utf8');
  vm.runInThisContext(code,{filename:file});
}

const report=globalThis.GRANADA_STONE_REPORT;
if(!report) throw new Error('No se generó GRANADA_STONE_REPORT');

const expectedInvalid=['H14','P03','P05','P19','P27'];
const actualInvalid=[...report.mesostics.invalidIds].sort();
const expectedSorted=[...expectedInvalid].sort();

const assertions=[
  ['estructura pétrea estable',report.structuralStable===true],
  ['matriz 27×27',report.matrix.valid===true],
  ['27 horizontales',report.horizontals.valid===true],
  ['2 diagonales intactas',report.diagonals.valid===true],
  ['radial nuevo válido',report.radial.valid===true],
  ['Loa I / acróstico válido',report.loaI.valid===true],
  ['Loa II / teléstico válido',report.loaII.valid===true],
  ['49 de 54 mesósticos sobreviven',report.mesostics.validCount===49],
  ['5 mesósticos pendientes',report.mesostics.invalidCount===5],
  ['identidad exacta de pendientes',JSON.stringify(actualInvalid)===JSON.stringify(expectedSorted)]
];

const failed=assertions.filter(([,ok])=>!ok);
console.log(JSON.stringify({
  structuralStable:report.structuralStable,
  horizontals:report.horizontals,
  diagonals:report.diagonals,
  radial:{valid:report.radial.valid,center:report.radial.center},
  loaI:{valid:report.loaI.valid,errors:report.loaI.errors},
  loaII:{valid:report.loaII.valid,errors:report.loaII.errors,relocatedMark:report.loaII.relocatedMark},
  mesostics:{
    total:report.mesostics.total,
    validCount:report.mesostics.validCount,
    invalidCount:report.mesostics.invalidCount,
    invalidIds:report.mesostics.invalidIds,
    invalid:report.mesostics.invalid
  },
  assertions:assertions.map(([name,ok])=>({name,ok}))
},null,2));

if(failed.length){
  console.error('\nFallan:',failed.map(([name])=>name).join(' | '));
  process.exit(1);
}
