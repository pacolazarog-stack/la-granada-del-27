(()=>{
  if(document.body.dataset.bookId!=='miramar')return;

  /* Banda del canon musical actualmente cargado: escenas 01–07. */
  const AUDIO_SRC='https://gcdn.picsart.com/editing-temp/8d08dd1a-0908-49b3-8d6d-1c6ac3716eb7.mpeg';
  const START=[0,68.836,174.200,249.202,305.340,469.228,574.710,723.848];
  const TITLES=[
    'MIRAMAR COMUNIDAD',
    'OK',
    'EL CUERPO',
    'CLAC',
    'NADIE',
    'NACE EL CONFLICTO',
    'PRIMERA INCURSIÓN TERRESTRE'
  ];
  const MAX_SCENE=TITLES.length;

  const pref=window.VOLUME_AUDIO||{isEnabled:()=>localStorage.getItem('volumeSoundMode')!=='off'};
  const enabled=()=>pref.isEnabled();
  const targetVolume=.86;
  const player=new Audio(AUDIO_SRC);
  player.preload='metadata';player.playsInline=true;player.loop=false;player.volume=targetVolume;

  const foyerSrc=document.body.dataset.foyerSrc||'';
  const foyer=foyerSrc?new Audio(foyerSrc):null;
  if(foyer){foyer.preload='metadata';foyer.playsInline=true;foyer.loop=true;foyer.volume=.72;}

  let state='cover',scene=null,currentScene=null,segmentEnd=0,fallback=null,token=0;
  let monitor=0;

  const cue=n=>({start:START[n-1],end:START[n]});

  function removeFallback(){if(fallback){fallback.remove();fallback=null;}}
  function makeFallback(label,fn){
    if(fallback){fallback.textContent=label;fallback.onclick=fn;return;}
    fallback=document.createElement('button');fallback.type='button';fallback.textContent=label;
    fallback.setAttribute('aria-label',label.replace(/^▶\s*/,''));
    Object.assign(fallback.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'12020',border:'1px solid rgba(255,255,255,.38)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'9px 13px',font:'11px Georgia,serif',letterSpacing:'.07em',cursor:'pointer',maxWidth:'min(78vw,420px)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'});
    fallback.onclick=fn;document.body.appendChild(fallback);
  }

  const removeSilentGateButton=()=>{
    document.querySelectorAll('button').forEach(b=>{if((b.textContent||'').trim()==='▶ SONIDO')b.remove();});
  };
  new MutationObserver(removeSilentGateButton).observe(document.body,{childList:true,subtree:true});
  removeSilentGateButton();

  const stopFoyer=()=>{if(foyer){foyer.pause();foyer.currentTime=0;}};
  const pauseScene=()=>player.pause();
  const stopScene=()=>{pauseScene();currentScene=null;segmentEnd=0;};

  async function safePlay(audio,label,retry){
    try{await audio.play();removeFallback();return true;}
    catch(_){makeFallback(label,retry);return false;}
  }

  function playFoyer(){
    if(!foyer||!enabled()||state!=='cover')return;
    pauseScene();currentScene=null;segmentEnd=0;
    foyer.currentTime=0;
    safePlay(foyer,'▶ MÚSICA · PORTADA',()=>playFoyer());
  }

  function playScene(n,{restart=true}={}){
    if(!enabled()||state!=='text'||!Number.isInteger(n)||n<1||n>MAX_SCENE)return;
    const c=cue(n);
    stopFoyer();

    if(currentScene===n&&!restart){
      if(player.paused&&player.currentTime<c.end-.06)safePlay(player,`▶ MÚSICA · ESCENA ${String(n).padStart(2,'0')}`,()=>playScene(n,{restart:false}));
      return;
    }

    const myToken=++token;
    currentScene=n;segmentEnd=c.end;
    const launch=()=>{
      if(myToken!==token||!enabled()||state!=='text'||scene!==n)return;
      try{player.currentTime=Math.min(c.start,Math.max(0,(Number.isFinite(player.duration)?player.duration-.03:c.start)));}catch(_){}
      safePlay(player,`▶ MÚSICA · ESCENA ${String(n).padStart(2,'0')}`,()=>playScene(n,{restart:true}));
      document.dispatchEvent(new CustomEvent('miramar:sceneaudio',{detail:{scene:n,title:TITLES[n-1],state:'playing'}}));
    };
    if(player.readyState<1)player.addEventListener('loadedmetadata',launch,{once:true});else launch();
  }

  monitor=setInterval(()=>{
    if(!currentScene||state!=='text')return;
    if(!player.paused&&player.currentTime>=segmentEnd-.025){
      player.pause();
      try{player.currentTime=Math.min(segmentEnd,Number.isFinite(player.duration)?player.duration:segmentEnd);}catch(_){}
      removeFallback();
      document.dispatchEvent(new CustomEvent('miramar:sceneaudio',{detail:{scene:currentScene,title:TITLES[currentScene-1],state:'ended'}}));
    }
  },60);

  document.addEventListener('book:state',ev=>{
    state=ev.detail?.state||state;
    const incoming=Number(ev.detail?.scene);
    if(state==='cover'){
      scene=null;stopScene();removeFallback();if(enabled())playFoyer();return;
    }
    if(state==='text'&&Number.isInteger(incoming)&&incoming>=1&&incoming<=MAX_SCENE){
      const changed=incoming!==scene;scene=incoming;
      if(changed)playScene(scene,{restart:true});
      else playScene(scene,{restart:false});
      return;
    }
    scene=null;++token;stopFoyer();stopScene();removeFallback();
  });

  document.addEventListener('volume:soundchange',ev=>{
    const on=Boolean(ev.detail?.enabled);
    if(!on){++token;stopFoyer();pauseScene();removeFallback();return;}
    if(state==='cover')playFoyer();
    else if(state==='text'&&scene)playScene(scene,{restart:true});
  });

  addEventListener('pagehide',()=>{++token;stopFoyer();pauseScene();removeFallback();if(monitor)clearInterval(monitor);},{once:true});

  window.MIRAMAR_SCENE_AUDIO={
    play:n=>{scene=Number(n);state='text';playScene(scene,{restart:true});},
    stop:()=>{++token;stopFoyer();stopScene();removeFallback();},
    getState:()=>({state,scene,currentScene,segmentEnd,enabled:enabled(),maxScene:MAX_SCENE})
  };
})();