(()=>{
  const root=document.documentElement;
  const cards=[...document.querySelectorAll('a.card')];
  const gate=document.querySelector('#audioGate');
  const start=document.querySelector('#audioStart');
  const status=document.querySelector('#audioStatus');
  const clock=document.querySelector('#audioClock');
  const fill=document.querySelector('#audioFill');
  if(!gate||!start||!status||!clock||!fill)return;

  const introSrc=document.body.dataset.audioSrc||'';
  const returnSources=[document.body.dataset.returnAudio1||'',document.body.dataset.returnAudio2||''].filter(Boolean);
  const origin=localStorage.getItem('volumeReturnOrigin')||'';
  const pending=localStorage.getItem('volumeReturnPending')==='1'&&origin&&returnSources.length;
  const chosen=pending?returnSources[Math.floor(Math.random()*returnSources.length)]:introSrc;
  if(!chosen)return;

  let unlocked=false;
  let started=false;
  let assetReady=false;
  const audio=new Audio(chosen);
  audio.preload='auto';
  audio.loop=false;
  audio.playsInline=true;
  audio.volume=0.86;

  const fmt=s=>{
    if(!Number.isFinite(s)||s<0)return'--:--';
    const m=Math.floor(s/60),sec=Math.floor(s%60);
    return`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

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

  const unlockCards=()=>{
    unlocked=true;
    cards.forEach(a=>{a.classList.remove('is-locked');a.removeAttribute('aria-disabled');a.removeAttribute('tabindex');});
    root.classList.remove('audio-locked');
    gate.classList.add('is-open');
    status.textContent=pending?'RETORNO COMPLETADO · PUEDE ABRIR OTRO LIBRO':'ACCESO ABIERTO · MÚSICA EN BUCLE';
    clock.textContent='CICLO COMPLETADO';
    fill.style.width='100%';
    if(pending){localStorage.removeItem('volumeReturnPending');localStorage.removeItem('volumeReturnOrigin');}
  };

  cards.forEach(a=>a.addEventListener('click',e=>{
    if(sameOriginCard(a)){
      localStorage.setItem('volumeResumeBook',origin);
      localStorage.removeItem('volumeReturnPending');
      localStorage.removeItem('volumeReturnOrigin');
      audio.pause();
      return;
    }
    if(unlocked)return;
    e.preventDefault();
    gate.classList.remove('nudge');void gate.offsetWidth;gate.classList.add('nudge');
  }));

  const update=()=>{
    if(unlocked)return;
    const d=audio.duration,t=audio.currentTime;
    if(Number.isFinite(d)&&d>0){fill.style.width=`${Math.min(100,(t/d)*100)}%`;clock.textContent=`${fmt(t)} / ${fmt(d)}`;}
  };

  const markMissing=()=>{
    assetReady=false;started=false;start.hidden=false;start.disabled=true;
    start.textContent='AUDIO NO DISPONIBLE';gate.classList.remove('is-playing');
    status.textContent='NO SE HA PODIDO CARGAR EL UMBRAL SONORO';clock.textContent='';fill.style.width='0';
  };

  const begin=async()=>{
    if(!assetReady){markMissing();return;}
    try{
      await audio.play();started=true;start.disabled=false;start.hidden=true;gate.classList.add('is-playing');
      status.textContent=pending?`RETORNO DESDE ${origin.toUpperCase()} · ESCUCHE UNA VERSIÓN COMPLETA`:'CICLO SONORO EN CURSO · ACCESO BLOQUEADO';
      update();
    }catch(_){
      started=false;start.disabled=false;start.hidden=false;start.textContent=pending?'INICIAR MÚSICA DE RETORNO':'INICIAR CICLO SONORO';
      gate.classList.remove('is-playing');status.textContent='EL NAVEGADOR REQUIERE UNA ACCIÓN PARA INICIAR EL SONIDO';
    }
  };

  audio.addEventListener('loadedmetadata',()=>{assetReady=true;update();});
  audio.addEventListener('canplay',()=>{assetReady=true;});
  audio.addEventListener('timeupdate',update);
  audio.addEventListener('playing',()=>{if(!unlocked)start.hidden=true;});
  audio.addEventListener('pause',()=>{
    if(!unlocked&&started&&!audio.ended){start.disabled=false;start.hidden=false;start.textContent='REANUDAR CICLO';status.textContent='CICLO INTERRUMPIDO · DEBE COMPLETARSE';}
  });
  audio.addEventListener('ended',async()=>{
    unlockCards();
    if(!pending){audio.loop=true;audio.currentTime=0;try{await audio.play()}catch(_){}}
  });
  audio.addEventListener('error',markMissing);

  start.addEventListener('click',()=>{if(start.disabled)return;if(audio.ended||!started)audio.currentTime=0;begin();});

  const verify=async()=>{
    lockCards();start.hidden=true;
    status.textContent=pending?`REGRESO DESDE ${origin.toUpperCase()} · PREPARANDO CONTRAPUNTO…`:'COMPROBANDO UMBRAL SONORO…';
    try{
      const response=await fetch(chosen,{method:'GET',cache:'no-store'});
      if(!response.ok){markMissing();return;}
      assetReady=true;status.textContent=pending?'INICIANDO MÚSICA DE RETORNO…':'INICIANDO UMBRAL SONORO…';begin();
    }catch(_){markMissing();}
  };

  verify();
})();