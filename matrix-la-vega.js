/* LA VEGA · centro activo de la superficie.
   Se carga después de congelar la matriz pétrea.
   El verso 14 conserva intacto el centro 14×14.
*/
(()=>{
  const p14=[
    'La azada deja barro en la mañana.',
    'Antes del sol, un jornalero cruza.',
    'Arde la cal al borde de la acequia,',
    'y un niño pisa lodo entre las lindes.',
    'La Acequia Gorda cose lentamente',
    'el Genil con el limo de las huertas.',
    'Una semilla abría su silencio.',
    'Un cuerpo se doblaba en cada surco.',
    'Granada terminaba entre las huertas,',
    'sin una raya fija en los caminos.',
    'Aquí la remolacha alzó sus hojas,',
    'el tabaco ardió en viejos secaderos.',
    'Alguien contó monedas en la sombra.',
    'Late bajo la cal la acequia hundida.',
    'El agua asoma bajo los solares,',
    'aparece en un sótano de naves.',
    'La linde sobrevive entre dos muros.',
    'La tapia tuerce el gesto de una higuera.',
    'Resiste un brazal donde aparcan coches.',
    'Por el taller avanza fango espeso.',
    'Bajo un portal regresa el agua oscura,',
    'palpando las raíces que resisten.',
    'Un tubo corta en dos la tierra húmeda.',
    'No queda recta la pared mojada.',
    'Gotea un caño junto a los cimientos.',
    'Granada pisa barro en un garaje.',
    'La acequia cruza bajo la avenida.'
  ];

  if(!Array.isArray(window.GRANADA_ROWS)||window.GRANADA_ROWS.length!==27){
    throw new Error('LA VEGA: la matriz base 27×27 no está disponible');
  }

  p14.forEach((verse,r)=>{ window.GRANADA_ROWS[r].verses[13]=verse; });

  /* Ajustes locales de cruce conservados en la antigua matriz activa.
     La nueva capa pétrea ya ha sido congelada antes de llegar aquí. */
  const local=[
    [6,15,'pasa entre la multitud rozando humo.'],
    [23,15,'y el vidrio copia un resplandor opaco.'],
    [25,13,'El cuarto escucha un golpe bajo tierra:'],
    [25,15,'mientras derriban muros en la ciudad.']
  ];
  local.forEach(([r,c,verse])=>{ window.GRANADA_ROWS[r-1].verses[c-1]=verse; });

  window.GRANADA_LA_VEGA_ACTIVE={
    title:'LA VEGA',
    verses:[...p14],
    center:'Late bajo la cal la acequia hundida.',
    p14Verses:27,
    localCrossingAdjustments:4,
    changedCells:31,
    periods:[[1,8],[9,14],[15,22],[23,27]],
    metricCounts:Array(27).fill(11),
    metricMethod:'recuento manual con sinalefas naturales; 27 endecasílabos'
  };
})();
