(()=>{
  if(document.body?.dataset?.bookId!=='miramar'||!window.WORK_B64||!window.pako)return;
  try{
    const clean=String(window.WORK_B64).replace(/\s+/g,'');
    const bin=atob(clean),bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const raw=window.pako.ungzip(bytes,{to:'string'});
    const data=JSON.parse(raw);

    /* El PDF canónico 1.7 usa en el interludio una variante de fuente cuya
       tabla ToUnicode entrega U+0000 en 26 vocales acentuadas. Se restauran
       sólo esas secuencias inequívocas; no se reescribe ninguna frase. */
    const fixes=[
      [/m\u0000s/g,'más'],[/M\u0000s/g,'Más'],
      [/detr\u0000s/g,'detrás'],[/c\u0000mo/g,'cómo'],[/C\u0000mo/g,'Cómo'],
      [/o\u0000do/g,'oído'],[/Ning\u0000n/g,'Ningún'],
      [/qu\u0000/g,'qué'],[/Qu\u0000/g,'Qué'],[/Qui\u0000n/g,'Quién'],
      [/despu\u0000s/g,'después'],[/l\u0000nea/g,'línea'],[/S\u0000lo/g,'Sólo'],
      [/l\u0000mite/g,'límite'],[/aqu\u0000/g,'aquí'],[/m\u0000o/g,'mío']
    ];
    data.pages=data.pages.map(page=>{
      let s=String(page??'');
      for(const [re,to] of fixes)s=s.replace(re,to);
      return s;
    });
    if(data.pages.some(p=>p.includes('\u0000')))throw new Error('Quedan caracteres nulos sin resolver');
    if(data.pages.length!==97)throw new Error(`Número de páginas inesperado: ${data.pages.length}`);
    if(!data.pages[16]?.includes('01 · Primer WhatsApp'))throw new Error('No se localiza la escena 01 en la página 17');
    if(!data.pages[69]?.includes('29 · ¡HE! COMUNIDAD'))throw new Error('No se localiza la escena 29 en la página 70');
    if(!data.pages[85]?.includes('30 · Diez minutos'))throw new Error('No se localiza la escena 30 en la página 86');
    window.WORK_DATA=data;
    window.MIRAMAR_CANON={version:'1.7',pages:data.pages.length,validated:true};
  }catch(err){
    console.error('Miramar Canon 1.7: no se pudo validar el corpus',err);
  }
})();
