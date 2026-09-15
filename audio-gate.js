(()=>{
  const root=document.documentElement;
  const src=document.body.dataset.audioSrc||'';
  const cards=[...document.querySelectorAll('a.card')];
  const gate=document.querySelector('#audioGate');
  const start=document.querySelector('#audioStart');
  const status=document.querySelector('#audioStatus');
  const clock=document.querySelector('#audioClock');
  const fill=document.querySelector('#audioFill');
  if(!gate||!start||!status||!clock||!fill||!src)return;

  let unlocked=false;
  let started=false;
  let firstCycle=true;
  let assetReady=false;
  const audio=new Audio(src);
  audio.preload='auto';
  audio.loop=false;
  audio.playsInline=true;
  audio.volume=0.86;

  const fmt=(s)=>{
    if(!Number.isFinite(s)||s<0)return '--:--';
    const m=Math.floor(s/60),sec=Math.floor(s%60);
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const lockCards=()=>{
    cards.forEach(a=>{
      a.classList.add('is-locked');
      a.setAttribute('aria-disabled','true');
      a.setAttribute('tabindex','-1');
    });
    root.classList.add('audio-locked');
  };

  const unlockCards=()=>{
    unlocked=true;
    cards.forEach(a=>{
      a.classList.remove('is-locked');
      a.removeAttribute('aria-disabled');
      a.removeAttribute('tabindex');
    });
    root.classList.remove('audio-locked');
    gate.classList.add('is-open');
    status.textContent='ACCESO ABIERTO · MÚSICA EN BUCLE';
    clock.textContent='CICLO COMPLETADO';
    fill.style.width='100%';
  };

  cards.forEach(a=>a.addEventListener('click',e=>{
    if(unlocked)return;
    e.preventDefault();
    gate.classList.remove('nudge');
    void gate.offsetWidth;
    gate.classList.add('nudge');
  }));

  const update=()=>{
    if(unlocked)return;
    const d=audio.duration;
    const t=audio.currentTime;
    if(Number.isFinite(d)&&d>0){
      fill.style.width=`${Math.min(100,(t/d)*100)}%`;
      clock.textContent=`${fmt(t)} / ${fmt(d)}`;
    }
  };

  const markMissing=()=>{
    assetReady=false;
    started=false;
    start.hidden=false;
    start.disabled=true;
    start.textContent='AUDIO PREVIO NO PUBLICADO';
    gate.classList.remove('is-playing');
    status.textContent='FALTA PUBLICAR audio/PREVIO.mp3 EN EL REPOSITORIO';
    clock.textContent='';
    fill.style.width='0';
  };

  const begin=async()=>{
    if(!assetReady){markMissing();return;}
    try{
      await audio.play();
      started=true;
      start.disabled=false;
      start.hidden=true;
      gate.classList.add('is-playing');
      status.textContent='CICLO SONORO EN CURSO · ACCESO BLOQUEADO';
      update();
    }catch(err){
      started=false;
      start.disabled=false;
      start.hidden=false;
      start.textContent='INICIAR CICLO SONORO';
      gate.classList.remove('is-playing');
      status.textContent='EL NAVEGADOR REQUIERE UNA ACCIÓN PARA INICIAR EL SONIDO';
    }
  };

  audio.addEventListener('loadedmetadata',()=>{assetReady=true;update();});
  audio.addEventListener('canplay',()=>{assetReady=true;});
  audio.addEventListener('timeupdate',update);
  audio.addEventListener('playing',()=>{
    if(!unlocked){start.hidden=true;status.textContent='CICLO SONORO EN CURSO · ACCESO BLOQUEADO';}
  });
  audio.addEventListener('pause',()=>{
    if(!unlocked&&started&&!audio.ended){
      start.disabled=false;
      start.hidden=false;
      start.textContent='REANUDAR CICLO';
      status.textContent='CICLO INTERRUMPIDO · DEBE COMPLETARSE';
    }
  });
  audio.addEventListener('ended',async()=>{
    if(firstCycle){
      firstCycle=false;
      unlockCards();
      audio.loop=true;
      audio.currentTime=0;
      try{await audio.play();}catch(_){/* el acceso ya queda abierto */}
    }
  });
  audio.addEventListener('error',markMissing);

  start.addEventListener('click',()=>{
    if(start.disabled)return;
    if(audio.ended||!started)audio.currentTime=0;
    begin();
  });

  const verify=async()=>{
    lockCards();
    start.hidden=true;
    status.textContent='COMPROBANDO UMBRAL SONORO…';
    try{
      const response=await fetch(src,{method:'GET',cache:'no-store',headers:{Range:'bytes=0-1'}});
      if(!response.ok){markMissing();return;}
      assetReady=true;
      status.textContent='INICIANDO UMBRAL SONORO…';
      begin();
    }catch(_){
      markMissing();
    }
  };

  verify();
})();