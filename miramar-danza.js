(()=>{
'use strict';
const SCENES=[
'MIRAMAR COMUNIDAD','OK','EL CUERPO','CLAC','NADIE','NACE EL CONFLICTO',
'PRIMERA INCURSIÓN TERRESTRE','TERRITORIO','MAYORÍA SIMPLE','VOTEN',
'MAYORÍA SIMPLE','NOSOTROS','DERECHO','TOGA · BANDERA · REINA','MÍRENME',
'ESTADO','VIENTO','EL SOL','CONFORME A DERECHO','QUE CONSTE',
'EL REINO CABE EN UNA CARPETA','MIRAMAR','INNOVAR','¿QUIÉN GOBIERNA?',
'RUMOR','CENTRO DE DATOS','MIRA QUIÉN MIRA QUIÉN','CÓMO SEGUIMOS',
'DESARMAR A LA REINA','DIEZ MINUTOS'
];
const KNOWN_DURATION={1:154.44,2:172.584,3:169.92,4:105.624,5:193.584,6:169.944,7:142.44,8:68.832,9:132.024,10:172.032,11:133.224,12:92.04,13:128.4,14:138.744,15:212.424};
const PHASES=[[1,9,'I · DOMÉSTICA'],[10,18,'II · COMUNIDAD'],[19,28,'III · REINA'],[29,30,'IV · DESARME']];

const PLANTS=[
[[.18,.82],[.38,.62],[.50,.28],[.50,.50],[.50,.22]],
[[.50,.55],[.55,.50],[.60,.58],[.48,.64],[.43,.54]],
[[.48,.55],[.52,.60],[.48,.70],[.57,.76],[.63,.60]],
[[.82,.22],[.66,.38],[.50,.52],[.33,.66],[.18,.82]],
[[.55,.72],[.52,.64],[.50,.55],[.45,.62],[.42,.74]],
[[.50,.60],[.32,.42],[.67,.66],[.28,.72],[.72,.32]],
[[.38,.60],[.44,.60],[.48,.60],[.53,.60],[.62,.60]],
[[.18,.22],[.80,.22],[.80,.78],[.18,.78],[.50,.50]],
[[.50,.55],[.58,.48],[.42,.44],[.60,.66],[.36,.68]],
[[.50,.68],[.50,.57],[.48,.47],[.53,.36],[.50,.24]],
[[.50,.48],[.48,.58],[.42,.62],[.55,.60],[.50,.42]],
[[.50,.62],[.50,.54],[.50,.46],[.50,.38],[.50,.30]],
[[.50,.78],[.50,.62],[.35,.50],[.65,.38],[.50,.22]],
[[.50,.70],[.50,.58],[.50,.48],[.50,.36],[.50,.24]],
[[.20,.78],[.38,.62],[.52,.46],[.68,.32],[.82,.20]],
[[.30,.70],[.45,.58],[.55,.45],[.68,.34],[.78,.24]],
[[.50,.56],[.68,.48],[.72,.30],[.48,.24],[.30,.42]],
[[.50,.30],[.50,.42],[.50,.54],[.50,.66],[.50,.76]],
[[.50,.62],[.50,.52],[.50,.42],[.50,.34],[.50,.26]],
[[.22,.72],[.36,.60],[.52,.52],[.68,.44],[.50,.28]],
[[.50,.25],[.50,.38],[.50,.50],[.50,.62],[.50,.72]],
[[.18,.52],[.35,.45],[.50,.55],[.68,.43],[.84,.52]],
[[.22,.70],[.40,.38],[.66,.62],[.78,.30],[.54,.22]],
[[.50,.58],[.35,.48],[.64,.40],[.42,.30],[.58,.22]],
[[.52,.58],[.46,.52],[.58,.46],[.48,.36],[.50,.25]],
[[.30,.70],[.44,.60],[.58,.50],[.68,.38],[.74,.24]],
[[.50,.50],[.50,.42],[.50,.34],[.50,.28],[.50,.22]],
[[.20,.70],[.34,.56],[.50,.45],[.66,.55],[.50,.26]],
[[.50,.68],[.50,.58],[.46,.48],[.58,.42],[.50,.30]],
[[.50,.70],[.50,.58],[.50,.46],[.50,.34],[.50,.22]]
];

const COMMUNITY={
11:[[.28,.34],[.42,.24],[.58,.24],[.72,.34],[.72,.66],[.58,.76],[.42,.76],[.28,.66]],
12:[[.12,.50],[.23,.50],[.34,.50],[.45,.50],[.56,.50],[.67,.50],[.78,.50],[.89,.50]],
13:[[.30,.24],[.30,.40],[.30,.56],[.30,.72],[.70,.24],[.70,.40],[.70,.56],[.70,.72]],
14:[[.34,.62],[.42,.62],[.58,.62],[.66,.62],[.34,.42],[.42,.42],[.58,.42],[.66,.42]],
15:[[.15,.20],[.50,.20],[.85,.20],[.15,.50],[.85,.50],[.15,.80],[.50,.80],[.85,.80]],
16:[[.30,.30],[.50,.30],[.70,.30],[.30,.50],[.70,.50],[.30,.70],[.50,.70],[.70,.70]],
17:[[.50,.16],[.70,.24],[.82,.50],[.70,.76],[.50,.84],[.30,.76],[.18,.50],[.30,.24]],
18:[[.18,.70],[.30,.70],[.42,.70],[.58,.70],[.70,.70],[.82,.70],[.34,.82],[.66,.82]],
19:[[.28,.28],[.28,.44],[.28,.60],[.28,.76],[.72,.28],[.72,.44],[.72,.60],[.72,.76]],
20:[[.18,.28],[.34,.28],[.50,.28],[.66,.28],[.82,.28],[.26,.58],[.50,.64],[.74,.58]],
21:[[.35,.35],[.45,.30],[.55,.30],[.65,.35],[.35,.65],[.45,.70],[.55,.70],[.65,.65]],
22:[[.12,.52],[.23,.46],[.34,.55],[.45,.46],[.56,.55],[.67,.46],[.78,.55],[.89,.48]],
23:[[.16,.25],[.28,.72],[.42,.34],[.55,.75],[.68,.28],[.82,.63],[.75,.45],[.32,.48]],
24:[[.20,.25],[.35,.35],[.50,.25],[.65,.35],[.80,.25],[.30,.70],[.50,.72],[.70,.70]],
25:[[.20,.50],[.30,.44],[.40,.52],[.50,.44],[.60,.52],[.70,.44],[.80,.52],[.88,.46]],
26:[[.25,.25],[.50,.25],[.75,.25],[.25,.50],[.75,.50],[.25,.75],[.50,.75],[.75,.75]],
27:[[.50,.18],[.72,.28],[.82,.50],[.72,.72],[.50,.82],[.28,.72],[.18,.50],[.28,.28]],
28:[[.15,.25],[.30,.40],[.45,.22],[.60,.42],[.78,.30],[.25,.72],[.52,.70],[.75,.70]],
29:[[.20,.28],[.35,.40],[.65,.40],[.80,.28],[.20,.72],[.35,.60],[.65,.60],[.80,.72]]
};

const opening=document.getElementById('opening'), sceneCard=document.getElementById('sceneCard'), credits=document.getElementById('credits');
const sceneImage=document.getElementById('sceneImage'), plantWrap=document.getElementById('plantWrap');
const sceneNumber=document.getElementById('sceneNumber'), sceneTitle=document.getElementById('sceneTitle'), phaseLabel=document.getElementById('phaseLabel');
const prev=document.getElementById('prevBtn'), play=document.getElementById('playBtn'), next=document.getElementById('nextBtn'), sound=document.getElementById('soundBtn');
const sceneStatus=document.getElementById('sceneStatus'), audioStatus=document.getElementById('audioStatus'), clock=document.getElementById('clock'), audio=document.getElementById('danzaAudio');
let mode='opening',scene=0,audioKind='none',muted=false,monitor=0;

const pad=n=>String(n).padStart(2,'0');
const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60),q=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(q).padStart(2,'0')};
const phaseFor=n=>PHASES.find(x=>n>=x[0]&&n<=x[1])[2];
const danceTrack=n=>'audio/danza/'+pad(n)+'.mp3';
const currentTrack=n=>n<=15?'audio/corporal/'+pad(n)+'.mp3':danceTrack(n);

