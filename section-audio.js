(()=>{
  const src=document.body.dataset.audioSrc||'';
  if(!src)return;

  const targetVolume=0.76;
  const crossfadeSeconds=4.0;
  const players=[new Audio(src),new Audio(src)];
  players.forEach(a=>{
    a.preload='auto';
    a.playsInline=true;
    a.loop=false;
    a.volume=0;
  });

  let current=0;
  let crossfading=false;
  let fallback=null;
  let raf=0;

  const active=()=>players[current];
  const standby=()=>players[1-current];

  const removeFallback=()=>{
    if(fallback){fallback.remove();fallback=null;}
  };

  const makeFallback=()=>{
    if(fallback)return;
    fallback=document.createElement('button');
    fallback.type='button';
    fallback.textContent='▶ SONIDO';
    fallback.setAttribute('aria-label','Iniciar música de esta sección');
    Object.assign(fallback.style,{
      position:'fixed',right:'14px',bottom:'14px',zIndex:'9999',
      border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',
      background:'#211d19',color:'#f4ede5',padding:'9px 13px',
      font:'11px Georgia, serif',letterSpacing:'.08em',cursor:'pointer'
    });
    fallback.addEventListener('click',async()=>{
      try{
        const a=active();
        a.volume=targetVolume;
        await a.play();
        removeFallback();
      }catch(_){/* permanece disponible */}
    });
    document.body.appendChild(fallback);
  };

  const doCrossfade=async()=>{
    if(crossfading)return;
    const from=active(),to=standby();
    if(!Number.isFinite(from.duration)||from.duration<=crossfadeSeconds+1)return;
    crossfading=true;
    try{
      to.currentTime=0;
      to.volume=0;
      await to.play();
      const start=performance.now();
      const step=(now)=>{
        const p=Math.min(1,(now-start)/(crossfadeSeconds*1000));
        from.volume=targetVolume*(1-p);
        to.volume=targetVolume*p;
        if(p<1){raf=requestAnimationFrame(step);return;}
        from.pause();
        from.currentTime=0;
        from.volume=0;
        current=1-current;
        crossfading=false;
      };
      raf=requestAnimationFrame(step);
    }catch(_){
      crossfading=false;
      to.pause();
      to.currentTime=0;
      from.loop=true;
    }
  };

  const monitor=setInterval(()=>{
    const a=active();
    if(a.paused||crossfading||!Number.isFinite(a.duration)||a.duration<=0)return;
    if(a.currentTime>=Math.max(0,a.duration-crossfadeSeconds))doCrossfade();
  },120);

  players.forEach(a=>{
    a.addEventListener('playing',removeFallback);
    a.addEventListener('error',()=>{
      if(a===active())removeFallback();
    });
    a.addEventListener('ended',async()=>{
      if(crossfading)return;
      a.currentTime=0;
      a.volume=targetVolume;
      try{await a.play();}catch(_){makeFallback();}
    });
  });

  const start=async()=>{
    const a=active();
    a.volume=targetVolume;
    try{await a.play();removeFallback();}
    catch(_){makeFallback();}
  };

  addEventListener('pagehide',()=>{
    clearInterval(monitor);
    if(raf)cancelAnimationFrame(raf);
    players.forEach(a=>a.pause());
  },{once:true});

  start();
})();