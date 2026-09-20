/* Cuerpo poético de superficie · 27 poemas visibles.
   Esta capa NO sustituye ni modifica la matriz profunda 27×27.
   LIBRO / VERTICAL / ESPEJOS leen aquí; HORIZONTAL / DIAGONAL / A-M-T leen la piedra.
*/
(()=>{
  const need=(id,value)=>{
    if(!value||!Array.isArray(value.verses)) throw new Error(`SUPERFICIE: falta ${id}`);
    return value;
  };

  const activeVega=window.GRANADA_LA_VEGA_ACTIVE||null;
  const laVega={
    title:'LA VEGA',
    kind:activeVega?.kind||'cyclic-triptych',
    verses:activeVega?.published&&Array.isArray(activeVega.verses)&&activeVega.verses.length
      ? [...activeVega.verses]
      : ['[Texto retirado temporalmente de la edición pública.]'],
    canonicalVerseCount:activeVega?.visibleVerseCount||activeVega?.verseCount||44,
    visibleVerseCount:activeVega?.visibleVerseCount||activeVega?.verseCount||44,
    bodyVerseCount:activeVega?.bodyVerseCount||42,
    sectionVerseCounts:[...(activeVega?.sectionVerseCounts||[14,14,14])],
    centerProjectionIndices:[...(activeVega?.centerProjectionIndices||[1,44])],
    centralVerse:activeVega?.centralVerse||'Late bajo la cal la acequia hundida.',
    threshold:activeVega?.threshold||'Late bajo la cal la acequia hundida.',
    closure:activeVega?.closure||'Late bajo la cal la acequia hundida.',
    presentation:{...(activeVega?.presentation||{})},
    withheldFromPublicEdition:activeVega?.withheldFromPublicEdition!==false,
    retainedConstraints:[
      '44 versos visibles = 1 + 14 + 14 + 14 + 1',
      'cuerpo estrófico = tríptico 14 + 14 + 14',
      'umbral y cierre = dos proyecciones visibles del mismo verso central',
      'anclaje matricial = 14×14',
      'anclaje cúbico = 14×14×14'
    ]
  };

  const poems=[
    need('P01',window.GRANADA_LAB_GRANADA_1927),
    need('P02',window.GRANADA_LAB_EL_RINCONCILLO),
    need('P03',window.GRANADA_LAB_DON_MANUEL),
    need('P04',window.GRANADA_LAB_FEDERICO),
    need('P05',window.GRANADA_LAB_HERMENEGILDO),
    need('P06',window.GRANADA_LAB_MANUEL_ANGELES),
    need('P07',window.GRANADA_LAB_LOS_TITERES),
    need('P08',window.GRANADA_LAB_LA_PUERTA_DEL_VINO),
    need('P09',window.GRANADA_LAB_ANTES_DE_SABERLO),
    need('P10',window.GRANADA_LAB_AGOSTO),
    need('P11',window.GRANADA_LAB_EL_BARRANCO),
    need('P12',window.GRANADA_LAB_LA_CIUDAD_CALLO),
    need('P13',window.GRANADA_LAB_LA_CASA_CERRADA),
    need('P14',laVega),
    need('P15',window.GRANADA_LAB_GRAN_VIA),
    need('P16',window.GRANADA_LAB_ALHAMBRA_SA),
    need('P17',window.GRANADA_LAB_HABITACION_CON_TURISTAS),
    need('P18',window.GRANADA_LAB_CIEN_ANOS),
    need('P19',window.GRANADA_LAB_GRANADA_2027),
    need('P20',window.GRANADA_LAB_EL_NUEVO_RINCONCILLO),
    need('P21',window.GRANADA_LAB_GALLO_VUELVE_A_CANTAR),
    need('P22',window.GRANADA_LAB_LOS_OTROS),
    need('P23',window.GRANADA_LAB_LAS_QUE_FALTABAN),
    need('P24',window.GRANADA_LAB_CANCION_PARA_QUIEN_ACABA_DE_LLEGAR),
    need('P25',window.GRANADA_LAB_LA_CIUDAD_QUE_TODAVIA_PUEDE_SER),
    need('P26',window.GRANADA_LAB_QUE_VUELVA_A_OCURRIR),
    need('P27',window.GRANADA_LAB_UN_SIGLO_DESPUES)
  ].map((p,i)=>({
    number:i+1,
    id:`P${String(i+1).padStart(2,'0')}`,
    title:p.title,
    verses:[...p.verses],
    source:p,
    kind:p.kind||'poem',
    canonicalVerseCount:p.canonicalVerseCount||p.verses.length,
    visibleVerseCount:p.visibleVerseCount||p.canonicalVerseCount||p.verses.length,
    bodyVerseCount:p.bodyVerseCount||null,
    sectionVerseCounts:p.sectionVerseCounts?[...p.sectionVerseCounts]:null,
    centerProjectionIndices:p.centerProjectionIndices?[...p.centerProjectionIndices]:null,
    centralVerse:p.centralVerse||null,
    threshold:p.threshold||null,
    closure:p.closure||null,
    presentation:p.presentation?{...p.presentation}:null,
    withheldFromPublicEdition:!!p.withheldFromPublicEdition,
    mirror:i===13?null:28-(i+1)
  }));

  const expectedTitles=window.GRANADA_TITLES||[];
  poems.forEach((p,i)=>{
    if(expectedTitles[i]&&p.title!==expectedTitles[i]){
      throw new Error(`SUPERFICIE: título P${String(i+1).padStart(2,'0')} «${p.title}» ≠ «${expectedTitles[i]}»`);
    }
  });

  const center=laVega.centralVerse;
  if(center!=='Late bajo la cal la acequia hundida.'){
    throw new Error(`SUPERFICIE: el verso central cambió: «${center||'—'}»`);
  }

  window.GRANADA_SURFACE_POEMS=Object.freeze(poems.map(p=>Object.freeze({
    ...p,
    verses:Object.freeze([...p.verses]),
    sectionVerseCounts:p.sectionVerseCounts?Object.freeze([...p.sectionVerseCounts]):null,
    centerProjectionIndices:p.centerProjectionIndices?Object.freeze([...p.centerProjectionIndices]):null,
    presentation:p.presentation?Object.freeze({...p.presentation}):null
  })));
  window.GRANADA_SURFACE={
    count:27,
    centerPoem:14,
    centerVerse:center,
    center,
    centerMatrix:[14,14],
    centerCube:[14,14,14],
    mirrorPairs:13,
    layers:{book:'surface',vertical:'surface',mirrors:'surface',horizontal:'stone',diagonal:'stone',radial:'core',hidden:'stone'},
    palindromicJoints:[9,18,27],
    laVega:{
      form:'cyclic-triptych',
      visibleStructure:[1,14,14,14,1],
      sectionVerseCounts:[14,14,14],
      canonicalVerseCount:44,
      visibleVerseCount:44,
      bodyVerseCount:42,
      centerProjectionIndices:[1,44],
      withheldFromPublicEdition:laVega.withheldFromPublicEdition,
      centralVerse:center,
      rule:'el poema visible tiene 44 versos; umbral y cierre proyectan un único centro profundo y no se comprimen en 27 celdas'
    }
  };
})();
