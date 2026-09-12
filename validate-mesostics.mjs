import fs from 'node:fs';
import vm from 'node:vm';

const sandbox={
  console,
  document:{createElement:()=>({getContext:()=>null})}
};
sandbox.window=sandbox;
vm.createContext(sandbox);

for(const file of ['matrix-core.js','matrix-1.js','matrix-2.js','matrix-3.js','matrix-mesostic.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
}

if(!Array.isArray(sandbox.GRANADA_ROWS)||sandbox.GRANADA_ROWS.length!==27){
  throw new Error(`Matriz inválida: ${sandbox.GRANADA_ROWS?.length??0} filas`);
}

const report=sandbox.GRANADA_MESOSTIC_REPORT;
const data=sandbox.GRANADA_MESOSTIC;
if(!report||!data)throw new Error('No se generó GRANADA_MESOSTIC');

const ids=Object.keys(data);
if(ids.length!==54)throw new Error(`Se esperaban 54 voces mesósticas y hay ${ids.length}`);

const invalid=ids.filter(id=>!data[id].valid);
if(invalid.length||!report.valid){
  console.error('Mesósticos inválidos:',invalid);
  console.error(report.errors||[]);
  process.exit(1);
}

for(const id of ids){
  const expected=id.endsWith('14')?27:14;
  const item=data[id];
  if(item.letters.length!==expected)throw new Error(`${id}: ${item.letters.length} letras; esperadas ${expected}`);
  if(item.marks.length!==expected)throw new Error(`${id}: ${item.marks.length} marcas; esperadas ${expected}`);
  if(item.marks.some(m=>m.offset<0))throw new Error(`${id}: contiene offsets no resueltos`);
}

console.log('OK · 54 voces mesósticas válidas · 52×14 + 2×27 letras · 729 versos intactos');
