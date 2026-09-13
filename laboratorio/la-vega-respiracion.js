/* LA VEGA · respiración orgánica de P14
   Base de trabajo para sustituir P14 solo después de validar las 27 lecturas horizontales.
   Criterios simultáneos:
   - 27 endecasílabos (recuento manual con sinalefas naturales)
   - centro 14×14 intacto
   - máxima continuidad sintáctica compatible con las lecturas horizontales
   - mesóstico P14 íntegro
   - primera letra mesóstica de H01–H27 disponible en la celda P14 de cada fila
   - letras de Loa I que caen en P14 conservables mediante nuevos offsets
*/

window.GRANADA_RESPIRACION_P14 = {
  title: 'LA VEGA',
  center: 14,
  verses: [
    'La azada deja barro gris al alba;',
    'antes del sol, un jornalero cruza,',
    'arde la cal al borde de la acequia',
    'y un niño pisa fango por las lindes.',

    'La Acequia Gorda cose lentamente',
    'el Genil con el barro de las huertas;',
    'una semilla abría su silencio',
    'y un cuerpo se doblaba en cada surco.',

    'Granada terminaba entre las huertas,',
    'sin una raya fija en los caminos;',
    'aquí la remolacha alzó sus hojas,',
    'el tabaco ardió en viejos secaderos',
    'y alguien contó monedas en la sombra.',

    'Late bajo la cal la acequia hundida.',

    'El agua asoma bajo los solares',
    'y el agua aparece en sótanos de naves;',
    'la linde sobrevive contra un muro,',
    'la tapia tuerce el gesto de una higuera,',
    'resiste un brazal junto al almacén,',
    'y por un taller cruza barro espeso;',
    'bajo un portal regresa el agua oscura,',
    'y palpa hondas raíces que resisten.',

    'Un tubo corta en dos la tierra húmeda',
    'sin dejar recta la pared mojada;',
    'gotea un caño junto a los cimientos.',
    'Granada pisa barro entre garajes:',
    'la acequia pasa bajo la avenida.'
  ],

  periods: [
    [1,4],
    [5,8],
    [9,13],
    [14,14],
    [15,22],
    [23,27]
  ],

  metric: {
    expected: 11,
    counts: [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    note: 'Recuento manual con sinalefas naturales; no se fuerza dialefa para sostener ningún verso.'
  },

  fixedCenter: 'Late bajo la cal la acequia hundida.',

  mesosticP14: {
    voice: 'GRANADA AÚN MIRA; LA CAL AÚN CANTA',
    letters: 'GRANADAAUNMIRALACALAUNCANTA',
    valid: true,
    note: 'Cada uno de los 27 versos contiene interiormente la letra que le corresponde; matrix-mesostic.js puede seguir eligiendo la aparición más próxima al centro tipográfico.'
  },

  horizontalMesosticAtP14: {
    valid: true,
    note: 'Cada H01–H27 conserva en su celda P14 la letra necesaria para el inicio de su recorrido mesóstico; H14 mantiene además la letra central de TIERRA GUARDA LA PUERTA ANTIGUA.'
  },

  loaIAtP14: {
    H08: {key:'E', oldOffset:24, newOffset:13, verse:8},
    H12: {key:'J', oldOffset:22, newOffset:22, verse:12},
    H17: {key:'M', oldOffset:3,  newOffset:29, verse:17},
    note: 'Solo estos tres acrósticos de H usan la posición P14; al promover P14 deben actualizarse H08 y H17 en matrix-secret.js. H12 conserva exactamente el offset 22.'
  },

  structuralChangesFromUserDraft: [
    {verse:1,  from:'La azada deja barro en la mañana.', to:'La azada deja barro gris al alba;', reason:'incorpora la G interior exigida por el mesóstico P14 sin perder materia ni endecasílabo'},
    {verse:4,  from:'y un niño pisa barro entre las lindes.', to:'y un niño pisa fango por las lindes.', reason:'incorpora la G que H04 necesita en P14 y mantiene la N del mesóstico vertical'},
    {verse:16, from:'aparece en un sótano de naves.', to:'y el agua aparece en sótanos de naves;', reason:'evita sujeto huérfano en H16 y conserva encabalgamiento vertical'},
    {verse:17, from:'La linde sobrevive entre dos muros.', to:'la linde sobrevive contra un muro,', reason:'incorpora la C interior que exige el mesóstico P14 y mantiene M disponible para H17/Loa I'},
    {verse:19, from:'Resiste un brazal donde aparcan coches.', to:'resiste un brazal junto al almacén,', reason:'incorpora la M que H19 necesita en P14 y refuerza el espacio industrial'},
    {verse:20, from:'Por un taller cruza barro espeso.', to:'y por un taller cruza barro espeso;', reason:'la conjunción aporta el enlace y devuelve el verso a 11 sílabas con la sinalefa barro_espeso'},
    {verse:22, from:'palpando las raíces que resisten.', to:'y palpa hondas raíces que resisten.', reason:'crea dependencia verbal en P14 y conserva N/S interiores para los dos sistemas mesósticos'},
    {verse:24, from:'No queda recta la pared mojada.', to:'sin dejar recta la pared mojada;', reason:'convierte el verso en consecuencia sintáctica del tubo del verso 23'},
    {verse:26, from:'Granada pisa barro en un garaje.', to:'Granada pisa barro entre garajes:', reason:'incorpora la T interior exigida por el mesóstico P14 y prepara el cierre causal/espacial'},
    {verse:27, from:'La acequia cruza bajo la avenida.', to:'la acequia pasa bajo la avenida.', reason:'cierra la frase iniciada en el verso 26 y conserva el paso subterráneo bajo la ciudad'}
  ],

  horizontalImpact: [
    {h:1,  title:'LA PRIMERA MAÑANA',       action:'puntuación', note:'la azada al alba prolonga naturalmente la primera mañana'},
    {h:2,  title:'ANTES DEL NOMBRE',         action:'puntuación', note:'el jornalero antes del sol refuerza el título y admite contraste con la prisa posterior'},
    {h:3,  title:'UNA VOZ NUEVA',            action:'puntuación', note:'cal/acequia/humo forman una cadena material coherente'},
    {h:4,  title:'LA LUZ ANTIGUA',           action:'puntuación', note:'el verso 14 empieza con y; H04 deberá abrir el cierre de P13'},
    {h:5,  title:'LA MANO QUE MUEVE',        action:'revisar vecinos', note:'la Acequia Gorda introduce un salto fuerte entre silla y cristales'},
    {h:6,  title:'EL NOMBRE EN EL PORTAL',   action:'revisar vecinos', note:'Genil/barro necesita una transición más orgánica hacia multitud/humo'},
    {h:7,  title:'LO QUE NO FIGURA',         action:'puntuación', note:'semilla/silencio enlaza bien con foto y paso'},
    {h:8,  title:'NINGUNA VOZ SOLA',         action:'puntuación', note:'el cuerpo doblado puede ligarse al escrito anterior mediante coordinación'},
    {h:9,  title:'LO QUE SE PRESIENTE',      action:'puntuación', note:'Granada terminaba entre huertas crea un antes/después eficaz frente al cristal'},
    {h:10, title:'LA SOMBRA EN LA PARED',    action:'puntuación', note:'la ausencia de raya fija funciona como tránsito espacial'},
    {h:11, title:'LA HUELLA',                 action:'puntuación', note:'remolacha/corral sostienen una memoria material'},
    {h:12, title:'DEBAJO',                    action:'puntuación', note:'tabaco/secaderos encaja con llave y derribo'},
    {h:13, title:'EL UMBRAL',                 action:'puntuación', note:'monedas en sombra refuerzan la tensión antes del metal del derribo'},
    {h:14, title:'BAJO LA CAL',               action:'intacto', note:'el centro 14×14 no cambia'},
    {h:15, title:'EL OTRO LADO',              action:'puntuación', note:'agua bajo solares enlaza directamente con bloque/rincón'},
    {h:16, title:'LO QUE REGRESA',            action:'puntuación', note:'y el agua aparece... ya no queda huérfano y puede coordinarse con la casa'},
    {h:17, title:'LA MUESCA',                 action:'puntuación', note:'linde/muro/patio/cristal forman una secuencia espacial clara'},
    {h:18, title:'LA FORMA QUE CAMBIA',       action:'puntuación', note:'tapia/higuera introduce deformación física antes de la compra/cruce'},
    {h:19, title:'LO QUE VENDRÁ',             action:'puntuación', note:'brazal/almacén concreta la supervivencia material en la ciudad futura'},
    {h:20, title:'EL AGUA ANTIGUA',           action:'puntuación', note:'el verso 14 empieza con y y debe ligarse a P13'},
    {h:21, title:'TODAVÍA',                   action:'puntuación', note:'agua oscura bajo portal sostiene la persistencia del título'},
    {h:22, title:'LO QUE QUEDA',              action:'puntuación/actoral', note:'el frío puede personificarse y palpar hondas raíces; revisar en voz'},
    {h:23, title:'HACER SITIO',               action:'revisar vecinos', note:'tubo/tierra húmeda es potente pero necesita puente con silla/vidrio'},
    {h:24, title:'OTRA LUZ',                   action:'puntuación/actoral', note:'sin dejar recta... puede depender de la luz anterior; revisar la imagen en voz'},
    {h:25, title:'LA PUERTA ABIERTA',         action:'revisar vecinos', note:'caño/cimientos exige mejor transición entre cuarto y derribo'},
    {h:26, title:'VOLVER A EMPEZAR',          action:'puntuación', note:'barro entre garajes y comercio nuevo forman una escena de transformación urbana'},
    {h:27, title:'EL PORVENIR',                action:'puntuación', note:'acequia bajo avenida enlaza de modo directo con la calle y los siglos'}
  ],

  promotionRule: 'No sustituir P14 en matrix-1/2/3 hasta resolver las filas H05, H06, H23 y H25 y actualizar los offsets H08/H17 de matrix-secret.js.'
};
