(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const extra=[
`23 · ARCHIVO

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

mmm tum ta ah`,
`24 · AUSENCIA

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

tum tum ta ka ta ka ah`,
`25 · QUIÉN MIRA A QUIÉN

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

bum ta bum ta ah`,
`26 · CÓMO SEGUIMOS

bum ta bum ta ah

tum ta ah tum

¿Buscamos una solución que permita usar lo común sin convertir mi intimidad ni en tabú ni en ataúd?

Tum ta ah tum.

Voten.

Pregunta perfecta, por cierto. Todos pueden decir sí porque no explica ni cómo, ni cuándo, ni dónde, ni aquí.

Tum ta ah tum.

Ya aprobamos sentido común. Ahora hay que localizarlo.

Por primera vez no preguntamos quién gana.

Preguntamos:

¿cómo seguimos?

¿Cómo seguimos?

Tum ta ah tum.

No hace falta entenderlo todo. Hace falta entrar juntos.

Tum ta ah tum.

¿Cómo seguimos?

TUM TA AH TUM

TUM TA AH TUM`,
`27 · UMBRAL

mar ram`
  ];

  if(window.WORK_DATA.pages.length===22)window.WORK_DATA.pages.push(...extra);
  else if(window.WORK_DATA.pages.length<27){
    const have=window.WORK_DATA.pages.length-22;
    window.WORK_DATA.pages.push(...extra.slice(Math.max(0,have)));
  }

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–27';
  window.MIRAMAR_SCENE_TITLES={
    ...(window.MIRAMAR_SCENE_TITLES||{}),
    23:'ARCHIVO',
    24:'AUSENCIA',
    25:'QUIÉN MIRA A QUIÉN',
    26:'CÓMO SEGUIMOS',
    27:'UMBRAL'
  };
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-27',pages:27,validated:true};
})();
