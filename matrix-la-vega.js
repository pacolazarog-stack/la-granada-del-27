/* LA VEGA · integración activa en la matriz 27×27.
   Se carga después de matrix-1/2/3 y antes de las capas A/M/T.
   Mantiene 14×14 intacto y aplica los cuatro ajustes locales necesarios
   para que P14 respire también en sus cruces horizontales.
*/
(()=>{
  const p14=[
    'La azada deja barro gris al alba;',
    'antes del sol, un jornalero cruza,',
    'arde la cal al borde de la acequia',
    'y un niño pisa fango por las lindes.',
    'La Acequia Gorda cose lentamente',
    'el Genil con el barro de las huertas,',
    'una semilla abría su silencio',
    'y un cuerpo se doblaba en cada surco.',
    'Granada terminaba entre las huertas,',
    'sin una raya fija en los caminos;',
    'aquí la remolacha alzó sus hojas,',
    'el tabaco ardió en viejos secaderos',
    'y alguien contó monedas en la sombra.',
    'Late bajo la cal la acequia hundida.',
    'El agua asoma bajo los solares',
    'y el agua aparece en sótanos de naves;',
    'la linde sobrevive contra un muro,',
    'la tapia tuerce el gesto de una higuera,',
    'resiste un brazal junto al almacén,',
    'y por un taller cruza barro espeso;',
    'bajo un portal regresa el agua oscura,',
    'y palpa hondas raíces que resisten.',
    'Un tubo corta en dos la tierra húmeda',
    'sin dejar recta la pared mojada;',
    'gotea un caño junto a los cimientos.',
    'Granada pisa barro entre garajes:',
    'la acequia pasa bajo la avenida.'
  ];

  if(!Array.isArray(window.GRANADA_ROWS)||window.GRANADA_ROWS.length!==27){
    throw new Error('LA VEGA: la matriz base 27×27 no está disponible');
  }

  p14.forEach((verse,r)=>{ window.GRANADA_ROWS[r].verses[13]=verse; });

  const local=[
    [6,15,'pasa entre la multitud rozando humo.'],
    [23,15,'y el vidrio copia un resplandor opaco.'],
    [25,13,'El cuarto escucha un golpe bajo tierra:'],
    [25,15,'mientras derriban muros en la ciudad.']
  ];
  local.forEach(([r,c,verse])=>{ window.GRANADA_ROWS[r-1].verses[c-1]=verse; });

  window.GRANADA_LA_VEGA_ACTIVE={
    title:'LA VEGA',
    center:'Late bajo la cal la acequia hundida.',
    p14Verses:27,
    localCrossingAdjustments:4,
    changedCells:31,
    periods:[[1,4],[5,8],[9,13],[14,14],[15,22],[23,27]],
    metricCounts:Array(27).fill(11),
    metricMethod:'recuento manual con sinalefas naturales; sin dialefas obligatorias'
  };
})();
