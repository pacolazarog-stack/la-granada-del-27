(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages)||window.WORK_DATA.pages.length<21)return;

  const continuation=`ka ka tum ts ta ah

ka ka tum ts ta ah

Quinta: pantalla total.

Por fin nadie me veía. Ni yo veía Granada. Ni el mar. Ni entraba aire.

Victoria absoluta: había ganado una cárcel.

Sexta: celosía.

Séptima: toldo.

Octava: sensor.

Novena: cámara.

Para no sentirme observada instalamos vigilancia.

Décima: un semáforo.

Verde, tiende. Rojo, desayuno. Ámbar, depende de la bata.

Undécima: inteligencia artificial.

Dialoguen de forma constructiva.

La máquina se lavó las manos con una elegancia inaudita.

Duodécima: hablar.

Silencio.

Se descartó la propuesta porque no estaba presupuestada.

Tenemos móviles que saben si dormimos bien. Coches que aparcan sin nadie. Mapas que llegan antes que tú.

Pero no existe una app que diga: no seas pesao.

O sí. Se llama el vecino.

No tiene modo silencio. No acepta cookies. No actualiza de noche. Y si lo bloqueas, te lo cruzas en el portal.

Yo podía modelar la sombra y no sabía hablar.

El futuro entró en Miramar. La comunidad, en el punto seis.

ka ta ka ta tum ta ah

ka ta ka ta tum ta ah`;

  window.WORK_DATA.pages[20]=`${window.WORK_DATA.pages[20]}\n\n${continuation}`;
  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–21';
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-21b',pages:21,validated:true};
})();
