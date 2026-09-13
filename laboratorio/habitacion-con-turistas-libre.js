/* HABITACIÓN CON TURISTAS · poema libre del lugar puesto a cero
   Espejo asimétrico de EL BARRANCO.
   La temporalidad aparece en el trabajo de borrar las huellas entre una estancia y la siguiente.
*/

window.GRANADA_LAB_HABITACION_CON_TURISTAS = {
  title: 'HABITACIÓN CON TURISTAS',
  retainedConstraints: ['ninguna restricción matricial obligatoria'],
  verses: [
    'A las once dejan la tarjeta sobre la mesa.',
    'Una maleta rueda por el pasillo',
    'y el ascensor se cierra.',
    '',
    'Entra la limpiadora.',
    '',
    'Abre la ventana.',
    'Quita dos vasos del alféizar,',
    'recoge una toalla húmeda',
    'y encuentra bajo la cama',
    'un recibo doblado en cuatro.',
    '',
    'No lo lee.',
    '',
    'Tira de la sábana.',
    'La cama pierde de golpe',
    'la forma de dos cuerpos.',
    '',
    'Aspira una línea de polvo',
    'junto al rodapié.',
    'Borra del espejo',
    'la marca redonda de una yema.',
    '',
    'Después estira la colcha,',
    'pone las toallas a la misma altura',
    'y deja dos vasos limpios',
    'donde estaban los otros.',
    '',
    'A las tres alguien acerca otra tarjeta.',
    '',
    'Bip.',
    '',
    'La puerta se abre.',
    'Entran dos maletas nuevas',
    'en una habitación donde, a primera vista,',
    'no ha pasado nadie.'
  ],
  respiration: 'secuencia de limpieza y reinicio; acciones breves que borran progresivamente la estancia anterior',
  corporeality: ['tarjeta','maleta','vasos','toalla','cama','sábana','aspiradora','espejo','yema','colcha'],
  soundField: ['ruedas por el pasillo','ascensor','aspiradora','bip de tarjeta'],
  mirrorPotential: {
    with: 'EL BARRANCO',
    axis: 'retener marcas ↔ borrar marcas',
    transformations: [
      'grava que queda desplazada ↔ polvo que se aspira',
      'raíz que no se endereza ↔ sábana que se estira',
      'piedra que permanece ↔ recibo que se desecha',
      'tierra que no se reinicia ↔ habitación preparada para parecer intacta'
    ]
  },
  status: 'laboratorio; poema autónomo, no sustituye todavía P17 en el libro público'
};
