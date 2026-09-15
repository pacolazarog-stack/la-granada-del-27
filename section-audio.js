(()=>{
  const startSrc=document.body.dataset.audioSrc||'';
  const codaSrc=document.body.dataset.codaSrc||'';
  const bookId=document.body.dataset.bookId||'';
  if(!startSrc)return;

  const pref=window.VOLUME_AUDIO||{
    isEnabled:()=>localStorage.getItem('volumeSoundMode')!=='off'
  };
  const soundEnabled=()=>pref.isEnabled();
  const targetVolume=.76;
  const crossfadeSeconds=4;
  const hasCoda=Boolean(codaSrc);
  const isGranada=bookId==='granada';
  const players=[new Audio(startSrc),new Audio(startSrc)];
  players.forEach(a=>{a.preload='auto';a.playsInline=true;a.loop=false;a.volume=0;});

  let current=0,crossfading=false,fallback=null,raf=0,monitor=0;
  let bookState='cover',currentMode=location.hash.slice(1)||'bookview';
  let codaEligible=false,exitUnlocked=!hasCoda||!soundEnabled(),codaStarted=false,codaCompleted=false;
  let codaFallback=null,codaPanel=null,codaTimer=0,stateTimer=0;
  const coda=hasCoda?new Audio(codaSrc):null;
  if(coda){coda.preload='auto';coda.playsInline=true;coda.loop=false;coda.volume=targetVolume;}

  const active=()=>players[current];
  const standby=()=>players[1-current];
  const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;};
  const stateKey=bookId?`bookMusicState:${bookId}`:'';
  const codaEntryActive=()=>soundEnabled()&&hasCoda&&(isGranada?(codaEligible&&currentMode==='chance'):bookState==='coda');

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
  function armReturn(){
    if(!bookId||!soundEnabled())return;
    try{sessionStorage.setItem('volumeReturnReady',bookId);}catch(_){}
  }
  function markReturn(){
    if(!bookId||!soundEnabled())return;
    saveBookMusic();
    localStorage.setItem('volumeReturnOrigin',bookId);
    localStorage.setItem('volumeReturnPending','1');
    try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
  }

  const exitButtons=()=>[...document.querySelectorAll('a[href="index.html"],a[href="./index.html"]')];
  function styleLockedLinks(){
    exitButtons().forEach(a=>{
      const open=!soundEnabled()||exitUnlocked||!hasCoda;
      a.setAttribute('aria-disabled',open?'false':'true');
      a.style.opacity=open?'1':'.42';
      a.style.cursor=open?'pointer':'not-allowed';
    });
  }
  function ensurePanel(){
    if(!hasCoda||codaPanel)return codaPanel;
    codaPanel=document.createElement('div');codaPanel.id='bookCodaGate';codaPanel.setAttribute('aria-live','polite');
    Object.assign(codaPanel.style,{position:'fixed',left:'50%',bottom:'58px',transform:'translateX(-50%)',zIndex:'10000',minWidth:'min(520px,calc(100vw - 28px))',maxWidth:'calc(100vw - 28px)',boxSizing:'border-box',padding:'10px 14px',border:'1px solid rgba(255,255,255,.28)',borderRadius:'4px',background:'rgba(19,16,14,.94)',color:'#f4ede5',font:'11px Georgia,serif',letterSpacing:'.07em',textAlign:'center',boxShadow:'0 8px 30px rgba(0,0,0,.38)',display:'none'});
    document.body.appendChild(codaPanel);return codaPanel;
  }
  function setPanel(text,show=true){
    const p=ensurePanel();if(!p)return;
    p.textContent=text;
    p.style.display=show&&codaEntryActive()?'block':'none';
  }
  function refreshCodaUi(){
    if(codaPanel)codaPanel.style.display=codaEntryActive()?'block':'none';
    if(codaFallback)codaFallback.style.display=codaEntryActive()?'block':'none';
  }
  function transient(text){
    const msg=document.createElement('div');msg.textContent=text;
    Object.assign(msg.style,{position:'fixed',left:'50%',bottom:'58px',transform:'translateX(-50%)',zIndex:'10002',padding:'10px 14px',border:'1px solid rgba(255,255,255,.28)',background:'rgba(19,16,14,.94)',color:'#f4ede5',font:'11px Georgia,serif',letterSpacing:'.07em',textAlign:'center'});
    document.body.appendChild(msg);setTimeout(()=>msg.remove(),2300);
  }
  function lockedNotice(){
    if(!soundEnabled())return;
    if(bookState==='back'){
      transient(isGranada?'SALIDA BLOQUEADA · LA CODA COMIENZA EN AZAR, NO EN LA CONTRAPORTADA':'SALIDA BLOQUEADA · PASE A LA ESTANCIA CODA DESPUÉS DE LA CONTRAPORTADA');return;
    }
    if(codaEntryActive()){
      const d=coda&&Number.isFinite(coda.duration)?coda.duration:NaN;
      setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda?.currentTime||0)} / ${fmt(d)}`);return;
    }
    transient('SALIDA BLOQUEADA · COMPLETE EL LIBRO Y LA CODA');
  }
  function unlockExit(reason='CODA COMPLETADA · SALIDA ABIERTA'){
    exitUnlocked=true;armReturn();styleLockedLinks();setPanel(reason,true);
    document.dispatchEvent(new CustomEvent('coda:complete',{detail:{bookId}}));
  }
  const removeFallback=()=>{if(fallback){fallback.remove();fallback=null;}};
  const makeFallback=()=>{
    if(fallback||codaStarted||!soundEnabled())return;
    fallback=document.createElement('button');fallback.type='button';fallback.textContent='▶ SONIDO';
    Object.assign(fallback.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'9999',border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'9px 13px',font:'11px Georgia,serif',letterSpacing:'.08em',cursor:'pointer'});
    fallback.addEventListener('click',async()=>{if(!soundEnabled())return;try{const a=active();a.volume=targetVolume;await a.play();removeFallback();}catch(_){}});
    document.body.appendChild(fallback);
  };

  const doCrossfade=async()=>{
    if(crossfading||codaStarted||!soundEnabled())return;
    const from=active(),to=standby();if(!Number.isFinite(from.duration)||from.duration<=crossfadeSeconds+1)return;
    crossfading=true;
    try{
      to.currentTime=0;to.volume=0;await to.play();
      const start=performance.now();
      const step=now=>{const p=Math.min(1,(now-start)/(crossfadeSeconds*1000));from.volume=targetVolume*(1-p);to.volume=targetVolume*p;if(p<1){raf=requestAnimationFrame(step);return;}from.pause();from.currentTime=0;from.volume=0;current=1-current;crossfading=false;saveBookMusic();};
      raf=requestAnimationFrame(step);
    }catch(_){crossfading=false;to.pause();to.currentTime=0;from.loop=true;}
  };

  monitor=setInterval(()=>{const a=active();if(!soundEnabled()||codaStarted||a.paused||crossfading||!Number.isFinite(a.duration)||a.duration<=0)return;if(a.currentTime>=Math.max(0,a.duration-crossfadeSeconds))doCrossfade();},120);
  stateTimer=setInterval(()=>{if(soundEnabled())saveBookMusic();},2000);
  players.forEach(a=>{
    a.addEventListener('playing',removeFallback);
    a.addEventListener('ended',async()=>{if(crossfading||codaStarted||!soundEnabled())return;a.currentTime=0;a.volume=targetVolume;try{await a.play()}catch(_){makeFallback();}});
  });

  const startSection=async()=>{
    if(codaStarted||!soundEnabled())return;
    const a=active(),resume=restoreBookMusic();a.volume=targetVolume;
    const play=async()=>{if(!soundEnabled())return;if(resume>0&&Number.isFinite(a.duration))a.currentTime=Math.min(resume,Math.max(0,a.duration-.1));try{await a.play();removeFallback();}catch(_){makeFallback();}};
    if(resume>0&&a.readyState<1)a.addEventListener('loadedmetadata',play,{once:true});else play();
  };

  function removeCodaFallback(){if(codaFallback){codaFallback.remove();codaFallback=null;}}
  function makeCodaFallback(label='▶ INICIAR CODA'){
    if(!coda||!codaEntryActive())return;
    if(!codaFallback){
      codaFallback=document.createElement('button');codaFallback.type='button';
      Object.assign(codaFallback.style,{position:'fixed',left:'50%',bottom:'104px',transform:'translateX(-50%)',zIndex:'10001',border:'1px solid rgba(255,255,255,.42)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'10px 16px',font:'11px Georgia,serif',letterSpacing:'.08em',cursor:'pointer'});
      codaFallback.onclick=async()=>{
        if(!codaEntryActive())return;
        try{if(coda.error){coda.src=codaSrc;coda.load();}await playCoda();}catch(_){}
      };
      document.body.appendChild(codaFallback);
    }
    codaFallback.textContent=label;codaFallback.style.display='block';
  }
  async function playCoda(){
    if(!coda||!codaEntryActive())return false;
    try{
      coda.volume=targetVolume;
      await coda.play();
      removeCodaFallback();
      setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda.currentTime)} / ${fmt(coda.duration)}`);
      return true;
    }catch(err){
      makeCodaFallback(coda.error?'↻ RECARGAR CODA':'▶ INICIAR CODA');
      setPanel(coda.error?'NO SE HA PODIDO CARGAR LA CODA · PULSE RECARGAR CODA':'LA CODA NECESITA UNA PULSACIÓN PARA INICIARSE');
      return false;
    }
  }
  function beginCoda(){
    if(!hasCoda||codaStarted||!codaEntryActive())return;
    codaStarted=true;
    saveBookMusic();
    players.forEach(a=>{a.pause();a.volume=0;});removeFallback();
    coda.currentTime=0;coda.loop=false;coda.src=codaSrc;coda.load();
    setPanel('CODA SONORA · CARGANDO CICLO OBLIGATORIO…');
    playCoda();
    codaTimer=setInterval(()=>{if(!coda||codaCompleted||!soundEnabled())return;setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda.currentTime)} / ${fmt(coda.duration)}`);},250);
  }

  if(coda){
    coda.addEventListener('loadedmetadata',()=>{if(codaEntryActive()&&!codaCompleted)setPanel(`CODA SONORA · PREPARADA · 00:00 / ${fmt(coda.duration)}`);});
    coda.addEventListener('playing',()=>{removeCodaFallback();setPanel(`CODA SONORA · SALIDA BLOQUEADA · ${fmt(coda.currentTime)} / ${fmt(coda.duration)}`);});
    coda.addEventListener('ended',async()=>{
      if(codaCompleted||!soundEnabled())return;
      codaCompleted=true;if(codaTimer){clearInterval(codaTimer);codaTimer=0;}
      unlockExit('CODA COMPLETADA · SALIDA ABIERTA · MÚSICA EN BUCLE');
      coda.loop=true;coda.currentTime=0;try{await coda.play()}catch(_){}
    });
    coda.addEventListener('error',()=>{
      if(!codaStarted||!soundEnabled()||!codaEntryActive())return;
      makeCodaFallback('↻ RECARGAR CODA');
      setPanel('ERROR DE CARGA · LA CODA NO SE DA POR COMPLETADA · PULSE RECARGAR CODA');
    });
  }

  document.addEventListener('book:state',ev=>{
    bookState=ev.detail?.state||bookState;
    if(bookState==='back')codaEligible=true;
    if(bookState==='coda'){codaEligible=true;if(soundEnabled())beginCoda();}
    refreshCodaUi();styleLockedLinks();
  });
  document.addEventListener('view:mode',ev=>{
    currentMode=ev.detail?.id||currentMode;
    if(isGranada&&currentMode==='chance'&&codaEligible&&soundEnabled())beginCoda();
    refreshCodaUi();
  });
  document.addEventListener('volume:soundchange',ev=>{
    const enabled=Boolean(ev.detail?.enabled);
    if(!enabled){
      saveBookMusic();players.forEach(a=>a.pause());if(coda)coda.pause();
      removeFallback();removeCodaFallback();if(codaPanel)codaPanel.style.display='none';
      try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
      exitUnlocked=true;styleLockedLinks();return;
    }
    exitUnlocked=!hasCoda||codaCompleted;
    if(codaCompleted)armReturn();
    styleLockedLinks();
    if(codaEntryActive()){
      if(codaStarted)playCoda();else beginCoda();
    }else if(!codaStarted)startSection();
  });
  document.addEventListener('click',ev=>{
    const a=ev.target.closest?.('a[href="index.html"],a[href="./index.html"]');if(!a)return;
    if(soundEnabled()&&hasCoda&&!exitUnlocked){ev.preventDefault();ev.stopPropagation();lockedNotice();return;}
    markReturn();
  },true);

  window.BOOK_AUDIO_GATE={
    canExit:()=>!soundEnabled()||exitUnlocked,
    requestExit:()=>{
      if(!soundEnabled()){localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}location.href='index.html';return true;}
      if(!hasCoda||exitUnlocked){markReturn();location.href='index.html';return true;}
      lockedNotice();return false;
    },
    retryCoda:()=>{if(codaEntryActive()){if(coda.error){coda.src=codaSrc;coda.load();}return playCoda();}return false;},
    getState:()=>({bookState,currentMode,codaEligible,exitUnlocked,codaStarted,codaCompleted,codaReadyState:coda?.readyState||0,codaError:coda?.error?.code||0,soundEnabled:soundEnabled()})
  };

  if(hasCoda){
    styleLockedLinks();
    addEventListener('beforeunload',ev=>{saveBookMusic();if(!soundEnabled()||exitUnlocked)return;ev.preventDefault();ev.returnValue='';});
  }
  addEventListener('pagehide',()=>{saveBookMusic();if(monitor)clearInterval(monitor);if(stateTimer)clearInterval(stateTimer);if(codaTimer)clearInterval(codaTimer);if(raf)cancelAnimationFrame(raf);players.forEach(a=>a.pause());if(coda)coda.pause();},{once:true});

  if(location.hash==='#coda'&&!isGranada){bookState='coda';codaEligible=true;if(soundEnabled())beginCoda();}
  else if(location.hash==='#contraportada'){bookState='back';codaEligible=true;}
  if(soundEnabled())startSection();
  else styleLockedLinks();
})();
