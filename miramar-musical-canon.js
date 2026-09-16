(()=>{
  if(document.body?.dataset?.bookId!=='miramar'||!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const MODE_KEY='miramarCanonMode';
  const queryMode=new URL(location.href).searchParams.get('canon');
  if(queryMode==='musical'||queryMode==='textual')localStorage.setItem(MODE_KEY,queryMode);

  let mode=localStorage.getItem(MODE_KEY)||'';
  if(mode!=='musical'&&mode!=='textual'){
    const voice=localStorage.getItem('volumeVoiceMode');
    const sound=localStorage.getItem('volumeSoundMode');
    mode=voice==='on'?'textual':sound!=='off'?'musical':'textual';
    localStorage.setItem(MODE_KEY,mode);
  }

  window.MIRAMAR_ACTIVE_CANON=mode;
  if(mode!=='musical')return;

  const pages=[
`01 · MIRAMAR COMUNIDAD

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

tan tum ta ah tan tum ta ah`,
`07 · PRIMERA INCURSIÓN TERRESTRE

tan tum ta ah

tan tum ta ah

La pinza.

Una pinza.

Plástico azul.

Seis centímetros,

siete con sombra.

Ésa fue mi primera equivocación:

medirla.

Nunca midas

lo que estás empezando a odiar.

Seis centímetros.

Un dato.

Y donde hay un dato

hay una carpeta esperando nacer.

tan tum ta ah tum

No es que mire.

Es que puede.

No es que invada.

Es que cruza.

No es que sea mucho.

Es que ahora sé cuánto.

Seis centímetros.

Y desde la linde, diecisiete centímetros.

Diecisiete con cuatro.

Dieciocho con cuatro con sombra.

Un borde.

Una línea.

Una mañana entera metida en una cifra.

No es obsesión.

Es precisión.

Lo otro queda muy ordinario.

Pinza azul.

Dato azul.

Prueba azul.

Todavía es una pinza.

Todavía.

tum ta tum ta ah

tum ta tum ta ah

Primera incursión terrestre:

una pinza de color.

La devuelves y se acabó.

Eso haría una persona equilibrada.

Yo pensé:

cruzó la linde.

Diecisiete centímetros.

Diecisiete con cuatro.

Dieciocho con cuatro contando sombra.

Yo contesté con absoluta serenidad.

No contesté.

Dejé el teléfono sobre la mesa.

Me temblaban las manos.

Luego sí.

Serenísima.

No es una guerra.

No es una guerra.

No es una guerra.

Y, sin embargo,

ya estoy contando territorio.

tum ta ka tum ta ka ah

tum ta ka tum ta ka ah`
  ];

  window.WORK_DATA={
    title:'La terraza del Miramar',
    subtitle:'Tragicomedia multimedia · Canon musical · escenas 01–07',
    author:'flag',
    pages
  };
  window.MIRAMAR_SCENE_TITLES={
    1:'MIRAMAR COMUNIDAD',
    2:'OK',
    3:'EL CUERPO',
    4:'CLAC',
    5:'NADIE',
    6:'NACE EL CONFLICTO',
    7:'PRIMERA INCURSIÓN TERRESTRE'
  };
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-07',pages:7,validated:true};

  const m=location.hash.match(/^#p(\d+)$/);
  if(m&&Number(m[1])>pages.length)history.replaceState(null,'','#p1');

  document.addEventListener('click',ev=>{
    const btn=ev.target.closest?.('#volumeSoundToggle,#volumeVoiceToggle');
    if(!btn)return;
    const next=btn.id==='volumeSoundToggle'?'musical':'textual';
    localStorage.setItem(MODE_KEY,next);
    setTimeout(()=>{
      if(next===window.MIRAMAR_ACTIVE_CANON)return;
      const u=new URL(location.href);
      u.searchParams.set('canon',next);
      u.searchParams.set('v',String(Date.now()));
      u.hash=next==='musical'?'#p1':'#portada';
      location.replace(u.href);
    },0);
  });
})();