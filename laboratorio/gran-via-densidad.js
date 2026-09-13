/* GRAN VÍA · poema de densidad próxima al centro
   Espejo asimétrico de LA CASA CERRADA.
   Recupera 27 versos y una bisagra en el verso 14, sin restaurar toda la matriz.
*/

window.GRANADA_LAB_GRAN_VIA = {
  title: 'GRAN VÍA',
  retainedConstraints: ['27 versos','verso 14 como bisagra material'],
  releasedConstraints: ['endecasílabo uniforme','A/M/T simultáneos','horizontal obligatoria'],
  verses: [
    'A las ocho cambia el primer semáforo.',
    'Una persiana sube a tirones.',
    'El autobús abre sus puertas.',
    'Dos cuerpos bajan mientras tres suben.',
    'Una bicicleta corta entre los coches.',
    'El barrendero arrastra hojas contra el bordillo.',
    'Una mujer cruza antes del verde.',
    'El repartidor deja un paquete en un portal.',
    'Alguien mira la hora sin detenerse.',
    'Sobre el escaparate, una pantalla cambia de anuncio.',
    'La calle parece no guardar nada.',
    'Todo pasa.',
    'Todo sustituye a lo anterior.',
    'Debajo de la avenida sigue pasando el agua.',
    'No espera al semáforo.',
    'No sabe de horarios ni escaparates.',
    'Busca juntas, sótanos, viejas lindes',
    'y vuelve a manchar una pared recién pintada.',
    'Arriba, un taxi toca el claxon.',
    'Una puerta automática se abre.',
    'Sale aire frío de una tienda.',
    'Un niño pisa el borde de un charco.',
    'La madre tira de su mano y sigue.',
    'En un portal cerrado, una cerradura no gira.',
    'Nadie la ve desde la acera.',
    'Cambia otra vez el semáforo.',
    'Bajo los pasos, la ciudad no termina de pasar.'
  ],
  hinge: {
    verse: 14,
    text: 'Debajo de la avenida sigue pasando el agua.',
    function: 'interrumpe la velocidad superficial y abre el acceso hacia LA VEGA enterrada'
  },
  stanzaBreaksAfter: [4,9,14,18,23,27],
  respiration: 'acumulación urbana rápida hasta el verso 13; pausa axial en el 14; reanudación del tráfico con una segunda corriente subterránea',
  corporeality: ['persiana','autobús','bicicleta','hojas','paquete','pantalla','charco','mano','cerradura'],
  soundField: ['persiana','autobús','tráfico','claxon','puerta automática'],
  mirrorPotential: {
    with: 'LA CASA CERRADA',
    axis: 'arriba puede detenerse o circular; debajo persiste otro movimiento',
    transformations: [
      'llave que no gira ↔ semáforo que cambia',
      'casa detenida ↔ avenida que sustituye sin parar',
      'humedad interior ↔ mancha que reaparece en la ciudad',
      'agua bajo la casa ↔ agua bajo la avenida'
    ]
  },
  proximityToCenter: {
    level: 'alta',
    note: 'El retorno de 27 versos y del eje 14 aumenta la densidad estructural justo antes de LA VEGA.'
  },
  status: 'laboratorio; no sustituye todavía P15 en el libro público'
};
