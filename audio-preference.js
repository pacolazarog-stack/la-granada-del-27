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
      soundBtn.textContent=soundOn?'🔇  SIN SONIDO':'🔊  CON SONIDO';
      soundBtn.setAttribute('aria-pressed',soundOn?'true':'false');
      soundBtn.title=soundOn?'Desactivar la música y los efectos sonoros':'Activar la música y los efectos sonoros';
    }
    if(voiceBtn){
      voiceBtn.textContent=voiceOn?'🤐  SIN VOZ':'🗣  CON VOZ';
      voiceBtn.setAttribute('aria-pressed',voiceOn?'true':'false');
      voiceBtn.title=voiceOn?'Detener y desactivar la lectura en voz':'Activar la lectura en voz de la página visible';
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

  window.VOLUME_AUDIO={
    mode:soundMode,isChosen,isEnabled,setEnabled,
    voiceMode,isVoiceChosen,isVoiceEnabled,setVoiceEnabled,
    introCompleted,markIntroCompleted,clearPendingAudio,syncButton:syncButtons,syncButtons
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
