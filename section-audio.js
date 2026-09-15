(()=>{
  const startSrc=document.body.dataset.audioSrc||'';
  const codaSrc=document.body.dataset.codaSrc||'';
  const bookId=document.body.dataset.bookId||'';
  if(!startSrc)return;

  const targetVolume=0.76;
  const crossfadeSeconds=4.0;
  const hasCoda=Boolean(codaSrc);
  const players=[new Audio(startSrc),new Audio(startSrc)];
  players.forEach(a=>{a.preload='auto';a.playsInline=true;a.loop=false;a.volume=0;});

  let current=0,crossfading=false,fallback=null,raf=0,monitor=0;
  let bookState='cover',exitUnlocked=!hasCoda,codaStarted=false,codaCompleted=false;
  let codaFallback=null,codaPanel=null,codaTimer=0,stateTimer=0;
  const coda=hasCoda?new Audio(codaSrc):null;
  if(coda){coda.preload='auto';coda.playsInline=true;coda.loop=false;coda.volume=targetVolume;}

  const active=()=>players[current];
  const standby=()=>players[1-current];
  const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;};
  const stateKey=bookId?`bookMusicState:${bookId}`:'';

  function saveBookMusic(){
    if(!stateKey||codaStarted)return;
    const a=active();
    try{localStorage.setItem(stateKey,JSON.stringify({time:a.currentTime||0,at:Date.now()}));}catch(_){}
  }
  function restoreBookMusic(){
    if(!bookId||localStorage.getItem('volumeResumeBook')!==bookId)return 0;
    localStorage.removeItem('volumeResumeBook');
    try{
      const s=JSON.parse(localStorage.getItem(stateKey)||'null');
      if(s&&Number.isFinite(s.time)&&Date.now()-(s.at||0)<86400000)return Math.max(0,s.time);
    }catch(_){}
    return 0;
  }
  function markReturn(){
    if(!bookId)return;
    saveBookMusic();
    localStorage.setItem('volumeReturnOrigin',bookId);
    localStorage.setItem('volumeReturnPending','1');
  }

  const exitButtons=()=>[...document.querySelectorAll('a[href="index.html"],a[href="./index.html"]')];
  const backButton=()=>document.querySelector('#readerPrev')||document.querySelector('#bp');
  function styleLockedLinks(){if(!hasCoda)return;exitButtons().forEach(a=>{a.setAttribute('aria-disabled',exitUnlocked?'false':'true');a.style.opacity=exitUnlocked?'1':'.42';a.style.cursor=exitUnlocked?'pointer':'not-allowed';});}
  function ensurePanel(){
    if(!hasCoda||codaPanel)return codaPanel;
    codaPanel=document.createElement('div');codaPanel.id='bookCodaGate';codaPanel.setAttribute('aria-live','polite');
    Object.assign(codaPanel.style,{position:'fixed',left:'50%',bottom:'58px',transform:'translateX(-50%)',zIndex:'10000',minWidth:'min(520px,calc(100vw - 28px))',maxWidth:'calc(100vw - 28px)',boxSizing:'border-box',padding:'10px 14px',border:'1px solid rgba(255,255,255,.28)',borderRadius:'4px',background:'rgba(19,16,14,.94)',color:'#f4ede5',font:'11px Georgia,serif',letterSpacing:'.07em',textAlign:'center',boxShadow:'0 8px 30px rgba(0,0,0,.38)',display:'none'});
    document.body.appendChild(codaPanel);return codaPanel;
  }
  function setPanel(text,show=true){const p=ensurePanel();if(!p)return;p.textContent=text;p.style.display=show?'block':'none';}
  function syncBackButton(){if(bookState!=='back')return;const b=backButton();if(!b)return;if(exitUnlocked){b.disabled=false;b.textContent='← Inicio';}else{const d=coda&&Number.isFinite(coda.duration)?coda.duration:NaN,t=coda?coda.currentTime:0;b.disabled=true;b.textContent=`CODA · ${fmt(t)} / ${fmt(d)}`;}}
  function lockedNotice(){if(bookState==='back'){const d=coda&&Number.isFinite(coda.duration)?coda.duration:NaN;setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda?.currentTime||0)} / ${fmt(d)}`);}else{setPanel('SALIDA BLOQUEADA · COMPLETE EL LIBRO Y UN CICLO ÍNTEGRO DE LA CODA');setTimeout(()=>{if(bookState!=='back'&&codaPanel)codaPanel.style.display='none';},2200);}}
  function unlockExit(reason='CICLO COMPLETADO · SALIDA ABIERTA'){exitUnlocked=true;styleLockedLinks();syncBackButton();setPanel(reason,true);}
  function stopSectionMusic(){if(monitor){clearInterval(monitor);monitor=0;}if(raf){cancelAnimationFrame(raf);raf=0;}saveBookMusic();players.forEach(a=>{try{a.pause();a.volume=0;}catch(_){}});crossfading=false;if(fallback){fallback.remove();fallback=null;}}
  const removeFallback=()=>{if(fallback){fallback.remove();fallback=null;}};
  const makeFallback=()=>{if(fallback||codaStarted)return;fallback=document.createElement('button');fallback.type='button';fallback.textContent='▶ SONIDO';Object.assign(fallback.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'9999',border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'9px 13px',font:'11px Georgia, serif',letterSpacing:'.08em',cursor:'pointer'});fallback.addEventListener('click',async()=>{try{const a=active();a.volume=targetVolume;await a.play();removeFallback();}catch(_){}});document.body.appendChild(fallback);};

  const doCrossfade=async()=>{
    if(crossfading||codaStarted)return;
    const from=active(),to=standby();if(!Number.isFinite(from.duration)||from.duration<=crossfadeSeconds+1)return;
    crossfading=true;
    try{to.currentTime=0;to.volume=0;await to.play();const start=performance.now();const step=now=>{const p=Math.min(1,(now-start)/(crossfadeSeconds*1000));from.volume=targetVolume*(1-p);to.volume=targetVolume*p;if(p<1){raf=requestAnimationFrame(step);return;}from.pause();from.currentTime=0;from.volume=0;current=1-current;crossfading=false;saveBookMusic();};raf=requestAnimationFrame(step);}catch(_){crossfading=false;to.pause();to.currentTime=0;from.loop=true;}
  };

  monitor=setInterval(()=>{const a=active();if(codaStarted||a.paused||crossfading||!Number.isFinite(a.duration)||a.duration<=0)return;if(a.currentTime>=Math.max(0,a.duration-crossfadeSeconds))doCrossfade();},120);
  stateTimer=setInterval(saveBookMusic,2000);
  players.forEach(a=>{a.addEventListener('playing',removeFallback);a.addEventListener('ended',async()=>{if(crossfading||codaStarted)return;a.currentTime=0;a.volume=targetVolume;try{await a.play()}catch(_){makeFallback();}});});

  const startSection=async()=>{
    if(codaStarted)return;
    const a=active(),resume=restoreBookMusic();a.volume=targetVolume;
    const play=async()=>{if(resume>0&&Number.isFinite(a.duration))a.currentTime=Math.min(resume,Math.max(0,a.duration-.1));try{await a.play();removeFallback();}catch(_){makeFallback();}};
    if(resume>0&&a.readyState<1)a.addEventListener('loadedmetadata',play,{once:true});else play();
  };

  function removeCodaFallback(){if(codaFallback){codaFallback.remove();codaFallback=null;}}
  function makeCodaFallback(){if(codaFallback||!coda)return;codaFallback=document.createElement('button');codaFallback.type='button';codaFallback.textContent='▶ INICIAR CODA';Object.assign(codaFallback.style,{position:'fixed',left:'50%',bottom:'104px',transform:'translateX(-50%)',zIndex:'10001',border:'1px solid rgba(255,255,255,.42)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'10px 16px',font:'11px Georgia,serif',letterSpacing:'.08em',cursor:'pointer'});codaFallback.onclick=()=>playCoda();document.body.appendChild(codaFallback);}
  async function playCoda(){if(!coda)return;try{await coda.play();removeCodaFallback();setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda.currentTime)} / ${fmt(coda.duration)}`);}catch(_){makeCodaFallback();setPanel('LA CODA DEBE INICIARSE PARA PODER ABRIR LA SALIDA');}}
  function beginCoda(){if(!hasCoda||codaStarted)return;codaStarted=true;stopSectionMusic();coda.currentTime=0;coda.loop=false;setPanel('CODA SONORA · PREPARANDO CICLO OBLIGATORIO…');syncBackButton();playCoda();codaTimer=setInterval(()=>{if(!coda||codaCompleted)return;setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda.currentTime)} / ${fmt(coda.duration)}`);syncBackButton();},250);}

  if(coda){coda.addEventListener('playing',removeCodaFallback);coda.addEventListener('ended',async()=>{if(codaCompleted)return;codaCompleted=true;if(codaTimer){clearInterval(codaTimer);codaTimer=0;}unlockExit('CODA COMPLETADA · SALIDA ABIERTA · MÚSICA EN BUCLE');coda.loop=true;coda.currentTime=0;try{await coda.play()}catch(_){}});coda.addEventListener('error',()=>{if(codaTimer){clearInterval(codaTimer);codaTimer=0;}unlockExit('CODA NO DISPONIBLE · SALIDA DE SEGURIDAD ABIERTA');});}

  document.addEventListener('book:state',ev=>{bookState=ev.detail?.state||bookState;if(bookState==='back')beginCoda();else if(codaPanel)codaPanel.style.display='none';styleLockedLinks();});
  document.addEventListener('click',ev=>{
    const a=ev.target.closest?.('a[href="index.html"],a[href="./index.html"]');if(!a)return;
    if(hasCoda&&!exitUnlocked){ev.preventDefault();ev.stopPropagation();lockedNotice();return;}
    markReturn();
  },true);

  window.BOOK_AUDIO_GATE={canExit:()=>exitUnlocked,requestExit:()=>{if(!hasCoda||exitUnlocked){markReturn();location.href='index.html';return true;}lockedNotice();return false;},getState:()=>({bookState,exitUnlocked,codaStarted,codaCompleted})};
  if(hasCoda){styleLockedLinks();addEventListener('beforeunload',ev=>{saveBookMusic();if(exitUnlocked)return;ev.preventDefault();ev.returnValue='';});}
  addEventListener('pagehide',()=>{saveBookMusic();if(monitor)clearInterval(monitor);if(stateTimer)clearInterval(stateTimer);if(codaTimer)clearInterval(codaTimer);if(raf)cancelAnimationFrame(raf);players.forEach(a=>a.pause());if(coda)coda.pause();},{once:true});
  if(hasCoda){const back=document.querySelector('#readerBack:not([hidden])');if(back||document.querySelector('#page.back-cover-page')){bookState='back';beginCoda();}}
  startSection();
})();