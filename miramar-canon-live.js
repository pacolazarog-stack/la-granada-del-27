(()=>{
  if(document.body?.dataset?.bookId!=='miramar'||!window.WORK_DATA?.pages)return;

  const pages=window.WORK_DATA.pages;
  const i=pages.findIndex(p=>/^\s*02\s*·\s*OK\b/m.test(String(p||'')));
  if(i<0){console.error('Miramar: no se localiza 02 · OK');return;}

  pages[i]=`02 · OK

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

  window.MIRAMAR_SCENE_TITLES=Object.assign({},window.MIRAMAR_SCENE_TITLES,{2:'OK'});
  window.MIRAMAR_CANON=Object.assign({},window.MIRAMAR_CANON,{liveRevision:'2026-09-16-ok-exacto'});
})();