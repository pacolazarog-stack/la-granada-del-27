(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`24 · AUSENCIA

mmm tum ta ah

mmm tum ta ah

No estaba allí. Y yo miraba si estaba.

La presencia que no existe ya pesaba más que la entrada.

Un día salí y pensé: qué raro, hoy no pasa nada.

Había vuelto su ausencia una anomalía registrada.

Yo ya no salía al mar. Auditaba la terraza.

No desayunaba. Verificaba.

No miraba. Comprobaba.

De señora medio enfadada a consultora privada.

Granada seguía en Granada. El mar seguía en su casa. La luz seguía dorada.

Pero yo miraba primero dónde no estaba la sábana.

Un día esperé aquel CLAC.

No porque quisiera verlo. Porque la espera era mía.

Qué mal negocio: pagar alquiler emocional por una ausencia.

No estaba entrando. Yo seguía dejándolo entrar.

El conflicto no ocupó suelo. Ocupó el orden de mi mirada.

Lo privativo seguía intacto. Lo íntimo, bastante menos.

mmm tum ta ah

tum tum ta ka ta ka ah`;

  if(window.WORK_DATA.pages.length===23)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<24)window.WORK_DATA.pages[23]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–24';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),24:'AUSENCIA'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-24',pages:24,validated:true};
})();
