(()=>{
  const d=window.WORK_DATA;
  if(!d||!Array.isArray(d.pages)||d.pages.length!==97)throw new Error('Miramar Canon 1.7 incompleto');
  /* La fuente del interludio pierde algunas vocales acentuadas al extraerse del PDF.
     Se restauran únicamente las secuencias inequívocas del texto canónico. */
  const fixes=[[/\bm s\b/g,'más'],[/\bM s\b/g,'Más'],[/\bdetr s\b/g,'detrás'],[/\bc mo\b/g,'cómo'],[/\bo do\b/g,'oído'],[/\bNing n\b/g,'Ningún'],[/\bdespu s\b/g,'después'],[/\bl nea\b/g,'línea'],[/\bS lo\b/g,'Sólo'],[/\bl mite\b/g,'límite'],[/¿En qu\s+folio/g,'¿En qué folio'],[/¿Qu coeficiente/g,'¿Qué coeficiente'],[/¿Qui n/g,'¿Quién'],[/hasta aqu\s*,\s*m o;/g,'hasta aquí, mío;'],[/desde aqu\s*,\s*tuyo\./g,'desde aquí, tuyo.']];
  for(let i=63;i<=68;i++){let s=d.pages[i];for(const [re,to] of fixes)s=s.replace(re,to);d.pages[i]=s;}
  if(!d.pages[16].includes('01 · Primer WhatsApp')||!d.pages[69].includes('29 · ¡HE! COMUNIDAD')||!d.pages[85].includes('30 · Diez minutos'))throw new Error('Miramar Canon 1.7 desalineado');

  /* Canon vivo · 16/09/2026: 01 · MIRAMAR COMUNIDAD exacta. */
  const scene1Index=d.pages.findIndex(p=>/^\s*(?:ACTO I[^\n]*\n)?01\s*·\s*Primer WhatsApp\b/m.test(String(p||''))||/^\s*01\s*·\s*MIRAMAR COMUNIDAD\b/m.test(String(p||'')));
  if(scene1Index<0)throw new Error('No se localiza 01 · MIRAMAR COMUNIDAD');
  d.pages[scene1Index]=`I · DOMÉSTICA

01 · MIRAMAR COMUNIDAD

mmm tum ah tum tum ta ah tum

Miramar Comunidad. Propietarias. Definitivo. Definitivo BUENO.

Cuarenta años de ladrillos y todavía no sabemos nombrarnos.

Primero se crea el grupo. Después empieza el calvario.

Buenos días. Grave.

PDF. Extraordinario.

Audio de cuatro minutos. Conflicto comunitario.

Porque nadie manda un audio de cuatro minutos por paz. Si dura más de treinta segundos, hay antecedentes detrás.

Tum ta ah tum.

La mirada no nace con himno. Nace con una notificación.

mmm tum ah tum tum ta ah tum`;

  /* Canon vivo · 16/09/2026: 02 · OK exacta. */
  const okIndex=d.pages.findIndex(p=>/^LA TERRAZA DEL MIRAMAR\n02\s*·/m.test(String(p||''))||/^\s*02\s*·\s*OK\b/m.test(String(p||'')));
  if(okIndex<0)throw new Error('No se localiza 02 · OK');
  d.pages[okIndex]=`02 · OK

mmm tum ah tum tum ta ah tum

Ok.

O. K.

Dos letras. Ni siquiera un punto.

Una persona normal lee Ok y continúa con su vida.

Yo también.

Durante siete segundos.

Siete segundos. Siete.

Ok. Ok. Cuánto sitio dejan dos letras.

tum ta ah tum tum ta ah tum

No dice sí. No dice no. No dice nada que pueda agarrarse. Y, sin embargo, pesa.

Ok amable. Ok seco. Ok de mañana hablamos. Ok de no pienso hablar mañana. Ok administrativo. Ok de ya veremos. Ok de tú sabrás. Ok de no pienso discutir.

Buenas tardes. Mañana voy a tender.

Buenas tardes. Qué forma tan educada de anunciar una catástrofe doméstica.

De acuerdo. Hablamos.

Ok.

No hay tilde. No hay emoji. No hay perito del matiz.

Yo no pregunto. Todavía.

Miro la pantalla. La apago. La enciendo.

Ok. Ok.

Dos letras. Cuatro plantas. Veinte versiones.

Lo que no dices lo pongo yo.

tum ta ta ah tum tum ta ta ah tum`;

  /* Canon vivo · 16/09/2026: 03 · EL CUERPO exacta. */
  const scene3Index=d.pages.findIndex(p=>/^\s*(?:ACTO I[^\n]*\n)?03\s*·\s*El cuerpo en casa\b/m.test(String(p||''))||/^\s*03\s*·\s*EL CUERPO\b/m.test(String(p||'')));
  if(scene3Index<0)throw new Error('No se localiza 03 · EL CUERPO');
  d.pages[scene3Index]=`03 · EL CUERPO

mmm tum ta ah tum mmm tum ta ah tum

Una casa aprende el cuerpo antes que el cuerpo la casa.

Una sabe dónde hundirse, dónde estirarse sin tasa.

Aquí yo me sentaba mal. Que es como una se sienta en casa.

Una pierna bajo el culo. La dignidad relajada.

Abres tres veces la nevera por si a la cuarta hace magia.

Hablas sola con un ficus y hasta el ficus te amenaza.

No pongáis esa cara, niñas.

Una puede ser muy reina y estar en bata en su casa.

La monarquía termina donde empieza la pantufla.

mmm tum ta ah tum clac tum ta ah tum`;

  /* Canon vivo · 16/09/2026: 04 · CLAC exacta. */
  const scene4Index=d.pages.findIndex(p=>/^\s*(?:LA TERRAZA DEL MIRAMAR\n)?04\s*·\s*CLAC\b/m.test(String(p||'')));
  if(scene4Index<0)throw new Error('No se localiza 04 · CLAC');
  d.pages[scene4Index]=`04 · CLAC

clac tum ta ah tum clac tum ta ah tum

¿Veis?

No ha entrado nadie y ya he cambiado la espalda.

De gelatina doméstica a estatua protocolaria.

Antes yo tenía cuerpo. Ahora tengo una postura.

Antes estaba sentada. Ahora estoy en comparecencia.

CLAC.

Pelvis centrada. Columna rígida. Sonrisa social.

CLAC.

La intimidad entra por la puerta y el cuerpo se pone corbata.

Perdón. Eso no rimaba.

La intimidad tampoco siempre.

clac tum ta ah tum tum ta ka ah tum`;

  window.MIRAMAR_SCENE_TITLES=Object.assign({},window.MIRAMAR_SCENE_TITLES,{1:'MIRAMAR COMUNIDAD',2:'OK',3:'EL CUERPO',4:'CLAC'});
  window.MIRAMAR_CANON={version:'1.7+20260916d',pages:97,source:'LA_TERRAZA_DEL_MIRAMAR_CANON.pdf',validated:true};
})();