(()=>{
  if((document.body?.dataset?.bookId||'')!=='miramar')return;
  const pref=window.VOLUME_AUDIO;
  if(!pref)return;

  let player=null,currentScene=null,lastState={state:'cover',scene:null};
  let coda=null,codaDone=false;
  const codaSrc=document.body.dataset.codaSrc||'';
  const srcFor=n=>`audio/miramar/${String(n).padStart(2,'0')}.mp3`;
  const musicalOn=()=>pref.isEnabled()&&!pref.isVoiceEnabled();

  function stopScene(reset=false){
    if(!player)return;
    try{player.pause();if(reset)player.currentTime=0;}catch(_){}
    if(reset){player=null;currentScene=null;}
  }

  function transient(text){
    let n=document.querySelector('#miramarMusicalNotice');
    if(!n){n=document.createElement('div');n.id='miramarMusicalNotice';Object.assign(n.style,{position:'fixed',left:'50%',bottom:'58px',transform:'translateX(-50%)',zIndex:'10050',padding:'9px 13px',background:'rgba(19,16,14,.94)',color:'#f4ede5',border:'1px solid rgba(255,255,255,.28)',font:'10px Georgia,serif',letterSpacing:'.07em',textAlign:'center'});document.body.appendChild(n);}
    n.textContent=text;n.hidden=false;clearTimeout(n._t);n._t=setTimeout(()=>{n.hidden=true;},2200);
  }

  async function playScene(scene){
    if(!musicalOn()||!Number.isInteger(scene)||scene<1||scene>30){stopScene(false);return;}
    if(currentScene===scene&&player){
      try{await player.play();}catch(_){}
      return;
    }
    stopScene(true);
    currentScene=scene;
    player=new Audio(srcFor(scene));player.preload='auto';player.playsInline=true;player.volume=.92;
    player.addEventListener('error',()=>transient(`MUSICAL · ESCENA ${String(scene).padStart(2,'0')} NO DISPONIBLE`),{once:true});
    try{await player.play();}catch(_){transient(`MUSICAL · PULSE PARA INICIAR ESCENA ${String(scene).padStart(2,'0')}`);}
  }

  async function playCoda(){
    if(!codaSrc||!musicalOn())return;
    stopScene(false);
    if(!coda){coda=new Audio(codaSrc);coda.preload='auto';coda.playsInline=true;coda.volume=.9;coda.addEventListener('ended',()=>{codaDone=true;document.dispatchEvent(new CustomEvent('coda:complete',{detail:{bookId:'miramar'}}));});}
    try{await coda.play();}catch(_){}
  }

  function sync(){
    if(!musicalOn()){stopScene(false);try{coda?.pause();}catch(_){}return;}
    if(lastState.state==='text'&&Number.isInteger(Number(lastState.scene)))playScene(Number(lastState.scene));
    else if(lastState.state==='coda')playCoda();
    else stopScene(false);
  }

  document.addEventListener('book:state',ev=>{lastState={state:ev.detail?.state||'',scene:ev.detail?.scene??null};sync();});
  document.addEventListener('volume:soundchange',sync);
  document.addEventListener('volume:voicechange',sync);
  document.addEventListener('click',()=>{
    if(musicalOn()&&lastState.state==='text'&&player?.paused&&currentScene===Number(lastState.scene))player.play().catch(()=>{});
  },{passive:true});
  addEventListener('pagehide',()=>{stopScene(true);try{coda?.pause();}catch(_){}},{once:true});

  window.MIRAMAR_MUSICAL={sync,playScene,stop:()=>stopScene(true),state:()=>({scene:currentScene,musical:musicalOn(),codaDone})};
})();
