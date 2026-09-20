(()=>{
  const pref=window.VOLUME_AUDIO;
  const choice=document.querySelector('#soundChoice');
  if(!pref||!choice||document.querySelector('#voiceChoiceRow'))return;

  const row=document.createElement('div');
  row.id='voiceChoiceRow';
  Object.assign(row.style,{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center',flexWrap:'wrap',width:'100%',marginTop:'2px'});

  const withVoice=document.createElement('button');
  const withoutVoice=document.createElement('button');
  [withVoice,withoutVoice].forEach(b=>{
    b.type='button';
    Object.assign(b.style,{border:'1px solid rgba(255,255,255,.35)',borderRadius:'999px',background:'#211d19',color:'#f4ede5',padding:'10px 16px',font:'11px Georgia,serif',letterSpacing:'.08em',cursor:'pointer'});
  });
  withVoice.textContent='🗣 CON VOZ';
  withoutVoice.textContent='🤐 SIN VOZ';

  const sync=()=>{
    const on=pref.isVoiceEnabled();
    const chosen=pref.isVoiceChosen();
    withVoice.style.outline=chosen&&on?'2px solid #efe6db':'none';
    withoutVoice.style.outline=chosen&&!on?'2px solid #efe6db':'none';
    withVoice.setAttribute('aria-pressed',chosen&&on?'true':'false');
    withoutVoice.setAttribute('aria-pressed',chosen&&!on?'true':'false');
  };

  withVoice.addEventListener('click',()=>{pref.setVoiceEnabled(true,'intro-choice');sync();});
  withoutVoice.addEventListener('click',()=>{pref.setVoiceEnabled(false,'intro-choice');sync();});
  row.append(withVoice,withoutVoice);
  choice.appendChild(row);
  sync();
})();
