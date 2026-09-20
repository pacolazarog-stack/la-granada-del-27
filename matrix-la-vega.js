/* LA VEGA · centro canónico de la matriz · 20/09/2026
   La obra visible ya no se identifica con la antigua columna P14 de 27 versos.
   Su forma autoral vigente tiene 44 versos visibles:
   1 + 14 + 14 + 14 + 1.
   El umbral y el cierre son dos proyecciones gráficas del mismo centro profundo.
   El texto completo permanece retenido de la superficie pública mientras
   convenga preservar su condición de inédito.
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
    kind:'cyclic-triptych',
    canonicalDate:'2026-09-20',
    published:false,
    withheldFromPublicEdition:true,

    /* Conteos distintos para no confundir superficie y cuerpo estrófico. */
    verseCount:44,
    visibleVerseCount:44,
    bodyVerseCount:42,
    thresholdVerseCount:1,
    closureVerseCount:1,
    sectionVerseCounts:[14,14,14],

    sections:[
      {id:'I',role:'QUEJA',verseCount:14,mesostic:'GARCÍA LORCA'},
      {id:'II',role:'ENGAÑO',verseCount:14,mesostic:'SOR JUANA INÉS'},
      {id:'III',role:'ROMA',verseCount:14,mesostic:'GÓMEZ DE QUEVEDO'}
    ],

    /* Mientras published=false, no se almacena aquí el texto completo. */
    verses:[],

    centralVerse:CENTER,
    threshold:CENTER,
    closure:CENTER,

    /* Índices 1-based de las dos proyecciones visibles del único centro. */
    centerProjectionIndices:[1,44],

    centerAnchor:{
      matrix:[14,14],
      cube:[14,14,14],
      rule:'umbral y cierre son dos apariciones gráficas de un único verso central'
    },

    cycle:{
      formula:'CENTRO → despliegue → CENTRO',
      visible:'1 + 14 + 14 + 14 + 1',
      deepCenterCount:1
    },

    presentation:{
      canonical:'three-page-cyclic-triptych',
      pages:3,
      pageMap:[
        {page:1,content:'título + umbral + I'},
        {page:2,content:'II'},
        {page:3,content:'III + pausa + cierre'}
      ],
      internalPageCounters:false,
      finalMeaningfulSign:'closure',
      whitespace:'ample',
      background:'neutral-or-very-pale',
      title:'LA VEGA',
      mesosticHighlighting:'subtle-chromatic-only'
    },

    relationToStone:'La superficie y la piedra sólo coinciden absolutamente en el verso central.',
    relationToCube:'LA VEGA ancla el centro 14·14·14; el poema visible de 44 versos no se fuerza dentro de 27 celdas.'
  };
})();
