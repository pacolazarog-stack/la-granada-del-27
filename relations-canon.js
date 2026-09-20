/* Atlas/Azar · red relacional total · 27 tipos + 27 escrituras */
(()=>{
  const C=window.GRANADA_CUBE_27;
  const rows=()=>window.GRANADA_STONE_ROWS||window.GRANADA_ROWS||[];
  if(!C)return;
  const WRITINGS=[
  {
    "z": 1,
    "title": "LUNA IMPOSIBLE",
    "text": "La luna baja sobre un olivo imposible entre canales y lluvia. Nadie repite el ritual: cada orilla inventa otra manera de mojarse."
  },
  {
    "z": 2,
    "title": "COCHE MUDO",
    "text": "Un coche cruza la tarde sin nombre. La carretera no sabe si une dos países o simplemente prolonga el silencio de quien va dentro."
  },
  {
    "z": 3,
    "title": "CASA / MÁRMOL",
    "text": "Una casa guarda lo que duele; el mármol finge no oír. Entre ambos queda una mesa sin ocupar, esperando que alguien convierta la memoria en conversación."
  },
  {
    "z": 4,
    "title": "CIUDAD REAL",
    "text": "Una ciudad sólo empieza a ser real cuando admite lo que no cabe en su plano. Lo demás son fachadas: hermosas, exactas, todavía cerradas."
  },
  {
    "z": 5,
    "title": "SOMBRA DEL CORRAL",
    "text": "La sombra del corral se queda atrás, pero no desaparece. Viaja pegada a los zapatos hasta que otra tierra la cubre y la obliga a cambiar de forma."
  },
  {
    "z": 6,
    "title": "MAÑANA",
    "text": "Mañana serás tú, dice una voz que no sabe a quién habla. En la plaza, un mapa reluce y todos pasan por encima sin darse cuenta de que ya están dentro."
  },
  {
    "z": 7,
    "title": "HERVIR",
    "text": "Las voces hierven antes que el agua. Una risa salta de una mesa a otra y, por un momento, nadie necesita saber de qué lado empezó."
  },
  {
    "z": 8,
    "title": "PANTALLA",
    "text": "La pantalla multiplica voces, pero debajo siguen las casas levantadas sobre silencio. Cada imagen nueva deja una sombra antigua en el cristal."
  },
  {
    "z": 9,
    "title": "PORVENIR",
    "text": "Nadie contempla entero el porvenir. Por eso dos costas pueden mirarse sin prometerse nada y, aun así, guardar sitio para la sorpresa."
  },
  {
    "z": 10,
    "title": "FUERA",
    "text": "También quedaste fuera alguna vez. Desde entonces reconoces la raíz por lo que hace: no ata la tierra, la atraviesa buscando dónde sostenerse."
  },
  {
    "z": 11,
    "title": "MANOS SIN FIRMA",
    "text": "Manos sin firma abrieron otro cauce. El agua no preguntó quién tenía derecho a nombrarlo; siguió pasando hasta convertir el gesto en herencia."
  },
  {
    "z": 12,
    "title": "SOMBRAS",
    "text": "Una sombra dibuja la ventana y otra aprende a moverse detrás del trapo. Cuando llega el viento, las dos descubren que nunca estuvieron quietas."
  },
  {
    "z": 13,
    "title": "CABLES Y TINTA",
    "text": "Cables, tinta, un gallo que despierta demasiado pronto. La chispa cruza la distancia y alumbra una sílaba que en otra boca sonará distinta."
  },
  {
    "z": 14,
    "title": "BAJO LA CAL",
    "text": "Bajo la cal no hay centro: hay paso. El agua entra en la ciudad sin pedirle permiso al plano y sale de ella llevando nombres que nadie consiguió fijar."
  },
  {
    "z": 15,
    "title": "LLAMA",
    "text": "La llama alumbra sin herir y devuelve a la tinta lo que los cables habían dispersado. Una sílaba perdida regresa desde lejos con otro ritmo."
  },
  {
    "z": 16,
    "title": "LA VOZ DEL TRAPO",
    "text": "La voz salta por el cordel y la sombra abandona la ventana. El muñeco no sabe quién lo mueve; por eso, durante un segundo, parece libre."
  },
  {
    "z": 17,
    "title": "LO NUEVO",
    "text": "Lo nuevo nace donde el trapo todavía conserva la forma de unas manos sin firma. Nada empieza desde cero: empieza donde alguien dejó sitio."
  },
  {
    "z": 18,
    "title": "RAÍZ",
    "text": "Habitar es echar raíz sin inmovilizarse. Quien estuvo fuera aprende que pertenecer no consiste en cerrar la puerta, sino en saber volver a abrirla."
  },
  {
    "z": 19,
    "title": "ASOMBRO",
    "text": "El asombro vuelve al menú y nadie consigue ver entero lo que viene. Dos costas se responden con una piedra mojada que cambia de bolsillo."
  },
  {
    "z": 20,
    "title": "CASAS SOBRE SILENCIO",
    "text": "Las casas se alzaron sobre aquel silencio y ahora las pantallas lo repiten con mil voces. Basta apagar una para oír que debajo continúa algo sin resolver."
  },
  {
    "z": 21,
    "title": "SOLO POR HOY",
    "text": "Alguien duerme dentro sólo por hoy. Afuera las voces hierven y la habitación aprende que una noche también puede ser una forma provisional de comunidad."
  },
  {
    "z": 22,
    "title": "MAPA VIVO",
    "text": "El mapa reluce en la plaza, pero mañana serás tú quien lo doble. Ningún territorio permanece igual después de haber sido cruzado por un cuerpo."
  },
  {
    "z": 23,
    "title": "TIERRA QUE CUBRE",
    "text": "Apenas queda voz; la tierra cubre. Sin embargo, bajo la sombra del corral sigue latiendo una respiración que el viaje no consiguió borrar."
  },
  {
    "z": 24,
    "title": "SUCEDE",
    "text": "Granada sucede y, al suceder, obliga a la ciudad a ser real. No hay palíndromo que la cierre: cada regreso encuentra una calle ligeramente distinta."
  },
  {
    "z": 25,
    "title": "MÁRMOL / CASA",
    "text": "El mármol ignora la conversación hasta que una casa le devuelve lo que duele. Entonces la piedra deja de ser monumento y se vuelve mesa."
  },
  {
    "z": 26,
    "title": "LOS QUE PASAN",
    "text": "Otros pasan sin nombre por la tarde. El coche casi mudo ya se ha ido, pero queda en la carretera una vibración mínima que todavía los relaciona."
  },
  {
    "z": 27,
    "title": "OTRO RITUAL",
    "text": "El ritual no se repite porque la luna ya ha cambiado de agua. En la otra orilla, el olivo persiste como una palabra extranjera que, sin embargo, sabe dónde caer."
  }
];
  const TYPES=[
  "ESPEJO_XYZ",
  "ESPEJO_XY",
  "ANTERIOR_Z",
  "SIGUIENTE_Z",
  "CENTRO",
  "ENVOLVENTE",
  "VECINO_X_MENOS",
  "VECINO_X_MAS",
  "VECINO_Y_MENOS",
  "VECINO_Y_MAS",
  "VECINO_Z_MENOS",
  "VECINO_Z_MAS",
  "PAIS_X",
  "PAIS_Y",
  "PAIS_POEMA",
  "LENGUA_TERRITORIAL",
  "FAMILIA_LINGUISTICA",
  "AFINIDAD_SONORA",
  "PALABRA_COMPARTIDA",
  "INICIAL_COMPARTIDA",
  "ASONANCIA",
  "TIEMPO_1927",
  "TIEMPO_2027",
  "TRAZA_POEMA",
  "TRAZAS_DECLARADAS",
  "ESCRITURA",
  "AZAR"
];
  const STOP=new Set('a al algo ante antes como con contra cual cuando de del desde donde el ella en entre era es esta este fue ha hay la las lo los mas me mi muy ni no nos o para pero por porque que se sin sobre su sus te tu un una y ya'.split(' '));
  const cell=(r,c)=>rows()?.[r-1]?.verses?.[c-1]||'';
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  const words=s=>(norm(s).match(/[a-zñ]+/g)||[]).filter(w=>w.length>2&&!STOP.has(w));
  const uniq=a=>[...new Set(a)];
  const shared=(a,b)=>{const B=new Set(words(b));return uniq(words(a).filter(w=>B.has(w)));};
  const neighbors=(x,y,z)=>[
    ['VECINO_X_MENOS',x-1,y,z],['VECINO_X_MAS',x+1,y,z],
    ['VECINO_Y_MENOS',x,y-1,z],['VECINO_Y_MAS',x,y+1,z],
    ['VECINO_Z_MENOS',x,y,z-1],['VECINO_Z_MAS',x,y,z+1]
  ].filter(q=>q[1]>=1&&q[1]<=27&&q[2]>=1&&q[2]<=27&&q[3]>=1&&q[3]<=27)
   .map(q=>({type:q[0],target:{x:q[1],y:q[2],z:q[3]}}));
  const temporal=z=>z<14?'HACIA_1927':z>14?'HACIA_2027':'GOZNE_1927_2027';
  function relationsAt(x,y,z){
    const m=C.cubeMeta(x,y,z),p=C.poemPoint(z),xy=cell(m.x,m.y),yx=cell(m.y,m.x),center=cell(14,14),zVerse=cell(p.x,p.y);
    const territorial=C.languages.filter(l=>l.countries.includes(m.countryX)||l.countries.includes(m.countryY)||l.countries.includes(p.country));
    const sound=[...C.languages].map(lang=>({lang,score:C.scoresFor(zVerse,lang,{...m,trace:p},{}).total}))
      .sort((a,b)=>b.score-a.score).slice(0,5).map(q=>({code:q.lang.code,name:q.lang.name,family:q.lang.family,score:Math.round(q.score*10)/10}));
    const rel=[
      {type:'ESPEJO_XYZ',target:m.mirror},
      {type:'ESPEJO_XY',target:{x:m.y,y:m.x,z:m.z}},
      {type:'CENTRO',target:{x:14,y:14,z:14}},
      {type:'ENVOLVENTE',value:m.k},
      {type:'PAIS_X',value:m.countryX},{type:'PAIS_Y',value:m.countryY},{type:'PAIS_POEMA',value:p.country},
      {type:'TRAZA_POEMA',value:{z:p.z,x:p.x,y:p.y,on:m.onPoemTrace}},
      {type:'TRAZAS_DECLARADAS',value:C.traces.names},
      {type:'ESCRITURA',value:WRITINGS[z-1]},
      {type:'AZAR',value:'X→Y→CENTRO→Z'}
    ];
    if(z>1)rel.push({type:'ANTERIOR_Z',target:{z:z-1}});
    if(z<27)rel.push({type:'SIGUIENTE_Z',target:{z:z+1}});
    rel.push(...neighbors(m.x,m.y,m.z));
    territorial.forEach(l=>rel.push({type:'LENGUA_TERRITORIAL',value:{code:l.code,name:l.name,family:l.family}}));
    uniq(territorial.map(l=>l.family)).forEach(f=>rel.push({type:'FAMILIA_LINGUISTICA',value:f}));
    sound.forEach(s=>rel.push({type:'AFINIDAD_SONORA',value:s}));
    shared(xy,yx).forEach(w=>rel.push({type:'PALABRA_COMPARTIDA',value:w}));
    const initials=uniq(words(xy).map(w=>w[0]).filter(i=>words(yx).some(w=>w[0]===i)));
    initials.forEach(i=>rel.push({type:'INICIAL_COMPARTIDA',value:i}));
    const asson=uniq(words(xy).map(w=>w.slice(-2)).filter(t=>words(yx).some(w=>w.endsWith(t))));
    asson.forEach(t=>rel.push({type:'ASONANCIA',value:t}));
    rel.push({type:z<=14?'TIEMPO_1927':'TIEMPO_2027',value:temporal(z)});
    return {
      coordinate:{x:m.x,y:m.y,z:m.z},meta:m,poem:p,
      verses:{xy,yx,center,z:zVerse},
      writing:WRITINGS[z-1],mirrorWriting:WRITINGS[27-z],
      territorialLanguages:territorial.map(l=>l.code),soundTop:sound,sharedWords:shared(xy,yx),
      temporal:temporal(z),relations:rel,total:rel.length
    };
  }
  const traceNodes=()=>WRITINGS.map(w=>{
    const p=C.poemPoint(w.z),m=C.cubeMeta(p.x,p.y,w.z);
    return {...w,...p,k:m.k,verse:cell(p.x,p.y),mirrorText:cell(p.y,p.x),relations:relationsAt(p.x,p.y,w.z)};
  });
  window.GRANADA_RELATIONS={types:TYPES,writings:WRITINGS,relationsAt,traceNodes};
})();