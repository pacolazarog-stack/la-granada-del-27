(()=>{
  const d=window.WORK_DATA;
  if(!d||!Array.isArray(d.pages)||d.pages.length!==97)throw new Error('Miramar Canon 1.7 incompleto');
  /* La fuente del interludio pierde algunas vocales acentuadas al extraerse del PDF.
     Se restauran únicamente las secuencias inequívocas del texto canónico. */
  const fixes=[[/\bm s\b/g,'más'],[/\bM s\b/g,'Más'],[/\bdetr s\b/g,'detrás'],[/\bc mo\b/g,'cómo'],[/\bo do\b/g,'oído'],[/\bNing n\b/g,'Ningún'],[/\bdespu s\b/g,'después'],[/\bl nea\b/g,'línea'],[/\bS lo\b/g,'Sólo'],[/\bl mite\b/g,'límite'],[/¿En qu\s+folio/g,'¿En qué folio'],[/¿Qu coeficiente/g,'¿Qué coeficiente'],[/¿Qui n/g,'¿Quién'],[/hasta aqu\s*,\s*m o;/g,'hasta aquí, mío;'],[/desde aqu\s*,\s*tuyo\./g,'desde aquí, tuyo.']];
  for(let i=63;i<=68;i++){let s=d.pages[i];for(const [re,to] of fixes)s=s.replace(re,to);d.pages[i]=s;}
  if(!d.pages[16].includes('01 · Primer WhatsApp')||!d.pages[69].includes('29 · ¡HE! COMUNIDAD')||!d.pages[85].includes('30 · Diez minutos'))throw new Error('Miramar Canon 1.7 desalineado');
  window.MIRAMAR_CANON={version:'1.7',pages:97,source:'LA_TERRAZA_DEL_MIRAMAR_CANON.pdf',validated:true};
})();