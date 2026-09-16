(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`23 · ARCHIVO

tik tik tum ka ta ah

tik tik tum ka ta ah

Primero miras. Después oyes. Después haces una foto. Después guardas la foto.

La primera foto es foto. La segunda ya es archivo. La tercera tiene fecha. La cuarta tiene motivo.

Y un día la foto no basta.

Fotos. Sábana. LiDAR. GML. ZWCAD. Revit. BIM.

Empiezas queriendo una prueba y terminas creando un sistema.

A las tres de la mañana una pinza es un modelo, la sábana tiene capas y mi desayuno, un gemelo.

Ciento veintiocho gigas para renderizar mi pena.

Una tarjeta profesional para calcular la condena.

Zoom. Órbita. Capa. Cota. Exportar. Volver.

Vicente puso una sábana. Yo monté un centro de datos.

Ésa era toda mi épica. Y era demasiado.

Toda razón ocupa sitio. Toda razón con servidor, más.

Sombra. Agravio. Razón absoluta.

Apagar.

La última capa se resiste.

Apagar.

El plano se queda en silencio. Y yo vuelvo a tener terraza.

mmm tum ta ah

mmm tum ta ah`;

  if(window.WORK_DATA.pages.length===22)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<23)window.WORK_DATA.pages[22]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–23';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),23:'ARCHIVO'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-23',pages:23,validated:true};
})();
