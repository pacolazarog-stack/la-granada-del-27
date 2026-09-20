(()=>{
  const root=document.documentElement;
  const cards=[...document.querySelectorAll('a.card')];
  const gate=document.querySelector('#audioGate');
  const start=document.querySelector('#audioStart');
  const status=document.querySelector('#audioStatus');
  const clock=document.querySelector('#audioClock');
  const fill=document.querySelector('#audioFill');
  if(!gate||!start||!status||!clock||!fill)return;

  const pref=window.VOLUME_AUDIO||{
    isEnabled:()=>localStorage.getItem('volumeSoundMode')!=='off',
    isChosen:()=>['on','off'].includes(localStorage.getItem('volumeSoundMode')),
    setEnabled:v=>localStorage.setItem('volumeSoundMode',v?'on':'off'),
    introCompleted:()=>localStorage.getItem('volumeIntroCompleted')==='1',
    markIntroCompleted:()=>localStorage.setItem('volumeIntroCompleted','1'),
    clearPendingAudio:()=>{localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');}
  };

  const introSrc=document.body.dataset.audioSrc||'';
  const returnSources=[document.body.dataset.returnAudio1||'',document.body.dataset.returnAudio2||''].filter(Boolean);
  const AWAY_KEY='volumeAwayFromHome';

  const bookIdFromPath=path=>{
    const name=(path.split('/').pop()||'').toLowerCase();
    if(name==='granada.html')return'granada';
    if(name==='paco.html')return'paco';
    if(name==='miramar.html')return'miramar';
    if(name==='ensayo.html')return'ensayo';
    if(name==='final.html')return'final';
    if(name==='autor.html')return'autor';
    return name&&name!=='index.html'?name.replace(/\.html?$/,''):'site';
  };

  const referrerOrigin=()=>{
    if(!document.referrer)return'';
    try{
      const u=new URL(document.referrer,location.href);
      if(u.origin!==location.origin)return'';
      const p=u.pathname.replace(/\/+$/,'');
      const here=location.pathname.replace(/\/+$/,'');
      if(p===here||/\/index\.html$/i.test(p))return'';
      return bookIdFromPath(p)||'site';
    }catch(_){return'';}
  };

  const getAwayOrigin=()=>{try{return sessionStorage.getItem(AWAY_KEY)||'';}catch(_){return'';}};
  const setAwayOrigin=value=>{try{sessionStorage.setItem(AWAY_KEY,value||'site');}catch(_){}};
  const clearAwayOrigin=()=>{try{sessionStorage.removeItem(AWAY_KEY);}catch(_){}};
  const navigationType=()=>performance.getEntriesByType?.('navigation')?.[0]?.type||'';

  let skipFlashExit=false;
  try{
    skipFlashExit=sessionStorage.getItem('volumeFlashExitOnce')==='1';
    if(skipFlashExit)sessionStorage.removeItem('volumeFlashExitOnce');
  }catch(_){}
  if(skipFlashExit){
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
    try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
    clearAwayOrigin();
  }

  let readyOrigin='';
  try{readyOrigin=skipFlashExit?'':(sessionStorage.getItem('volumeReturnReady')||'');}catch(_){}
  const directReturnOrigin=skipFlashExit?'':referrerOrigin();
  const backReturnOrigin=skipFlashExit?'':(navigationType()==='back_forward'?getAwayOrigin():'');

  if(pref.isEnabled()&&localStorage.getItem('volumeReturnPending')!=='1'&&returnSources.length){
    const detected=readyOrigin||directReturnOrigin||backReturnOrigin;
    if(detected){
      localStorage.setItem('volumeReturnOrigin',detected);
      localStorage.setItem('volumeReturnPending','1');
      try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
      clearAwayOrigin();
    }
  }

  let origin=localStorage.getItem('volumeReturnOrigin')||'';
  let pending=pref.isEnabled()&&localStorage.getItem('volumeReturnPending')==='1'&&returnSources.length>0;
  if(pending&&!origin){origin='site';localStorage.setItem('volumeReturnOrigin',origin);}
  if(pending){try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}clearAwayOrigin();}
  let firstIntro=!pending&&!pref.introCompleted();
  let chosen=pending?returnSources[Math.floor(Math.random()*returnSources.length)]:introSrc;
  let unlocked=false,started=false,choiceVisible=false,gestureRetryArmed=false,deferredUnlock='';
  const languageReady=()=>!window.POETICA_LANGUAGE||window.POETICA_LANGUAGE.isChosen();
  let audio=chosen?new Audio(chosen):null;
  if(audio){audio.preload='auto';audio.loop=false;audio.playsInline=true;audio.volume=.86;}

  const choice=document.createElement('div');
  choice.id='soundChoice';
  Object.assign(choice.style,{display:'none',gap:'10px',justifyContent:'center',alignItems:'center',flexWrap:'wrap',margin:'14px 0 2px'});
  const withSound=document.createElement('button');
  const withoutSound=document.createElement('button');
  [withSound,withoutSound].forEach(b=>{b.type='button';Object.assign(b.style,{border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'10px 16px',font:'11px Georgia,serif',letterSpacing:'.08em',cursor:'pointer'});});
  withSound.textContent='🔊 CON SONIDO';
  withoutSound.textContent='🔇 SIN SONIDO';
  choice.append(withSound,withoutSound);
  start.insertAdjacentElement('afterend',choice);

  const fmt=s=>{if(!Number.isFinite(s)||s<0)return'--:--';const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;};
  const sameOriginCard=a=>pending&&['granada','paco','miramar','ensayo'].includes(origin)&&a.dataset.bookId===origin;

  const lockCards=()=>{
    cards.forEach(a=>{
      const allowed=sameOriginCard(a);
      a.classList.toggle('is-locked',!allowed);
      if(allowed){a.removeAttribute('aria-disabled');a.removeAttribute('tabindex');}
      else{a.setAttribute('aria-disabled','true');a.setAttribute('tabindex','-1');}
    });
    root.classList.add('audio-locked');
  };

  const unlockCards=(message='ACCESO ABIERTO')=>{
    if(!languageReady()){
      deferredUnlock=message;
      status.textContent='ELIJA UNA LENGUA PARA CONTINUAR · LA MÚSICA YA HA SIDO COMPLETADA';
      clock.textContent='IDIOMA PENDIENTE';
      fill.style.width='100%';
      return;
    }
    deferredUnlock='';
    unlocked=true;
    cards.forEach(a=>{a.classList.remove('is-locked');a.removeAttribute('aria-disabled');a.removeAttribute('tabindex');});
    root.classList.remove('audio-locked');gate.classList.add('is-open');
    status.textContent=message;
    clock.textContent=pref.isEnabled()?'CICLO COMPLETADO':'SIN SONIDO';
    fill.style.width='100%';
    start.hidden=true;choice.style.display='none';choiceVisible=false;
    if(pending){localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');pending=false;origin='';}
  };

  const showChoice=()=>{
    choiceVisible=true;choice.style.display='flex';start.hidden=true;
    status.textContent='ELIJA CÓMO CONTINUAR EL VOLUMEN';
    clock.textContent='PRELUDIO COMPLETADO';fill.style.width='100%';
  };

  const silentMode=()=>{
    pref.markIntroCompleted();
    try{pref.setEnabled(false,'intro-choice')}catch(_){localStorage.setItem('volumeSoundMode','off');}
    if(audio){audio.pause();audio.currentTime=0;}
    pref.clearPendingAudio?.();
    try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
    clearAwayOrigin();
    unlockCards('MODO SIN SONIDO · ACCESO ABIERTO');
  };

  const soundMode=async()=>{
    pref.markIntroCompleted();
    try{pref.setEnabled(true,'intro-choice')}catch(_){localStorage.setItem('volumeSoundMode','on');}
    unlockCards('CON SONIDO · ACCESO ABIERTO');
    if(audio&&!pending){audio.loop=true;audio.currentTime=0;try{await audio.play()}catch(_){}}
  };

  withSound.addEventListener('click',soundMode);
  withoutSound.addEventListener('click',silentMode);

  document.addEventListener('click',ev=>{
    const a=ev.target.closest?.('a[href]');
    if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
    if(a.classList.contains('is-locked')||a.getAttribute('aria-disabled')==='true')return;
    try{
      const u=new URL(a.href,location.href);
      if(u.origin!==location.origin)return;
      const here=location.pathname.replace(/\/+$/,'');
      const there=u.pathname.replace(/\/+$/,'');
      if(there===here||/\/index\.html$/i.test(there))return;
      setAwayOrigin(a.dataset.bookId||bookIdFromPath(there)||'site');
    }catch(_){}
  },true);

  cards.forEach(a=>a.addEventListener('click',e=>{
    if(!pref.isEnabled())return;
    if(sameOriginCard(a)){
      localStorage.setItem('volumeResumeBook',origin);
      localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');
      try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
      setAwayOrigin(a.dataset.bookId||origin||'site');
      if(audio)audio.pause();return;
    }
    if(unlocked)return;
    e.preventDefault();gate.classList.remove('nudge');void gate.offsetWidth;gate.classList.add('nudge');
  }));

  const update=()=>{
    if(unlocked||choiceVisible||!audio)return;
    const d=audio.duration,t=audio.currentTime;
    if(Number.isFinite(d)&&d>0){fill.style.width=`${Math.min(100,(t/d)*100)}%`;clock.textContent=`${fmt(t)} / ${fmt(d)}`;}
  };
  const markMissing=()=>{
    started=false;start.hidden=false;start.disabled=false;start.textContent='REINTENTAR AUDIO';gate.classList.remove('is-playing');
    status.textContent=pending?'NO SE HA PODIDO CARGAR EL CONTRAPUNTO DE RETORNO':'NO SE HA PODIDO CARGAR EL UMBRAL SONORO';clock.textContent='';fill.style.width='0';
  };

  const armGestureRetry=()=>{
    if(gestureRetryArmed||!pending||!pref.isEnabled())return;
    gestureRetryArmed=true;
    const retry=()=>{
      gestureRetryArmed=false;
      document.removeEventListener('pointerdown',retry,true);
      document.removeEventListener('keydown',retry,true);
      begin();
    };
    document.addEventListener('pointerdown',retry,true);
    document.addEventListener('keydown',retry,true);
  };

  const begin=async()=>{
    if(!audio||!pref.isEnabled())return;
    try{
      await audio.play();started=true;gestureRetryArmed=false;start.disabled=false;start.hidden=true;gate.classList.add('is-playing');
      status.textContent=pending?`RETORNO DESDE ${origin.toUpperCase()} · ESCUCHE UNA VERSIÓN COMPLETA`:'PRELUDIO SONORO EN CURSO · ACCESO BLOQUEADO';update();
    }catch(_){
      started=false;start.disabled=false;start.hidden=false;start.textContent=pending?'INICIAR MÚSICA DE RETORNO':'INICIAR PRELUDIO';gate.classList.remove('is-playing');
      status.textContent=pending?'MÚSICA DE RETORNO PREPARADA · UN TOQUE EN CUALQUIER PUNTO LA INICIA':'EL NAVEGADOR REQUIERE UNA ACCIÓN PARA INICIAR EL SONIDO';
      armGestureRetry();
    }
  };

  if(audio){
    audio.addEventListener('loadedmetadata',update);
    audio.addEventListener('timeupdate',update);
    audio.addEventListener('playing',()=>{if(!unlocked&&!choiceVisible)start.hidden=true;});
    audio.addEventListener('pause',()=>{if(!unlocked&&!choiceVisible&&started&&!audio.ended&&pref.isEnabled()){start.disabled=false;start.hidden=false;start.textContent=pending?'REANUDAR RETORNO':'REANUDAR CICLO';status.textContent=pending?'RETORNO INTERRUMPIDO · DEBE COMPLETARSE':'CICLO INTERRUMPIDO · DEBE COMPLETARSE';}});
    audio.addEventListener('ended',async()=>{
      if(pending){unlockCards('RETORNO COMPLETADO · PUEDE ABRIR OTRO LIBRO');return;}
      if(firstIntro&&!pref.isChosen()){showChoice();return;}
      pref.markIntroCompleted();unlockCards('CON SONIDO · ACCESO ABIERTO');
      if(pref.isEnabled()){audio.loop=true;audio.currentTime=0;try{await audio.play()}catch(_){}}
    });
    audio.addEventListener('error',markMissing);
  }
  start.addEventListener('click',()=>{if(audio&&(audio.ended||!started))audio.currentTime=0;begin();});

  document.addEventListener('volume:languagechange',()=>{
    if(audio&&!started&&!audio.ended&&pref.isEnabled())begin();
    if(deferredUnlock&&languageReady()){
      const msg=deferredUnlock;
      deferredUnlock='';
      unlockCards(msg);
    }
  });

  document.addEventListener('volume:soundchange',ev=>{
    const enabled=Boolean(ev.detail?.enabled);
    if(!enabled){
      if(audio)audio.pause();
      pref.markIntroCompleted();pref.clearPendingAudio?.();pending=false;origin='';firstIntro=false;
      try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
      clearAwayOrigin();
      unlockCards('MODO SIN SONIDO · ACCESO ABIERTO');
      return;
    }
    if(pref.introCompleted()&&!pending){unlockCards('CON SONIDO · ACCESO ABIERTO');}
  });

  addEventListener('pageshow',ev=>{
    if(!pref.isEnabled())return;
    let ready='';try{ready=sessionStorage.getItem('volumeReturnReady')||'';}catch(_){}
    const away=getAwayOrigin();
    const storedPending=localStorage.getItem('volumeReturnPending')==='1';
    if(ev.persisted&&(storedPending||ready||away)){
      if(!storedPending){
        const detected=ready||away||'site';
        localStorage.setItem('volumeReturnOrigin',detected);
        localStorage.setItem('volumeReturnPending','1');
      }
      try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
      clearAwayOrigin();
      location.reload();
    }
  });

  if(!pref.isEnabled()){
    pref.markIntroCompleted();pref.clearPendingAudio?.();
    try{sessionStorage.removeItem('volumeReturnReady');}catch(_){}
    clearAwayOrigin();
    unlockCards('MODO SIN SONIDO · ACCESO ABIERTO');
    return;
  }
  if(pref.introCompleted()&&!pending){
    unlockCards('CON SONIDO · ACCESO ABIERTO');
    return;
  }
  if(!chosen){unlockCards('ACCESO ABIERTO');return;}

  lockCards();
  status.textContent=pending?`REGRESO DESDE ${origin.toUpperCase()} · PREPARANDO CONTRAPUNTO ALEATORIO…`:'INICIANDO PRELUDIO SONORO…';
  begin();
})();
