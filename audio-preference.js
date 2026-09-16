(()=>{
  const SOUND_KEY='volumeSoundMode';
  const VOICE_KEY='volumeVoiceMode';
  const INTRO_KEY='volumeIntroCompleted';
  const RETURN_DONE_KEY='volumeReturnPlaybackDone';
  const RETURN_SOURCES=['audio/RETORNO_1.mp3','audio/RETORNO_2.mp3'];
  const RETURN_BOOKS=new Set(['granada','paco','miramar','ensayo']);
  let soundBtn=null,voiceBtn=null,wrap=null,returning=false,returnAudio=null,returnOverlay=null;

  const soundMode=()=>localStorage.getItem(SOUND_KEY)||'';
  const voiceMode=()=>localStorage.getItem(VOICE_KEY)||'';
  const isChosen=()=>soundMode()==='on'||soundMode()==='off';
  const isVoiceChosen=()=>voiceMode()==='on'||voiceMode()==='off';
  const isEnabled=()=>soundMode()!=='off';
  const isVoiceEnabled=()=>voiceMode()==='on';
  const introCompleted=()=>localStorage.getItem(INTRO_KEY)==='1';

  const clearPendingAudio=()=>{
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
  };

  const baseButtonStyle={
    border:'1px solid rgba(255,255,255,.28)',borderRadius:'999px',
    background:'rgba(22,19,16,.72)',color:'#f4ede5',padding:'8px 12px',
    font:'11px Georgia,serif',letterSpacing:'.07em',cursor:'pointer',
    boxShadow:'0 5px 18px rgba(0,0,0,.22)',backdropFilter:'blur(4px)',whiteSpace:'nowrap'
  };

  function paintButton(btn,active){
    if(!btn)return;
    btn.style.background=active?'#f4ede5':'rgba(22,19,16,.72)';
    btn.style.color=active?'#211d19':'#f4ede5';
    btn.style.borderColor=active?'#f4ede5':'rgba(255,255,255,.28)';
    btn.style.opacity=active?'1':'.78';
  }

  const syncButtons=()=>{
    const musical=isEnabled()&&!isVoiceEnabled();
    const textual=isVoiceEnabled();
    if(soundBtn){
      soundBtn.textContent='♫  MUSICAL';
      soundBtn.setAttribute('aria-pressed',musical?'true':'false');
      soundBtn.title=musical?'Modo musical activo · pulsar para silenciar':'Activar modo musical';
      paintButton(soundBtn,musical);
    }
    if(voiceBtn){
      voiceBtn.textContent='Aa  TEXTUAL';
      voiceBtn.setAttribute('aria-pressed',textual?'true':'false');
      voiceBtn.title=textual?'Lectura textual activa · pulsar para detener':'Activar lectura textual';
      paintButton(voiceBtn,textual);
    }
    document.documentElement.classList.toggle('volume-sound-off',!isEnabled());
    document.documentElement.classList.toggle('volume-voice-on',isVoiceEnabled());
    document.documentElement.dataset.mediaMode=textual?'textual':musical?'musical':'silent';
  };

  const emitSound=(enabled,source)=>document.dispatchEvent(new CustomEvent('volume:soundchange',{detail:{enabled,source}}));
  const emitVoice=(enabled,source)=>document.dispatchEvent(new CustomEvent('volume:voicechange',{detail:{enabled,source}}));

  const setEnabled=(enabled,source='global-toggle')=>{
    const wasSound=isEnabled();
    const wasVoice=isVoiceEnabled();
    if(enabled&&wasVoice){
      localStorage.setItem(VOICE_KEY,'off');
      emitVoice(false,source);
    }
    localStorage.setItem(SOUND_KEY,enabled?'on':'off');
    if(!enabled)clearPendingAudio();
    syncButtons();
    if(wasSound!==enabled||source!=='global-toggle')emitSound(enabled,source);
  };

  const setVoiceEnabled=(enabled,source='global-toggle')=>{
    const wasVoice=isVoiceEnabled();
    const wasSound=isEnabled();
    if(enabled&&wasSound){
      localStorage.setItem(SOUND_KEY,'off');
      clearPendingAudio();
      emitSound(false,source);
    }
    localStorage.setItem(VOICE_KEY,enabled?'on':'off');
    syncButtons();
    if(wasVoice!==enabled||source!=='global-toggle')emitVoice(enabled,source);
  };

  const selectMusical=()=>{
    const active=isEnabled()&&!isVoiceEnabled();
    if(active)setEnabled(false,'mode-musical');
    else setEnabled(true,'mode-musical');
  };
  const selectTextual=()=>{
    if(isVoiceEnabled())setVoiceEnabled(false,'mode-textual');
    else setVoiceEnabled(true,'mode-textual');
  };

  const markIntroCompleted=()=>localStorage.setItem(INTRO_KEY,'1');

  const pageOrigin=()=>{
    const explicit=(document.body?.dataset?.bookId||'').trim().toLowerCase();
    if(explicit)return explicit;
    const name=(location.pathname.split('/').pop()||'').toLowerCase();
    if(name==='granada.html')return'granada';
    if(name==='paco.html')return'paco';
    if(name==='miramar.html')return'miramar';
    if(name==='ensayo.html')return'ensayo';
    if(name==='autor.html')return'autor';
    if(name==='fli.html')return'fli';
    if(name==='final.html')return'final';
    return'site';
  };

  const isHomeTarget=url=>{
    const p=url.pathname.replace(/\/+$/,'');
    const here=location.pathname.replace(/\/+$/,'');
    if(p===here)return false;
    return /\/index\.html$/i.test(p);
  };

  const markExplicitReturn=a=>{
    if(!isEnabled())return;
    let flashExit=false;
    try{flashExit=sessionStorage.getItem('volumeFlashExitOnce')==='1';}catch(_){}
    if(flashExit)return;
    let u;
    try{u=new URL(a.href,location.href);}catch(_){return;}
    if(u.origin!==location.origin||!isHomeTarget(u))return;
    const origin=pageOrigin();
    localStorage.setItem('volumeReturnOrigin',origin);
    localStorage.setItem('volumeReturnPending','1');
    try{sessionStorage.setItem('volumeReturnReady',origin);}catch(_){}
    u.searchParams.set('return',origin);
    u.searchParams.set('rt',String(Date.now()));
    a.href=u.href;
  };

  const ensureReturnOverlay=()=>{
    if(returnOverlay)return returnOverlay;
    returnOverlay=document.createElement('div');
    returnOverlay.id='volumeReturnTransition';
    Object.assign(returnOverlay.style,{position:'fixed',inset:'0',zIndex:'50000',display:'none',placeItems:'center',background:'rgba(10,9,8,.94)',color:'#f4ede5',textAlign:'center',padding:'24px'});
    returnOverlay.innerHTML='<div><div style="font:10px Georgia,serif;letter-spacing:.16em;color:#b9a58f;margin-bottom:14px">REGRESO AL VOLUMEN</div><div style="font:26px Georgia,serif;margin-bottom:18px">Contrapunto de retorno</div><div class="return-status" style="font:11px Georgia,serif;letter-spacing:.08em;color:#b7aa9d">PREPARANDO…</div><button type="button" class="return-retry" style="display:none;margin:20px auto 0;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:#211d19;color:#f4ede5;padding:10px 16px;font:11px Georgia,serif;letter-spacing:.08em;cursor:pointer">▶ REINTENTAR RETORNO</button></div>';
    document.body.appendChild(returnOverlay);
    return returnOverlay;
  };

  const finishReturn=()=>{
    try{sessionStorage.setItem(RETURN_DONE_KEY,'1');}catch(_){}
    clearPendingAudio();
    const u=new URL('index.html',location.href);
    u.searchParams.set('returnPlayed','1');u.searchParams.set('rt',String(Date.now()));
    location.href=u.href;
  };

  const playReturnTransition=origin=>{
    if(returning||!isEnabled()||!RETURN_BOOKS.has(origin))return false;
    returning=true;clearPendingAudio();
    try{sessionStorage.removeItem('volumeReturnReady');window.speechSynthesis?.cancel?.();}catch(_){}
    emitVoice(false,'return-transition');emitSound(false,'return-transition');
    const chosen=RETURN_SOURCES[Math.floor(Math.random()*RETURN_SOURCES.length)];
    const ov=ensureReturnOverlay(),status=ov.querySelector('.return-status'),retry=ov.querySelector('.return-retry');
    ov.style.display='grid';status.textContent=`RETORNO ${chosen.includes('_1')?'1':'2'} · EN CURSO`;retry.style.display='none';
    returnAudio=new Audio(chosen);returnAudio.preload='auto';returnAudio.playsInline=true;returnAudio.volume=.9;
    returnAudio.addEventListener('ended',finishReturn,{once:true});
    returnAudio.addEventListener('error',()=>{returning=false;status.textContent='NO SE HA PODIDO INICIAR EL RETORNO';retry.style.display='inline-flex';},{once:true});
    retry.onclick=()=>{returning=false;ov.style.display='none';playReturnTransition(origin);};
    const p=returnAudio.play();
    if(p&&typeof p.catch==='function')p.catch(()=>{returning=false;status.textContent='EL NAVEGADOR REQUIERE UNA PULSACIÓN';retry.style.display='inline-flex';});
    return true;
  };

  function mountBookNavigation(){
    document.querySelectorAll('.reader-home,.home-link').forEach(a=>{if((a.textContent||'').trim().toUpperCase()==='INICIO')a.textContent='VOLUMEN';});

    const readerNav=document.querySelector('.reader-nav');
    const prev=document.querySelector('#readerPrev'),next=document.querySelector('#readerNext'),jump=document.querySelector('#readerJump');
    if(readerNav&&prev&&next&&!document.querySelector('#readerStart')){
      const start=document.createElement('button'),end=document.createElement('button');
      start.type=end.type='button';start.id='readerStart';end.id='readerEnd';
      start.className=end.className='reader-btn';start.textContent='⟪ Inicio';end.textContent='Final ⟫';
      start.title='Ir al inicio del libro';end.title='Ir a la última página de la obra';
      start.onclick=()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true}));
      end.onclick=()=>{
        const max=Number(jump?.max||0);
        if(max>0){jump.value=max;jump.dispatchEvent(new Event('change',{bubbles:true}));}
      };
      readerNav.insertBefore(start,prev);readerNav.appendChild(end);
    }

    const granadaNav=document.querySelector('#bookview .nav');
    const bp=document.querySelector('#bp'),bn=document.querySelector('#bn');
    if(granadaNav&&bp&&bn&&!document.querySelector('#granadaStart')){
      const start=document.createElement('button'),end=document.createElement('button');
      start.type=end.type='button';start.id='granadaStart';end.id='granadaEnd';
      start.className=end.className='btn';start.textContent='⟪ Inicio';end.textContent='Final ⟫';
      start.onclick=()=>{let guard=0;while(!bp.disabled&&guard++<500)bp.click();};
      end.onclick=()=>{let guard=0;while(!bn.disabled&&guard++<500)bn.click();};
      granadaNav.insertBefore(start,bp);granadaNav.appendChild(end);
    }
  }

  const mount=()=>{
    if(!document.querySelector('#volumeMediaControls')){
      wrap=document.createElement('div');wrap.id='volumeMediaControls';
      Object.assign(wrap.style,{position:'fixed',top:'12px',right:'58px',zIndex:'12000',display:'flex',gap:'8px',alignItems:'center',flexWrap:'nowrap'});
      soundBtn=document.createElement('button');soundBtn.id='volumeSoundToggle';soundBtn.type='button';soundBtn.setAttribute('aria-label','Modo musical');Object.assign(soundBtn.style,baseButtonStyle);soundBtn.addEventListener('click',selectMusical);
      voiceBtn=document.createElement('button');voiceBtn.id='volumeVoiceToggle';voiceBtn.type='button';voiceBtn.setAttribute('aria-label','Modo textual');Object.assign(voiceBtn.style,baseButtonStyle);voiceBtn.addEventListener('click',selectTextual);
      wrap.append(soundBtn,voiceBtn);document.body.appendChild(wrap);
    }
    /* Si una versión anterior dejó ambos modos activos, TEXTUAL tiene prioridad para evitar solapamientos. */
    if(isVoiceEnabled()&&isEnabled())localStorage.setItem(SOUND_KEY,'off');
    syncButtons();mountBookNavigation();
  };

  const installBookGateWrapper=()=>{
    const gate=window.BOOK_AUDIO_GATE;
    if(!gate||gate.__returnWrapped||typeof gate.requestExit!=='function')return;
    const original=gate.requestExit.bind(gate);
    gate.requestExit=()=>{
      if(!isEnabled()||!RETURN_BOOKS.has(pageOrigin()))return original();
      if(typeof gate.canExit==='function'&&!gate.canExit())return original();
      return playReturnTransition(pageOrigin());
    };
    gate.__returnWrapped=true;
  };

  document.addEventListener('click',ev=>{
    const a=ev.target.closest?.('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
    let u;try{u=new URL(a.href,location.href);}catch(_){return;}
    if(u.origin!==location.origin||!isHomeTarget(u))return;
    const origin=pageOrigin(),gate=window.BOOK_AUDIO_GATE;
    if(isEnabled()&&RETURN_BOOKS.has(origin)){
      if(gate&&typeof gate.canExit==='function'&&!gate.canExit())return;
      if(document.body?.dataset?.codaSrc&&!gate)return;
      ev.preventDefault();ev.stopImmediatePropagation();playReturnTransition(origin);return;
    }
    markExplicitReturn(a);
  },true);

  window.VOLUME_AUDIO={
    mode:soundMode,isChosen,isEnabled,setEnabled,selectMusical,
    voiceMode,isVoiceChosen,isVoiceEnabled,setVoiceEnabled,selectTextual,
    introCompleted,markIntroCompleted,clearPendingAudio,syncButton:syncButtons,syncButtons,
    markExplicitReturn,playReturnTransition
  };

  const ready=()=>{mount();setTimeout(installBookGateWrapper,0);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
