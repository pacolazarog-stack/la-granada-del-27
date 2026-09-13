/* Mesósticos de la capa pétrea · 54 voces exactas.
   Usa GRANADA_STONE_ROWS y las cinco voces rediseñadas sin alterar versos.
*/
(()=>{
  const rows=window.GRANADA_STONE_ROWS;
  const voices=window.GRANADA_STONE_MESOSTIC_VOICES;
  if(!rows||!voices) throw new Error('MESÓSTICOS PIEDRA: faltan filas o voces');

  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const key=c=>String(c||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const letters=s=>Array.from(String(s||'')).filter(c=>alpha.test(c)).map(key);
  const path=n=>n===14
    ? Array.from({length:27},(_,i)=>i+1)
    : n<14
      ? Array.from({length:14},(_,i)=>14-i)
      : Array.from({length:14},(_,i)=>14+i);

  function chooseOffset(line,target){
    const chars=Array.from(line||'');
    const idx=[];
    chars.forEach((c,i)=>{if(alpha.test(c))idx.push(i)});
    if(idx.length<3)return -1;
    const first=idx[0],last=idx[idx.length-1],center=(line.length-1)/2;
    const candidates=idx.filter(i=>i>first&&i<last&&key(chars[i])===target);
    candidates.sort((a,b)=>Math.abs(a-center)-Math.abs(b-center)||a-b);
    return candidates.length?candidates[0]:-1;
  }

  function makeSide(n,side,text){
    const keys=letters(text),positions=path(n),expected=n===14?27:14;
    const marks=[],errors=[];
    if(keys.length!==expected)errors.push(`longitud ${keys.length}; esperada ${expected}`);
    positions.forEach((pos,i)=>{
      const line=side==='P'?rows[pos-1].verses[n-1]:rows[n-1].verses[pos-1];
      const wanted=keys[i]||'';
      const offset=chooseOffset(line,wanted);
      marks.push(side==='P'?{row:pos,offset,key:wanted}:{position:pos,offset,key:wanted});
      if(offset<0)errors.push(`${side}${String(n).padStart(2,'0')} · ${pos}: falta ${wanted}`);
    });
    return {text,letters:keys.join(''),positions,marks,valid:errors.length===0,errors};
  }

  const out={},errors=[];
  for(let n=1;n<=27;n++){
    const id=String(n).padStart(2,'0');
    out[`P${id}`]=makeSide(n,'P',voices[n].v);
    out[`H${id}`]=makeSide(n,'H',voices[n].h);
    errors.push(...out[`P${id}`].errors,...out[`H${id}`].errors);
  }
  window.GRANADA_STONE_MESOSTIC=out;
  window.GRANADA_STONE_MESOSTIC_REPORT={
    valid:errors.length===0,
    total:54,
    errors,
    geometry:'P(r,n) ↔ H(n,r); 14×14 como gozne',
    rule:'letra interior próxima al centro; la voz se adapta al verso, nunca al revés'
  };
  if(errors.length) console.warn('GRANADA_STONE_MESOSTIC: incidencias',errors);
})();
