/* BAJO LA CAL · núcleo triple
   Candidato de laboratorio.
   27 endecasílabos; verso 14 compartido con LA VEGA.
   La fila completa funciona como poema horizontal.
   14 + 13→1 forma HACIA LO ENTERRADO.
   14 + 15→27 forma HACIA LO ABIERTO.
*/
(()=>{
  const verses=[
    'Bajo la cal respira un muro viejo.',
    'La pala encuentra un borde de ladrillo.',
    'Cede una losa; asoma tierra negra.',
    'Un hilo de humedad baja por la cal.',
    'La raíz ha torcido una baldosa.',
    'La estancia huele a tablas bajo yeso.',
    'Sale del muro un clavo sin cabeza.',
    'La casa guarda polvo de otras manos.',
    'Un vaso deja un círculo en la piedra.',
    'La tinta de un recibo se ha borrado.',
    'Un escalón desciende hacia otra estancia.',
    'Detrás del muro suena el agua cerca.',
    'El zaguán guarda frío bajo el suelo.',
    'Late bajo la cal la acequia hundida.',
    'Rompen la losa; baja luz al cauce.',
    'El agua reconoce el aire abierto.',
    'La pala aparta barro de la piedra.',
    'Dos manos limpian juntas del ladrillo.',
    'Un niño mira el hilo entre sus botas.',
    'La calle sigue encima con su ruido.',
    'Pasa un coche y retumba la pared.',
    'La acequia vuelve a tocar la mañana.',
    'La piedra húmeda devuelve su color.',
    'Alguien retira el plástico del hueco.',
    'Una llave golpea contra el marco.',
    'Se abre la puerta; cruza aire del patio.',
    'Bajo la casa el agua sigue andando.'
  ];

  const center=verses[13];
  const haciaLoEnterrado=[center,...verses.slice(0,13).reverse()];
  const haciaLoAbierto=[center,...verses.slice(14)];

  window.GRANADA_LAB_BAJO_LA_CAL={
    title:'BAJO LA CAL',
    verses,
    center,
    horizontal:{title:'BAJO LA CAL',verses},
    radial:{
      buried:{title:'HACIA LO ENTERRADO',verses:haciaLoEnterrado},
      open:{title:'HACIA LO ABIERTO',verses:haciaLoAbierto}
    },
    constraints:{
      verseCount:27,
      meter:'endecasílabo',
      metricCounts:Array(27).fill(11),
      centerCell:'14×14',
      centerLocked:true,
      rhyme:'blanco; no se fuerza consonancia'
    },
    poetics:{
      horizontal:'excavación: muro → tierra → agua → apertura → calle',
      buried:'desde la acequia hacia los estratos domésticos y constructivos',
      open:'desde la acequia hacia luz, cuerpos, calle y continuidad',
      rule:'la triple lectura debe parecer consecuencia del poema, no su excusa'
    },
    status:'laboratorio; no reemplaza todavía H14 pública'
  };
})();
