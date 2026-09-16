(()=>{
  if(document.body?.dataset?.bookId!=='miramar'||window.MIRAMAR_ACTIVE_CANON!=='musical'||!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;
  const page=`10 · VOTEN

tum ka ta ka tum ah

tum ka ta ka tum ah

Territorio. Símbolo. Gente.

Tum ta ah tum.

Una parte aquí. Otra responde.

Tum ta ah tum.

No hace falta entender. Hace falta entrar juntos.

Tum ta ah tum.

tum ka ta ka tum ah

Yo digo territorio. Vosotros devolvéis pulso.

Yo digo bandera. Vosotros devolvéis cuerpo.

Yo digo nosotros...

Tum ta ah tum.

Qué palabra tan peligrosa.

Tum ta ah tum.

¿Puede usarse la terraza comunitaria para tender? Voten.

Si gana sí, gana uno. Si gana no, gana otro. Si empatan: administrador. Eso es bastante peor.

Una votación decide quién vence. No decide cómo mañana se comparte el ascensor.

Por un instante nadie mira desde fuera. Todos sostienen algo.

Territorio. Símbolo. Gente.

Tum ta ah tum.

tum ts ta ts tum ah

tum ts ta ts tum ah`;
  window.WORK_DATA.pages.push(page);
  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–10';
  window.MIRAMAR_SCENE_TITLES=Object.assign({},window.MIRAMAR_SCENE_TITLES,{10:'VOTEN'});
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-10',pages:10,validated:true};
})();