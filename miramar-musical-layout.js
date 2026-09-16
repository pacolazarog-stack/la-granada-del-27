(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  /* DOS CÁNONES INDEPENDIENTES.
     TEXTUAL: el WORK_DATA 1.7 ya cargado.
     MUSICAL: exclusivamente los textos adaptados y aprobados hoy. */
  if(window.WORK_DATA&&Array.isArray(window.WORK_DATA.pages)){
    window.MIRAMAR_TEXTUAL_DATA={...window.WORK_DATA,pages:[...window.WORK_DATA.pages]};
  }

  const musicalPages=[
`I · DOMÉSTICA

01 · MIRAMAR COMUNIDAD

mmm tum ah tum tum ta ah tum

Miramar Comunidad. Propietarias. Definitivo. Definitivo BUENO.

Cuarenta años de ladrillos y todavía no sabemos nombrarnos.

Primero se crea el grupo. Después empieza el calvario.

Buenos días. Grave.

PDF. Extraordinario.

Audio de cuatro minutos. Conflicto comunitario.

Porque nadie manda un audio de cuatro minutos por paz. Si dura más de treinta segundos, hay antecedentes detrás.

Tum ta ah tum.

La mirada no nace con himno. Nace con una notificación.

mmm tum ah tum tum ta ah tum`,
`02 · OK

mmm tum ah tum tum ta ah tum

Ok.

O. K.

Dos letras. Ni siquiera un punto.

Una persona normal lee Ok y continúa con su vida.

Yo también.

Durante siete segundos.

Siete segundos. Siete.

Ok. Ok. Cuánto sitio dejan dos letras.

tum ta ah tum tum ta ah tum

No dice sí. No dice no. No dice nada que pueda agarrarse. Y, sin embargo, pesa.

Ok amable. Ok seco. Ok de mañana hablamos. Ok de no pienso hablar mañana. Ok administrativo. Ok de ya veremos. Ok de tú sabrás. Ok de no pienso discutir.

Buenas tardes. Mañana voy a tender.

Buenas tardes. Qué forma tan educada de anunciar una catástrofe doméstica.

De acuerdo. Hablamos.

Ok.

No hay tilde. No hay emoji. No hay perito del matiz.

Yo no pregunto. Todavía.

Miro la pantalla. La apago. La enciendo.

Ok. Ok.

Dos letras. Cuatro plantas. Veinte versiones.

Lo que no dices lo pongo yo.

tum ta ta ah tum tum ta ta ah tum`,
`03 · EL CUERPO

mmm tum ta ah tum mmm tum ta ah tum

Una casa aprende el cuerpo antes que el cuerpo la casa.

Una sabe dónde hundirse, dónde estirarse sin tasa.

Aquí yo me sentaba mal. Que es como una se sienta en casa.

Una pierna bajo el culo. La dignidad relajada.

Abres tres veces la nevera por si a la cuarta hace magia.

Hablas sola con un ficus y hasta el ficus te amenaza.

No pongáis esa cara, niñas.

Una puede ser muy reina y estar en bata en su casa.

La monarquía termina donde empieza la pantufla.

mmm tum ta ah tum clac tum ta ah tum`,
`04 · CLAC

clac tum ta ah tum clac tum ta ah tum

¿Veis?

No ha entrado nadie y ya he cambiado la espalda.

De gelatina doméstica a estatua protocolaria.

Antes yo tenía cuerpo. Ahora tengo una postura.

Antes estaba sentada. Ahora estoy en comparecencia.

CLAC.

Pelvis centrada. Columna rígida. Sonrisa social.

CLAC.

La intimidad entra por la puerta y el cuerpo se pone corbata.

Perdón. Eso no rimaba.

La intimidad tampoco siempre.

clac tum ta ah tum tum ta ka ah tum`,
`05 · NADIE

tum ta ka ah tum tum ta ka ah tum

Desde aquí se ve el mar. Desde allí se ve mi terraza.

Ver el mar. Ver mi terraza.

Parece el mismo verbo. No lo es.

Antes no había nadie. Ésa es toda la cuestión.

Nadie mide poco en un plano, pero cabe una pareja, un verano, una puerta abierta, un café sin estrategia.

Una bata es una bata si una está sola en su casa.

Si al otro lado hay un vecino, de pronto parece una causa.

No digo que mire. No necesito que mire.

Me basta con que pueda.

Puede entrar. Puede quedarse. Puede tender mirando a Motril. Puede no mirarme nunca.

No llegó Roma vencedora. Llegaron dos camisetas, un pantalón y una sábana secadora.

No me quitaron terreno. Me añadieron una posibilidad.

Y una posibilidad pequeña, si se repite, ocupa una silla entera.

tum ta ka tum ta ah tum tum ta ka tum ta ah tum`,
`06 · NACE EL CONFLICTO

tum ta ka tum ta ah tum tum ta ka tum ta ah tum

No es que mire. Es que puede.

Si fuera un mirón, qué descanso. Tendríamos un enemigo, primer plano y alguien a quien silbar en el acto.

Pero puede ser correcto. Simpatiquísimo. Casto.

Puede tender hacia Motril con los párpados cerrados.

No es que mire. Es que puede.

Y yo, para sentirme no mirada, miro primero si está.

No está. Me siento.

CLAC.

Me levanto. No está.

CLAC.

Vuelvo a mirar.

No es que mire. Es que puede.

Para poder estar a solas meto al vecino en mi cerebro.

No me han quitado un metro. Me han añadido un cuidado.

Mira. No mires. Mira. No mires.

Yo quería ver el mar. Ahora compruebo el mundo.

tan tum ta ah tan tum ta ah`
  ];

  const musicalTitles={
    1:'MIRAMAR COMUNIDAD',
    2:'OK',
    3:'EL CUERPO',
    4:'CLAC',
    5:'NADIE',
    6:'NACE EL CONFLICTO'
  };

  window.MIRAMAR_MUSICAL_DATA={
    title:'La terraza del Miramar',
    subtitle:'Tragicomedia multimedia · Canon musical',
    author:'flag',
    pages:musicalPages
  };
  window.MIRAMAR_MUSICAL_SCENE_TITLES=musicalTitles;

  const musicalActive=()=>localStorage.getItem('volumeSoundMode')!=='off'&&localStorage.getItem('volumeVoiceMode')!=='on';
  const isMusical=()=>document.documentElement.dataset.mediaMode==='musical'||musicalActive();

  function applyCanon(){
    const musical=musicalActive();
    if(musical){
      window.WORK_DATA=window.MIRAMAR_MUSICAL_DATA;
      window.MIRAMAR_SCENE_TITLES={...musicalTitles};
      document.documentElement.dataset.miramarCanon='musical';
    }else if(window.MIRAMAR_TEXTUAL_DATA){
      window.WORK_DATA=window.MIRAMAR_TEXTUAL_DATA;
      window.MIRAMAR_SCENE_TITLES={};
      document.documentElement.dataset.miramarCanon='textual';
    }

    const sub=document.querySelector('#readerSub');
    if(sub)sub.textContent=musical?'Tragicomedia multimedia · Canon musical':'Tragicomedia visual · Canon 1.7';
    const badge=document.querySelector('#readerCover .cover-badge');
    if(badge)badge.textContent=musical?'CANON MUSICAL':'30 ESCENAS';
  }

  applyCanon();

  /* Al cambiar de canon se recarga la página conservando el hash. Esto impide que
     el lector mantenga en memoria páginas del otro corpus. */
  let reloadPending=false;
  const reloadForCanonChange=()=>{
    if(reloadPending)return;
    reloadPending=true;
    setTimeout(()=>location.reload(),30);
  };
  document.addEventListener('volume:soundchange',reloadForCanonChange);
  document.addEventListener('volume:voicechange',reloadForCanonChange);

  /* En el canon musical la lectura es necesariamente ilustrada. */
  const illustratedButton=()=>[...document.querySelectorAll('.miramar-mode-btn')].find(b=>(b.textContent||'').trim()==='ILUSTRADA');
  let forcing=false;
  const forceIllustrated=()=>{
    if(forcing||!isMusical())return;
    const btn=illustratedButton();
    if(!btn||btn.classList.contains('is-active'))return;
    forcing=true;
    try{sessionStorage.setItem('miramarReaderMode','illustrated');}catch(_){}
    btn.click();
    forcing=false;
  };
  const schedule=()=>setTimeout(forceIllustrated,0);
  document.addEventListener('book:state',schedule);
  document.addEventListener('click',ev=>{
    if(!isMusical())return;
    const btn=ev.target.closest?.('.miramar-mode-btn,.miramar-cover-choice-btn');
    if(btn&&/TEXTO|TEXTUAL/i.test((btn.textContent||'').trim()))schedule();
  },true);
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode']});
  new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['data-miramar-mode']});
  setTimeout(forceIllustrated,0);
})();