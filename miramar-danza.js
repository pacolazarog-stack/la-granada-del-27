(()=>{'use strict';
const SCENES=["MIRAMAR COMUNIDAD","OK","EL CUERPO","CLAC","NADIE","NACE EL CONFLICTO","PRIMERA INCURSIÓN TERRESTRE","TERRITORIO","MAYORÍA SIMPLE","VOTEN","MAYORÍA SIMPLE","NOSOTROS","DERECHO","TOGA · BANDERA · REINA","MÍRENME","ESTADO","VIENTO","EL SOL","CONFORME A DERECHO","QUE CONSTE","EL REINO CABE EN UNA CARPETA","MIRAMAR","INNOVAR","¿QUIÉN GOBIERNA?","RUMOR","CENTRO DE DATOS","MIRA QUIÉN MIRA QUIÉN","CÓMO SEGUIMOS","DESARMAR A LA REINA","DIEZ MINUTOS"];
const SLUGS=["miramar-comunidad","ok","el-cuerpo","clac","nadie","nace-el-conflicto","primera-incursion-terrestre","territorio","mayoria-simple","voten","mayoria-simple-2","nosotros","derecho","toga-bandera-reina","mirenme","estado","viento","el-sol","conforme-a-derecho","que-conste","el-reino-cabe-en-una-carpeta","miramar","innovar","quien-gobierna","rumor","centro-de-datos","mira-quien-mira-quien","como-seguimos","desarmar-a-la-reina","diez-minutos"];
const KNOWN_DURATION={1:154.44,2:172.584,3:169.92,4:105.624,5:193.584,6:169.944,7:142.44,8:68.832,9:132.024,10:172.032,11:133.224,12:92.04,13:128.4,14:138.744,15:212.424};
const PHASES=[[1,9,'I · DOMÉSTICA'],[10,18,'II · COMUNIDAD'],[19,28,'III · REINA'],[29,30,'IV · DESARME']];
const PLANTS=[[[0.18,0.82],[0.38,0.62],[0.5,0.28],[0.5,0.5],[0.5,0.22]],[[0.5,0.55],[0.55,0.5],[0.6,0.58],[0.48,0.64],[0.43,0.54]],[[0.48,0.55],[0.52,0.6],[0.48,0.7],[0.57,0.76],[0.63,0.6]],[[0.82,0.22],[0.66,0.38],[0.5,0.52],[0.33,0.66],[0.18,0.82]],[[0.55,0.72],[0.52,0.64],[0.5,0.55],[0.45,0.62],[0.42,0.74]],[[0.5,0.6],[0.32,0.42],[0.67,0.66],[0.28,0.72],[0.72,0.32]],[[0.38,0.6],[0.44,0.6],[0.48,0.6],[0.53,0.6],[0.62,0.6]],[[0.18,0.22],[0.8,0.22],[0.8,0.78],[0.18,0.78],[0.5,0.5]],[[0.5,0.55],[0.58,0.48],[0.42,0.44],[0.6,0.66],[0.36,0.68]],[[0.5,0.68],[0.5,0.57],[0.48,0.47],[0.53,0.36],[0.5,0.24]],[[0.5,0.48],[0.48,0.58],[0.42,0.62],[0.55,0.6],[0.5,0.42]],[[0.5,0.62],[0.5,0.54],[0.5,0.46],[0.5,0.38],[0.5,0.3]],[[0.5,0.78],[0.5,0.62],[0.35,0.5],[0.65,0.38],[0.5,0.22]],[[0.5,0.7],[0.5,0.58],[0.5,0.48],[0.5,0.36],[0.5,0.24]],[[0.2,0.78],[0.38,0.62],[0.52,0.46],[0.68,0.32],[0.82,0.2]],[[0.3,0.7],[0.45,0.58],[0.55,0.45],[0.68,0.34],[0.78,0.24]],[[0.5,0.56],[0.68,0.48],[0.72,0.3],[0.48,0.24],[0.3,0.42]],[[0.5,0.3],[0.5,0.42],[0.5,0.54],[0.5,0.66],[0.5,0.76]],[[0.5,0.62],[0.5,0.52],[0.5,0.42],[0.5,0.34],[0.5,0.26]],[[0.22,0.72],[0.36,0.6],[0.52,0.52],[0.68,0.44],[0.5,0.28]],[[0.5,0.25],[0.5,0.38],[0.5,0.5],[0.5,0.62],[0.5,0.72]],[[0.18,0.52],[0.35,0.45],[0.5,0.55],[0.68,0.43],[0.84,0.52]],[[0.22,0.7],[0.4,0.38],[0.66,0.62],[0.78,0.3],[0.54,0.22]],[[0.5,0.58],[0.35,0.48],[0.64,0.4],[0.42,0.3],[0.58,0.22]],[[0.52,0.58],[0.46,0.52],[0.58,0.46],[0.48,0.36],[0.5,0.25]],[[0.3,0.7],[0.44,0.6],[0.58,0.5],[0.68,0.38],[0.74,0.24]],[[0.5,0.5],[0.5,0.42],[0.5,0.34],[0.5,0.28],[0.5,0.22]],[[0.2,0.7],[0.34,0.56],[0.5,0.45],[0.66,0.55],[0.5,0.26]],[[0.5,0.68],[0.5,0.58],[0.46,0.48],[0.58,0.42],[0.5,0.3]],[[0.5,0.7],[0.5,0.58],[0.5,0.46],[0.5,0.34],[0.5,0.22]]];
const COMMUNITY={"11":[[0.28,0.34],[0.42,0.24],[0.58,0.24],[0.72,0.34],[0.72,0.66],[0.58,0.76],[0.42,0.76],[0.28,0.66]],"12":[[0.12,0.5],[0.23,0.5],[0.34,0.5],[0.45,0.5],[0.56,0.5],[0.67,0.5],[0.78,0.5],[0.89,0.5]],"13":[[0.3,0.24],[0.3,0.4],[0.3,0.56],[0.3,0.72],[0.7,0.24],[0.7,0.4],[0.7,0.56],[0.7,0.72]],"14":[[0.34,0.62],[0.42,0.62],[0.58,0.62],[0.66,0.62],[0.34,0.42],[0.42,0.42],[0.58,0.42],[0.66,0.42]],"15":[[0.15,0.2],[0.5,0.2],[0.85,0.2],[0.15,0.5],[0.85,0.5],[0.15,0.8],[0.5,0.8],[0.85,0.8]],"16":[[0.3,0.3],[0.5,0.3],[0.7,0.3],[0.3,0.5],[0.7,0.5],[0.3,0.7],[0.5,0.7],[0.7,0.7]],"17":[[0.5,0.16],[0.7,0.24],[0.82,0.5],[0.7,0.76],[0.5,0.84],[0.3,0.76],[0.18,0.5],[0.3,0.24]],"18":[[0.18,0.7],[0.3,0.7],[0.42,0.7],[0.58,0.7],[0.7,0.7],[0.82,0.7],[0.34,0.82],[0.66,0.82]],"19":[[0.28,0.28],[0.28,0.44],[0.28,0.6],[0.28,0.76],[0.72,0.28],[0.72,0.44],[0.72,0.6],[0.72,0.76]],"20":[[0.18,0.28],[0.34,0.28],[0.5,0.28],[0.66,0.28],[0.82,0.28],[0.26,0.58],[0.5,0.64],[0.74,0.58]],"21":[[0.35,0.35],[0.45,0.3],[0.55,0.3],[0.65,0.35],[0.35,0.65],[0.45,0.7],[0.55,0.7],[0.65,0.65]],"22":[[0.12,0.52],[0.23,0.46],[0.34,0.55],[0.45,0.46],[0.56,0.55],[0.67,0.46],[0.78,0.55],[0.89,0.48]],"23":[[0.16,0.25],[0.28,0.72],[0.42,0.34],[0.55,0.75],[0.68,0.28],[0.82,0.63],[0.75,0.45],[0.32,0.48]],"24":[[0.2,0.25],[0.35,0.35],[0.5,0.25],[0.65,0.35],[0.8,0.25],[0.3,0.7],[0.5,0.72],[0.7,0.7]],"25":[[0.2,0.5],[0.3,0.44],[0.4,0.52],[0.5,0.44],[0.6,0.52],[0.7,0.44],[0.8,0.52],[0.88,0.46]],"26":[[0.25,0.25],[0.5,0.25],[0.75,0.25],[0.25,0.5],[0.75,0.5],[0.25,0.75],[0.5,0.75],[0.75,0.75]],"27":[[0.5,0.18],[0.72,0.28],[0.82,0.5],[0.72,0.72],[0.5,0.82],[0.28,0.72],[0.18,0.5],[0.28,0.28]],"28":[[0.15,0.25],[0.3,0.4],[0.45,0.22],[0.6,0.42],[0.78,0.3],[0.25,0.72],[0.52,0.7],[0.75,0.7]],"29":[[0.2,0.28],[0.35,0.4],[0.65,0.4],[0.8,0.28],[0.2,0.72],[0.35,0.6],[0.65,0.6],[0.8,0.72]]};
const opening=document.getElementById('opening'),sceneCard=document.getElementById('sceneCard'),credits=document.getElementById('credits');
const sceneHero=document.getElementById('sceneHero'),plantPanel=document.getElementById('plantPanel'),plantWrap=document.getElementById('plantWrap');
const sceneNumber=document.getElementById('sceneNumber'),sceneTitle=document.getElementById('sceneTitle'),phaseLabel=document.getElementById('phaseLabel'),scenePhaseLine=document.getElementById('scenePhaseLine');
const prev=document.getElementById('prevBtn'),play=document.getElementById('playBtn'),next=document.getElementById('nextBtn'),sound=document.getElementById('soundBtn'),plantBtn=document.getElementById('plantBtn'),sheetBtn=document.getElementById('sheetBtn');
const sceneStatus=document.getElementById('sceneStatus'),audioStatus=document.getElementById('audioStatus'),clock=document.getElementById('clock'),audio=document.getElementById('danzaAudio'),progress=document.getElementById('sceneProgress');
let mode='opening',scene=0,audioKind='none',muted=false,plantVisible=true,monitor=0;
const pad=n=>String(n).padStart(2,'0');
const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60),q=Math.floor(s%60);return String(m).padStart(2,'0')+':'+String(q).padStart(2,'0')};
const phaseFor=n=>PHASES.find(x=>n>=x[0]&&n<=x[1])[2];
const danceTrack=n=>'audio/danza/'+pad(n)+'.mp3',corporalTrack=n=>'audio/corporal/'+pad(n)+'.mp3';
function showOnly(el){[opening,sceneCard,credits].forEach(x=>{x.hidden=true;x.classList.remove('is-visible')});el.hidden=false;requestAnimationFrame(()=>el.classList.add('is-visible'))}
function atlasPosition(n){const i=n-1,col=i%5,row=Math.floor(i/5),xs=[0,25,50,75,100],ys=[0,20,40,60,80,100];sceneHero.style.backgroundPosition=xs[col]+'% '+ys[row]+'%'}
function stopAudio(){if(monitor){clearInterval(monitor);monitor=0}audio.onended=null;audio.onerror=null;audio.pause();audio.removeAttribute('src');audio.load();audioKind='none'}
async function exists(url){try{const r=await fetch(url,{method:'HEAD',cache:'no-store'});return r.ok}catch(_){return false}}
function renderPlant(n){
 const pts=PLANTS[n-1],com=COMMUNITY[n]||[],X=p=>40+p[0]*320,Y=p=>36+p[1]*410;
 let lines='';for(let i=0;i<pts.length-1;i++)lines+=`<line class="plant-route" x1="${X(pts[i])}" y1="${Y(pts[i])}" x2="${X(pts[i+1])}" y2="${Y(pts[i+1])}" stroke="#50575e" stroke-width="3" marker-end="url(#arrow)"/>`;
 let pdots=pts.map((p,i)=>`<g><circle cx="${X(p)}" cy="${Y(p)}" r="${i===0||i===pts.length-1?7:5}" fill="${i===0?'#151515':i===pts.length-1?'#a42a25':'#686d72'}"/><text x="${X(p)+9}" y="${Y(p)-8}" font-size="11" fill="#30363b">P${i}</text></g>`).join('');
 let cdots=com.map((p,i)=>`<g><circle cx="${X(p)}" cy="${Y(p)}" r="5" fill="#929292"/><text x="${X(p)+7}" y="${Y(p)-7}" font-size="10" fill="#62686e">C${i+1}</text></g>`).join('');
 const boundary=n===7?'<line x1="200" y1="36" x2="200" y2="446" stroke="#a42a25" stroke-width="2"/>':'';
 plantWrap.innerHTML=`<svg viewBox="0 0 400 480" role="img" aria-label="Planta coreográfica escena ${pad(n)}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#50575e"/></marker></defs><rect x="40" y="36" width="320" height="410" fill="#f4f2ec" stroke="#777" stroke-width="2"/><line x1="200" y1="36" x2="200" y2="446" stroke="#ddd"/><line x1="40" y1="241" x2="360" y2="241" stroke="#ddd"/><text x="48" y="54" font-size="12" fill="#777">FONDO</text><text x="48" y="438" font-size="12" fill="#777">PÚBLICO</text>${boundary}${lines}${cdots}${pdots}</svg>`;
}
function renderProgress(n){progress.innerHTML='';for(let i=1;i<=30;i++){const e=document.createElement('i');if(i<n)e.className='done';if(i===n)e.className='current';progress.appendChild(e)}}
function controls(){
 prev.disabled=mode!=='scene'||scene<=1;next.disabled=mode!=='scene';
 sound.textContent=muted?'SONIDO · OFF':'SONIDO · ON';sound.setAttribute('aria-pressed',String(!muted));
 plantBtn.textContent=plantVisible?'PLANTA · ON':'PLANTA · OFF';plantBtn.setAttribute('aria-pressed',String(plantVisible));
 if(mode==='opening'){play.disabled=false;play.textContent='COMENZAR'}
 else if(mode==='credits'){play.disabled=false;play.textContent='REINICIAR'}
 else if(mode==='scene'&&audioKind==='file'){play.disabled=false;play.textContent=audio.paused?'REANUDAR':'PAUSA'}
 else{play.disabled=true;play.textContent=audioKind==='pending'?'MÚSICA PENDIENTE':'—'}
}
async function prepareAudio(n){
 stopAudio();audio.muted=muted;let url=danceTrack(n),ok=await exists(url);
 if(!ok&&n<=15){url=corporalTrack(n);ok=await exists(url)}
 if(mode!=='scene'||scene!==n)return;
 if(!ok){audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · PENDIENTE · AVANCE MANUAL';clock.textContent='--:--';controls();return}
 audioKind='file';audio.src=url;audio.currentTime=0;audioStatus.textContent='MÚSICA '+pad(n)+' · INCORPORADA';
 audio.onended=()=>{if(mode==='scene'&&scene===n){if(n<30)showScene(n+1);else finish()}};
 audio.onerror=()=>{audioKind='pending';audioStatus.textContent='MÚSICA '+pad(n)+' · ERROR DE CARGA';controls()};
 audio.play().catch(()=>{audioStatus.textContent='MÚSICA '+pad(n)+' · pulsa REANUDAR';controls()});
 monitor=setInterval(()=>{const total=Number.isFinite(audio.duration)?audio.duration:KNOWN_DURATION[n];clock.textContent=fmt(audio.currentTime)+' / '+fmt(total);controls()},160);controls();
}
function showScene(n){
 stopAudio();mode='scene';scene=Math.max(1,Math.min(30,n));showOnly(sceneCard);
 sceneHero.style.opacity='0';atlasPosition(scene);renderPlant(scene);renderProgress(scene);
 requestAnimationFrame(()=>requestAnimationFrame(()=>sceneHero.style.opacity='1'));
 sceneHero.setAttribute('aria-label','Escena '+pad(scene)+' · '+SCENES[scene-1]+' · imagen de la hoja de contacto canónica de danza');
 sceneNumber.textContent=pad(scene)+' / 30';sceneTitle.textContent=SCENES[scene-1];
 const phase=phaseFor(scene);phaseLabel.textContent=phase;scenePhaseLine.textContent=phase;sceneStatus.textContent='ESCENA '+pad(scene)+' / 30';
 sheetBtn.href='assets/danza-scenes/'+pad(scene)+'.html';history.replaceState(null,'','#scene-'+pad(scene));
 audioStatus.textContent='COMPROBANDO MÚSICA '+pad(scene);clock.textContent='--:--';controls();prepareAudio(scene);
}
function finish(){stopAudio();mode='credits';scene=30;showOnly(credits);phaseLabel.textContent='IV · DESARME';sceneStatus.textContent='FIN';audioStatus.textContent='Flag';clock.textContent='';history.replaceState(null,'',location.pathname);controls()}
function nextScene(){if(mode!=='scene')return;if(scene<30)showScene(scene+1);else finish()}
function prevScene(){if(mode==='scene'&&scene>1)showScene(scene-1)}
function togglePlay(){if(mode==='opening'){showScene(1);return}if(mode==='credits'){reset();return}if(mode!=='scene'||audioKind!=='file')return;if(audio.paused)audio.play().catch(()=>{});else audio.pause();controls()}
function toggleSound(){muted=!muted;audio.muted=muted;controls()}
function togglePlant(){plantVisible=!plantVisible;plantPanel.classList.toggle('is-hidden',!plantVisible);controls()}
function reset(){stopAudio();mode='opening';scene=0;showOnly(opening);phaseLabel.textContent='I · DOMÉSTICA';sceneStatus.textContent='OBRA';audioStatus.textContent='15 músicas incorporadas · 16–30 preparadas';clock.textContent='--:--';controls()}
play.addEventListener('click',togglePlay);next.addEventListener('click',nextScene);prev.addEventListener('click',prevScene);sound.addEventListener('click',toggleSound);plantBtn.addEventListener('click',togglePlant);
audio.addEventListener('play',controls);audio.addEventListener('pause',controls);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();nextScene()}if(e.key==='ArrowLeft'){e.preventDefault();prevScene()}if(e.code==='Space'){e.preventDefault();togglePlay()}if(e.key.toLowerCase()==='p'){togglePlant()}});
if(window.MIRAMAR_DANZA_CONTACT_B64)sceneHero.style.backgroundImage='url("data:image/jpeg;base64,'+window.MIRAMAR_DANZA_CONTACT_B64+'")';
const hm=location.hash.match(/^#scene-(\d{1,2})$/);if(hm){const n=Math.max(1,Math.min(30,Number(hm[1])));showScene(n)}else reset();
})();