/* LA VEGA · candidata integrada tras resolver los 27 cruces horizontales
   No altera aún la matriz pública.
   Esta pieza reúne la respiración vertical de P14 y los ajustes locales necesarios
   en H05, H06, H23 y H25.
*/

window.GRANADA_LA_VEGA_INTEGRADA = {
  title: 'LA VEGA',
  center: 14,
  verses: [
    'La azada deja barro gris al alba;',
    'antes del sol, un jornalero cruza,',
    'arde la cal al borde de la acequia',
    'y un niño pisa fango por las lindes.',

    'La Acequia Gorda cose lentamente',
    'el Genil con el barro de las huertas,',
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

  periods: [[1,4],[5,8],[9,13],[14,14],[15,22],[23,27]],
  metric: {
    expected: 11,
    counts: [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    method: 'sinalefas naturales; sin dialefas obligatorias'
  },

  fixedCenter: 'Late bajo la cal la acequia hundida.',
  mesosticP14: 'GRANADA AÚN MIRA; LA CAL AÚN CANTA',

  resolvedCrossings: {
    H05: {
      title: 'LA MANO QUE MUEVE',
      kind: 'periodo_compuesto',
      P13: 'Aguarda la silla frente al portón,',
      P14: 'La Acequia Gorda cose lentamente',
      P15: 'Imantan los cristales el deseo.',
      note: 'Se agrupa en una misma respiración; no se fuerza subordinación artificial porque dañaría H05 o los verticales P13/P15.'
    },
    H06: {
      title: 'EL NOMBRE EN EL PORTAL',
      kind: 'encabalgamiento_fuerte',
      P13: 'Huele a silencio dentro del cajón:',
      P14: 'el Genil con el barro de las huertas,',
      P15: 'pasa entre la multitud rozando humo.',
      note: 'P14 y P15 forman sujeto + predicado; P13 introduce la aparición mediante dos puntos.'
    },
    H23: {
      title: 'HACER SITIO',
      kind: 'encabalgamiento_fuerte',
      P13: 'Aguarda aquella silla en el salón',
      P14: 'Un tubo corta en dos la tierra húmeda',
      P15: 'y el vidrio copia un resplandor opaco.',
      note: 'Los tres versos forman una sola escena simultánea.'
    },
    H25: {
      title: 'LA PUERTA ABIERTA',
      kind: 'encabalgamiento_fuerte',
      P13: 'El cuarto escucha un golpe bajo tierra:',
      P14: 'gotea un caño junto a los cimientos',
      P15: 'mientras derriban muros en la ciudad.',
      note: 'Golpe + goteo + derribo convierten el antiguo paso abstracto en una acción física.'
    }
  },

  localCellChangesOutsideP14: [
    {row:6,col:15,from:'Pasa la multitud rozando el humo.',to:'pasa entre la multitud rozando humo.',metric:11},
    {row:23,col:15,from:'Imita el vidrio un resplandor opaco.',to:'y el vidrio copia un resplandor opaco.',metric:11},
    {row:25,col:13,from:'Ignora el cuarto toda la ciudad.',to:'El cuarto escucha un golpe bajo tierra:',metric:11},
    {row:25,col:15,from:'Derriba muros, nace otra ciudad.',to:'mientras derriban muros en la ciudad.',metric:11}
  ],

  hiddenLayerConstraints: {
    H05_P13: 'A inicial de Loa I + E interior de mesóstico H05 conservadas',
    H06_P13: 'R interior de mesóstico H06 conservada',
    H23_P13: 'A inicial de Loa I conservada',
    H23_P15: 'I interior H23 + D interior P15 + A teléstica final en «opaco» conservadas',
    H25_P15: 'B interior H25 + I interior P15 conservadas',
    P14_LoaI_offsets: {H08:{key:'E',newOffset:13},H12:{key:'J',newOffset:22},H17:{key:'M',newOffset:29}}
  },

  checks: {
    horizontalCrossingsAtP14: 27,
    unresolvedCrossingsAtP14: 0,
    centerIntact: true,
    p14MesosticLettersValidated: '27/27',
    horizontalMesosticLettersAtP14Validated: '27/27',
    loaIAtP14Validated: '3/3',
    diagonalsAffectedOutsideCenter: false,
    radialAffectedOutsideCenter: false,
    next: 'Aplicar candidato sobre copia de matriz y ejecutar comprobación global de A/M/T y métrica antes de promover a los archivos matrix-*.'
  }
};
