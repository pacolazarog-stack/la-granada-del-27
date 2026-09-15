(()=>{
  const src=document.body.dataset.audioSrc||'';
  if(!src)return;
  const audio=new Audio(src);
  audio.preload='auto';
  audio.loop=true;
  audio.playsInline=true;
  audio.volume=0.78;
  let fallback=null;

  const removeFallback=()=>{
    if(fallback){fallback.remove();fallback=null;}
  };

  const makeFallback=()=>{
    if(fallback)return;
    fallback=document.createElement('button');
    fallback.type='button';
    fallback.textContent='▶ SONIDO';
    fallback.setAttribute('aria-label','Iniciar música de esta obra');
    Object.assign(fallback.style,{
      position:'fixed',right:'14px',bottom:'14px',zIndex:'9999',
      border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',
      background:'#211d19',color:'#f4ede5',padding:'9px 13px',
      font:'11px Georgia, serif',letterSpacing:'.08em',cursor:'pointer'
    });
    fallback.addEventListener('click',async()=>{
      try{await audio.play();removeFallback();}catch(_){/* permanece disponible */}
    });
    document.body.appendChild(fallback);
  };

  audio.addEventListener('error',removeFallback);
  audio.addEventListener('playing',removeFallback);

  const start=async()=>{
    try{await audio.play();}
    catch(_){makeFallback();}
  };

  start();
})();