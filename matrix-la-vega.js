/* LA VEGA · contenido retirado temporalmente de la superficie pública.
   Este archivo se mantiene como compatibilidad estructural sin incorporar el poema.
*/
(()=>{
  if(!Array.isArray(window.GRANADA_ROWS)||window.GRANADA_ROWS.length!==27){
    throw new Error('LA VEGA: la matriz base 27×27 no está disponible');
  }

  const p14=window.GRANADA_ROWS.map(row=>row.verses[13]);

  window.GRANADA_LA_VEGA_ACTIVE={
    title:'LA VEGA',
    verses:[...p14],
    center:p14[13],
    p14Verses:27,
    withheldFromPublicEdition:true
  };
})();
