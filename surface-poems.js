/* Cuerpo poético de superficie · 27 poemas visibles.
   Esta capa NO sustituye ni modifica la matriz profunda 27×27.
   LIBRO / VERTICAL / ESPEJOS leen aquí; HORIZONTAL / DIAGONAL / A-M-T leen la piedra.
*/
(()=>{
  const need=(id,value)=>{
    if(!value||!Array.isArray(value.verses)) throw new Error(`SUPERFICIE: falta ${id}`);
    return value;
  };
  const laVega={
    title:'LA VEGA',
    verses:(window.GRANADA_LA_VEGA_ACTIVE?.verses||window.GRANADA_ROWS?.map(r=>r.verses?.[13])).slice(),
    retainedConstraints:['27 versos','27 endecasílabos','verso 14 = centro 14×14']
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
    mirror:i===13?null:28-(i+1)
  }));

  const expectedTitles=window.GRANADA_TITLES||[];
  poems.forEach((p,i)=>{
    if(expectedTitles[i]&&p.title!==expectedTitles[i]){
      throw new Error(`SUPERFICIE: título P${String(i+1).padStart(2,'0')} «${p.title}» ≠ «${expectedTitles[i]}»`);
    }
  });

  const center=poems[13]?.verses?.[13];
  if(center!=='Late bajo la cal la acequia hundida.'){
    throw new Error(`SUPERFICIE: el centro 14×14 cambió: «${center||'—'}»`);
  }

  window.GRANADA_SURFACE_POEMS=Object.freeze(poems.map(p=>Object.freeze({...p,verses:Object.freeze([...p.verses])})));
  window.GRANADA_SURFACE={
    count:27,
    centerPoem:14,
    centerVerse:14,
    center,
    mirrorPairs:13,
    layers:{book:'surface',vertical:'surface',mirrors:'surface',horizontal:'stone',diagonal:'stone',radial:'core',hidden:'stone'},
    palindromicJoints:[9,18,27]
  };
})();
