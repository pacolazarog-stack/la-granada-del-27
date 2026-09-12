(()=> {
  const VOICES={
    1:{v:"ARDE GRANADA AÚN",h:"AÚN LA CALLE ARDE"},
    2:{v:"LA MESA AÚN SUENA",h:"AQUÍ NACE LA MESA"},
    3:{v:"VOZ NACE MEMORIA",h:"UNA MÚSICA SUENA"},
    4:{v:"LORCA ALLÍ SIGUE",h:"GRANADA NOS ABRE"},
    5:{v:"MANO ABRE EL HILO",h:"GESTO HABLA ALLÍ"},
    6:{v:"LA VOZ DEL PORTAL",h:"GRANADA ENTRA YA"},
    7:{v:"EL TÍTERE OCULTO",h:"EL TÍTERE RENACE"},
    8:{v:"LA PUERTA RENACE",h:"AÚN LA MESA CANTA"},
    9:{v:"ANTES LATE EL DÍA",h:"AÚN EL RUMOR NACE"},
    10:{v:"AÚN AGOSTO PARTE",h:"EL PASADO NO PASA"},
    11:{v:"LA MEMORIA DUELE",h:"HUELLA AÚN QUEDA"},
    12:{v:"EL SILENCIO LATE",h:"TIERRA AÚN SIGUE"},
    13:{v:"LA CASA RECUERDA",h:"LA PUERTA ESPERA"},
    14:{v:"GRANADA AÚN MIRA; LA CAL AÚN CANTA",h:"TIERRA GUARDA LA PUERTA ANTIGUA"},
    15:{v:"OTRA CIUDAD MIRA",h:"OTRA MIRADA NACE"},
    16:{v:"LA PIEDRA GUARDA",h:"PIEDRA AÚN HABLA"},
    17:{v:"OTRA MARCA QUEDA",h:"EL NOMBRE VUELVE"},
    18:{v:"MEMORIA GIRA AÚN",h:"GRANADA GIRA AÚN"},
    19:{v:"GRANADA MIRA AÚN",h:"MIRA: NACE MAÑANA"},
    20:{v:"AÚN RINCONCILLO",h:"ANTIGUA ACEQUIA"},
    21:{v:"NACE EL GALLO AÚN",h:"RESPIRA SIEMPRE"},
    22:{v:"MEMORIA ABIERTA",h:"SILENCIO, TIERRA"},
    23:{v:"ELLAS RECUERDAN",h:"CIUDAD RECUERDA"},
    24:{v:"UMBRAL COMIENZA",h:"MIRADA RESPONDE"},
    25:{v:"PUERTA RECUERDA",h:"ABIERTA GRANADA"},
    26:{v:"RENACE, COMIENZA",h:"RECUERDA CIUDAD"},
    27:{v:"TIERRA PRESENTE",h:"SIGLO PERMANECE"}
  };

  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const key=c=>String(c||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
  const letters=s=>Array.from(String(s||"")).filter(c=>alpha.test(c)).map(key);
  const path=n=>n===14
    ? Array.from({length:27},(_,i)=>i+1)
    : n<14
      ? Array.from({length:14},(_,i)=>14-i)
      : Array.from({length:14},(_,i)=>14+i);

  let ctx=null;
  try{
    const canvas=document.createElement("canvas");
    ctx=canvas.getContext("2d");
    if(ctx)ctx.font='17px Georgia, "Times New Roman", serif';
  }catch(_){ctx=null;}

  function visualDistance(line,offset){
    if(!ctx)return Math.abs(offset-(line.length-1)/2);
    const total=ctx.measureText(line).width;
    const before=ctx.measureText(line.slice(0,offset)).width;
    const glyph=ctx.measureText(line[offset]||"").width;
    return Math.abs((before+glyph/2)-total/2);
  }

  function chooseOffset(line,target){
    const chars=Array.from(line);
    const alphaIdx=[];
    chars.forEach((c,i)=>{if(alpha.test(c))alphaIdx.push(i)});
    if(alphaIdx.length<3)return -1;
    const first=alphaIdx[0],last=alphaIdx[alphaIdx.length-1];
    const candidates=alphaIdx.filter(i=>i>first&&i<last&&key(chars[i])===target);
    candidates.sort((a,b)=>visualDistance(line,a)-visualDistance(line,b)||a-b);
    return candidates.length?candidates[0]:-1;
  }

  function makeSide(n,side,text){
    const keys=letters(text),positions=path(n);
    const expected=n===14?27:14;
    const marks=[];
    const errors=[];
    if(keys.length!==expected)errors.push(`longitud ${keys.length}; esperada ${expected}`);
    positions.forEach((pos,i)=>{
      const line=side==="P"
        ? GRANADA_ROWS[pos-1].verses[n-1]
        : GRANADA_ROWS[n-1].verses[pos-1];
      const wanted=keys[i]||"";
      const offset=chooseOffset(line,wanted);
      const mark=side==="P"
        ? {row:pos,offset,key:wanted}
        : {position:pos,offset,key:wanted};
      marks.push(mark);
      if(offset<0)errors.push(`${side}${String(n).padStart(2,"0")} · ${pos}: falta ${wanted}`);
    });
    return {text,letters:keys.join(""),positions,marks,valid:errors.length===0,errors};
  }

  const out={};
  const report=[];
  for(let n=1;n<=27;n++){
    const id=String(n).padStart(2,"0");
    out[`P${id}`]=makeSide(n,"P",VOICES[n].v);
    out[`H${id}`]=makeSide(n,"H",VOICES[n].h);
    if(!out[`P${id}`].valid)report.push(...out[`P${id}`].errors);
    if(!out[`H${id}`].valid)report.push(...out[`H${id}`].errors);
  }

  window.GRANADA_MESOSTIC=out;
  window.GRANADA_MESOSTIC_VOICES=VOICES;
  window.GRANADA_MESOSTIC_REPORT={
    valid:report.length===0,
    errors:report,
    rule:"letra interior más próxima al centro tipográfico; empate: primera aparición",
    geometry:"P(r,n) ↔ H(n,r); 14×14 como gozne"
  };
  if(report.length)console.warn("GRANADA_MESOSTIC: incidencias",report);
})();
