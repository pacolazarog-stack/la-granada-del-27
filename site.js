const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

const PRO=`Granada no empezó en 1927.
Ya estaba el agua
abriendo lentamente la tierra,
la nieve guardada en la Sierra,
la cal, el barro,
los patios que aprendieron a dar sombra,
la Vega entrando en la ciudad
mucho antes de que la ciudad
supiera dónde terminaba.
Pero hubo un tiempo
en que algunas voces se encontraron
alrededor de una mesa.
No sabían todavía
que cien años después
alguien volvería a mirarlas.
Hablaron.
Discutieron.
Alguien golpeó un vaso con la uña.
Otro escuchó una música escondida.
Uno dibujó la forma de la luz.
Otro puso un muñeco sobre un hilo.
Alguien escribió la luna,
la sangre,
el caballo,
la raíz.
Granada estaba allí
y también fuera de allí.
Estaba en quienes no salieron en la fotografía,
en quien sirvió la copa,
en quien barrió después,
en las mujeres que trabajaban
mientras otros nombres llegaban a los libros,
en la gente que nunca dijo
que estaba haciendo cultura
y, sin embargo,
la estaba haciendo.
Luego vino agosto.
Hubo puertas que dejaron de abrirse,
casas donde un nombre bajó la voz,
cunetas,
silencios heredados,
fotografías guardadas demasiado tiempo.
La ciudad siguió creciendo.
Llegaron el asfalto,
los bloques,
las pantallas,
las maletas,
los códigos,
los turnos de entrada,
las habitaciones donde nadie permanece,
las lenguas nuevas
que empezaron a doblar las esquinas.
Y debajo continuó el agua.
Este libro no quiere volver a 1927.
Volver sería imposible.
Tampoco quiere levantar una estatua
a lo que estuvo vivo.
Quiere acercar otra mesa.
Preguntar qué quedó dentro de la imagen
y qué permaneció fuera.
Mirar la ciudad desde sus márgenes,
desde sus heridas,
desde quienes llegan,
desde quienes faltaron en el relato,
desde aquello que todavía
no sabemos nombrar.
Han pasado cien años.
Es tiempo suficiente
para descubrir que un siglo
no es una distancia.
Es una pregunta.
Y Granada
todavía no ha terminado
de responderla.`;

const EPI=`Después del último verso,
Granada sigue callada.
El Genil sigue su curso,
la Sierra guarda su alba.
Se levanta una persiana,
pasa una maleta blanca.
La mujer escribe nombres
donde faltaban palabras.
En una cocina hierve
la receta de otra casa.
En una mesa discuten
dos voces que no se callan.
La Alhambra recibe ojos
sobre la piedra dorada.
La Vega pierde otro palmo;
bajo el cemento va el agua.
Buscando raíces viejas
que no olvidan su llamada.
Habrá quien nombre a los muertos
sin volver su nombre placa.
Habrá quien llegue de lejos
con otra luz en la cara.
La ciudad no es una herencia
ni una puerta ya cerrada.
También es de quien pregunta,
de quien discute en la plaza,
de quien ensancha la mesa
para que quepan más almas.
De quien contempla los márgenes
y ve que el mundo no acaba.
Cien años parecen muchos
si los cuenta la mirada.
La tierra mide distinto,
su tiempo no tiene marcas.
Pasarán nombres y mapas,
cambiarán voces y casas.
Sierra seguirá allí,
sobre techos de Granada.
Dentro quizá de otro siglo
alguien leerá palabras.
Y tal vez sonría al verlas
como quien vuelve a una casa.
Que jamás halle respuesta
y la pregunta no calla.
Mientras se oiga una pregunta
y se ensanche alguna plaza,
mientras una voz de fuera
cambie el rumor de la casa,
mientras el agua recuerde
por dónde pasaba el agua,
Granada no estará hecha
ni quedará terminada.
Será ciudad mientras cambie
sin arrancar su entraña.
Y cuando el libro se cierre,
seguirá viva Granada.
Porque después de los versos
queda la luz en las casas,
queda la mesa con vida.
Granada queda en el agua.`;

