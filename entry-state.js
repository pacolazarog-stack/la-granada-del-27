(()=>{
  const name=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const isHome=name===''||name==='index.html';
  const PRELUDE_BOOT_KEY='volumePreludeGateV20260916';

  if(isHome){
    let booted=false,returnReady='',away='';
    try{
      booted=sessionStorage.getItem(PRELUDE_BOOT_KEY)==='1';
      returnReady=sessionStorage.getItem('volumeReturnReady')||'';
      away=sessionStorage.getItem('volumeAwayFromHome')||'';
    }catch(_){}
    const q=new URLSearchParams(location.search);
    const returning=localStorage.getItem('volumeReturnPending')==='1'||Boolean(returnReady)||Boolean(away)||q.has('return')||q.has('returnPlayed');

    // Una entrada nueva al volumen debe empezar con el preludio realmente pendiente.
    // Se invalidan los estados heredados de versiones anteriores una sola vez por pestaña/sesión.
    if(!booted&&!returning){
      localStorage.removeItem('volumeIntroCompleted');
      localStorage.removeItem('volumeSoundMode');
      try{sessionStorage.setItem(PRELUDE_BOOT_KEY,'1');}catch(_){}
    }
  }

  if(name==='final.html'){
    // El flash final se acredita únicamente después de terminar el vídeo en ESTA entrada al cierre.
    // sessionStorage sobrevivía a recargas/navegaciones y podía mostrarlo ya completado.
    try{sessionStorage.removeItem('volumeFlashCompleted');}catch(_){}
  }
})();
