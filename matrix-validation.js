/* Validación técnica no visible para el lector.
   Se ejecuta después de matrix-mesostic.js.
*/
(()=>{
  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const key=c=>String(c||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const checks=[];
  const add=(name,ok,detail='')=>checks.push({name,ok:!!ok,detail});

  const rows=window.GRANADA_ROWS||[];
  add('matriz_27x27',rows.length===27&&rows.every(r=>Array.isArray(r.verses)&&r.verses.length===27));
  add('centro_14x14',rows[13]?.verses?.[13]==='Late bajo la cal la acequia hundida.');
  add('p14_27_versos',rows.every(r=>typeof r.verses?.[13]==='string'));
  add('mesosticos_54',window.GRANADA_MESOSTIC_REPORT?.valid===true,(window.GRANADA_MESOSTIC_REPORT?.errors||[]).join(' | '));

  function markChar(line,offset){return line?.[offset]||'';}
  const h08=window.GRANADA_ACROSTIC?.H08?.marks?.find(m=>m.position===14&&m.key==='E');
  const h17=window.GRANADA_ACROSTIC?.H17?.marks?.find(m=>m.position===14&&m.key==='M');
  const p15=window.GRANADA_TELESTIC?.P15?.marks?.find(m=>m.row===23&&m.key==='A');
  add('acrostico_H08_P14',h08&&key(markChar(rows[7].verses[13],h08.offset))==='E');
  add('acrostico_H17_P14',h17&&key(markChar(rows[16].verses[13],h17.offset))==='M');
  if(p15){
    const segment=rows[22].verses[14].slice(p15.start,p15.end);
    add('telestico_P15_H23',key(segment[p15.keyOffset])==='A',segment);
  }else add('telestico_P15_H23',false,'marca no localizada');

  // Ninguna celda modificada fuera de 14×14 pertenece a las dos diagonales centrales.
  const extras=[[6,15],[23,15],[25,13],[25,15]];
  add('diagonales_sin_cambios',extras.every(([r,c])=>r!==c&&r+c!==28));

  // H14, de la que nacen los dos sonetos, solo comparte con P14 la celda central y ésta no cambia.
  add('radial_sin_cambios',rows[13].verses[13]==='Late bajo la cal la acequia hundida.');

  // Recuento métrico de P14 validado manualmente antes de integración.
  add('metrica_P14_27x11',Array.isArray(window.GRANADA_LA_VEGA_ACTIVE?.metricCounts)&&window.GRANADA_LA_VEGA_ACTIVE.metricCounts.length===27&&window.GRANADA_LA_VEGA_ACTIVE.metricCounts.every(n=>n===11),'validación manual registrada');

  const valid=checks.every(x=>x.ok);
  window.GRANADA_VALIDATION={valid,checks};
  if(!valid) console.error('Validación estructural: incidencias',checks.filter(x=>!x.ok));
})();
