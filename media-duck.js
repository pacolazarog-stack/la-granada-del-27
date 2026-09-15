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
