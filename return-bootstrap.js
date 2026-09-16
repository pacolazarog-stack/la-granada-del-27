(()=>{
  const SOUND_KEY='volumeSoundMode';
  const PENDING_KEY='volumeReturnPending';
  const ORIGIN_KEY='volumeReturnOrigin';
  const READY_KEY='volumeReturnReady';
  const FLASH_EXIT_KEY='volumeFlashExitOnce';
  const RETURN_DONE_KEY='volumeReturnPlaybackDone';

  const soundEnabled=()=>localStorage.getItem(SOUND_KEY)!=='off';
  const params=new URLSearchParams(location.search);
  const explicit=(params.get('return')||'').trim().toLowerCase();
  const playedParam=params.get('returnPlayed')==='1';
  let playedSession=false;
  try{playedSession=sessionStorage.getItem(RETURN_DONE_KEY)==='1';}catch(_){}

  if(playedParam||playedSession){
    localStorage.removeItem(PENDING_KEY);
    localStorage.removeItem(ORIGIN_KEY);
    localStorage.removeItem('volumeResumeBook');
    try{
      sessionStorage.removeItem(READY_KEY);
      sessionStorage.removeItem(RETURN_DONE_KEY);
      sessionStorage.setItem(FLASH_EXIT_KEY,'1');
    }catch(_){}
  }else{
    let skipFinal=false;
    try{skipFinal=sessionStorage.getItem(FLASH_EXIT_KEY)==='1';}catch(_){}

    if(skipFinal){
      localStorage.removeItem(PENDING_KEY);
      localStorage.removeItem(ORIGIN_KEY);
      try{sessionStorage.removeItem(READY_KEY);}catch(_){}
    }else if(soundEnabled()&&explicit){
      localStorage.setItem(ORIGIN_KEY,explicit);
      localStorage.setItem(PENDING_KEY,'1');
      try{sessionStorage.setItem(READY_KEY,explicit);}catch(_){}
    }
  }

  if(params.has('return')||params.has('rt')||params.has('returnPlayed')){
    params.delete('return');
    params.delete('rt');
    params.delete('returnPlayed');
    const q=params.toString();
    const clean=location.pathname+(q?`?${q}`:'')+location.hash;
    history.replaceState(history.state,'',clean);
  }
})();
