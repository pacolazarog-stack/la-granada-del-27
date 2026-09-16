(()=>{
  if(document.body.dataset.bookId!=='miramar')return;

  /*
    Banda musical canónica de las 30 escenas.
    Fuente: LA_TERRAZA_DEL_MIRAMAR_30_ESCENAS_MASTER_CONTINUO_V2_20260907.mp3
    Se sirve en dos bloques continuos por límite de alojamiento; los 30 cues conservan
    exactamente los timecodes V2. Una escena nunca invade sonoramente la siguiente:
    al alcanzar su cue final, queda en silencio hasta que el lector abra la siguiente.
  */
  const CHUNKS={
    A:{src:'https://gcdn.picsart.com/editing-temp/8d08dd1a-0908-49b3-8d6d-1c6ac3716eb7.mpeg',base:0,last:15},
    B:{src:'https://gcdn.picsart.com/editing-temp/78a2a9c7-3f94-4147-8594-49d9c30326fb.mpeg',base:1818.910,last:30}
  };
  const START=[
    0,68.836,174.200,249.202,305.340,469.228,574.710,723.848,849.826,984.106,
    1080.818,1237.410,1393.700,1489.870,1694.158,1818.910,1897.198,2005.238,
    2115.724,2278.337,2401.231,2488.871,2593.401,2682.139,2766.557,2866.197,
    3001.949,3150.780,3235.728,3601.008
  ];
  const MASTER_END=3797.688;
  const TITLES=[
    'Primer WhatsApp','Dos letras y un desastre','El cuerpo en casa','CLAC',
    'Donde antes no había escena','No es que mire','Primera incursión terrestre','Diecisiete con cuatro',
    'La comunidad toma la palabra','Primera votación','Antiguo Testamento del bloque','Dos cosas ciertas',
    'Ropa · frontera · muro','Toga · bandera · reina','Ganar una cárcel','El viento recurre',
    'El sol da fe','Señoría: la sábana','Informe del informe','El edificio es un ojo',
    'Innovar para no hablar','El sistema perfecto','Junta de una sola persona','Catastro del cotilleo',
    'Vicente puso una sábana','La ausencia también ocupa','No te miro. Pero me mides','¿Cómo seguimos?',
    '¡HE! COMUNIDAD','Diez minutos'
  ];

  const pref=window.VOLUME_AUDIO||{isEnabled:()=>localStorage.getItem('volumeSoundMode')!=='off'};
  const enabled=()=>pref.isEnabled();
  const targetVolume=.86;
  const players={A:new Audio(CHUNKS.A.src),B:new Audio(CHUNKS.B.src)};
  Object.values(players).forEach(a=>{a.preload='metadata';a.playsInline=true;a.loop=false;a.volume=targetVolume;});

  const foyerSrc=document.body.dataset.foyerSrc||'';
  const foyer=foyerSrc?new Audio(foyerSrc):null;
  if(foyer){foyer.preload='metadata';foyer.playsInline=true;foyer.loop=true;foyer.volume=.72;}

  let state='cover',scene=null,currentScene=null,currentKey=null,segmentEnd=0,fallback=null,token=0;
  let monitor=0;

  const chunkKey=n=>n<=15?'A':'B';
  const cue=n=>{
    const key=chunkKey(n),chunk=CHUNKS[key];
    const start=START[n-1]-chunk.base;
    const globalEnd=n<30?START[n]:MASTER_END;
    const end=globalEnd-chunk.base;
    return{key,start:Math.max(0,start),end:Math.max(0,end)};
  };

  function removeFallback(){if(fallback){fallback.remove();fallback=null;}}
  function makeFallback(label,fn){
    if(fallback){fallback.textContent=label;fallback.onclick=fn;return;}
    fallback=document.createElement('button');fallback.type='button';fallback.textContent=label;
    fallback.setAttribute('aria-label',label.replace(/^▶\s*/,''));
    Object.assign(fallback.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'12020',border:'1px solid rgba(255,255,255,.38)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'9px 13px',font:'11px Georgia,serif',letterSpacing:'.07em',cursor:'pointer',maxWidth:'min(78vw,420px)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'});
    fallback.onclick=fn;document.body.appendChild(fallback);
  }

  /* section-audio mantiene la lógica de coda/salida con una pista muda de control.
     Si el navegador bloquea esa pista muda, su botón genérico no debe competir con
     el botón real de la escena. */
  const removeSilentGateButton=()=>{
    document.querySelectorAll('button').forEach(b=>{if((b.textContent||'').trim()==='▶ SONIDO')b.remove();});
  };
  new MutationObserver(removeSilentGateButton).observe(document.body,{childList:true,subtree:true});
  removeSilentGateButton();

  const stopFoyer=()=>{if(foyer){foyer.pause();foyer.currentTime=0;}};
  const pauseScenes=()=>{Object.values(players).forEach(a=>a.pause());};
  const stopScenes=()=>{pauseScenes();currentScene=null;currentKey=null;segmentEnd=0;};

  async function safePlay(audio,label,retry){
    try{await audio.play();removeFallback();return true;}
    catch(_){makeFallback(label,retry);return false;}
  }

  function playFoyer(){
    if(!foyer||!enabled()||state!=='cover')return;
    pauseScenes();currentScene=null;currentKey=null;segmentEnd=0;
    foyer.currentTime=0;
    safePlay(foyer,'▶ MÚSICA · PORTADA',()=>playFoyer());
  }

  function playScene(n,{restart=true}={}){
    if(!enabled()||state!=='text'||!Number.isInteger(n)||n<1||n>30)return;
    const c=cue(n),a=players[c.key];
    stopFoyer();
    Object.entries(players).forEach(([k,p])=>{if(k!==c.key)p.pause();});

    if(currentScene===n&&!restart){
      if(a.paused&&a.currentTime<c.end-.06)safePlay(a,`▶ MÚSICA · ESCENA ${String(n).padStart(2,'0')}`,()=>playScene(n,{restart:false}));
      return;
    }

    const myToken=++token;
    currentScene=n;currentKey=c.key;segmentEnd=c.end;
    const launch=()=>{
      if(myToken!==token||!enabled()||state!=='text'||scene!==n)return;
      try{a.currentTime=Math.min(c.start,Math.max(0,(Number.isFinite(a.duration)?a.duration-.03:c.start)));}catch(_){}
      safePlay(a,`▶ MÚSICA · ESCENA ${String(n).padStart(2,'0')}`,()=>playScene(n,{restart:true}));
      document.dispatchEvent(new CustomEvent('miramar:sceneaudio',{detail:{scene:n,title:TITLES[n-1],state:'playing'}}));
    };
    if(a.readyState<1)a.addEventListener('loadedmetadata',launch,{once:true});else launch();
  }

  monitor=setInterval(()=>{
    if(!currentKey||!currentScene||state!=='text')return;
    const a=players[currentKey];
    if(!a.paused&&a.currentTime>=segmentEnd-.025){
      a.pause();
      try{a.currentTime=Math.min(segmentEnd,Number.isFinite(a.duration)?a.duration:segmentEnd);}catch(_){}
      removeFallback();
      document.dispatchEvent(new CustomEvent('miramar:sceneaudio',{detail:{scene:currentScene,title:TITLES[currentScene-1],state:'ended'}}));
    }
  },60);

  document.addEventListener('book:state',ev=>{
    state=ev.detail?.state||state;
    const incoming=Number(ev.detail?.scene);
    if(state==='cover'){
      scene=null;stopScenes();removeFallback();if(enabled())playFoyer();return;
    }
    if(state==='text'&&Number.isInteger(incoming)&&incoming>=1&&incoming<=30){
      const changed=incoming!==scene;scene=incoming;
      if(changed)playScene(scene,{restart:true});
      else playScene(scene,{restart:false});
      return;
    }
    scene=null;++token;stopFoyer();stopScenes();removeFallback();
  });

  document.addEventListener('volume:soundchange',ev=>{
    const on=Boolean(ev.detail?.enabled);
    if(!on){++token;stopFoyer();pauseScenes();removeFallback();return;}
    if(state==='cover')playFoyer();
    else if(state==='text'&&scene)playScene(scene,{restart:true});
  });

  addEventListener('pagehide',()=>{++token;stopFoyer();pauseScenes();removeFallback();if(monitor)clearInterval(monitor);},{once:true});

  window.MIRAMAR_SCENE_AUDIO={
    play:n=>{scene=Number(n);state='text';playScene(scene,{restart:true});},
    stop:()=>{++token;stopFoyer();stopScenes();removeFallback();},
    getState:()=>({state,scene,currentScene,currentKey,segmentEnd,enabled:enabled()})
  };
})();
