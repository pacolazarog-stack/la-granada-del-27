/* LA CASA CERRADA · poema de densidad próxima al centro
   Arquitectura variable: se recuperan 27 versos y una bisagra en el verso 14.
   No se recuperan por obligación el endecasílabo, A/M/T ni la compatibilidad horizontal completa.
*/

window.GRANADA_LAB_LA_CASA_CERRADA = {
  title: 'LA CASA CERRADA',
  retainedConstraints: ['27 versos','verso 14 como bisagra material'],
  releasedConstraints: ['endecasílabo uniforme','A/M/T simultáneos','horizontal obligatoria'],
  verses: [
    'La llave entra, pero no gira.',
    'El metal devuelve un golpe seco.',
    'Alguien empuja con el hombro.',
    'La puerta cede apenas lo que mide una uña.',
    'Dentro, una cortina conserva la forma del polvo.',
    'Hay un vaso vuelto boca abajo.',
    'Una silla mira hacia la pared.',
    'En el pasillo, el yeso se ha abierto.',
    'Una grieta baja hasta el rodapié.',
    'Nadie la siguió cuando era pequeña.',
    'Ahora cabe un dedo.',
    'Más abajo, detrás de la despensa,',
    'la humedad ha oscurecido dos baldosas.',
    'Debajo de la casa sigue pasando el agua.',
    'No se ve.',
    'Se reconoce por el frío del muro,',
    'por la sal blanca que levanta la pintura,',
    'por un olor a tierra cuando llueve.',
    'Afuera cambia el semáforo.',
    'Pasa una moto, después un autobús.',
    'La casa no responde a ninguno.',
    'El hombre saca la llave.',
    'Antes de irse, toca con dos dedos la puerta.',
    'Como quien comprueba una frente.',
    'Luego baja el escalón.',
    'La cerradura queda quieta.',
    'Bajo el zaguán, algo continúa.'
  ],
  hinge: {
    verse: 14,
    text: 'Debajo de la casa sigue pasando el agua.',
    function: 'abre el poema inmóvil hacia la continuidad subterránea que conduce a LA VEGA'
  },
  stanzaBreaksAfter: [4,9,14,18,23,27],
  respiration: 'frases breves al comienzo, descenso progresivo hacia la humedad y expansión después del verso 14',
  corporeality: ['llave','hombro','uña','vaso','silla','dedo','baldosas','muro','puerta','frente'],
  mirrorPotential: {
    with: 'GRAN VÍA',
    axis: 'arriba puede detenerse o circular; debajo persiste otro movimiento',
    transformations: [
      'cerradura inmóvil ↔ semáforo que cambia',
      'casa detenida ↔ avenida en circulación',
      'grieta y humedad ↔ juntas, sótanos y manchas',
      'agua bajo la casa ↔ agua bajo la avenida'
    ]
  },
  proximityToCenter: {
    level: 'alta',
    note: 'La recuperación de 27 versos y del verso 14 anticipa la concentración formal de LA VEGA sin someter el poema a toda la matriz.'
  },
  status: 'laboratorio; no sustituye todavía P13 en el libro público'
};
