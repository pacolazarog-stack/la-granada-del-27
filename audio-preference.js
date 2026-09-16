(()=>{
  const SOUND_KEY='volumeSoundMode';
  const VOICE_KEY='volumeVoiceMode';
  const INTRO_KEY='volumeIntroCompleted';
  let soundBtn=null,voiceBtn=null,wrap=null;

  const soundMode=()=>localStorage.getItem(SOUND_KEY)||'';
  const voiceMode=()=>localStorage.getItem(VOICE_KEY)||'';
  const isChosen=()=>soundMode()==='on'||soundMode()==='off';
  const isEnabled=()=>soundMode()!=='off';
  const isVoiceChosen=()=>voiceMode()==='on'||voiceMode()==='off';
  const isVoiceEnabled=()=>voiceMode()==='on';
  const introCompleted=()=>localStorage.getItem(INTRO_KEY)==='1';

  const clearPendingAudio=()=>{
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
  };

  const baseButtonStyle={
    border:'1px solid rgba(255,255,255,.28)',borderRadius:'999px',
    background:'rgba(22,19,16,.9)',color:'#f4ede5',padding:'8px 12px',
    font:'11px Georgia,serif',letterSpacing:'.06em',cursor:'pointer',
    boxShadow:'0 5px 18px rgba(0,0,0,.28)',backdropFilter:'blur(4px)',
    whiteSpace:'nowrap'
  };

  const syncButtons=()=>{
    const soundOn=isEnabled();
    const voiceOn=isVoiceEnabled();
    if(soundBtn){
      soundBtn.textContent=soundOn?'🔊  CON SONIDO':'🔇  SIN SONIDO';
      soundBtn.setAttribute('aria-pressed',soundOn?'true':'false');
      soundBtn.title=soundOn?'Sonido activado · pulsar para desactivar':'Sonido desactivado · pulsar para activar';
    }
    if(voiceBtn){
      voiceBtn.textContent=voiceOn?'🗣  CON VOZ':'🤐  SIN VOZ';
      voiceBtn.setAttribute('aria-pressed',voiceOn?'true':'false');
      voiceBtn.title=voiceOn?'Voz activada · pulsar para desactivar':'Voz desactivada · pulsar para activar';
    }
    document.documentElement.classList.toggle('volume-sound-off',!soundOn);
    document.documentElement.classList.toggle('volume-voice-on',voiceOn);
  };

  const setEnabled=(enabled,source='global-toggle')=>{
    localStorage.setItem(SOUND_KEY,enabled?'on':'off');
    if(!enabled)clearPendingAudio();
    syncButtons();
    document.dispatchEvent(new CustomEvent('volume:soundchange',{detail:{enabled,source}}));
  };

  const setVoiceEnabled=(enabled,source='global-toggle')=>{
    localStorage.setItem(VOICE_KEY,enabled?'on':'off');
    syncButtons();
    document.dispatchEvent(new CustomEvent('volume:voicechange',{detail:{enabled,source}}));
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

  const mount=()=>{
    if(document.querySelector('#volumeMediaControls'))return;
    wrap=document.createElement('div');
    wrap.id='volumeMediaControls';
    Object.assign(wrap.style,{
      position:'fixed',top:'12px',right:'58px',zIndex:'12000',
      display:'flex',gap:'8px',alignItems:'center',flexWrap:'nowrap'
    });

    voiceBtn=document.createElement('button');
    voiceBtn.id='volumeVoiceToggle';voiceBtn.type='button';
    voiceBtn.setAttribute('aria-label','Control global de voz');
    Object.assign(voiceBtn.style,baseButtonStyle);
    voiceBtn.addEventListener('click',()=>setVoiceEnabled(!isVoiceEnabled(),'global-toggle'));

    soundBtn=document.createElement('button');
    soundBtn.id='volumeSoundToggle';soundBtn.type='button';
    soundBtn.setAttribute('aria-label','Control global de sonido');
    Object.assign(soundBtn.style,baseButtonStyle);
    soundBtn.addEventListener('click',()=>setEnabled(!isEnabled(),'global-toggle'));

    wrap.append(voiceBtn,soundBtn);
    document.body.appendChild(wrap);
    syncButtons();
  };

  document.addEventListener('click',ev=>{
    if(ev.defaultPrevented)return;
    const a=ev.target.closest?.('a[href]');
    if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
    markExplicitReturn(a);
  });

  window.VOLUME_AUDIO={
    mode:soundMode,isChosen,isEnabled,setEnabled,
    voiceMode,isVoiceChosen,isVoiceEnabled,setVoiceEnabled,
    introCompleted,markIntroCompleted,clearPendingAudio,syncButton:syncButtons,syncButtons,
    markExplicitReturn
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
