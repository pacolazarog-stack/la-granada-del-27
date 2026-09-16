(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`18 · CONFORME A DERECHO

tum pa ra pa ta ta tum

tum pa ra pa ta ta tum

Por las razones anteriormente expuestas, conforme a derecho, costumbre, lógica, decoro, estética, geometría, convivencia, soleamiento, higiene visual, memoria vecinal y cuanto resulte de aplicación.

Conforme a derecho. Conforme a derecho.

Más papel. Más sello.

La razón no engorda por llevar toga.

tum pa ra pa ta ta tum

Señoría, aquí la sábana.

Objeto textil blanco, dos cuarenta, aproximadamente, conducta ondulante, viento como cooperador necesario.

Conforme a derecho. Conforme a derecho.

El papel ordena lo que el aire desordena.

Pregunto por el uso. Me responden por la mayoría.

Pregunto por la intimidad.

No figura en el orden del día.

tum pa ra pa ta ta tum

Todo cabe en un expediente menos la mañana concreta en la que una no quería salir.

Por las razones anteriormente expuestas, conforme a derecho, costumbre, lógica, decoro, estética, geometría, convivencia y sentido común...

Y porque me da la gana.

tum tik ta tum tik ta ah

tum tik ta tum tik ta ah`;

  if(window.WORK_DATA.pages.length===17)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<18)window.WORK_DATA.pages[17]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–18';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),18:'CONFORME A DERECHO'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-18',pages:18,validated:true};
})();
