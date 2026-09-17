(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const CANON_KEY='miramarCanonMode';

  const canon=()=>localStorage.getItem(CANON_KEY)||window.MIRAMAR_ACTIVE_CANON||'';
  const pref=()=>window.VOLUME_AUDIO;

  function paint(){
    const p=pref();
    const voiceBtn=document.querySelector('#volumeVoiceToggle');
    const soundBtn=document.querySelector('#volumeSoundToggle');
    if(!p||!voiceBtn||!soundBtn)return false;
    const textual=canon()==='textual';
    const musical=canon()==='musical';
    const withVoice=p.isVoiceEnabled();

    voiceBtn.textContent=textual?(withVoice?'Aa  TEXTUAL · CON VOZ':'Aa  TEXTUAL · SIN VOZ'):'Aa  TEXTUAL';
    voiceBtn.setAttribute('aria-pressed',textual?'true':'false');
    voiceBtn.setAttribute('aria-label',textual?(withVoice?'Versión textual con voz':'Versión textual sin voz'):'Abrir versión textual');
    voiceBtn.title=textual?(withVoice?'Versión textual con voz · pulsar para silenciar la voz':'Versión textual sin voz · pulsar para activar la voz'):'Abrir la versión textual sin voz';

    soundBtn.textContent='♫  MUSICAL';
    soundBtn.setAttribute('aria-pressed',musical?'true':'false');
    soundBtn.title=musical?'Versión musical activa':'Abrir versión musical';

    const paintOne=(btn,active)=>{
      btn.style.background=active?'#f4ede5':'rgba(22,19,16,.72)';
      btn.style.color=active?'#211d19':'#f4ede5';
      btn.style.borderColor=active?'#f4ede5':'rgba(255,255,255,.28)';
      btn.style.opacity=active?'1':'.78';
    };
    paintOne(voiceBtn,textual);paintOne(soundBtn,musical);
    document.documentElement.dataset.mediaMode=textual?'textual':musical?'musical':'silent';
    return true;
  }

  function enterMusical(ev){
    ev?.preventDefault?.();ev?.stopImmediatePropagation?.();
    const p=pref();if(!p)return;
    localStorage.setItem(CANON_KEY,'musical');
    if(p.isVoiceEnabled())p.setVoiceEnabled(false,'miramar-mode-musical');
    p.setEnabled(true,'miramar-mode-musical');
    setTimeout(paint,0);
  }

  function selectTextual(ev){
    ev?.preventDefault?.();ev?.stopImmediatePropagation?.();
    const p=pref();if(!p)return;
    const already=canon()==='textual';
    localStorage.setItem(CANON_KEY,'textual');
    if(!already){
      p.setEnabled(false,'miramar-mode-textual');
      if(p.isVoiceEnabled())p.setVoiceEnabled(false,'miramar-mode-textual');
    }else{
      p.setVoiceEnabled(!p.isVoiceEnabled(),'miramar-textual-voice');
    }
    setTimeout(paint,0);
  }

  function bind(){
    const voiceBtn=document.querySelector('#volumeVoiceToggle');
    const soundBtn=document.querySelector('#volumeSoundToggle');
    if(!voiceBtn||!soundBtn)return false;
    if(!voiceBtn.dataset.miramarVoiceBound){
      voiceBtn.dataset.miramarVoiceBound='1';
      voiceBtn.addEventListener('click',selectTextual,true);
    }
    if(!soundBtn.dataset.miramarVoiceBound){
      soundBtn.dataset.miramarVoiceBound='1';
      soundBtn.addEventListener('click',enterMusical,true);
    }
    paint();return true;
  }

  const ready=()=>{
    if(bind())return;
    let tries=0;
    const timer=setInterval(()=>{if(bind()||++tries>40)clearInterval(timer);},50);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();

  document.addEventListener('volume:voicechange',()=>setTimeout(paint,0));
  document.addEventListener('volume:soundchange',()=>setTimeout(paint,0));
  document.addEventListener('book:state',()=>setTimeout(paint,0));
})();
