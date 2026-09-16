(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`22 · SILENCIO

ka ta ka ta tum ta ah

ka ta ka ta tum ta ah

Silencio.

Tum ta ah tum.

He dicho silencio.

Tum ta ah tum.

¿Quién ha autorizado esto?

Tum ta ah tum.

Yo puse la norma. Yo marqué la línea. Yo llamé al pueblo. Yo enseñé la respuesta.

Tum ta ah tum.

Silencio.

ka ta ka ta tum ta ah

Tum ta ah tum.

Qué desagradable cuando una maquinaria aprende a funcionar sin ti.

Me mira la bandera. Me miran los cuerpos. Me mira la corona desde dentro.

Tum ta ah tum.

¿Quién gobierna a quién?

Silencio.

Tum ta ah tum.

No obedece.

Y por primera vez la palabra manda menos que aquello que puso en marcha.

Se abre sesión. Quiero hablar. Tiene tres minutos. Necesito siete. Denegado. Impugno. ¿A quién? A mí.

Aquí la calma va por derrama.

tum ta ah tum

tum ta ah tum`;

  if(window.WORK_DATA.pages.length===21)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<22)window.WORK_DATA.pages[21]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–22';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),22:'SILENCIO'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-22',pages:22,validated:true};
})();
