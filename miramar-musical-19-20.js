(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const extra=[
`19 · GARANTE

tum ka ta tum ka ta ah

tum ka ta tum ka ta ah

Yo no fundé un Estado. Yo pedí que no me tendieran delante.

Después llegó el mensaje. Después la reunión. Después el acta. Después el acta del acta. Después la rectificación del acta.

Que conste en acta. Que conste en acta.

Si no consta, parece que no pasó. Si consta cuatro veces, parece que pasó mejor.

Sábana. Uso. Costumbre. Precedente.

La misma tela subiendo por una escalera de palabras.

En virtud de. A los efectos oportunos. Sin perjuicio de. Conforme a lo acordado.

A la verdad se le pone número de página.

Yo antes decía oye. Ahora digo: requiero.

Antes pedía espacio. Ahora acredito.

Ropa. Frontera. Muro.

Primero cuelga. Luego separa. Después representa.

La persona ya no basta.

ta ka tum ta ka tum ah

ta ka tum ta ka tum ah

Me constituyo garante de la terraza, de la intimidad, de la geometría, de la vertical, de la horizontal, de la ropa seca, del decoro, del Mediterráneo, del desayuno sin supervisión, del derecho fundamental a sentarse mal y de cuanto resulte necesario para la defensa integral del horizonte.

Que conste. Que conste.

Todo cabe si la frase es bastante larga.

Garantizo la sombra. Garantizo la vista. Garantizo la linde. Garantizo el aire. Garantizo que nadie garantice demasiado.

La carpeta crece hasta ocupar el sitio que pretendía proteger.

Informe. Informe del informe. Anexo. Plano. Soleamiento. Fotogrametría. Final. Final bueno. Final bueno dos. Ahora sí definitivo.

Un reino cabe en una carpeta si la carpeta es bastante grande.

Yo quería una terraza. Tengo administración, archivo, doctrina, protocolo, y una silla cada vez más pequeña.

tum ka ta ka pa ra pa tum

tum ka ta ka pa ra pa tum`,
`20 · MIRAMAR

bum ta bum ta ah

bum ta bum ta ah

Miramar.

Mira. Mar.

Qué nombre tan mal escogido para un sitio en el que hemos terminado mirándonos todos menos al mar.

Mira mar. Mira mar.

La palabra lo sabía antes que nosotros.

Miro la puerta. Miro la cuerda. Miro la sábana. Miro quién mira.

bum ta bum ta ah

Mira mar. Mira mar.

El nombre insiste y nadie le hace caso.

Miramar. Mira. Mar.

El edificio es un ojo.

Cada ventana, una sospecha.

Cada balcón, una versión.

Cinco versos. Dos siglos de derecho resueltos desde una butaca.

Cuanto más votamos sobre miradas, más acabamos mirándonos.

Mira mar. Mira mar.

Quizá la salida estaba escrita en la fachada desde el principio.

Pero todavía no.

Todavía quiero tener razón.

ta ka tum ta ka tum ah

ta ka tum ta ka tum ah`
  ];

  if(window.WORK_DATA.pages.length===18)window.WORK_DATA.pages.push(...extra);
  else if(window.WORK_DATA.pages.length<20){
    const have=window.WORK_DATA.pages.length-18;
    window.WORK_DATA.pages.push(...extra.slice(Math.max(0,have)));
  }

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–20';
  window.MIRAMAR_SCENE_TITLES={
    ...(window.MIRAMAR_SCENE_TITLES||{}),
    19:'GARANTE',
    20:'MIRAMAR'
  };
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-20',pages:20,validated:true};
})();
