(()=>{
'use strict';

const SCENES=[
['MIRAMAR COMUNIDAD','Un mar. Un límite. Una comunidad.'],
['OK','Escuchar. Comprobar. Seguir.'],
['EL CUERPO','Medir. Nombrar. Habitar.'],
['CLAC','Un gesto ordena el mundo.'],
['NADIE','Tres sillas. Una ausencia. Mil preguntas.'],
['NACE EL CONFLICTO','Una tela. Un límite. Dos mundos.'],
['PRIMERA INCURSIÓN TERRESTRE','Agacharse. Descubrir. Un mundo en miniatura.'],
['TERRITORIO','Trazar. Delimitar. Habitar.'],
['MAYORÍA SIMPLE','Contar. Decidir. Ordenar.'],
['VOTEN','Participar es existir.'],
['MAYORÍA SIMPLE','Contar, sumar, decidir.'],
['NOSOTROS','Más yo, más tú, más todos.'],
['DERECHO','El papel ordena el cuerpo.'],
['TOGA · BANDERA · REINA','Un mismo paño, muchos nombres.'],
['MÍRENME','La imagen también gobierna.'],
['ESTADO','Sostener lo común.'],
['VIENTO','Lo que se suelta.'],
['EL SOL','Volver al límite.'],
['CONFORME A DERECHO','Leer. Contrastar. Acordar.'],
['QUE CONSTE','Marcar. Certificar. Hacerlo público.'],
['EL REINO CABE EN UNA CARPETA','Condensar. Sellar. Seguir.'],
['MIRAMAR','Volver al mar.'],
['INNOVAR','Construir. Desarmar. Volver a empezar.'],
['¿QUIÉN GOBIERNA?','Una corona, muchas preguntas.'],
['RUMOR','Lo que se dice también nos construye.'],
['CENTRO DE DATOS','Memoria en construcción.'],
['MIRA QUIÉN MIRA QUIÉN','El reflejo también observa.'],
['CÓMO SEGUIMOS','Después de la caída, ¿qué queda?'],
['DESARMAR A LA REINA','Juntas, lo simbólico también cae.'],
['DIEZ MINUTOS','Volver al mar. Estar.']
];

const DUR=[80,45,80,60,60,90,75,90,75,75,60,75,75,90,75,90,90,75,90,75,75,90,90,75,75,90,90,90,150,210];
const START=[]; let sum=0; for(const d of DUR){START.push(sum);sum+=d;}
const TOTAL=sum; // 2560 = 42:40
const TITLE_MS=900;
const FIN_MS=3300;
const IMAGE_BUILD='20260918-corporal-audio-final-1';

const inter=document.getElementById('intertitle');
const sceneCard=document.getElementById('sceneCard');
const credits=document.getElementById('creditsCard');
const poster=document.getElementById('scenePoster');
const kicker=document.getElementById('interKicker');
const title=document.getElementById('interTitle');
const sub=document.getElementById('interSub');
const note=document.getElementById('interNote');
const prev=document.getElementById('prevBtn');
const play=document.getElementById('playBtn');
const next=document.getElementById('nextBtn');
const sound=document.getElementById('soundBtn');
const sceneStatus=document.getElementById('sceneStatus');
const audioStatus=document.getElementById('audioStatus');
const clock=document.getElementById('clock');
const audio=document.getElementById('corporalAudio');

let mode='opening',scene=0,titleTimer=0,finTimer=0,monitor=0,muted=false,advancing=false;
const pad=n=>String(n).padStart(2,'0');
const trackUrl=n=>'audio/corporal/'+pad(n)+'.mp3?v=20260918-score-final-1';
const imageUrl=n=>'assets/miramar-corporal/scenes/scene-'+pad(n)+'.webp?v='+IMAGE_BUILD;
const fmt=s=>{s=Math.max(0,Math.round(Number(s)||0));const m=Math.floor(s/60),q=s%60;return String(m).padStart(2,'0')+':'+String(q).padStart(2,'0');};

function clearTimers(){
  if(titleTimer){clearTimeout(titleTimer);titleTimer=0;}
  if(finTimer){clearTimeout(finTimer);finTimer=0;}
  if(monitor){clearInterval(monitor);monitor=0;}
}
function stopAudio(){
  if(monitor){clearInterval(monitor);monitor=0;}
  audio.onended=null;audio.onerror=null;
  audio.pause();audio.removeAttribute('src');audio.load();
}
function hideAll(){
  [inter,sceneCard,credits].forEach(el=>{el.hidden=true;el.classList.remove('is-visible');});
}
function showInter(k,t,s,n){
  hideAll();inter.hidden=false;kicker.textContent=k;title.textContent=t;sub.textContent=s||'';note.textContent=n||'';
  requestAnimationFrame(()=>inter.classList.add('is-visible'));
}
function showPoster(n){
  if(mode!=='scene'||scene!==n)return;
  hideAll();sceneCard.hidden=false;
  poster.style.backgroundImage='url("'+imageUrl(n)+'")';
  poster.style.backgroundSize='cover';
  poster.style.backgroundPosition='center';
  poster.style.backgroundRepeat='no-repeat';
  poster.dataset.surface='horizontal';
  poster.setAttribute('aria-label','Escena '+pad(n)+' · '+SCENES[n-1][0]+' · contacto canónico de 40 fotogramas');
  requestAnimationFrame(()=>sceneCard.classList.add('is-visible'));
}
function setControls(){
  prev.disabled=mode!=='scene'||scene<=1;
  next.disabled=mode!=='scene';
  sound.setAttribute('aria-pressed',String(!muted));
  sound.textContent=muted?'SONIDO · OFF':'SONIDO · ON';
  if(mode==='opening'){play.disabled=false;play.textContent='COMENZAR';}
  else if(mode==='scene'){play.disabled=false;play.textContent=audio.paused?'REANUDAR':'PAUSA';}
  else if(mode==='credits'){play.disabled=false;play.textContent='REINICIAR';}
  else{play.disabled=true;play.textContent='—';}
}
function updateClock(n){
  const local=Math.min(DUR[n-1],Number(audio.currentTime)||0);
  const absolute=START[n-1]+local;
  clock.textContent=fmt(local)+' / '+fmt(DUR[n-1])+' · '+fmt(absolute)+' / '+fmt(TOTAL);
}
function beginMonitor(n){
  if(monitor)clearInterval(monitor);
  monitor=setInterval(()=>{
    if(mode!=='scene'||scene!==n)return;
    updateClock(n);
    if(!audio.paused && (Number(audio.currentTime)||0)>=DUR[n-1]-0.025) advance();
  },80);
}
function startTrack(n){
  audio.muted=muted;
  audio.src=trackUrl(n);
  audio.currentTime=0;
  audioStatus.textContent='PARTITURA SONORA · ESCENA '+pad(n)+' · 42:40';
  audio.onended=()=>{if(mode==='scene'&&scene===n)advance();};
  audio.onerror=()=>{
    if(mode!=='scene'||scene!==n)return;
    audioStatus.textContent='ERROR DE CARGA · '+pad(n)+'.mp3';
    setControls();
  };
  audio.play().then(()=>{beginMonitor(n);setControls();}).catch(()=>{
    audioStatus.textContent='PARTITURA '+pad(n)+' · pulsa REANUDAR';
    beginMonitor(n);setControls();
  });
}
function showScene(n,manual=false){
  clearTimers();stopAudio();advancing=false;
  mode='scene';scene=Math.max(1,Math.min(30,n));
  const d=SCENES[scene-1],a=START[scene-1],b=a+DUR[scene-1];
  showInter(scene===1&&!manual?'PRIMERA ESCENA':'ESCENA',pad(scene)+' · '+d[0],d[1],'Tiempo exacto '+fmt(a)+' → '+fmt(b));
  sceneStatus.textContent='ESCENA '+pad(scene)+' / 30 · '+d[0];
  clock.textContent='00:00 / '+fmt(DUR[scene-1])+' · '+fmt(a)+' / '+fmt(TOTAL);
  setControls();
  startTrack(scene);
  titleTimer=setTimeout(()=>showPoster(scene),TITLE_MS);
}
function advance(){
  if(mode!=='scene'||advancing)return;
  advancing=true;
  const current=scene;
  clearTimers();stopAudio();
  if(current<30)showScene(current+1,false);else showFin();
}
function showFin(){
  clearTimers();stopAudio();mode='fin';scene=30;
  showInter('FIN','LA TERRAZA DEL MIRAMAR','Versión corporal · teatro gestual y de objetos','42:40 · partitura sonora completa');
  sceneStatus.textContent='FIN';audioStatus.textContent='PARTITURA COMPLETA · 42:40';clock.textContent='42:40 / 42:40';setControls();
  finTimer=setTimeout(showCredits,FIN_MS);
}
function showCredits(){
  clearTimers();stopAudio();mode='credits';hideAll();credits.hidden=false;
  requestAnimationFrame(()=>credits.classList.add('is-visible'));
  sceneStatus.textContent='CRÉDITOS';audioStatus.textContent='Flag';clock.textContent='42:40';setControls();
}
function reset(){
  clearTimers();stopAudio();mode='opening';scene=0;advancing=false;
  showInter('COMIENZA LA OBRA','LA TERRAZA DEL MIRAMAR','Versión corporal · teatro gestual y de objetos','30 escenas · partitura sonora exacta 42:40');
  sceneStatus.textContent='OBRA';audioStatus.textContent='30 pistas · onomatopeyas · percusión · respiración · palabra mínima';clock.textContent='00:00 / 42:40';setControls();
}
function togglePlay(){
  if(mode==='opening'||mode==='credits'){showScene(1,false);return;}
  if(mode!=='scene')return;
  if(audio.paused)audio.play().catch(()=>{});else audio.pause();
  setControls();
}
function goPrev(){if(mode==='scene'&&scene>1)showScene(scene-1,true);}
function goNext(){if(mode==='scene')advance();}
function toggleSound(){muted=!muted;audio.muted=muted;setControls();}

play.addEventListener('click',togglePlay);
next.addEventListener('click',goNext);
prev.addEventListener('click',goPrev);
sound.addEventListener('click',toggleSound);
audio.addEventListener('play',setControls);
audio.addEventListener('pause',setControls);
document.addEventListener('keydown',ev=>{
  if(ev.key==='ArrowRight'&&mode==='scene'){ev.preventDefault();goNext();}
  if(ev.key==='ArrowLeft'&&mode==='scene'){ev.preventDefault();goPrev();}
  if(ev.code==='Space'){ev.preventDefault();togglePlay();}
});
reset();
})();