/* BAJO LA CAL · matriz de respiración
   Trabajo de encabalgamiento antes de sustituir la fila H14 en la matriz pública.
   Objetivo: sintaxis respirable en horizontal y en los dos recorridos radiales,
   preservando el centro 14×14 y las letras ocultas necesarias.
*/

window.GRANADA_RESPIRACION_H14 = {
  title: 'BAJO LA CAL',
  center: 14,
  verses: [
    'Siete baldosas ceden; al costado,',
    'dos manos llevan tierra a la escombrera;',
    'la raíz mueve el mármol asentado',
    'mientras la pared marca la escalera.',
    'Debajo cruje un marco emparedado,',
    'y abre la grieta: vuelve la madera;',
    'debajo de la losa, agua dormida,',
    'y al pie del muro, un higo fermentado;',
    'nadie movió aquel vaso abandonado,',
    'y arde diciembre en tinta desvaída.',
    'Raspa la pala el yeso y da salida:',
    'Gotea por un caño mal cegado;',
    'al fondo del zaguán, paso tapiado:',
    'Late bajo la cal la acequia hundida.',
    'Abren por fin el piso clausurado',
    'mientras la puerta guarda lo borrado;',
    'rueda por el zaguán la despedida',
    'y a la mesa, la cuenta compartida;',
    'y nadie pregunta por el candado',
    'y al muro clavan un plano doblado,',
    'donde de noche queda luz prendida',
    'y amanece otra cama todavía.',
    'Dejan código frío en el cristal',
    'y entra la luz donde antes no cabía.',
    'La llave da su golpe en el metal;',
    'Dos lenguas se tropiezan con el día,',
    'y siete llaves buscan su portal.'
  ],
  horizontalLinks: [3,5,7,9,11,13,15,17,18,19,20,21,23,26],
  radialBuriedLinks: [13,11,9,7,5],
  radialOpenLinks: [15,17,18,19,20,21,23,26],
  fixedCenter: 'Late bajo la cal la acequia hundida.',
  notes: [
    'Las conjunciones y subordinantes se usan como bisagras sintácticas, no como adorno.',
    'La mitad enterrada debe poder leerse también en orden inverso desde el centro.',
    'La celda H14/P26 conserva intactos todos sus caracteres hasta «día»; solo cambia el signo final.',
    'Los enlaces verticales inmediatos H13–H14–H15 están resueltos en respiracion-h13-h15.js; la siguiente expansión corresponde a H12 y H16.'
  ]
};
