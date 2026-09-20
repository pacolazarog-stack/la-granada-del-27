(()=>{
  const flashBtn=document.querySelector('.final-flash-btn');
  const exitBtn=document.querySelector('.final-exit-btn');
  if(!flashBtn||!exitBtn)return;

  const VIDEO_SRC='video/04%20-%20Firework_recortado_0.3s.mp4';
  const COMPLETE_KEY='volumeFlashCompleted';
  const EXIT_ONCE_KEY='volumeFlashExitOnce';
  let playing=false,wasSoundOn=false;

  const soundEnabled=()=>window.VOLUME_AUDIO?.isEnabled?.() ?? localStorage.getItem('volumeSoundMode')!=='off';
  const completed=()=>{try{return sessionStorage.getItem(COMPLETE_KEY)==='1';}catch(_){return false;}};
  const setCompleted=()=>{try{sessionStorage.setItem(COMPLETE_KEY,'1');}catch(_){}localStorage.setItem('volumeCompletedAt',String(Date.now()));};
  const dispatchSound=enabled=>document.dispatchEvent(new CustomEvent('volume:soundchange',{detail:{enabled,source:'final-flash'}}));

  const overlay=document.createElement('div');
  overlay.id='finalFlashOverlay';
  overlay.setAttribute('aria-hidden','true');
  Object.assign(overlay.style,{position:'fixed',inset:'0',zIndex:'40000',background:'#000',display:'none',placeItems:'center',opacity:'0',pointerEvents:'none',transition:'opacity .22s ease'});

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

  const showOverlay=()=>{overlay.style.display='grid';overlay.style.pointerEvents='auto';overlay.setAttribute('aria-hidden','false');requestAnimationFrame(()=>{overlay.style.opacity='1';});};
  const hideOverlay=()=>{overlay.style.opacity='0';overlay.style.pointerEvents='none';overlay.setAttribute('aria-hidden','true');setTimeout(()=>{overlay.style.display='none';},230);};

  const showExitState=()=>{
    playing=false;
    flashBtn.disabled=false;
    flashBtn.hidden=false;
    flashBtn.style.display='inline-block';
    flashBtn.textContent='& flash';
    flashBtn.classList.add('is-complete');
    flashBtn.setAttribute('aria-label','Reproducir de nuevo el flash final');
    exitBtn.hidden=false;
    exitBtn.style.display='inline-block';
    const lock=document.querySelector('.final-lock');if(lock)lock.textContent='FLASH COMPLETADO · SALIDA ABIERTA';
    const note=document.querySelector('.final-note');if(note)note.textContent='El flash se ha completado. Puede volver a reproducirse o cerrar el volumen.';
  };

  const finishFlash=async()=>{
    if(!completed())setCompleted();
    msg.textContent='';
    try{if(document.fullscreenElement)await document.exitFullscreen();}catch(_){}
    hideOverlay();
    setTimeout(()=>{showExitState();flashBtn.focus({preventScroll:true});},260);
  };

  const failFlash=()=>{
    playing=false;
    try{if(document.fullscreenElement)document.exitFullscreen();}catch(_){}
    hideOverlay();
    if(wasSoundOn)dispatchSound(true);
    flashBtn.disabled=false;
    flashBtn.hidden=false;
    flashBtn.style.display='inline-block';
    msg.textContent='';

    if(completed()){
      showExitState();
      const note=document.querySelector('.final-note');if(note)note.textContent='La repetición del flash no se ha podido iniciar. La salida sigue abierta.';
      return;
    }

    flashBtn.classList.remove('is-complete');
    flashBtn.textContent='& flash · REINTENTAR';
    flashBtn.setAttribute('aria-label','Reintentar el flash final obligatorio');
    exitBtn.hidden=true;
    exitBtn.style.display='none';
    const note=document.querySelector('.final-note');if(note)note.textContent='El flash no se ha podido reproducir. Debe completarse para cerrar el volumen.';
  };

  const playFlash=async()=>{
    if(playing||flashBtn.disabled)return;
    playing=true;
    flashBtn.disabled=true;
    flashBtn.textContent='FLASH EN CURSO…';
    try{window.speechSynthesis?.cancel?.();}catch(_){}
    wasSoundOn=soundEnabled();
    if(wasSoundOn)dispatchSound(false);
    video.muted=!wasSoundOn;
    video.currentTime=0;
    msg.textContent=completed()?'FLASH FINAL · REPETICIÓN · 9,70 s':'FLASH FINAL · 9,70 s';
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

  flashBtn.addEventListener('click',playFlash);
  exitBtn.addEventListener('click',leaveVolume);
  video.addEventListener('ended',finishFlash);
  video.addEventListener('error',failFlash);
  document.addEventListener('volume:soundchange',ev=>{if(playing&&ev.detail?.source!=='final-flash')video.muted=!Boolean(ev.detail?.enabled);});

  if(completed())showExitState();
})();