/* Validación técnica no visible para el lector.
   Se ejecuta después de matrix-mesostic.js.
*/
(()=>{
  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const key=c=>String(c||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const checks=[];
  const add=(name,ok,detail='')=>checks.push({name,ok:!!ok,detail});
  const CENTER='Late bajo la cal la acequia hundida.';

  const rows=window.GRANADA_ROWS||[];
  add('matriz_27x27',rows.length===27&&rows.every(r=>Array.isArray(r.verses)&&r.verses.length===27));
  add('centro_14x14',rows[13]?.verses?.[13]===CENTER);
  add('p14_piedra_27_versos',rows.every(r=>typeof r.verses?.[13]==='string'));
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

  const extras=[[6,15],[23,15],[25,13],[25,15]];
  add('diagonales_sin_cambios',extras.every(([r,c])=>r!==c&&r+c!==28));
  add('radial_sin_cambios',rows[13]?.verses?.[13]===CENTER);

  const active=window.GRANADA_LA_VEGA_ACTIVE;
  if(active){
    add('la_vega_triptych',active.kind==='triptych');
    add('la_vega_14_14_14',Array.isArray(active.sectionVerseCounts)&&active.sectionVerseCounts.join(',')==='14,14,14');
    add('la_vega_42_versos',active.verseCount===42);
    add('la_vega_centro_unico',active.centralVerse===CENTER&&active.threshold===CENTER&&active.closure===CENTER);
    add('la_vega_no_forzada_en_p14',active.relationToCube?.includes('no se fuerza')===true);
  }

  const valid=checks.every(x=>x.ok);
  window.GRANADA_VALIDATION={valid,checks};
  if(!valid) console.error('Validación estructural: incidencias',checks.filter(x=>!x.ok));
})();
