(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`21 · INNOVAR

tik ts tum ts ah

tik ts tum ts ah

Como no pudimos hablar, decidimos innovar.

Es el método moderno: si el problema cabe en una frase, construimos un sistema.

Primera: tender de espaldas.

Parecía estar castigado.

Segunda: tender agachado.

Parecía un artificiero.

Tercera: poner horario.

Mi intimidad, por turnos. De seis y veinte a siete, puede usted ser usted mismo.

Cuarta: mandar un mensaje.

Ansiedad con preaviso. Antes temía que apareciera. Ahora sé cuándo va a venir.

Qué descanso.

tik ts tum ts ah

No hemos hablado. Pero tenemos protocolo.

No hemos resuelto nada. Pero ya se puede diagramar.

Innovar. Innovar.

Cuando falta conversación, siempre queda un PowerPoint imaginario.

ka ka tum ts ta ah

ka ka tum ts ta ah`;

  if(window.WORK_DATA.pages.length===20)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<21)window.WORK_DATA.pages[20]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–21';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),21:'INNOVAR'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-21',pages:21,validated:true};
})();
