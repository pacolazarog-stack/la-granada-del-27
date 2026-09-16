(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`25 · QUIÉN MIRA A QUIÉN

tum tum ta ka ta ka ah

tum tum ta ka ta ka ah

Una cosa es mirar el mar. Otra mirar una casa.

Y otra muy distinta mirar tanto una casa que terminas creyendo que tienes voto dentro.

Mira. Mira. ¿Quién mira a quién?

Yo temía tu mirada. Luego vigilé tu puerta. Después conté tus pasos. Más tarde medí tu ausencia.

Mira. Mira. ¿Quién mira a quién?

No quería ser observada. Aprendí a observar.

No quería un control. Construí un sistema.

tum tum ta ka ta ka ah

Mira. Mira. ¿Quién mira a quién?

La ventana no cambia. La cuerda no cambia. El mar no cambia.

Cambia la dirección del ojo.

Yo decía: no me mires.

Ahora sé a qué hora llegas.

Contar sola tiene truco: una elige la medida, cuándo entra la otra voz y cuándo se la retira.

Puedo contar mi molestia sin contar tu incomodidad.

Eso es una ventaja enorme. Y una pequeña deshonestidad.

Mira. Mira. ¿Quién mira a quién?

bum ta bum ta ah

bum ta bum ta ah`;

  if(window.WORK_DATA.pages.length===24)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<25)window.WORK_DATA.pages[24]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–25';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),25:'QUIÉN MIRA A QUIÉN'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-25',pages:25,validated:true};
})();