const LOA_I=[
  'Granada abre la mesa:',
  'agua y música despiertan',
  'juventud, amistad;',
  'agosto deja silencio.',
  'VEINTISIETE devuelven voces,',
  'nombres, manos, luz, hilo, canto;',
  'agua abre otra mesa.',
  'Granada responde.'
];

const LOA_II=[
  'Granada guarda lo que falta',
  'bajo la cal;',
  'agua nombra ausencias,',
  'sangre vuelve memoria.',
  'VEINTISIETE escuchan:',
  'silencio abre voces,',
  'devuelve nombres;',
  'agua sube, rompe cal;',
  'Granada vuelve, canta.'
];

const SURFACE=window.GRANADA_SURFACE_POEMS||[];
const STONE=window.GRANADA_STONE_ROWS||window.GRANADA_ROWS||[];
const CORE=window.GRANADA_LAB_BAJO_LA_CAL||null;
const PAL=window.GRANADA_LAB_PALINDROMO?.text||'Granada sucede — sucede Granada.';

let items=[],bi=0,pi=0,row=13,hp=0;
const pv=i=>SURFACE[i]?.verses||[];
const diagDown=()=>STONE.map((r,i)=>r.verses[i]);
const diagUp=()=>STONE.map((r,i)=>r.verses[26-i]);
const buried=()=>CORE?.radial?.buried?.verses||[];
const opened=()=>CORE?.radial?.open?.verses||[];

function build(){
  const add=(k,e,t,l,extra={})=>items.push({k,e,t,l,...extra});
  const joint=after=>items.push({k:'j',after,text:PAL});
  items=[];
  items.push({k:'s',t:'LA GRANADA DEL 27 · UN SIGLO DESPUÉS',sub:''});
  add('t','PRÓLOGO','ANTES DE CONTAR',PRO.split('\n'));
  items.push({k:'s',t:'LIBRO I · LA GRANADA DEL 27',sub:'27 poemas'});

  SURFACE.forEach(p=>{
    add('v',`${String(p.number).padStart(2,'0')} · POEMA`,p.title,p.verses,{n:p.number});
    if(p.number===9||p.number===18)joint(p.number);
  });

  /* La tercera aparición del palíndromo ya es el último verso de P27.
     Las dos Loas se enfrentan inmediatamente después: no hay cuarta repetición. */
  items.push({k:'c',t:'LAS DOS LOAS',sub:'',v1:LOA_I,v2:LOA_II});

  items.push({k:'s',t:'LIBRO II · BAJO LA CAL',sub:'27 poemas horizontales · matriz profunda'});
  STONE.forEach((r,i)=>add('p',`H${String(i+1).padStart(2,'0')} · HORIZONTAL`,GRANADA_H_TITLES[i],r.verses,{n:i+1,layer:'stone'}));

  items.push({k:'s',t:'LIBRO III · LA GRANADA DEL 27',sub:'El centro secreto'});
  add('p','I · DIAGONAL CENTRAL ↘','DIAGONAL ↘',diagDown(),{layer:'stone'});
  add('p','II · DIAGONAL CENTRAL ↗','DIAGONAL ↗',diagUp(),{layer:'stone'});
  add('p','III · RADIAL','HACIA LO ENTERRADO',buried(),{layer:'core'});
  add('p','IV · RADIAL','HACIA LO ABIERTO',opened(),{layer:'core'});
  items.push({k:'r',t:'LA GRANADA DEL DOS SIETE',sub:'LA GRANADA DEL 27',body:'La superficie, la piedra y los dos sonetos se articulan por el mismo verso central.'});
  add('t','EPÍLOGO','GRANADA QUEDA',EPI.split('\n'));
  items.push({k:'s',t:'OTRA MANERA DE LEER',sub:'',body:'Arriba, los 27 poemas se miran por parejas alrededor de LA VEGA. Debajo permanece una matriz de 729 posiciones: 27 horizontales, dos diagonales, dos Loas y 54 voces mesósticas. Ambas construcciones se encuentran exactamente en 14 × 14: «Late bajo la cal la acequia hundida.»'});
}

