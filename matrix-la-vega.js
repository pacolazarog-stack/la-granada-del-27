/* LA VEGA · centro canónico de la matriz · 20/09/2026
   La obra visible ya no se identifica con la antigua columna P14 de 27 versos.
   Su forma autoral es un tríptico de 3 × 14 versos, anclado a la matriz por
   un único verso central. El texto completo permanece retenido de la
   superficie pública mientras convenga preservar su condición de inédito.
*/
(()=>{
  const CENTER='Late bajo la cal la acequia hundida.';
  const stoneP14=Array.isArray(window.GRANADA_ROWS)&&window.GRANADA_ROWS.length===27
    ? window.GRANADA_ROWS.map(row=>row?.verses?.[13]||'')
    : [];

  window.GRANADA_LA_VEGA_LEGACY_27={
    title:'LA VEGA · PROTOVERSIÓN 27',
    verses:[...stoneP14],
    status:'archivo-genetico',
    matrixColumn:'P14',
    center:stoneP14[13]||CENTER
  };

  window.GRANADA_LA_VEGA_ACTIVE={
    title:'LA VEGA',
    kind:'triptych',
    canonicalDate:'2026-09-20',
    published:false,
    withheldFromPublicEdition:true,
    verseCount:42,
    sectionVerseCounts:[14,14,14],
    sections:[
      {id:'I',role:'QUEJA',verseCount:14},
      {id:'II',role:'ENGAÑO',verseCount:14},
      {id:'III',role:'ROMA',verseCount:14}
    ],
    verses:[],
    centralVerse:CENTER,
    threshold:CENTER,
    closure:CENTER,
    centerAnchor:{
      matrix:[14,14],
      cube:[14,14,14],
      rule:'umbral y cierre son dos apariciones gráficas de un único verso central'
    },
    presentation:{
      canonical:'single-page-triptych',
      background:'pale-green',
      titleReflection:true,
      title:'L A V E G A',
      mesosticHighlighting:false
    },
    relationToStone:'La superficie y la piedra sólo coinciden absolutamente en el verso central.',
    relationToCube:'LA VEGA ancla el centro 14·14·14; el tríptico no se fuerza dentro de 27 celdas.'
  };
})();
