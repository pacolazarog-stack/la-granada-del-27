(()=>{
  const NativeAudio=window.Audio;
  const tracked=[];
  let voiceActive=false;

  function remember(a){
    if(!a||tracked.includes(a))return a;
    tracked.push(a);
    a.addEventListener('volumechange',()=>{
      if(!voiceActive)a.datasetVoiceBaseVolume=String(a.volume);
    });
    return a;
  }

  function WrappedAudio(src){
    return remember(new NativeAudio(src));
  }
  WrappedAudio.prototype=NativeAudio.prototype;
  Object.setPrototypeOf(WrappedAudio,NativeAudio);
  window.Audio=WrappedAudio;

  function duck(){
    voiceActive=true;
    for(const a of tracked){
      if(!a.datasetVoiceBaseVolume)a.datasetVoiceBaseVolume=String(a.volume);
      if(!a.paused)a.volume=Math.min(a.volume,.28);
    }
  }

  function restore(){
    voiceActive=false;
    for(const a of tracked){
      const base=Number(a.datasetVoiceBaseVolume);
      if(Number.isFinite(base))a.volume=Math.max(0,Math.min(1,base));
      delete a.datasetVoiceBaseVolume;
    }
  }

  document.addEventListener('volume:voicestate',ev=>{
    if(ev.detail?.speaking)duck();else restore();
  });
  document.addEventListener('volume:soundchange',ev=>{
    if(!ev.detail?.enabled)restore();
  });

  window.VOLUME_MEDIA_DUCK={tracked,duck,restore};
})();

/* Miramar: estos módulos deben ejecutarse antes de lector.js.
   Se cargan aquí porque media-duck.js ya ocupa esa posición estable en miramar.html. */
(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const load=(src)=>{
    if(document.readyState==='loading'){
      document.write(`<script src="${src}"><\/script>`);
      return;
    }
    const s=document.createElement('script');s.src=src;s.async=false;document.head.appendChild(s);
  };
  load('miramar-musical-frontmatter.js?v=20260917-frontmatter3');
  load('miramar-textual-voice-toggle.js?v=20260917-textvoice1');
})();
