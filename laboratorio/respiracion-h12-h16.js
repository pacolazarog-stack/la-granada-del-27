/* DEBAJO · [H13–H15] · LO QUE REGRESA
   Segunda corona del laboratorio central de respiración.
   H12 y H16 conservan exactamente el léxico de matrix-2.js:
   solo se modifica puntuación y caja inicial. Por tanto no cambia la métrica
   de ningún verso ni se desplazan las posiciones internas de A/M/T.
*/

window.GRANADA_RESPIRACION_H12_H16 = {
  H12: {
    title: 'DEBAJO',
    verses: [
      'En cada voz empieza otra Granada,',
      'se discute hasta cambiar la ciudad:',
      'Granada: metal, agua, voz, canción,',
      'late la cal encima de la sangre.',

      'Lo nuevo se disfraza con la forma,',
      'imagina la piedra vuelta luz;',
      'nace un mundo de trapo frente a ti,',
      'ronda ya un siglo detrás de la puerta.',

      'Detrás del vino ya tiembla el cristal,',
      'otro nombre se rompe en el silencio;',
      'invade sombra gris el paredón,',
      'al fondo de los cuartos, sin hablar,',
      'sabe la llave quién ya nunca vuelve.',

      'el tabaco ardió en viejos secaderos.',

      'Frente al derribo el patio se contrae,',
      'a un patio lo captura una pantalla;',
      'iguales camas guardan otros cuerpos,',
      'nadie conserva intacto el porvenir.',

      'Cruza la Vega el ruido del motor,',
      'una pantalla multiplica voces;',
      'sale la página hacia la ciudad,',
      'un albañil también sostuvo muros,',
      'ellas abrieron puertas a la escena.',

      'Tu claro acento dobla cada esquina,',
      'Granada vuelve al arte: disentir;',
      'se mezclan voces, cuerpos y lenguajes,',
      'Granada abre otra vez la misma puerta.'
    ],
    periods: [[1,4],[5,8],[9,13],[14,14],[15,18],[19,23],[24,27]],
    lexicalChanges: 0
  },

  H16: {
    title: 'LO QUE REGRESA',
    verses: [
      'En cada voz despierta otra Granada,',
      'se contradice así toda verdad:',
      'Granada vuelve profunda canción,',
      'late el hierro oscuro bajo la piedra.',

      'La máscara revela lo que calla,',
      'imagina otro muro vuelto luz;',
      'nace un mundo que se inclina ante ti,',
      'ronda otro siglo detrás de la puerta.',

      'Detrás del vino aún tiembla el cristal,',
      'otro silencio cruza ya el umbral;',
      'invade musgo gris el paredón,',
      'a solas una foto hace temblar,',
      'sabe la casa que nadie ya vuelve.',

      'asfalto, bloques, polígonos nuevos,',
      'frente al cristal se borra aquel umbral;',
      'Alhambra: yeso, piedra, cal dorada,',
      'iguales sábanas, distintos cuerpos,',
      'nadie contempla entero el porvenir.',

      'Cruza el presente sobre el mirador,',
      'una guitarra discute con códigos;',
      'salta la página por la ciudad,',
      'un vaso guarda un borde de carmín,',
      'ellas regresan vivas a la historia.',

      'Tu voz distinta cambia nuestra plaza,',
      'Granada se abre para recibir;',
      'se mezclan nuevos ritmos y lenguajes,',
      'Granada cruza de nuevo la puerta.'
    ],
    periods: [[1,4],[5,8],[9,13],[14,18],[19,23],[24,27]],
    lexicalChanges: 0
  },

  protectedP14: {
    H12: 'el tabaco ardió en viejos secaderos.',
    H13: 'Aquí también la sangre fue semilla.',
    H14: 'Late bajo la cal la acequia hundida.',
    H15: 'El plano desdibujó viejas lindes:',
    H16: 'asfalto, bloques, polígonos nuevos,',
    reason: 'Los cinco versos pertenecen a LA VEGA y mantienen intacta su secuencia central.'
  },

  centralBand: {
    rows: [12,13,14,15,16],
    principle: 'La respiración horizontal se abre sin destruir la respiración vertical ya lograda en P14.',
    lexicalPolicy: 'H12/H13/H15/H16: cero cambios léxicos en esta fase; H14 mantiene su candidato específico de respiración.'
  },

  next: 'Expandir simétricamente a H11 y H17 y auditar entonces las cadenas verticales H11→H17 antes de cualquier promoción pública.'
};
