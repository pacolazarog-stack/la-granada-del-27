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
  let origin=localStorage.getItem('volumeReturnOrigin')||'';
  let pending=pref.isEnabled()&&localStorage.getItem('volumeReturnPending')==='1'&&origin&&returnSources.length;
  let firstIntro=!pending&&!pref.introCompleted();
  let chosen=pending?returnSources[Math.floor(Math.random()*returnSources.length)]:introSrc;
  let unlocked=false,started=false,choiceVisible=false;
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
  const sameOriginCard=a=>pending&&a.dataset.bookId===origin;

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

  cards.forEach(a=>a.addEventListener('click',e=>{
    if(!pref.isEnabled())return;
    if(sameOriginCard(a)){
      localStorage.setItem('volumeResumeBook',origin);
      localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');
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
    status.textContent='NO SE HA PODIDO CARGAR EL UMBRAL SONORO';clock.textContent='';fill.style.width='0';
  };
  const begin=async()=>{
    if(!audio||!pref.isEnabled())return;
    try{
      await audio.play();started=true;start.disabled=false;start.hidden=true;gate.classList.add('is-playing');
      status.textContent=pending?`RETORNO DESDE ${origin.toUpperCase()} · ESCUCHE UNA VERSIÓN COMPLETA`:'PRELUDIO SONORO EN CURSO · ACCESO BLOQUEADO';update();
    }catch(_){started=false;start.disabled=false;start.hidden=false;start.textContent=pending?'INICIAR MÚSICA DE RETORNO':'INICIAR PRELUDIO';gate.classList.remove('is-playing');status.textContent='EL NAVEGADOR REQUIERE UNA ACCIÓN PARA INICIAR EL SONIDO';}
  };

  if(audio){
    audio.addEventListener('loadedmetadata',update);
    audio.addEventListener('timeupdate',update);
    audio.addEventListener('playing',()=>{if(!unlocked&&!choiceVisible)start.hidden=true;});
    audio.addEventListener('pause',()=>{if(!unlocked&&!choiceVisible&&started&&!audio.ended&&pref.isEnabled()){start.disabled=false;start.hidden=false;start.textContent='REANUDAR CICLO';status.textContent='CICLO INTERRUMPIDO · DEBE COMPLETARSE';}});
    audio.addEventListener('ended',async()=>{
      if(pending){unlockCards('RETORNO COMPLETADO · PUEDE ABRIR OTRO LIBRO');return;}
      if(firstIntro&&!pref.isChosen()){showChoice();return;}
      pref.markIntroCompleted();unlockCards('CON SONIDO · ACCESO ABIERTO');
      if(pref.isEnabled()){audio.loop=true;audio.currentTime=0;try{await audio.play()}catch(_){}}
    });
    audio.addEventListener('error',markMissing);
  }
  start.addEventListener('click',()=>{if(audio&&(audio.ended||!started))audio.currentTime=0;begin();});

  document.addEventListener('volume:soundchange',ev=>{
    const enabled=Boolean(ev.detail?.enabled);
    if(!enabled){
      if(audio)audio.pause();
      pref.markIntroCompleted();pref.clearPendingAudio?.();pending=false;origin='';firstIntro=false;
      unlockCards('MODO SIN SONIDO · ACCESO ABIERTO');
      return;
    }
    if(pref.introCompleted()&&!pending){unlockCards('CON SONIDO · ACCESO ABIERTO');}
  });

  if(!pref.isEnabled()){
    pref.markIntroCompleted();pref.clearPendingAudio?.();
    unlockCards('MODO SIN SONIDO · ACCESO ABIERTO');
    return;
  }
  if(pref.introCompleted()&&!pending){
    unlockCards('CON SONIDO · ACCESO ABIERTO');
    return;
  }
  if(!chosen){unlockCards('ACCESO ABIERTO');return;}

  lockCards();
  status.textContent=pending?`REGRESO DESDE ${origin.toUpperCase()} · PREPARANDO CONTRAPUNTO…`:'INICIANDO PRELUDIO SONORO…';
  begin();
})();
