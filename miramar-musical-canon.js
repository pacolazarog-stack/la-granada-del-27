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

tum ta ka tum ta ka ah`,
`08 · TERRITORIO

tan ta tum tan ta ah

tan ta tum tan ta ah

Tengo domicilio. Tengo lindes. Tengo vistas. Tengo escritura. Tengo referencia. Tengo cuota. Tengo terraza.

Ergo, tengo reino.

Un reino pequeño. Muy bien documentado.

Aquí termina lo mío. Aquí empieza lo común. Aquí llega la sombra. Aquí no llega la paciencia.

tan ta tum tan ta ah

Territorio. Territorio.

Todo reino necesita una línea que alguien discuta.

Puedo medir el suelo. Puedo medir la cuerda. Puedo medir la pinza.

No puedo medir el momento exacto en que una casa se convierte en frontera.

Territorio. Territorio.

La línea blanca no grita, pero obliga a escoger lado.

Y cuanto más protejo el sitio, menos sitio me queda.

Yo quería una terraza. Estoy construyendo un mapa.

tum ka ta ka ah tum

tum ka ta ka ah tum`,
`09 · MAYORÍA SIMPLE

tum pa tum pa ra tum pa ra pa

tum pa tum pa ra tum pa ra pa

Hasta ayer tenía vecinos. Ahora tengo Comunidad.

Uno baja a tirar la basura siendo persona y vuelve convertido en mayoría simple.

Mayoría simple. Mayoría simple.

Una cabeza. Una cuota. Un criterio. Una carpeta.

Título constitutivo. Norma primera. Elemento común. Uso tolerado. Orden del día.

tum pa ra pa tum pa ra pa

Nadie lo ha leído entero. Todos recuerdan justo el artículo que les conviene.

Mayoría simple. Mayoría simple.

La opinión se infla, se pone gafas, se sienta derecha.

Yo decía: oye. Ahora digo: requiero.

Yo decía: por favor. Ahora digo: a los efectos oportunos.

No ha mejorado la convivencia. Pero el verbo tiene fuero.

Tres cuerpos blancos ya parecen una institución.

du ba tum ta ah

du ba tum ta ah

Nosotros.

Hasta ahora decía yo. Yo veo. Yo mido. Yo protesto. Yo acredito.

Nosotros.

Qué palabra tan peligrosa. Una la dice dos veces y a la tercera ya necesita bandera.

Nosotros. Nosotros. ¿Quién cabe dentro? ¿Quién se queda fuera?

La palabra da calor. También hace sombra.

Si digo nosotros, parece que hablo por todos.

Si digo todos, alguien ya ha desaparecido.

Yo quería que me entendieran. Ahora empiezo a hablar en nombre de una multitud.

tum ts ta ts tum ah

tum ts ta ts tum ah`,
`10 · VOTEN

tum ka ta ka tum ah

tum ka ta ka tum ah

Territorio. Símbolo. Gente.

Tum ta ah tum.

Una parte aquí. Otra responde.

Tum ta ah tum.

No hace falta entender. Hace falta entrar juntos.

Tum ta ah tum.

tum ka ta ka tum ah

Yo digo territorio. Vosotros devolvéis pulso.

Yo digo bandera. Vosotros devolvéis cuerpo.

Yo digo nosotros...

Tum ta ah tum.

Qué palabra tan peligrosa.

Tum ta ah tum.

¿Puede usarse la terraza comunitaria para tender? Voten.

Si gana sí, gana uno. Si gana no, gana otro. Si empatan: administrador. Eso es bastante peor.

Una votación decide quién vence. No decide cómo mañana se comparte el ascensor.

Por un instante nadie mira desde fuera. Todos sostienen algo.

Territorio. Símbolo. Gente.

Tum ta ah tum.

tum ts ta ts tum ah

tum ts ta ts tum ah`,
`11 · SIEMPRE SE HA HECHO

ta ka tum ta ka tum ah

ta ka tum ta ka tum ah

Primero sucede. Luego vuelve a suceder. Después alguien dice: siempre se ha hecho.

Siempre se ha hecho. Siempre se ha hecho.

Tres palabras con más antigüedad que el edificio entero.

¿Siempre desde cuándo? Desde siempre.

¿Quién lo decidió? Nadie.

¿Dónde consta? En que se hacía.

Primero uso. Después costumbre. Luego precedente.

ta ka tum ta ka tum ah

Siempre se ha hecho. Siempre se ha hecho.

Si se repite bastante, parece que nació con las llaves.

Yo pregunto dónde empieza. Me responden que ya estaba.

Pregunto quién autorizó. Me responden que nadie protestó.

Y ahí está el milagro: lo que nadie decidió acaba pareciendo obligatorio.

Cuando esa frase entra por la puerta, el abogado ya está subiendo la escalera.

tum ta tum ta ah

tum ta tum ta ah

Dejó de ser una sábana. Pasó a ser un uso.

Uso.

Qué palabra tan limpia. No huele a detergente. No gotea. No se arruga.

No es sábana. Es uso.

No es ropa. Es uso.

No es martes. Es uso.

Que conste en acta. Que conste en acta.

Lo que se nombra empieza a mandar.

Una cosa pequeña ha aprendido un nombre grande.

Y ya no sé qué detergente compra una para lavar una categoría.

mmm tum ta ya ah

mmm tum ta ya ah`
  ];

  window.WORK_DATA={
    title:'La terraza del Miramar',
    subtitle:'Tragicomedia multimedia · Canon musical · escenas 01–11',
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
    7:'PRIMERA INCURSIÓN TERRESTRE',
    8:'TERRITORIO',
    9:'MAYORÍA SIMPLE',
    10:'VOTEN',
    11:'SIEMPRE SE HA HECHO'
  };
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-11',pages:11,validated:true};

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