function showOnly(el){[opening,sceneCard,credits].forEach(x=>{x.hidden=true;x.classList.remove('is-visible')});el.hidden=false;requestAnimationFrame(()=>el.classList.add('is-visible'))}
function atlasPosition(n){const i=n-1,col=i%5,row=Math.floor(i/5),xs=[0,25,50,75,100],ys=[0,20,40,60,80,100];sceneImage.style.backgroundPosition=xs[col]+'% '+ys[row]+'%'}
function stopAudio(){if(monitor){clearInterval(monitor);monitor=0}audio.onended=null;audio.onerror=null;audio.pause();audio.removeAttribute('src');audio.load();audioKind='none'}
async function exists(url){try{const r=await fetch(url,{method:'HEAD',cache:'no-store'});return r.ok}catch(_){return false}}

function renderPlant(n){
 const pts=PLANTS[n-1], com=COMMUNITY[n]||[];
 const X=p=>40+p[0]*320, Y=p=>36+p[1]*410;
 let lines='';
 for(let i=0;i<pts.length-1;i++) lines+=`<line x1="${X(pts[i])}" y1="${Y(pts[i])}" x2="${X(pts[i+1])}" y2="${Y(pts[i+1])}" stroke="#555" stroke-width="3"/>`;
 let pdots=pts.map((p,i)=>`<g><circle cx="${X(p)}" cy="${Y(p)}" r="${i===0||i===pts.length-1?7:5}" fill="${i===0?'#111':i===pts.length-1?'#a62b25':'#666'}"/><text x="${X(p)+9}" y="${Y(p)-8}" font-size="11" fill="#333">P${i}</text></g>`).join('');
 let cdots=com.map((p,i)=>`<g><circle cx="${X(p)}" cy="${Y(p)}" r="5" fill="#929292"/><text x="${X(p)+7}" y="${Y(p)-7}" font-size="10" fill="#666">C${i+1}</text></g>`).join('');
 const boundary=n===7?'<line x1="200" y1="36" x2="200" y2="446" stroke="#a62b25" stroke-width="2"/>':'';
 plantWrap.innerHTML=`<svg viewBox="0 0 400 480" role="img" aria-label="Planta coreográfica escena ${pad(n)}">
 <rect x="40" y="36" width="320" height="410" fill="#f4f2ec" stroke="#777" stroke-width="2"/>
 <line x1="200" y1="36" x2="200" y2="446" stroke="#ddd" stroke-width="1"/><line x1="40" y1="241" x2="360" y2="241" stroke="#ddd" stroke-width="1"/>
 <text x="48" y="54" font-size="12" fill="#777">FONDO</text><text x="48" y="438" font-size="12" fill="#777">PÚBLICO</text>
 ${boundary}${lines}${cdots}${pdots}</svg>`;
}
function controls(){
 prev.disabled=mode!=='scene'||scene<=1;next.disabled=mode!=='scene';
 sound.textContent=muted?'SONIDO · OFF':'SONIDO · ON';sound.setAttribute('aria-pressed',String(!muted));
 if(mode==='opening'){play.disabled=false;play.textContent='COMENZAR'}
 else if(mode==='credits'){play.disabled=false;play.textContent='REINICIAR'}
 else if(mode==='scene'&&audioKind==='file'){play.disabled=false;play.textContent=audio.paused?'REANUDAR':'PAUSA'}
 else{play.disabled=true;play.textContent=audioKind==='pending'?'MÚSICA PENDIENTE':'—'}
}
async function prepareAudio(n){
 stopAudio();audio.muted=muted;
 let url=danceTrack(n);
 let ok=await exists(url);
 if(!ok && n<=15){url='audio/corporal/'+pad(n)+'.mp3';ok=await exists(url)}
 if(mode!=='scene'||scene!==n)return;
 if(!ok){audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · PENDIENTE · AVANCE MANUAL';clock.textContent='--:--';controls();return}
 audioKind='file';audio.src=url;audio.currentTime=0;audioStatus.textContent='MÚSICA '+pad(n)+' · INCORPORADA';
 audio.onended=()=>{if(mode==='scene'&&scene===n){if(n<30)showScene(n+1);else finish()}};
 audio.onerror=()=>{audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · ERROR DE CARGA';controls()};
 audio.play().catch(()=>{audioStatus.textContent='MÚSICA '+pad(n)+' · pulsa REANUDAR';controls()});
 monitor=setInterval(()=>{const total=Number.isFinite(audio.duration)?audio.duration:KNOWN_DURATION[n];clock.textContent=fmt(audio.currentTime)+' / '+fmt(total);controls()},150);
 controls();
}
function showScene(n){
 stopAudio();mode='scene';scene=Math.max(1,Math.min(30,n));showOnly(sceneCard);atlasPosition(scene);renderPlant(scene);
 sceneImage.setAttribute('aria-label','Imagen canónica de la escena '+pad(scene));
 sceneNumber.textContent=pad(scene)+' / 30';sceneTitle.textContent=SCENES[scene-1];phaseLabel.textContent=phaseFor(scene);
 sceneStatus.textContent='ESCENA '+pad(scene)+' / 30';audioStatus.textContent='COMPROBANDO MÚSICA '+pad(scene);clock.textContent='--:--';controls();prepareAudio(scene);
}
function finish(){stopAudio();mode='credits';scene=30;showOnly(credits);phaseLabel.textContent='IV · DESARME';sceneStatus.textContent='FIN';audioStatus.textContent='Flag';clock.textContent='';controls()}
function nextScene(){if(mode!=='scene')return;if(scene<30)showScene(scene+1);else finish()}
function prevScene(){if(mode==='scene'&&scene>1)showScene(scene-1)}
function togglePlay(){if(mode==='opening'){showScene(1);return}if(mode==='credits'){reset();return}if(mode!=='scene'||audioKind!=='file')return;if(audio.paused)audio.play().catch(()=>{});else audio.pause();controls()}
function reset(){stopAudio();mode='opening';scene=0;showOnly(opening);phaseLabel.textContent='I · DOMÉSTICA';sceneStatus.textContent='OBRA';audioStatus.textContent='15 músicas incorporadas · 16–30 preparadas';clock.textContent='--:--';controls()}
function toggleSound(){muted=!muted;audio.muted=muted;controls()}
play.addEventListener('click',togglePlay);next.addEventListener('click',nextScene);prev.addEventListener('click',prevScene);sound.addEventListener('click',toggleSound);
audio.addEventListener('play',controls);audio.addEventListener('pause',controls);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();nextScene()}if(e.key==='ArrowLeft'){e.preventDefault();prevScene()}if(e.code==='Space'){e.preventDefault();togglePlay()}});
reset();
})();