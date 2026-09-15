(()=>{
  const pref=window.VOLUME_AUDIO;
  const synth=window.speechSynthesis;
  if(!pref||!synth)return;

  let token=0,scheduled=0,speaking=false,voiceCache=null;

  function pickVoice(){
    const voices=synth.getVoices?.()||[];
    voiceCache=voices.find(v=>/^es-ES$/i.test(v.lang))||
      voices.find(v=>/^es([_-]|$)/i.test(v.lang))||
      voices.find(v=>/^es/i.test(v.lang))||null;
    return voiceCache;
  }
  pickVoice();
  if('onvoiceschanged' in synth)synth.onvoiceschanged=pickVoice;

  function visible(el){
    if(!el)return false;
    const cs=getComputedStyle(el);
    return !el.hidden&&cs.display!=='none'&&cs.visibility!=='hidden'&&el.getClientRects().length>0;
  }

  function currentTarget(){
    const readerText=document.querySelector('#readerText');
    if(visible(readerText))return readerText;
    const readerCover=document.querySelector('#readerCover');
    if(visible(readerCover))return readerCover;
    const readerBack=document.querySelector('#readerBack');
    if(visible(readerBack))return readerBack;
    const granadaPage=document.querySelector('#page');
    if(visible(granadaPage))return granadaPage;
    const activeView=[...document.querySelectorAll('.view')].find(visible);
    if(activeView)return activeView;
    const work=document.querySelector('main.work');
    if(visible(work))return work;
    const hero=document.querySelector('main.hero');
    if(visible(hero))return hero;
    return document.querySelector('main');
  }

  function cleanText(target){
    if(!target)return'';
    const clone=target.cloneNode(true);
    clone.querySelectorAll('button,input,select,textarea,script,style,.reader-nav,.nav,.chance-nav,.audio-gate,.final-actions,.back,.author-modal-close,#bookCodaGate,#volumeMediaControls').forEach(n=>n.remove());
    let text=(clone.innerText||clone.textContent||'')
      .replace(/\u00a0/g,' ')
      .replace(/[ \t]+/g,' ')
      .replace(/\n{3,}/g,'\n\n')
      .trim();
    return text;
  }

  function chunks(text,max=260){
    const pieces=text.split(/(?<=[.!?…:;])\s+|\n+/).map(s=>s.trim()).filter(Boolean);
    const out=[];let cur='';
    for(const p of pieces){
      if((cur+' '+p).trim().length<=max){cur=(cur+' '+p).trim();continue;}
      if(cur)out.push(cur);
      if(p.length<=max){cur=p;continue;}
      for(let i=0;i<p.length;i+=max)out.push(p.slice(i,i+max));
      cur='';
    }
    if(cur)out.push(cur);
    return out;
  }

  function emitSpeaking(value){
    if(speaking===value)return;
    speaking=value;
    document.dispatchEvent(new CustomEvent('volume:voicestate',{detail:{speaking:value}}));
  }

  function stop(){
    token++;
    clearTimeout(scheduled);scheduled=0;
    try{synth.cancel();}catch(_){}
    emitSpeaking(false);
  }

  function speakCurrent(){
    if(!pref.isVoiceEnabled())return;
    const text=cleanText(currentTarget());
    if(!text)return;
    stop();
    const mine=++token;
    const queue=chunks(text);
    if(!queue.length)return;
    emitSpeaking(true);
    let i=0;
    const next=()=>{
      if(mine!==token||!pref.isVoiceEnabled()){emitSpeaking(false);return;}
      if(i>=queue.length){emitSpeaking(false);return;}
      const u=new SpeechSynthesisUtterance(queue[i++]);
      u.lang='es-ES';u.rate=.94;u.pitch=1;u.volume=1;
      const v=voiceCache||pickVoice();if(v)u.voice=v;
      u.onend=next;
      u.onerror=()=>{if(mine===token)next();};
      try{synth.speak(u);}catch(_){emitSpeaking(false);}
    };
    next();
  }

  function schedule(delay=280){
    clearTimeout(scheduled);
    if(!pref.isVoiceEnabled())return;
    scheduled=setTimeout(speakCurrent,delay);
  }

  document.addEventListener('volume:voicechange',ev=>{
    if(ev.detail?.enabled)schedule(80);else stop();
  });
  document.addEventListener('book:state',()=>schedule(220));
  document.addEventListener('view:mode',()=>schedule(240));
  document.addEventListener('coda:complete',()=>schedule(180));
  addEventListener('hashchange',()=>schedule(250));
  addEventListener('pagehide',stop,{once:true});

  const main=document.querySelector('main');
  if(main){
    const observer=new MutationObserver(()=>schedule(320));
    observer.observe(main,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','class']});
  }

  if(pref.isVoiceEnabled())schedule(500);
  window.VOLUME_VOICE={speakCurrent,stop};
})();
