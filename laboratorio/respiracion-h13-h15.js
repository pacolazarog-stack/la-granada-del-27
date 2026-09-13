/* EL UMBRAL · BAJO LA CAL · EL OTRO LADO
   Laboratorio de respiración para el bloque central H13–H15.
   H13 y H15 conservan exactamente el léxico de la matriz pública:
   solo cambian puntuación y mayúscula/minúscula para construir períodos largos.
   De este modo se conserva la métrica de cada verso y no se desplazan
   las posiciones internas usadas por acrósticos, mesósticos y telésticos.
*/

window.GRANADA_RESPIRACION_H13_H15 = {
  H13: {
    title: 'EL UMBRAL',
    verses: [
      'Ignora el mármol la conversación:',
      'otra pregunta incendia ya la sala;',
      'a la guitarra responde el oído,',
      'nadie ha barrido el polvo de tus pasos.',

      'Esculpe, pinta, talla en el taller,',
      'rompe la forma: la completas tú;',
      'al niño el hilo sabe hacer reír,',
      'bajo la piedra el tiempo se detiene.',

      'Alguien promete volver al salón;',
      'Granada guarda sombra bajo el cielo,',
      'apenas queda voz donde se muere,',
      'recogen las palabras de la mesa;',
      'una cortina guarda aquel salón.',

      'Aquí también la sangre fue semilla.',

      'Suena el metal: derriba el callejón,',
      'registra un código cada admisión;',
      'afuera Granada posa ante ti:',
      'un siglo mira al otro: no responde.',

      'Aún la Sierra vigila el balcón:',
      'que nadie mande todavía aquí;',
      'en la plancha, un gallo duerme en la tinta,',
      'quien canta sin archivo deja su huella.',

      'En el margen volvemos a mirar:',
      'nombrar tu calle cambia el caminar,',
      'una ciudad no acaba donde nace;',
      'otra pregunta rompe lo previsto:',
      'ignora aún quién vendrá después: alguien.'
    ],
    periods: [[1,4],[5,8],[9,13],[14,14],[15,18],[19,22],[23,27]],
    lexicalChanges: 0
  },

  H15: {
    title: 'EL OTRO LADO',
    verses: [
      'Ignora el bronce la conversación:',
      'otra réplica aviva ya la sala;',
      'al rozar una cuerda, arde más hondo,',
      'nace del cristal el mismo temblor.',

      'En la tabla despierta ya un actor,',
      'rehace el mundo: lo completas tú;',
      'al pueblo el trapo sabe hacer reír,',
      'bajo el umbral el tiempo no se pierde.',

      'Alguien regresa con leve rumor,',
      'Granada ya no reconoce el cielo;',
      'apenas queda voz; la tierra cubre,',
      'retiran retratos de la pared,',
      'una ventana guarda aquel salón.',

      'El plano desdibujó viejas lindes:',
      'surge otro bloque donde hubo un rincón,',
      'respira el agua fuera de gestión;',
      'adentro nadie sabe estar aquí:',
      'un siglo mira al otro: ya responde.',

      'Abre la Vega un surco en la visión,',
      'quizá vuelva el disenso por aquí;',
      'el gallo vuelve siempre a despertar,',
      'quien queda sin archivo deja su huella.',

      'En ese vidrio tiemblan los retratos,',
      'nombras tu calle para comenzar;',
      'una ciudad que escucha siempre vive,',
      'otra respuesta tuerce lo previsto:',
      'imagina quién llegará también.'
    ],
    periods: [[1,4],[5,8],[9,13],[14,18],[19,22],[23,27]],
    lexicalChanges: 0
  },

  verticalBridges: [
    {p:3,  text:'A la guitarra responde el oído / la raíz mueve el mármol asentado / al rozar una cuerda, arde más hondo.'},
    {p:4,  text:'Nadie ha barrido el polvo de tus pasos / mientras la pared marca la escalera / nace del cristal el mismo temblor.'},
    {p:5,  text:'Esculpe, pinta, talla en el taller / Debajo cruje un marco emparedado / en la tabla despierta ya un actor.'},
    {p:6,  text:'Rompe la forma: la completas tú / y abre la grieta: vuelve la madera / rehace el mundo: lo completas tú.'},
    {p:8,  text:'Bajo la piedra el tiempo se detiene / y al pie del muro, un higo fermentado / bajo el umbral el tiempo no se pierde.'},
    {p:11, text:'Apenas queda voz donde se muere / Raspa la pala el yeso y da salida / apenas queda voz; la tierra cubre.'},
    {p:13, text:'Una cortina guarda aquel salón / al fondo del zaguán, paso tapiado / una ventana guarda aquel salón.'},
    {p:14, text:'Aquí también la sangre fue semilla. / Late bajo la cal la acequia hundida. / El plano desdibujó viejas lindes:'},
    {p:15, text:'Suena el metal: derriba el callejón / Abren por fin el piso clausurado / surge otro bloque donde hubo un rincón.'},
    {p:16, text:'Registra un código cada admisión / mientras la puerta guarda lo borrado / respira el agua fuera de gestión.'},
    {p:17, text:'Afuera Granada posa ante ti / rueda por el zaguán la despedida / adentro nadie sabe estar aquí.'},
    {p:18, text:'Un siglo mira al otro: no responde / y a la mesa, la cuenta compartida / un siglo mira al otro: ya responde.'},
    {p:20, text:'Que nadie mande todavía aquí / y al muro clavan un plano doblado / quizá vuelva el disenso por aquí.'},
    {p:21, text:'En la plancha, un gallo duerme en la tinta / donde de noche queda luz prendida / el gallo vuelve siempre a despertar.'},
    {p:22, text:'Quien canta sin archivo deja su huella / y amanece otra cama todavía / quien queda sin archivo deja su huella.'},
    {p:23, text:'En el margen volvemos a mirar / Dejan código frío en el cristal / en ese vidrio tiemblan los retratos.'},
    {p:24, text:'Nombrar tu calle cambia el caminar / y entra la luz donde antes no cabía / nombras tu calle para comenzar.'},
    {p:26, text:'Otra pregunta rompe lo previsto / Dos lenguas se tropiezan con el día / otra respuesta tuerce lo previsto.'},
    {p:27, text:'Ignora aún quién vendrá después: alguien / y siete llaves buscan su portal / imagina quién llegará también.'}
  ],

  protected: {
    P14_H13: 'Aquí también la sangre fue semilla.',
    P14_H14: 'Late bajo la cal la acequia hundida.',
    P14_H15: 'El plano desdibujó viejas lindes:',
    reason: 'LA VEGA conserva intacto su tríptico central y el verso 14 sigue ocupando 14×14.'
  },

  hiddenLayerCheck: {
    H13: 'Sin cambios léxicos ni desplazamientos internos; se conservan las posiciones de SILENCIO y de los telésticos que atraviesan la fila 13.',
    H15: 'Sin cambios léxicos ni desplazamientos internos; se conservan las posiciones de DEVUELVEN y de los telésticos que atraviesan la fila 15.',
    H14: 'Usa el candidato de respiracion-h14.js; debe pasar una validación conjunta antes de promoción a matrix-2.js.'
  },

  next: 'Extender el bloque a H12 y H16 para que las cadenas verticales no nazcan ni mueran artificialmente en H13/H15.'
};
