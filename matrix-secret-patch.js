/* Ajustes de marcas ocultas derivados de LA VEGA activa.
   Debe cargarse después de matrix-secret.js y antes de matrix-mesostic.js.
*/
(()=>{
  if(!window.GRANADA_ACROSTIC||!window.GRANADA_TELESTIC){
    throw new Error('Marcas ocultas: matrix-secret.js no está cargado');
  }

  const h08=window.GRANADA_ACROSTIC.H08?.marks?.find(m=>m.position===14&&m.key==='E');
  const h17=window.GRANADA_ACROSTIC.H17?.marks?.find(m=>m.position===14&&m.key==='M');
  const p15=window.GRANADA_TELESTIC.P15?.marks?.find(m=>m.row===23&&m.key==='A');

  if(!h08||!h17||!p15) throw new Error('Marcas ocultas: no se localizaron los tres anclajes que deben desplazarse');

  h08.offset=13;
  h17.offset=29;
  p15.start=32;
  p15.end=37;
  p15.keyOffset=2;

  window.GRANADA_SECRET_PATCH={
    acrostic:[
      {id:'H08',position:14,key:'E',offset:13},
      {id:'H17',position:14,key:'M',offset:29}
    ],
    telestic:[
      {id:'P15',row:23,key:'A',start:32,end:37,keyOffset:2}
    ]
  };
})();
