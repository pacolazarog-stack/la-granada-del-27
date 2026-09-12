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

let items=[],bi=0,pi=0,row=13,hp=0;
const pv=i=>GRANADA_ROWS.map(r=>r.verses[i]);
const diagDown=()=>GRANADA_ROWS.map((r,i)=>r.verses[i]);
const diagUp=()=>GRANADA_ROWS.map((r,i)=>r.verses[26-i]);

function build(){
  const add=(k,e,t,l)=>items.push({k,e,t,l});
  items.push({k:'s',t:'LA GRANADA DEL 27 · UN SIGLO DESPUÉS',sub:''});
  add('t','PRÓLOGO','ANTES DE CONTAR',PRO.split('\n'));
  items.push({k:'s',t:'LIBRO I · LA GRANADA DEL 27',sub:'27 poemas verticales'});
  GRANADA_TITLES.forEach((t,i)=>add('p',`${String(i+1).padStart(2,'0')} · VERTICAL`,t,pv(i)));
  items.push({k:'s',t:'LIBRO II · BAJO LA CAL',sub:'27 poemas horizontales'});
  GRANADA_ROWS.forEach((r,i)=>add('p',`H${String(i+1).padStart(2,'0')} · HORIZONTAL`,GRANADA_H_TITLES[i],r.verses));
  items.push({k:'s',t:'LIBRO III · LA GRANADA DEL 27',sub:'El centro secreto'});
  add('p','I · DIAGONAL CENTRAL ↘','DIAGONAL ↘',diagDown());
  add('p','II · DIAGONAL CENTRAL ↗','DIAGONAL ↗',diagUp());
  const v=GRANADA_ROWS[13].verses;
  add('p','III · RADIAL','HACIA LO ENTERRADO',[v[13],...v.slice(0,13).reverse()]);
  add('p','IV · RADIAL','HACIA LO ABIERTO',[v[13],...v.slice(14)]);
  items.push({k:'r',t:'LA GRANADA DEL DOS SIETE',sub:'LA GRANADA DEL 27',body:'Cuatro lecturas articuladas por el mismo verso central'});
  add('t','EPÍLOGO','GRANADA QUEDA',EPI.split('\n'));
  items.push({k:'s',t:'OTRA MANERA DE LEER',sub:'',body:'Los poemas admiten lectura vertical, horizontal, diagonal y radial. Las dos diagonales centrales se cruzan en «Late bajo la cal la acequia hundida.». Dos loas recorren la matriz: una nace de letras destacadas en los poemas horizontales y otra de palabras destacadas en los verticales. Ambas convergen en VEINTISIETE.'});
  items.push({k:'c',t:'LAS DOS LOAS',sub:'',v1:LOA_I,v2:LOA_II});
}

function book(){
  let x=items[bi],el=$('#page');
  el.innerHTML='';el.scrollTop=0;
  if(x.k==='s'||x.k==='r'){
    el.innerHTML=`<div class="section"><div><h2 class="${x.k==='r'?'reveal':''}">${x.t}</h2><p>${x.sub||''}</p><p>${x.body||''}</p></div></div>`;
  }else if(x.k==='c'){
    el.innerHTML='<div class="eyebrow">CODA · CORO DOBLE</div><h2>LAS DOS LOAS</h2><div class="eyebrow">VOZ I · LOA HORIZONTAL</div><div class="text" id="loa1"></div><div style="height:18px"></div><div class="eyebrow">VOZ II · LOA VERTICAL</div><div class="text" id="loa2"></div>';
    $('#loa1').textContent=x.v1.join('\n');
    $('#loa2').textContent=x.v2.join('\n');
  }else{
    el.innerHTML=`<div class="eyebrow">${x.e}</div><h2>${x.t}</h2><div class="${x.k==='t'?'text':'lines'}"></div>`;
    let b=el.lastElementChild;
    if(x.k==='t')b.textContent=x.l.join('\n');
    else x.l.forEach(z=>{let d=document.createElement('div');d.className='line';d.textContent=z;b.appendChild(d)});
  }
  $('#prog').textContent=`${bi+1} / ${items.length}`;
  $('#bp').disabled=bi===0;
  $('#bn').disabled=bi===items.length-1;
}

function rr(el,a){
  [...el.querySelectorAll('.rrow')].forEach(n=>n.remove());
  let m=['L','A','G','R','A','N','A','D','A','D','E','L','DOS','SIETE'];
  a.forEach((z,i)=>{let d=document.createElement('div');d.className='rrow';d.innerHTML=`<div class="rmark">${m[i]}</div><div class="rtext"></div>`;d.lastChild.textContent=z;el.appendChild(d)});
}
function radial(){let v=GRANADA_ROWS[13].verses;rr($('#rl'),[v[13],...v.slice(0,13).reverse()]);rr($('#rr'),[v[13],...v.slice(14)])}

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
