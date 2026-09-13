/* GRANADA, 1927 · ensayo de restricción mínima
   Díptico con UN SIGLO DESPUÉS.

   Se conservan únicamente:
   - 27 versos como memoria profunda del libro;
   - el verso 14 procedente del extremo de BAJO LA CAL.

   Se liberan endecasílabo uniforme, A/M/T obligatorios,
   horizontal completa, línea autosuficiente y simetría léxica.
*/

window.GRANADA_LAB_GRANADA_1927 = {
  title: 'GRANADA, 1927',
  retainedConstraints: ['27 versos','anclaje H14 en el verso 14'],
  releasedConstraints: ['endecasílabo uniforme','horizontal obligatoria','A/M/T simultáneos','línea autosuficiente','simetría total'],
  verses: [
    'Amanece la sierra sobre los tejados.',
    'Alguien levanta el cierre de un café.',
    'El agua del cubo corre por la acera',
    'y arrastra colillas, barro, una hoja doblada.',
    'Dentro, un camarero endereza las sillas.',
    'Deja cuatro vasos sobre el mármol.',
    'El primero que llega trae un cuaderno',
    'con una mancha de tinta en el pulgar.',
    'Después entra otro, con frío en los hombros,',
    'y otro que tararea a Bach sin terminarlo.',
    'Nadie ha venido a fundar nada.',
    'Piden café, discuten, se interrumpen,',
    'dibujan un gallo en el margen de una cuenta.',
    'Siete baldosas ceden de costado.',
    'Una mesa se inclina; alguien la calza',
    'con un periódico doblado cuatro veces.',
    'Ya son cinco, quizá seis.',
    'El humo sube y borra los espejos.',
    'Afuera pasa Granada sin mirarlos:',
    'un vendedor empuja su carrito,',
    'una mujer recoge el pan del día,',
    'un niño cruza corriendo hacia la escuela.',
    'Dentro, una frase prende otra frase,',
    'una risa contradice a la anterior,',
    'y nadie sabe aún qué quedará de aquello.',
    'Solo la mesa tiembla cuando apoyan las manos.',
    'Granada todavía no sabe que la miran.'
  ],
  respiration: [[1,4],[5,10],[11,16],[17,18],[19,22],[23,27]],
  anchor: {
    verse: 14,
    text: 'Siete baldosas ceden de costado.',
    function: 'Mantiene una única costura con BAJO LA CAL; el resto del poema no se somete a la horizontal.'
  },
  bodyActions: [
    'levantar el cierre','baldear la acera','enderezar sillas','dejar vasos','entrar con frío',
    'pedir café','discutir','dibujar','calzar una mesa','empujar un carrito','recoger pan','correr','apoyar las manos'
  ],
  mirrorWith2027: {
    counterpart: 'UN SIGLO DESPUÉS',
    principle: 'El espejo se produce por transformación de acciones y objetos, no por identidad métrica.',
    correspondences: [
      'mañana de 1927 / mañana de 2027',
      'agua del cubo sobre la acera / agua del baldeo hacia la alcantarilla',
      'mano manchada de tinta / mano que entra en el hueco y toca barro',
      'mesa presente y temblorosa / mesa desaparecida recordada cien años después',
      'cuaderno y cuenta / mapa en la palma y pantalla',
      'niño que cruza hacia la escuela / niño que salta el charco junto a la obra',
      'Granada no sabe que la miran / Granada no cabe en la pantalla'
    ]
  },
  status: 'laboratorio; no sustituye todavía P01 en la matriz activa'
};
