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

const MASTER='https://gcdn.picsart.com/editing-temp/8d08dd1a-0908-49b3-8d6d-1c6ac3716eb7.mpeg';
const START=[0,68.836,174.200,249.202,305.340,469.228,574.710,723.848,849.826,984.106,1080.818,1237.410,1393.700,1489.870,1694.158,1818.910];
const BLACKOUT_MS=2600;
const FIN_MS=3300;

const stage=document.getElementById('stage');
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

let mode='opening',scene=0,timer=0,monitor=0,segmentEnd=0,audioKind='none',muted=false;

const pad=n=>String(n).padStart(2,'0');
const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60);const q=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(q).padStart(2,'0');};

function atlasPosition(n){
  const i=n-1,col=i%5,row=Math.floor(i/5);
  const xs=[0,25,50,75,100],ys=[0,20,40,60,80,100];
  poster.style.backgroundPosition=xs[col]+'% '+ys[row]+'%';
  poster.setAttribute('aria-label','Escena '+pad(n)+' · '+SCENES[i][0]+' · contacto canónico de 40 fotogramas');
}

function clearTimers(){
  if(timer){clearTimeout(timer);timer=0;}
  if(monitor){clearInterval(monitor);monitor=0;}
}
function stopAudio(){
  if(monitor){clearInterval(monitor);monitor=0;}
  audio.pause();segmentEnd=0;audioKind='none';
}
function hideAll(){
  inter.hidden=true;sceneCard.hidden=true;credits.hidden=true;
  inter.classList.remove('is-visible');sceneCard.classList.remove('is-visible');credits.classList.remove('is-visible');
}
function showInter(k,t,s,n){
  hideAll();inter.hidden=false;
  kicker.textContent=k;title.textContent=t;sub.textContent=s||'';note.textContent=n||'';
  requestAnimationFrame(()=>inter.classList.add('is-visible'));
}
function setControls(){
  prev.disabled=mode==='opening'||mode==='announcement'||scene<=1;
  next.disabled=mode==='opening'||mode==='announcement';
  sound.setAttribute('aria-pressed',String(!muted));
  sound.textContent=muted?'SONIDO · OFF':'SONIDO · ON';
  if(mode==='opening'){play.disabled=false;play.textContent='COMENZAR';}
  else if(mode==='scene'&&audioKind!=='pending'){play.disabled=false;play.textContent=audio.paused?'REANUDAR':'PAUSA';}
  else if(mode==='credits'){play.disabled=false;play.textContent='REINICIAR';}
  else{play.disabled=true;play.textContent=audioKind==='pending'?'MÚSICA PENDIENTE':'—';}
}
function announce(n,first){
  clearTimers();stopAudio();mode='announcement';scene=n;
  const d=SCENES[n-1];
  showInter(first?'PRIMERA ESCENA':'PRÓXIMA ESCENA',pad(n)+' · '+d[0],d[1],'Oscuro / transición');
  sceneStatus.textContent=(first?'PRIMERA ESCENA · ':'PRÓXIMA · ')+pad(n);
  audioStatus.textContent=n<=15?'música incorporada':'música pendiente';
  clock.textContent='--:--';setControls();
  timer=setTimeout(()=>showScene(n),BLACKOUT_MS);
}
async function futureExists(n){
  const url='audio/corporal/'+pad(n)+'.mp3';
  try{const r=await fetch(url,{method:'HEAD',cache:'no-store'});return r.ok?url:null;}catch(_){return null;}
}
async function prepareAudio(n){
  stopAudio();
  audio.muted=muted;
  if(n<=15){
    audioKind='segment';segmentEnd=START[n];
    audio.src=MASTER;
    const launch=()=>{
      try{audio.currentTime=START[n-1];}catch(_){}
      audio.play().catch(()=>{audioStatus.textContent='pulsa REANUDAR para iniciar la música';setControls();});
      monitor=setInterval(()=>{
        const elapsed=Math.max(0,audio.currentTime-START[n-1]);
        const dur=START[n]-START[n-1];
        clock.textContent=fmt(elapsed)+' / '+fmt(dur);
        if(!audio.paused&&audio.currentTime>=segmentEnd-.04){
          audio.pause();clearInterval(monitor);monitor=0;
          timer=setTimeout(()=>advance(),180);
        }
        setControls();
      },100);
    };
    if(audio.readyState<1)audio.addEventListener('loadedmetadata',launch,{once:true});else launch();
    audioStatus.textContent='MÚSICA '+pad(n)+' · INCORPORADA';
    return;
  }
  const future=await futureExists(n);
  if(mode!=='scene'||scene!==n)return;
  if(future){
    audioKind='file';audio.src=future;audio.currentTime=0;
    audioStatus.textContent='MÚSICA '+pad(n)+' · INCORPORADA';
    audio.play().catch(()=>{audioStatus.textContent='pulsa REANUDAR para iniciar la música';});
    monitor=setInterval(()=>{
      clock.textContent=fmt(audio.currentTime)+' / '+fmt(audio.duration);
      if(audio.ended){clearInterval(monitor);monitor=0;timer=setTimeout(()=>advance(),180);}
      setControls();
    },120);
  }else{
    audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · PENDIENTE · AVANCE MANUAL';clock.textContent='--:--';
  }
  setControls();
}
function showScene(n){
  clearTimers();mode='scene';scene=n;hideAll();sceneCard.hidden=false;atlasPosition(n);
  requestAnimationFrame(()=>sceneCard.classList.add('is-visible'));
  sceneStatus.textContent='ESCENA '+pad(n)+' / 30 · '+SCENES[n-1][0];
  audioStatus.textContent=n<=15?'MÚSICA '+pad(n)+' · CARGANDO':'COMPROBANDO MÚSICA '+pad(n);
  clock.textContent='--:--';setControls();prepareAudio(n);
}
function advance(){
  if(mode!=='scene')return;
  stopAudio();
  if(scene<30)announce(scene+1,false);
  else showFin();
}
function showFin(){
  clearTimers();stopAudio();mode='fin';
  showInter('FIN','LA TERRAZA DEL MIRAMAR','Oscuro final.','La linde termina. La mirada continúa.');
  sceneStatus.textContent='FIN';audioStatus.textContent='';clock.textContent='--:--';setControls();
  timer=setTimeout(showCredits,FIN_MS);
}
function showCredits(){
  clearTimers();stopAudio();mode='credits';hideAll();credits.hidden=false;
  requestAnimationFrame(()=>credits.classList.add('is-visible'));
  sceneStatus.textContent='CRÉDITOS';audioStatus.textContent='Flag';clock.textContent='';setControls();
}
function start(){
  if(mode==='credits'){reset();return;}
  announce(1,true);
}
function reset(){
  clearTimers();stopAudio();mode='opening';scene=0;
  showInter('COMIENZA LA OBRA','LA TERRAZA DEL MIRAMAR','Versión corporal · teatro gestual y de objetos','30 escenas · 40 fotogramas por escena · música 01–15 incorporada');
  sceneStatus.textContent='OBRA';audioStatus.textContent='15/30 músicas incorporadas';clock.textContent='--:--';setControls();
}
function togglePlay(){
  if(mode==='opening'||mode==='credits'){start();return;}
  if(mode!=='scene'||audioKind==='pending')return;
  if(audio.paused)audio.play().catch(()=>{});else audio.pause();
  setControls();
}
function goPrev(){
  if(mode!=='scene'||scene<=1)return;
  clearTimers();stopAudio();showScene(scene-1);
}
function toggleSound(){
  muted=!muted;audio.muted=muted;setControls();
}
play.addEventListener('click',togglePlay);
next.addEventListener('click',()=>{if(mode==='scene')advance();else if(mode==='credits')reset();});
prev.addEventListener('click',goPrev);
sound.addEventListener('click',toggleSound);
audio.addEventListener('play',setControls);audio.addEventListener('pause',setControls);
document.addEventListener('keydown',ev=>{
  if(ev.key==='ArrowRight'&&mode==='scene'){ev.preventDefault();advance();}
  if(ev.key==='ArrowLeft'&&mode==='scene'){ev.preventDefault();goPrev();}
  if(ev.code==='Space'){ev.preventDefault();togglePlay();}
});
reset();
})();