function book(){
  const x=items[bi],el=$('#page');
  el.innerHTML='';el.scrollTop=0;
  if(x.k==='s'||x.k==='r'){
    el.innerHTML=`<div class="section"><div><h2 class="${x.k==='r'?'reveal':''}">${x.t}</h2><p>${x.sub||''}</p><p>${x.body||''}</p></div></div>`;
  }else if(x.k==='j'){
    el.innerHTML=`<div class="section"><div><p style="font-family:Georgia,'Times New Roman',serif;font-size:clamp(1.25rem,3vw,2rem);letter-spacing:.02em;text-align:center;margin:0">${x.text}</p></div></div>`;
  }else if(x.k==='c'){
    el.innerHTML='<div class="eyebrow">CODA · DOS DIRECCIONES</div><h2>LAS DOS LOAS</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:32px;align-items:start"><div><div class="eyebrow">LOA I · HACIA FUERA</div><div class="text" id="loa1"></div></div><div><div class="eyebrow">LOA II · HACIA DENTRO</div><div class="text" id="loa2"></div></div></div>';
    $('#loa1').textContent=x.v1.join('\n');
    $('#loa2').textContent=x.v2.join('\n');
  }else{
    el.innerHTML=`<div class="eyebrow">${x.e}</div><h2>${x.t}</h2><div class="${x.k==='t'?'text':'lines'}"></div>`;
    const b=el.lastElementChild;
    if(x.k==='t')b.textContent=x.l.join('\n');
    else x.l.forEach(z=>{const d=document.createElement('div');d.className='line';if(z==='')d.innerHTML='&nbsp;';else d.textContent=z;b.appendChild(d)});
  }
  $('#prog').textContent=`${bi+1} / ${items.length}`;
  $('#bp').disabled=bi===0;
  $('#bn').disabled=bi===items.length-1;
}

function rr(el,a){
  [...el.querySelectorAll('.rrow')].forEach(n=>n.remove());
  const m=['L','A','G','R','A','N','A','D','A','D','E','L','DOS','SIETE'];
  a.forEach((z,i)=>{const d=document.createElement('div');d.className='rrow';d.innerHTML=`<div class="rmark">${m[i]}</div><div class="rtext"></div>`;d.lastChild.textContent=z;el.appendChild(d)});
}
function radial(){rr($('#rl'),buried());rr($('#rr'),opened())}

function diagonal(){
  const render=(el,title,verses)=>{
    el.innerHTML='';
    const h=document.createElement('div');h.className='btitle';h.textContent=title;el.appendChild(h);
    const poem=document.createElement('div');poem.className='radial-clean-poem';
    verses.forEach((z,i)=>{const d=document.createElement('div');d.className='radial-clean-line'+(i===13?' diag-center':'');d.textContent=z;poem.appendChild(d)});
    el.appendChild(poem);
  };
  render($('#dl'),'I · DIAGONAL CENTRAL ↘',diagDown());
  render($('#dr'),'II · DIAGONAL CENTRAL ↗',diagUp());
}

function mode(id){
  $$('.view').forEach(v=>v.classList.add('hidden'));
  $('#'+id).classList.remove('hidden');
  $$('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===id));
  if(id==='bookview')book();
  if(id==='verticalreader')vert();
  if(id==='horizontal')horiz();
  if(id==='diagonal')diagonal();
  if(id==='radial')radial();
  history.replaceState(null,'','#'+id);
}

$$('.mode').forEach(b=>b.onclick=()=>mode(b.dataset.mode));
$('#bp').onclick=()=>{bi=Math.max(0,bi-1);book()};
$('#bn').onclick=()=>{bi=Math.min(items.length-1,bi+1);book()};
$('#full').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();

build();book();
