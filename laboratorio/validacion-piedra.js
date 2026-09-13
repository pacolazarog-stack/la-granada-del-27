/* Validación de la capa pétrea independiente.
   Comprueba horizontales, diagonales, radial, Loa I, Loa II y 54 mesósticos.
   No modifica poemas ni matriz pública.
*/
(()=>{
  const rows=window.GRANADA_STONE_ROWS;
  const source=window.GRANADA_ROWS;
  const acrostic=window.GRANADA_STONE_ACROSTIC;
  const telestic=window.GRANADA_STONE_TELESTIC;
  const voices=window.GRANADA_MESOSTIC_VOICES;
  if(!rows||!source||!acrostic||!telestic||!voices){
    throw new Error('VALIDACIÓN PIEDRA: faltan dependencias');
  }

  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const key=c=>String(c||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const letters=s=>Array.from(String(s||'')).filter(c=>alpha.test(c)).map(key);
  const path=n=>n===14
    ? Array.from({length:27},(_,i)=>i+1)
    : n<14
      ? Array.from({length:14},(_,i)=>14-i)
      : Array.from({length:14},(_,i)=>14+i);

  function interiorOffset(line,target){
    const chars=Array.from(line||'');
    const idx=[];
    chars.forEach((c,i)=>{if(alpha.test(c))idx.push(i)});
    if(idx.length<3)return -1;
    const first=idx[0],last=idx[idx.length-1];
    const center=(line.length-1)/2;
    const candidates=idx.filter(i=>i>first&&i<last&&key(chars[i])===target);
    candidates.sort((a,b)=>Math.abs(a-center)-Math.abs(b-center)||a-b);
    return candidates.length?candidates[0]:-1;
  }

  const matrix={
    valid:rows.length===27&&rows.every(r=>Array.isArray(r.verses)&&r.verses.length===27),
    rows:rows.length,
    columns:rows.every(r=>r.verses.length===27)?27:null,
    center:rows[13]?.verses?.[13]
  };

  const horizontals={
    total:27,
    inherited:26,
    replaced:['H14 · BAJO LA CAL'],
    valid:matrix.valid&&rows[13].verses.every((v,i)=>v===window.GRANADA_LAB_BAJO_LA_CAL.verses[i])
  };

  const diagDown=rows.map((r,i)=>r.verses[i]);
  const diagUp=rows.map((r,i)=>r.verses[26-i]);
  const sourceDown=source.map((r,i)=>r.verses[i]);
  const sourceUp=source.map((r,i)=>r.verses[26-i]);
  const diagonals={
    total:2,
    downUnchanged:diagDown.every((v,i)=>v===sourceDown[i]),
    upUnchanged:diagUp.every((v,i)=>v===sourceUp[i]),
    centerDown:diagDown[13],
    centerUp:diagUp[13]
  };
  diagonals.valid=diagonals.downUnchanged&&diagonals.upUnchanged&&diagDown[13]===window.GRANADA_STONE.center;

  const radial={
    center:rows[13].verses[13],
    buried:[rows[13].verses[13],...rows[13].verses.slice(0,13).reverse()],
    open:[rows[13].verses[13],...rows[13].verses.slice(14)]
  };
  radial.valid=radial.center===window.GRANADA_STONE.center
    &&radial.buried.every((v,i)=>v===window.GRANADA_LAB_BAJO_LA_CAL.radial.buried.verses[i])
    &&radial.open.every((v,i)=>v===window.GRANADA_LAB_BAJO_LA_CAL.radial.open.verses[i]);

  const acrosticErrors=[];
  Object.entries(acrostic).forEach(([id,item])=>{
    if(item.system)return;
    const row=Number(id.slice(1))-1;
    (item.marks||[]).forEach(m=>{
      const line=rows[row]?.verses?.[m.position-1]||'';
      if(key(line[m.offset])!==key(m.key)){
        acrosticErrors.push(`${id} · posición ${m.position}: esperaba ${m.key}`);
      }
    });
  });
  const loaI={
    text:window.GRANADA_CHORAL_I,
    valid:acrosticErrors.length===0&&acrostic.H14?.word==='VEINTISIETE',
    errors:acrosticErrors
  };

  const telesticErrors=[];
  Object.entries(telestic).forEach(([id,item])=>{
    if(item.system)return;
    const col=Number(id.slice(1))-1;
    (item.marks||[]).forEach(m=>{
      const line=rows[m.row-1]?.verses?.[col]||'';
      const segment=line.slice(m.start,m.end);
      if(key(segment[m.keyOffset])!==key(m.key)){
        telesticErrors.push(`${id} · fila ${m.row}: esperaba ${m.key}; segmento «${segment}»`);
      }
    });
  });
  const loaII={
    text:window.GRANADA_CHORAL_II,
    valid:telesticErrors.length===0&&telestic.P14?.word==='VEINTISIETE',
    errors:telesticErrors,
    relocatedMark:window.GRANADA_STONE.telesticPatch
  };

  function makeMesostic(n,side,text){
    const wanted=letters(text);
    const positions=path(n);
    const errors=[];
    positions.forEach((pos,i)=>{
      const line=side==='P' ? rows[pos-1].verses[n-1] : rows[n-1].verses[pos-1];
      const target=wanted[i]||'';
      if(interiorOffset(line,target)<0){
        errors.push({position:pos,key:target,line});
      }
    });
    return {id:`${side}${String(n).padStart(2,'0')}`,text,valid:errors.length===0,errors};
  }

  const mesosticItems=[];
  for(let n=1;n<=27;n++){
    mesosticItems.push(makeMesostic(n,'P',voices[n].v));
    mesosticItems.push(makeMesostic(n,'H',voices[n].h));
  }
  const invalid=mesosticItems.filter(x=>!x.valid);
  const mesostics={
    total:54,
    validCount:54-invalid.length,
    invalidCount:invalid.length,
    validIds:mesosticItems.filter(x=>x.valid).map(x=>x.id),
    invalidIds:invalid.map(x=>x.id),
    invalid:invalid.map(x=>({id:x.id,text:x.text,errors:x.errors})),
    complete:invalid.length===0
  };

  const structuralStable=matrix.valid&&horizontals.valid&&diagonals.valid&&radial.valid&&loaI.valid&&loaII.valid;
  window.GRANADA_STONE_REPORT={
    structuralStable,
    matrix,
    horizontals,
    diagonals,
    radial,
    loaI,
    loaII,
    mesostics,
    policy:'Los mesósticos pendientes se rediseñan; no se cambia un poema conseguido para insertar una letra.'
  };
})();
