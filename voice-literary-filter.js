(()=>{
  const synth=window.speechSynthesis;
  if(!synth||synth.__literaryFilterInstalled)return;
  const bookId=(document.body?.dataset?.bookId||'').toLowerCase();
  if(bookId!=='miramar')return;

  const originalSpeak=synth.speak.bind(synth);
  const speaker=/^(?:FRANCISCA|VICENTE(?:\s*\/\s*MENSAJE)?|COMUNIDAD|PRESIDENCIA|PRESIDENTE|VECINA|VECINO|VOCES?|CORO|MENSAJE|WHATSAPP|CAROCA\b.*?|MANIQU[IÍ](?:ES)?\b.*?)\s*:\s*/i;
  const scene=/^(?:0[1-9]|[12]\d|30)\s*[·.:-]\s*.+$/;
  const tech=/^(?:ACTO\b|INTERLUDIO\b|ESCENA\b|ACOTACI[ÓO]N\b|M[ÚU]SICA\b|SONIDO\b|LUZ\b|V[IÍ]DEO\b|PROYECCI[ÓO]N\b|ENTRA\b|SALE\b|PAUSA\b|TEL[ÓO]N\b)/i;
  const page=/^(?:—|-|–)?\s*\d+\s*(?:—|-|–)?$/;

  function clean(text){
    const out=[];
    for(const raw of String(text||'').replace(/\r/g,'').split('\n')){
      let s=raw.trim();
      if(!s){if(out.length&&out[out.length-1]!=='')out.push('');continue;}
      if(page.test(s)||scene.test(s)||tech.test(s))continue;
      if(/^LA TERRAZA DEL MIRAMAR$/i.test(s))continue;
      if(/^(?:MIRAMAR\s*·\s*MARE\s+NOSTRUM\s*·\s*RAM|NACE LA MIRADA|DESARME FINAL)$/i.test(s))continue;
      if(/^\([^)]*\)$/.test(s)||/^\[[^\]]*\]$/.test(s))continue;
      s=s.replace(speaker,'').trim();
      if(!s)continue;
      const letters=s.replace(/[^A-ZÁÉÍÓÚÜÑ]/g,'');
      if(s.length<90&&letters.length>=3&&s===s.toUpperCase()&&!/[.!?…»”]$/.test(s))continue;
      out.push(s);
    }
    while(out.length&&out[0]==='')out.shift();
    while(out.length&&out[out.length-1]==='')out.pop();
    return out.join('\n').replace(/\n{3,}/g,'\n\n').trim();
  }

  synth.speak=function(utterance){
    try{
      if(utterance&&typeof utterance.text==='string'){
        const cleaned=clean(utterance.text);
        if(!cleaned){queueMicrotask(()=>utterance.onend?.(new Event('end')));return;}
        if(cleaned!==utterance.text){
          try{utterance.text=cleaned;}
          catch(_){
            const u=new SpeechSynthesisUtterance(cleaned);
            u.lang=utterance.lang;u.rate=utterance.rate;u.pitch=utterance.pitch;u.volume=utterance.volume;u.voice=utterance.voice;
            u.onend=utterance.onend;u.onerror=utterance.onerror;u.onstart=utterance.onstart;u.onpause=utterance.onpause;u.onresume=utterance.onresume;u.onmark=utterance.onmark;u.onboundary=utterance.onboundary;
            return originalSpeak(u);
          }
        }
      }
    }catch(_){ }
    return originalSpeak(utterance);
  };
  synth.__literaryFilterInstalled=true;
  window.MIRAMAR_TEXTUAL_FILTER={clean};
})();
