/* Cruces horizontales P14 resueltos
   H05 · H06 · H23 · H25
   Objetivo: que la nueva LA VEGA pueda ocupar P14 sin crear injertos sintácticos
   en los cuatro horizontales que todavía exigían trabajo real alrededor del cruce.

   No se promueve aún a la matriz pública.
*/

window.GRANADA_CRUCES_P14_RESUELTOS = {
  H05: {
    title: 'LA MANO QUE MUEVE',
    cells: {
      P13: 'Aguarda la silla frente al portón,',
      P14: 'La Acequia Gorda cose lentamente',
      P15: 'Imantan los cristales el deseo.'
    },
    reading: 'Aguarda la silla frente al portón, / La Acequia Gorda cose lentamente / Imantan los cristales el deseo.',
    intervention: 'puntuación y continuidad prosódica; cero cambio léxico',
    hidden: 'P13 conserva A inicial de Loa I y E interior del mesóstico H05.'
  },

  H06: {
    title: 'EL NOMBRE EN EL PORTAL',
    cells: {
      P13: 'Huele a silencio dentro del cajón:',
      P14: 'el Genil con el barro de las huertas,',
      P15: 'pasa entre la multitud rozando humo.'
    },
    reading: 'Huele a silencio dentro del cajón: / el Genil con el barro de las huertas, / pasa entre la multitud rozando humo.',
    intervention: 'P13 solo cambia punto por dos puntos; P14 cambia punto de respiración interno de LA VEGA; P15 se reescribe para convertir Genil/barro en sujeto de la continuidad.',
    metric: {P15: 11},
    verticalBenefit: 'En GRAN VÍA queda: Entre cristales aprende a correr / pasa entre la multitud rozando humo / Y cada paso cambia la ciudad.',
    hidden: 'P13 conserva R interior exigida por el mesóstico H06; P15 no ocupa una marca fija de Loa I/II.'
  },

  H23: {
    title: 'HACER SITIO',
    cells: {
      P13: 'Aguarda aquella silla en el salón',
      P14: 'Un tubo corta en dos la tierra húmeda',
      P15: 'y el vidrio copia un resplandor opaco.'
    },
    reading: 'Aguarda aquella silla en el salón / Un tubo corta en dos la tierra húmeda / y el vidrio copia un resplandor opaco.',
    intervention: 'P13 pierde el punto y P15 convierte la imagen en coordinación verdadera.',
    metric: {P15: 11},
    hidden: 'P13 conserva A inicial de Loa I; P15 conserva I interior del mesóstico H23 y del mesóstico vertical P15, y mantiene «opaco» para la A teléstica de P15.'
  },

  H25: {
    title: 'LA PUERTA ABIERTA',
    cells: {
      P13: 'El cuarto escucha un golpe bajo tierra:',
      P14: 'gotea un caño junto a los cimientos',
      P15: 'mientras derriban muros en la ciudad.'
    },
    reading: 'El cuarto escucha un golpe bajo tierra: / gotea un caño junto a los cimientos / mientras derriban muros en la ciudad.',
    intervention: 'Se sustituye el antiguo P13 abstracto por una acción física y P15 se vuelve subordinada temporal; el cruce queda convertido en escena.',
    metric: {P13: 11, P15: 11},
    verticalBenefit: {
      P13: 'En LA CASA CERRADA la escucha del golpe enlaza con la llave y el espacio clausurado.',
      P15: 'En GRAN VÍA queda: En cada esquina retumba la noche / mientras derriban muros en la ciudad / Renace un comercio donde otro muere.'
    },
    hidden: 'P15 conserva B interior para H25 · ABIERTA GRANADA e I interior para P15 · OTRA CIUDAD MIRA.'
  },

  status: {
    unresolvedCrossingsAtP14: 0,
    center: 'Late bajo la cal la acequia hundida.',
    next: 'Validar la nueva columna P14 junto con estos cambios locales mediante mesósticos, Loas y continuidad vertical antes de promoción.'
  }
};
