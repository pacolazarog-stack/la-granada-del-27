/* UN SIGLO DESPUÉS · ensayo de restricción mínima
   Primera aplicación de la arquitectura variable.

   Se conserva deliberadamente una sola memoria formal: 27 versos.
   Se abandona en esta prueba la obligación de:
   - endecasílabo uniforme
   - autonomía sintáctica de cada línea
   - compatibilidad horizontal completa
   - A/M/T simultáneos
   - simetría léxica programática

   El estribillo final se conserva como eco estructural del libro.
*/

window.GRANADA_LAB_UN_SIGLO_DESPUES = {
  title: 'UN SIGLO DESPUÉS',
  retainedConstraints: ['27 versos', 'estribillo final'],
  releasedConstraints: ['endecasílabo uniforme','horizontal obligatoria','A/M/T simultáneos','línea autosuficiente','simetría total'],
  verses: [
    'Nadie despierta pensando en un siglo.',
    'A las siete levantan una persiana',
    'y el agua del baldeo busca la alcantarilla.',
    'En un solar la pala golpea piedra.',
    'El albañil se agacha,',
    'llama a otro,',
    'los dos miran el hueco',
    'y meten la mano hasta tocar el barro.',
    'No estaba en los planos.',
    'Tampoco el hilo oscuro de agua',
    'que aparece por debajo del hormigón.',
    'En la parada, una mujer lee un mensaje',
    'mientras un viejo dobla el periódico.',
    'Se rozan. El autobús tarda.',
    'Hace cien años otra mano',
    'sostuvo quizá una taza',
    'sobre una mesa que ya no existe,',
    'sin saber que alguien abriría hoy',
    'un mapa de Granada sobre la palma.',
    'Pero la ciudad no cabe en la pantalla:',
    'huele a pan, a yeso húmedo, a aceite,',
    'a gasolina retenida en los garajes.',
    'Un niño salta el charco junto a la obra.',
    'El barro le sube por las medias.',
    'Su madre tira de él y se ríe.',
    'Bajo la avenida sigue pasando el agua.',
    'Granada sucede — sucede Granada.'
  ],
  respiration: [
    [1,3],
    [4,11],
    [12,14],
    [15,19],
    [20,22],
    [23,27]
  ],
  mirrorPotential: {
    with: 'GRANADA, 1927',
    principle: 'No repetir la misma forma: 1927 puede condensar nacimiento y reunión; 2027 responde con vida cotidiana, restos materiales y una ciudad que no cabe en su representación.',
    recurringObjects: ['agua','mesa','mano','barro','ciudad'],
    transformedFunctions: ['agua: de limpieza urbana a cauce enterrado','mesa: de reunión presente a resto desaparecido','mano: de gesto histórico a tacto del barro','ciudad: de proyecto cultural a experiencia que excede la pantalla']
  },
  oralTest: {
    longPeriods: 6,
    shortBreaks: ['El albañil se agacha,','llama a otro,','No estaba en los planos.'],
    bodyActions: ['levantar persiana','baldear','golpear piedra','agacharse','meter la mano','doblar periódico','saltar charco','tirar del niño','reír'],
    note: 'El poema debe poder leerse sin información sobre la matriz. La estructura residual de 27 versos solo se descubre después.'
  },
  status: 'laboratorio; no sustituye todavía V27 en la matriz activa'
};
