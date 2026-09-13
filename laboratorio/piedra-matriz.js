/* Capa pétrea independiente · matriz profunda 27×27
   Parte de la matriz activa ya atravesada por LA VEGA y crea una copia separada.
   Solo sustituye H14 por el nuevo BAJO LA CAL.
   No modifica GRANADA_ROWS ni los poemas visibles.
*/
(()=>{
  const source=window.GRANADA_ROWS;
  const h14=window.GRANADA_LAB_BAJO_LA_CAL?.verses;
  if(!Array.isArray(source)||source.length!==27||!source.every(r=>Array.isArray(r.verses)&&r.verses.length===27)){
    throw new Error('PIEDRA: la matriz profunda 27×27 no está disponible');
  }
  if(!Array.isArray(h14)||h14.length!==27){
    throw new Error('PIEDRA: BAJO LA CAL de laboratorio no está disponible');
  }

  const rows=source.map(r=>({...r,verses:[...r.verses]}));
  const h14Anterior=[...rows[13].verses];
  rows[13].verses=[...h14];

  const clone=o=>JSON.parse(JSON.stringify(o||{}));
  const acrostic=clone(window.GRANADA_ACROSTIC);
  const telestic=clone(window.GRANADA_TELESTIC);

  /* Única marca teléstica que cae sobre la nueva H14.
     P26 · VUELVE necesita E en H14/P26. En el nuevo verso 26,
     «Se abre la puerta; cruza aire del patio.», la E válida está en offset 31.
     Se desplaza la marca; no se altera el verso.
  */
  const p26=telestic.P26?.marks?.find(m=>m.row===14&&m.key==='E');
  if(!p26) throw new Error('PIEDRA: no se localizó la marca teléstica P26/H14');
  p26.start=31;
  p26.end=33;
  p26.keyOffset=0;

  rows.forEach(r=>{
    Object.freeze(r.verses);
    Object.freeze(r);
  });
  Object.freeze(rows);

  window.GRANADA_STONE_ROWS=rows;
  window.GRANADA_STONE_ACROSTIC=acrostic;
  window.GRANADA_STONE_TELESTIC=telestic;
  window.GRANADA_STONE={
    matrixSize:'27 × 27',
    positions:729,
    source:'matriz profunda activa después de LA VEGA; copia independiente',
    replacement:'H14 → BAJO LA CAL de laboratorio',
    center:'Late bajo la cal la acequia hundida.',
    centerCell:'14×14',
    h14Before:h14Anterior,
    h14After:[...h14],
    telesticPatch:{id:'P26',row:14,key:'E',start:31,end:33,keyOffset:0},
    publicMatrixMutated:false
  };
})();
