import fs from 'node:fs';
import vm from 'node:vm';

globalThis.window=globalThis;

const files=[
  'matrix-core.js',
  'matrix-1.js',
  'matrix-2.js',
  'matrix-3.js',
  'matrix-secret.js',
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

const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
const key=c=>String(c||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
const mesosticPath=n=>n===14
  ? Array.from({length:27},(_,i)=>i+1)
  : n<14
    ? Array.from({length:14},(_,i)=>14-i)
    : Array.from({length:14},(_,i)=>14+i);

function interiorAlphabet(line){
  const chars=Array.from(line||'');
  const alphaIdx=[];
  chars.forEach((c,i)=>{if(alpha.test(c))alphaIdx.push(i)});
  if(alphaIdx.length<3)return '';
  const first=alphaIdx[0],last=alphaIdx[alphaIdx.length-1];
  return [...new Set(alphaIdx.filter(i=>i>first&&i<last).map(i=>key(chars[i])))].sort().join('');
}

function constraintsFor(id){
  const side=id[0];
  const n=Number(id.slice(1));
  return mesosticPath(n).map(pos=>{
    const line=side==='P'
      ? globalThis.GRANADA_STONE_ROWS[pos-1].verses[n-1]
      : globalThis.GRANADA_STONE_ROWS[n-1].verses[pos-1];
    return {position:pos,alphabet:interiorAlphabet(line),line};
  });
}

const redesignIds=['P03','P05','H14','P19','P27'];
const redesignConstraints=Object.fromEntries(redesignIds.map(id=>[id,constraintsFor(id)]));

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
  source:globalThis.GRANADA_STONE.source,
  relationToSurface:globalThis.GRANADA_STONE.relationToSurface,
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
  redesignConstraints,
  assertions:assertions.map(([name,ok])=>({name,ok}))
},null,2));

if(failed.length){
  console.error('\nFallan:',failed.map(([name])=>name).join(' | '));
  process.exit(1);
}
