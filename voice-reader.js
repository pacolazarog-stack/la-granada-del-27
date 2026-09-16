(()=>{
  const pref=window.VOLUME_AUDIO;
  const synth=window.speechSynthesis;
  if(!pref||!synth)return;

  let token=0,scheduled=0,speaking=false,voiceCache={male:null,female:null};
  let lastChanceText='',readerState='';
  const path=(location.pathname.split('/').pop()||'').toLowerCase();
  const bookId=document.body.dataset.bookId||(
    path.includes('paco')?'paco':path.includes('miramar')?'miramar':path.includes('granada')?'granada':path.includes('ensayo')?'ensayo':path.includes('fli')?'fli':path.includes('autor')?'autor':path.includes('final')?'final':'volume'
  );

  const maleNames=/\b(alvaro|álvaro|jorge|pablo|dario|darío|saul|saúl|enrique|sergio|diego|raul|raúl|carlos|antonio|manuel|francisco|javier|pedro|juan|miguel|marcos|luis|alejandro|arnau|arturo|gonzalo|rodrigo|victor|víctor|ramon|ramón)\b/i;
  const femaleNames=/\b(elvira|helena|laura|lucia|lucía|marta|paula|carmen|ines|inés|sofia|sofía|alba|isabel|maria|maría|ana|dolores|paloma|vera|silvia|beatriz|claudia|nuria|nora|alicia)\b/i;
  const naturalNames=/(natural|online|neural|premium|enhanced|studio)/i;

  function scoreVoice(v,gender){
    const name=`${v.name||''} ${v.voiceURI||''}`;let s=0;
    if(/^es-ES$/i.test(v.lang||''))s+=50;else if(/^es([_-]|$)/i.test(v.lang||''))s+=34;else if(/^es/i.test(v.lang||''))s+=20;
    if(naturalNames.test(name))s+=45;
    if(gender==='male'&&maleNames.test(name))s+=35;if(gender==='female'&&femaleNames.test(name))s+=35;
    if(gender==='male'&&femaleNames.test(name))s-=24;if(gender==='female'&&maleNames.test(name))s-=24;
    if(/microsoft/i.test(name))s+=8;if(v.localService===false)s+=5;return s;
  }
  function refreshVoices(){
    const voices=synth.getVoices?.()||[];if(!voices.length)return;
    voiceCache.male=[...voices].sort((a,b)=>scoreVoice(b,'male')-scoreVoice(a,'male'))[0]||null;
    voiceCache.female=[...voices].sort((a,b)=>scoreVoice(b,'female')-scoreVoice(a,'female'))[0]||null;
  }
  refreshVoices();if('onvoiceschanged' in synth)synth.onvoiceschanged=refreshVoices;

  function visible(el){
    if(!el)return false;const cs=getComputedStyle(el);
    return !el.hidden&&cs.display!=='none'&&cs.visibility!=='hidden'&&el.getClientRects().length>0;
  }

  function currentTarget(){
    const modal=document.querySelector('.author-modal:not([hidden]) .author-modal-content');if(visible(modal))return modal;
    const chance=document.querySelector('#chance-current');if(visible(document.querySelector('#chance'))&&visible(chance))return chance;
    const readerText=document.querySelector('#readerText');
    if(visible(readerText)&&(!readerState||readerState==='text'))return readerText;
    const granadaPage=document.querySelector('#page');if(visible(granadaPage))return granadaPage;
    const activeView=[...document.querySelectorAll('.view')].find(visible);if(activeView)return activeView;
    const work=document.querySelector('main.work');if(visible(work))return work;
    const hero=document.querySelector('main.hero');if(visible(hero))return hero;
    return null;
  }

  function normalizeText(text){
    return String(text||'').replace(/\u200b/g,'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').replace(/\s+([,.;:!?…])/g,'$1').trim();
  }

  function genericClean(target){
    if(!target)return'';
    const clone=target.cloneNode(true);
    clone.querySelectorAll('button,input,select,textarea,script,style,.reader-nav,.nav,.chance-nav,.audio-gate,.final-actions,.final-sign-group,.final-exit-wrap,.final-lock,.back,.author-modal-close,#bookCodaGate,#volumeMediaControls,h1,h2,.eyebrow,.paco-page-head').forEach(n=>n.remove());
    return normalizeText(clone.innerText||clone.textContent||'');
  }

  function granadaLiterary(target){
    if(!target)return'';
    if(target.id==='chance-current')return normalizeText(target.textContent||'');
    const lines=[...target.querySelectorAll('.line')].map(n=>n.textContent||'').filter(s=>s.trim());
    if(lines.length)return normalizeText(lines.join('\n'));
    const text=target.querySelector('.text');if(text)return normalizeText(text.textContent||'');
    const loa=[...target.querySelectorAll('#loa1,#loa2')].map(n=>n.textContent||'').filter(Boolean);
    if(loa.length)return normalizeText(loa.join('\n\n'));
    return'';
  }

  function pacoLiterary(target){
    if(!target)return'';
    const body=target.querySelector?.('.paco-page-body');
    if(body)return normalizeText(body.textContent||'');
    return genericClean(target);
  }

  const speakerLabel=/^(?:FRANCISCA|VICENTE(?:\s*\/\s*MENSAJE)?|COMUNIDAD|PRESIDENCIA|PRESIDENTE|VECINA|VECINO|VOCES?|CORO|MENSAJE|WHATSAPP|CAROCA\b.*|MANIQU[IÍ](?:ES)?\b.*)\s*:?[\s]*$/i;
  const sceneHeading=/^(?:0[1-9]|[12]\d|30)\s*·\s*.+$/;
  const pageNumber=/^(?:—|-|–)\s*\d+\s*(?:—|-|–)$/;

  function miramarLiterary(target){
    if(!target)return'';
    const raw=String(target.textContent||'').replace(/\r/g,'').replace(/\u200b/g,'').replace(/\u00a0/g,' ');
    const out=[];
    for(const original of raw.split('\n')){
      const line=original.replace(/\t/g,'    '),trimmed=line.trim();
      if(!trimmed){if(out.length&&out[out.length-1]!=='')out.push('');continue;}
      if(pageNumber.test(trimmed))continue;
      if(/^LA TERRAZA DEL MIRAMAR$/i.test(trimmed))continue;
      if(/^ACTO\b/i.test(trimmed))continue;
      if(sceneHeading.test(trimmed))continue;
      if(/^INTERLUDIO(?:\s+PO[EÉ]TICO)?\b/i.test(trimmed))continue;
      if(/^(?:MIRAMAR\s*·\s*MARE\s+NOSTRUM\s*·\s*RAM|NACE LA MIRADA|COMUNIDAD|REINA|DESARME FINAL)$/i.test(trimmed))continue;
      if(speakerLabel.test(trimmed))continue;

      const lead=(line.match(/^( *)/)||['',''])[1].length;
      /* En el original maquetado, las acotaciones llevan sangría mínima (1–2 espacios).
         Los versos cantables llevan una sangría mayor y se conservan. */
      if(lead>0&&lead<=2)continue;

      /* Encabezados técnicos o de personaje en versales, sin puntuación literaria final. */
      const letters=trimmed.replace(/[^A-ZÁÉÍÓÚÜÑ]/g,'');
      if(trimmed.length<90&&letters.length>=3&&trimmed===trimmed.toUpperCase()&&!/[.!?…»”]$/.test(trimmed))continue;

      out.push(trimmed);
    }
    while(out.length&&out[0]==='')out.shift();while(out.length&&out[out.length-1]==='')out.pop();
    return normalizeText(out.join('\n'));
  }

  function cleanText(target){
    if(!target)return'';
    if(bookId==='miramar'&&target.id==='readerText')return miramarLiterary(target);
    if(bookId==='granada'&&(target.id==='page'||target.id==='chance-current'))return granadaLiterary(target);
    if(bookId==='paco'&&target.id==='readerText')return pacoLiterary(target);
    return genericClean(target);
  }

  function roleFor(text,target){
    const t=(text||'').toLowerCase();
    if(target?.closest?.('.fli-memorial')||bookId==='fli')return {gender:'male',rate:.89,pitch:.94,pause:190};
    if(target?.closest?.('.author-modal-content')&&/friedhelm|in memoriam/.test(t))return {gender:'male',rate:.89,pitch:.94,pause:190};
    if(bookId==='paco')return {gender:'male',rate:.91,pitch:.95,pause:155};
    if(bookId==='miramar')return {gender:'female',rate:.90,pitch:1.02,pause:185};
    if(bookId==='granada'){
      const maleFigure=/(don manuel|federico|hermenegildo|manuel ángeles|manuel angeles|machado|alberti|juan ramón|juan ramon|ganivet|washington irving|agustín lara|agustin lara)/i.test(text||'');
      return maleFigure?{gender:'male',rate:.90,pitch:.96,pause:205}:{gender:'female',rate:.89,pitch:1.01,pause:215};
    }
    if(bookId==='ensayo')return /contraensayo|contrarréplica|contrareplica|postdata|coda/.test(t)?{gender:'female',rate:.92,pitch:1,pause:170}:{gender:'male',rate:.92,pitch:.96,pause:165};
    if(bookId==='autor')return {gender:'male',rate:.91,pitch:.96,pause:175};
    if(bookId==='final')return {gender:'female',rate:.89,pitch:1,pause:210};
    return {gender:'female',rate:.92,pitch:1,pause:160};
  }

  function chunks(text,max=190){
    const normalized=String(text||'').replace(/\n\n+/g,'\n§\n');
    const pieces=normalized.split(/(?<=[.!?…:;])\s+|\n+/).map(s=>s.trim()).filter(Boolean),out=[];let cur='';
    const flush=()=>{if(cur){out.push({text:cur,pause:0});cur='';}};
    for(const p of pieces){
      if(p==='§'){flush();if(out.length)out[out.length-1].pause=Math.max(out[out.length-1].pause,360);continue;}
      if((cur+' '+p).trim().length<=max){cur=(cur+' '+p).trim();continue;}
      flush();
      if(p.length<=max){cur=p;continue;}
      const words=p.split(/\s+/);let part='';
      for(const w of words){if((part+' '+w).trim().length>max){if(part)out.push({text:part,pause:0});part=w;}else part=(part+' '+w).trim();}
      if(part)out.push({text:part,pause:0});
    }
    flush();return out;
  }

  function emitSpeaking(value){if(speaking===value)return;speaking=value;document.dispatchEvent(new CustomEvent('volume:voicestate',{detail:{speaking:value}}));}
  function stop(){token++;clearTimeout(scheduled);scheduled=0;try{synth.cancel();}catch(_){}emitSpeaking(false);}

  function speakCurrent(){
    if(!pref.isVoiceEnabled())return;
    const target=currentTarget(),text=cleanText(target);if(!text)return stop();
    const isChance=target?.id==='chance-current';if(isChance&&text===lastChanceText)return;if(isChance)lastChanceText=text;
    stop();refreshVoices();const mine=++token,role=roleFor(text,target),queue=chunks(text);if(!queue.length)return;
    emitSpeaking(true);let i=0;
    const next=()=>{
      if(mine!==token||!pref.isVoiceEnabled()){emitSpeaking(false);return;}
      if(i>=queue.length){emitSpeaking(false);return;}
      const item=queue[i++],u=new SpeechSynthesisUtterance(item.text);u.lang='es-ES';u.rate=role.rate;u.pitch=role.pitch;u.volume=1;
      const v=voiceCache[role.gender]||voiceCache.female||voiceCache.male;if(v)u.voice=v;
      u.onend=()=>{if(mine!==token)return;const p=/[.!?…]$/.test(item.text)?role.pause:/[:;]$/.test(item.text)?Math.round(role.pause*.7):Math.round(role.pause*.45);scheduled=setTimeout(next,Math.max(p,item.pause||0));};
      u.onerror=()=>{if(mine===token)scheduled=setTimeout(next,80);};
      try{synth.speak(u);}catch(_){emitSpeaking(false);}
    };
    next();
  }

  function schedule(delay=240){clearTimeout(scheduled);if(!pref.isVoiceEnabled())return;scheduled=setTimeout(speakCurrent,delay);}
  document.addEventListener('volume:voicechange',ev=>{if(ev.detail?.enabled){lastChanceText='';schedule(70);}else stop();});
  document.addEventListener('book:state',ev=>{readerState=ev.detail?.state||'';schedule(150);});
  document.addEventListener('view:mode',()=>{lastChanceText='';schedule(180);});
  document.addEventListener('author:open',()=>schedule(90));document.addEventListener('author:close',stop);
  addEventListener('hashchange',()=>schedule(190));addEventListener('pagehide',stop,{once:true});

  const main=document.querySelector('main');
  if(main){
    const observer=new MutationObserver(m=>{
      const chance=document.querySelector('#chance-current');
      if(chance&&m.some(x=>x.target===chance||chance.contains(x.target)||x.target.contains?.(chance))){schedule(110);return;}
      schedule(250);
    });
    observer.observe(main,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','class']});
  }

  if(pref.isVoiceEnabled())schedule(360);
  window.VOLUME_VOICE={speakCurrent,stop,refreshVoices,cast:roleFor,selectedVoices:()=>({...voiceCache}),cleanText};
})();
