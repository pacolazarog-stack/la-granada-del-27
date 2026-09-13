/* GRANADA, 1927 · apertura de la ciudad antes de la mesa
   Díptico con UN SIGLO DESPUÉS.

   Conserva 27 versos y la costura del verso 14, pero deja a EL RINCONCILLO
   la discusión, el gallo y la fricción específica del café.
*/

window.GRANADA_LAB_GRANADA_1927 = {
  title: 'GRANADA, 1927',
  retainedConstraints: ['27 versos','anclaje H14 en el verso 14'],
  releasedConstraints: ['endecasílabo uniforme','horizontal obligatoria','A/M/T simultáneos','línea autosuficiente','simetría total'],
  verses: [
    'Amanece la sierra sobre los tejados.',
    'El agua de un cubo corre por la acera',
    'y arrastra colillas, barro, una hoja doblada.',
    'Un cierre metálico sube a tirones.',
    'En la tahona sacan la primera bandeja.',
    'Un tranvía toca hierro en la curva.',
    'La campana de una bicicleta lo atraviesa.',
    'En una imprenta, una mano ordena tipos',
    'y deja tinta negra en el pulgar.',
    'Una mujer barre un portal hacia la calle.',
    'En el café enderezan las sillas.',
    'Dos hombres ocupan una mesa del fondo.',
    'Otro deja un cuaderno junto al vaso.',
    'Siete baldosas ceden de costado.',
    'La mesa se inclina; el camarero la calza',
    'con un periódico doblado cuatro veces.',
    'Nadie mira el reloj todavía.',
    'Afuera se cruzan un vendedor y un niño.',
    'Desde un balcón cae polvo de una manta.',
    'Una persiana golpea dos veces.',
    'Alguien compra pan y cuenta las monedas.',
    'En la esquina, el agua busca la pendiente.',
    'Dentro, una frase apenas ha empezado.',
    'Una mano queda quieta sobre el mármol.',
    'Otra acerca el cuaderno.',
    'La mañana entra por debajo de la puerta.',
    'En el espejo del café pasa media Granada.'
  ],
  respiration: [[1,4],[5,10],[11,16],[17,22],[23,27]],
  anchor: {
    verse: 14,
    text: 'Siete baldosas ceden de costado.',
    function: 'Mantiene una única costura con BAJO LA CAL; el resto del poema no se somete a la horizontal.'
  },
  bodyActions: [
    'baldear la acera','subir un cierre','sacar pan','ordenar tipos','barrer un portal',
    'enderezar sillas','sentarse','dejar un cuaderno','calzar una mesa','contar monedas','acercar el cuaderno'
  ],
  mirrorWith2027: {
    counterpart: 'UN SIGLO DESPUÉS',
    principle: 'El espejo se produce por transformación de acciones y objetos, no por identidad métrica.',
    correspondences: [
      'mañana de 1927 / mañana de 2027',
      'agua del cubo sobre la acera / agua del baldeo hacia la alcantarilla',
      'mano manchada de tinta / mano que entra en el hueco y toca barro',
      'mesa presente y temblorosa / mesa desaparecida recordada cien años después',
      'cuaderno / mapa en la palma y pantalla',
      'Granada reflejada en el café / Granada que no cabe en la pantalla'
    ]
  },
  status: 'poema de superficie'
};
