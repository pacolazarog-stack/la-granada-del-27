(()=>{
  if((document.body.dataset.bookId||'')!=='granada')return;
  let bar=null;

  function clearBookState(){
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
    localStorage.removeItem('bookMusicState:granada');
    try{
      sessionStorage.removeItem('volumeReturnReady');
      sessionStorage.removeItem('volumeReturnPlaybackDone');
    }catch(_){}
    try{window.speechSynthesis?.cancel?.();}catch(_){}
  }

  function restart(){
    clearBookState();
    const u=new URL(location.href);
    u.searchParams.delete('return');
    u.searchParams.delete('returnPlayed');
    u.searchParams.delete('rt');
    u.searchParams.set('restartBook',String(Date.now()));
    u.hash='bookview';
    location.replace(u.href);
  }

  function toVolume(){
    const gate=window.BOOK_AUDIO_GATE;
    if(gate&&typeof gate.requestExit==='function'){gate.requestExit();return;}
    const audio=window.VOLUME_AUDIO;
    if(audio&&typeof audio.playReturnTransition==='function'&&audio.isEnabled?.()){
      audio.playReturnTransition('granada');return;
    }
    location.href='index.html';
  }

  function mount(){
    if(bar)return;
    bar=document.createElement('div');
    bar.id='granadaCodaActions';
    Object.assign(bar.style,{position:'fixed',left:'50%',bottom:'18px',transform:'translateX(-50%)',zIndex:'10020',display:'flex',gap:'10px',alignItems:'center',justifyContent:'center',flexWrap:'wrap',padding:'9px 11px',border:'1px solid rgba(255,255,255,.28)',borderRadius:'999px',background:'rgba(19,16,14,.95)',boxShadow:'0 9px 30px rgba(0,0,0,.38)'});
    const start=document.createElement('button');
    const volume=document.createElement('button');
    [start,volume].forEach(b=>{b.type='button';b.className='btn';});
    start.textContent='⟪ Inicio del libro';
    start.title='Reiniciar La Granada del 27 sin bucle ni contrapunto';
    start.onclick=restart;
    volume.textContent='Inicio del volumen →';
    volume.title='Volver al volumen total con contrapunto de retorno';
    volume.onclick=toVolume;
    bar.append(start,volume);
    document.body.appendChild(bar);
  }

  document.addEventListener('coda:complete',mount);
})();