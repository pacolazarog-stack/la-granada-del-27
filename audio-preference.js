(()=>{
  const KEY='volumeSoundMode';
  const INTRO_KEY='volumeIntroCompleted';
  const mode=()=>localStorage.getItem(KEY)||'';
  const isChosen=()=>mode()==='on'||mode()==='off';
  const isEnabled=()=>mode()!=='off';
  const introCompleted=()=>localStorage.getItem(INTRO_KEY)==='1';
  let btn=null;

  const clearPendingAudio=()=>{
    localStorage.removeItem('volumeReturnPending');
    localStorage.removeItem('volumeReturnOrigin');
    localStorage.removeItem('volumeResumeBook');
  };

  const syncButton=()=>{
    if(!btn)return;
    const on=isEnabled();
    btn.textContent=on?'🔊  SIN SONIDO':'🔇  ACTIVAR SONIDO';
    btn.setAttribute('aria-pressed',on?'false':'true');
    btn.title=on?'Desactivar todo el sonido del volumen':'Volver a activar el sonido del volumen';
    document.documentElement.classList.toggle('volume-sound-off',!on);
  };

  const setEnabled=(enabled,source='global-toggle')=>{
    localStorage.setItem(KEY,enabled?'on':'off');
    if(!enabled)clearPendingAudio();
    syncButton();
    document.dispatchEvent(new CustomEvent('volume:soundchange',{detail:{enabled,source}}));
  };

  const markIntroCompleted=()=>localStorage.setItem(INTRO_KEY,'1');

  const mount=()=>{
    if(document.querySelector('#volumeSoundToggle'))return;
    btn=document.createElement('button');
    btn.id='volumeSoundToggle';
    btn.type='button';
    btn.setAttribute('aria-label','Control global de sonido');
    Object.assign(btn.style,{
      position:'fixed',top:'12px',right:'58px',zIndex:'12000',
      border:'1px solid rgba(255,255,255,.28)',borderRadius:'999px',
      background:'rgba(22,19,16,.9)',color:'#f4ede5',padding:'8px 12px',
      font:'11px Georgia,serif',letterSpacing:'.06em',cursor:'pointer',
      boxShadow:'0 5px 18px rgba(0,0,0,.28)',backdropFilter:'blur(4px)'
    });
    btn.addEventListener('click',()=>setEnabled(!isEnabled(),'global-toggle'));
    document.body.appendChild(btn);
    syncButton();
  };

  window.VOLUME_AUDIO={mode,isChosen,isEnabled,setEnabled,introCompleted,markIntroCompleted,clearPendingAudio,syncButton};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
