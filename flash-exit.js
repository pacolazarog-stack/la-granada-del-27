(()=>{
  const btn=document.querySelector('.final-flash-btn');
  if(!btn)return;

  const VIDEO_SRC='video/04%20-%20Firework_recortado_0.3s.mp4';
  const COMPLETE_KEY='volumeFlashCompleted';
  const EXIT_ONCE_KEY='volumeFlashExitOnce';
  let playing=false;

  const soundEnabled=()=>window.VOLUME_AUDIO?.isEnabled?.() ?? localStorage.getItem('volumeSoundMode')!=='off';
  const completed=()=>{try{return sessionStorage.getItem(COMPLETE_KEY)==='1';}catch(_){return false;}};
  const setCompleted=()=>{try{sessionStorage.setItem(COMPLETE_KEY,'1');}catch(_){}localStorage.setItem('volumeCompletedAt',String(Date.now()));};

  const overlay=document.createElement('div');
  overlay.id='finalFlashOverlay';
  overlay.hidden=true;
  Object.assign(overlay.style,{
    position:'fixed',inset:'0',zIndex:'40000',background:'#000',display:'grid',placeItems:'center',
    opacity:'0',transition:'opacity .22s ease'
  });
  const video=document.createElement('video');
  video.id='finalFlashVideo';
  video.src=VIDEO_SRC;
  video.preload='auto';
  video.playsInline=true;
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');
  video.disablePictureInPicture=true;
  video.controls=false;
  Object.assign(video.style,{width:'100vw',height:'100vh',objectFit:'contain',background:'#000'});
  const msg=document.createElement('div');
  msg.id='finalFlashMessage';
  Object.assign(msg.style,{position:'absolute',left:'50%',bottom:'26px',transform:'translateX(-50%)',font:'11px Georgia,serif',letterSpacing:'.1em',color:'rgba(255,255,255,.72)',textAlign:'center'});
  overlay.append(video,msg);
  document.body.appendChild(overlay);

  const showOverlay=()=>{
    overlay.hidden=false;
    requestAnimationFrame(()=>{overlay.style.opacity='1';});
  };
  const hideOverlay=()=>{
    overlay.style.opacity='0';
    setTimeout(()=>{overlay.hidden=true;},230);
  };

  const showExitState=()=>{
    playing=false;
    btn.disabled=false;
    btn.textContent='SALIR DEL VOLUMEN →';
    btn.classList.add('is-complete');
    btn.setAttribute('aria-label','Salir del volumen; flash completado');
    const note=document.querySelector('.final-note');
    if(note)note.textContent='El flash se ha completado. El volumen puede cerrarse.';
  };

  const finishFlash=async()=>{
    setCompleted();
    msg.textContent='';
    try{if(document.fullscreenElement)await document.exitFullscreen();}catch(_){}
    hideOverlay();
    setTimeout(()=>{showExitState();btn.focus({preventScroll:true});},260);
  };

  const failFlash=()=>{
    playing=false;
    try{if(document.fullscreenElement)document.exitFullscreen();}catch(_){}
    hideOverlay();
    btn.disabled=false;
    btn.textContent='& flash · REINTENTAR';
    msg.textContent='';
    const note=document.querySelector('.final-note');
    if(note)note.textContent='El flash no se ha podido reproducir. Debe completarse para cerrar el volumen.';
  };

  const playFlash=async()=>{
    if(playing)return;
    playing=true;
    btn.disabled=true;
    btn.textContent='FLASH EN CURSO…';
    try{window.speechSynthesis?.cancel?.();}catch(_){}
    document.dispatchEvent(new CustomEvent('volume:flashstart'));
    video.muted=!soundEnabled();
    video.currentTime=0;
    msg.textContent='FLASH FINAL · 9,70 s';
    showOverlay();
    try{
      await video.play();
      try{await video.requestFullscreen?.();}catch(_){}
    }catch(_){failFlash();}
  };

  const leaveVolume=()=>{
    try{
      sessionStorage.setItem(EXIT_ONCE_KEY,'1');
      sessionStorage.removeItem('volumeReturnReady');
      sessionStorage.removeItem('volumeAwayFromHome');
    }catch(_){}
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
    location.href='index.html';
  };

  btn.addEventListener('click',()=>{
    if(completed()||btn.classList.contains('is-complete')){leaveVolume();return;}
    playFlash();
  });
  video.addEventListener('ended',finishFlash);
  video.addEventListener('error',failFlash);
  document.addEventListener('volume:soundchange',ev=>{if(playing)video.muted=!Boolean(ev.detail?.enabled);});

  if(completed())showExitState();
})();
