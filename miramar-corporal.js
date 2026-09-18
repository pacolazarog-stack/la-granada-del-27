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

const KNOWN_DURATION={
1:154.440,2:172.584,3:169.920,4:105.624,5:193.584,6:169.944,7:142.440,8:68.832,
9:132.024,10:172.032,11:133.224,12:92.040,13:128.400,14:138.744,15:212.424
};
const BLACKOUT_MS=2600;
const FIN_MS=3300;

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

let mode='opening',scene=0,timer=0,monitor=0,audioKind='none',muted=false;

const pad=n=>String(n).padStart(2,'0');
const trackUrl=n=>'audio/corporal/'+pad(n)+'.mp3';
const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60);const q=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(q).padStart(2,'0');};

function atlasPosition(n){
  const i=n-1,col=i%5,row=Math.floor(i/5);
  const xs=[0,25,50,75,100],ys=[0,20,40,60,80,100];
  poster.style.backgroundPosition=xs[col]+'% '+ys[row]+'%';
  poster.setAttribute('aria-label','Escena '+pad(n)+' · '+SCENES[i][0]+' · contacto canónico de 40 fotogramas');
}
function clearTimers(){if(timer){clearTimeout(timer);timer=0;}if(monitor){clearInterval(monitor);monitor=0;}}
function stopAudio(){if(monitor){clearInterval(monitor);monitor=0;}audio.onended=null;audio.onerror=null;audio.pause();audio.removeAttribute('src');audio.load();audioKind='none';}
function hideAll(){inter.hidden=true;sceneCard.hidden=true;credits.hidden=true;inter.classList.remove('is-visible');sceneCard.classList.remove('is-visible');credits.classList.remove('is-visible');}
function showInter(k,t,s,n){hideAll();inter.hidden=false;kicker.textContent=k;title.textContent=t;sub.textContent=s||'';note.textContent=n||'';requestAnimationFrame(()=>inter.classList.add('is-visible'));}
function setControls(){
  prev.disabled=mode==='opening'||mode==='announcement'||scene<=1;
  next.disabled=mode==='opening'||mode==='announcement';
  sound.setAttribute('aria-pressed',String(!muted));
  sound.textContent=muted?'SONIDO · OFF':'SONIDO · ON';
  if(mode==='opening'){play.disabled=false;play.textContent='COMENZAR';}
  else if(mode==='scene'&&audioKind==='file'){play.disabled=false;play.textContent=audio.paused?'REANUDAR':'PAUSA';}
  else if(mode==='credits'){play.disabled=false;play.textContent='REINICIAR';}
  else{play.disabled=true;play.textContent=audioKind==='pending'?'MÚSICA PENDIENTE':'—';}
}
function announce(n,first){
  clearTimers();stopAudio();mode='announcement';scene=n;
  const d=SCENES[n-1];
  showInter(first?'PRIMERA ESCENA':'PRÓXIMA ESCENA',pad(n)+' · '+d[0],d[1],'Oscuro / transición');
  sceneStatus.textContent=(first?'PRIMERA ESCENA · ':'PRÓXIMA · ')+pad(n);
  audioStatus.textContent=n<=15?'música corporal':'música pendiente';
  clock.textContent='--:--';setControls();
  timer=setTimeout(()=>showScene(n),BLACKOUT_MS);
}
async function trackExists(n){
  try{const r=await fetch(trackUrl(n),{method:'HEAD',cache:'no-store'});return r.ok;}catch(_){return false;}
}
async function prepareAudio(n){
  stopAudio();audio.muted=muted;
  const exists=await trackExists(n);
  if(mode!=='scene'||scene!==n)return;
  if(!exists){
    audioKind='pending';
    const d=KNOWN_DURATION[n];
    audioStatus.textContent='MÚSICA '+pad(n)+' · PENDIENTE · AVANCE MANUAL';
    clock.textContent=d?'--:-- / '+fmt(d):'--:--';
    setControls();return;
  }

  audioKind='file';
  audio.src=trackUrl(n);
  audio.currentTime=0;
  audioStatus.textContent='MÚSICA CORPORAL '+pad(n)+' · INCORPORADA';
  audio.onended=()=>{if(mode==='scene'&&scene===n)timer=setTimeout(()=>advance(),180);};
  audio.onerror=()=>{audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · ERROR DE CARGA';setControls();};
  audio.play().catch(()=>{audioStatus.textContent='MÚSICA CORPORAL '+pad(n)+' · pulsa REANUDAR';setControls();});
  monitor=setInterval(()=>{
    const total=Number.isFinite(audio.duration)?audio.duration:KNOWN_DURATION[n];
    clock.textContent=fmt(audio.currentTime)+' / '+fmt(total);
    setControls();
  },120);
  setControls();
}
function showScene(n){
  clearTimers();mode='scene';scene=n;hideAll();sceneCard.hidden=false;atlasPosition(n);
  requestAnimationFrame(()=>sceneCard.classList.add('is-visible'));
  sceneStatus.textContent='ESCENA '+pad(n)+' / 30 · '+SCENES[n-1][0];
  audioStatus.textContent='COMPROBANDO MÚSICA CORPORAL '+pad(n);
  clock.textContent='--:--';setControls();prepareAudio(n);
}
function advance(){if(mode!=='scene')return;stopAudio();if(scene<30)announce(scene+1,false);else showFin();}
function showFin(){
  clearTimers();stopAudio();mode='fin';
  showInter('FIN','LA TERRAZA DEL MIRAMAR','Oscuro final.','La linde termina. La mirada continúa.');
  sceneStatus.textContent='FIN';audioStatus.textContent='';clock.textContent='--:--';setControls();
  timer=setTimeout(showCredits,FIN_MS);
}
function showCredits(){clearTimers();stopAudio();mode='credits';hideAll();credits.hidden=false;requestAnimationFrame(()=>credits.classList.add('is-visible'));sceneStatus.textContent='CRÉDITOS';audioStatus.textContent='Flag';clock.textContent='';setControls();}
function start(){if(mode==='credits'){reset();return;}announce(1,true);}
function reset(){
  clearTimers();stopAudio();mode='opening';scene=0;
  showInter('COMIENZA LA OBRA','LA TERRAZA DEL MIRAMAR','Versión corporal · teatro gestual y de objetos','30 escenas · 40 fotogramas por escena · músicas corporales 01–15');
  sceneStatus.textContent='OBRA';audioStatus.textContent='15 músicas corporales · 16–30 preparadas';clock.textContent='--:--';setControls();
}
function togglePlay(){if(mode==='opening'||mode==='credits'){start();return;}if(mode!=='scene'||audioKind!=='file')return;if(audio.paused)audio.play().catch(()=>{});else audio.pause();setControls();}
function goPrev(){if(mode!=='scene'||scene<=1)return;clearTimers();stopAudio();showScene(scene-1);}
function toggleSound(){muted=!muted;audio.muted=muted;setControls();}
play.addEventListener('click',togglePlay);
next.addEventListener('click',()=>{if(mode==='scene')advance();else if(mode==='credits')reset();});
prev.addEventListener('click',goPrev);
sound.addEventListener('click',toggleSound);
audio.addEventListener('play',setControls);audio.addEventListener('pause',setControls);
document.addEventListener('keydown',ev=>{if(ev.key==='ArrowRight'&&mode==='scene'){ev.preventDefault();advance();}if(ev.key==='ArrowLeft'&&mode==='scene'){ev.preventDefault();goPrev();}if(ev.code==='Space'){ev.preventDefault();togglePlay();}});
reset();
})();