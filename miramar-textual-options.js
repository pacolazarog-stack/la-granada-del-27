(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  const CANON_KEY='miramarCanonMode';
  const authorRE=/Francisco Javier L[aá]zaro Guil/gi;
  let controls=null,voiceOn=null,voiceOff=null;

  const activeCanon=()=>window.MIRAMAR_ACTIVE_CANON||localStorage.getItem(CANON_KEY)||'';
  const isTextual=()=>activeCanon()==='textual';
  const isMusical=()=>activeCanon()==='musical';
  const pref=()=>window.VOLUME_AUDIO;

  const activeStyle={background:'#f4ede5',color:'#211d19',borderColor:'#f4ede5',opacity:'1'};
  const inactiveStyle={background:'rgba(22,19,16,.72)',color:'#f4ede5',borderColor:'rgba(255,255,255,.28)',opacity:'.72'};

  function flagButton(){
    const a=document.createElement('a');
    a.href='autor.html';
    a.className='miramar-inline-flag';
    a.textContent='flag';
    a.setAttribute('aria-label','flag');
    return a;
  }

  function replaceAuthorName(root){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()){
      const node=walker.currentNode;
      authorRE.lastIndex=0;
      if(authorRE.test(node.nodeValue||''))nodes.push(node);
    }
    nodes.forEach(node=>{
      const value=node.nodeValue||'';
      const frag=document.createDocumentFragment();
      let last=0;
      authorRE.lastIndex=0;
      value.replace(authorRE,(match,offset)=>{
        if(offset>last)frag.appendChild(document.createTextNode(value.slice(last,offset)));
        frag.appendChild(flagButton());
        last=offset+match.length;
        return match;
      });
      if(last<value.length)frag.appendChild(document.createTextNode(value.slice(last)));
      node.parentNode?.replaceChild(frag,node);
    });
  }

  function normalizeFlag(){
    document.querySelectorAll('.miramar-flag-btn,.miramar-inline-flag,.cover-author,a[href="autor.html"]').forEach(a=>{
      const t=(a.textContent||'').trim();
      if(/^flag$/i.test(t))a.textContent='flag';
      if(/^flag$/i.test((a.getAttribute('aria-label')||'').trim()))a.setAttribute('aria-label','flag');
    });
  }

  function aliasSpokenPages(){
    const pages=window.MIRAMAR_SPOKEN_PAGES;
    if(!pages)return;
    Object.keys(pages).forEach(key=>{
      if(typeof pages[key]!=='string')return;
      pages[key]=pages[key].replace(authorRE,'flag');
    });
  }

  function ensureStyle(){
    if(document.querySelector('#miramar-textual-options-style'))return;
    const style=document.createElement('style');
    style.id='miramar-textual-options-style';
    style.textContent=`
      .miramar-inline-flag{display:inline-block;border:1px solid #9b8978;border-radius:999px;padding:.08em .5em;margin:0 .08em;color:inherit;text-decoration:none;font:inherit;font-size:.9em;line-height:1.25;letter-spacing:.04em;background:#fff8ef;vertical-align:baseline;text-transform:none!important}
      #miramarTextVoiceChoice{display:flex;align-items:center;gap:5px;margin-right:4px}
      #miramarTextVoiceChoice[hidden]{display:none!important}
      #miramarTextVoiceChoice .reader-btn{padding:7px 10px;font-size:9px;letter-spacing:.055em;white-space:nowrap}
      @media(max-width:760px){#miramarTextVoiceChoice{gap:3px}#miramarTextVoiceChoice .reader-btn{padding:6px 7px;font-size:8px}}
    `;
    document.head.appendChild(style);
  }

  function ensureVoiceControls(){
    if(controls)return controls;
    const tools=document.querySelector('.reader-tools');
    if(!tools)return null;
    controls=document.createElement('div');
    controls.id='miramarTextVoiceChoice';
    controls.setAttribute('role','group');
    controls.setAttribute('aria-label','Voz de la versión textual');

    voiceOn=document.createElement('button');
    voiceOff=document.createElement('button');
    [voiceOn,voiceOff].forEach(b=>{b.type='button';b.className='reader-btn';});
    voiceOn.textContent='CON VOZ';
    voiceOff.textContent='SIN VOZ';
    voiceOn.setAttribute('aria-label','Versión textual con voz');
    voiceOff.setAttribute('aria-label','Versión textual sin voz');

    voiceOn.addEventListener('click',ev=>{
      ev.preventDefault();
      localStorage.setItem(CANON_KEY,'textual');
      const p=pref();
      p?.setEnabled?.(false,'miramar-textual-voice');
      p?.setVoiceEnabled?.(true,'miramar-textual-voice');
      syncUI();
    });
    voiceOff.addEventListener('click',ev=>{
      ev.preventDefault();
      localStorage.setItem(CANON_KEY,'textual');
      const p=pref();
      p?.setVoiceEnabled?.(false,'miramar-textual-silent');
      p?.setEnabled?.(false,'miramar-textual-silent');
      syncUI();
    });

    controls.append(voiceOn,voiceOff);
    tools.prepend(controls);
    return controls;
  }

  function paint(btn,on){
    if(!btn)return;
    Object.assign(btn.style,on?activeStyle:inactiveStyle);
    btn.setAttribute('aria-pressed',on?'true':'false');
  }

  function syncUI(){
    ensureStyle();
    ensureVoiceControls();
    aliasSpokenPages();
    replaceAuthorName(document.querySelector('#readerText'));
    replaceAuthorName(document.querySelector('#readerCover'));
    replaceAuthorName(document.querySelector('#readerBack'));
    normalizeFlag();

    const textual=isTextual();
    const voice=Boolean(pref()?.isVoiceEnabled?.());
    if(textual)document.documentElement.dataset.mediaMode='textual';
    if(controls)controls.hidden=!textual;
    paint(voiceOn,textual&&voice);
    paint(voiceOff,textual&&!voice);

    const textualBtn=document.querySelector('#volumeVoiceToggle');
    if(textualBtn&&textual){
      textualBtn.textContent='Aa  TEXTUAL';
      textualBtn.title='Versión textual activa';
      paint(textualBtn,true);
    }
  }

  /* En Miramar, TEXTUAL elige el canon textual; la voz se decide aparte. */
  document.addEventListener('click',ev=>{
    const textualBtn=ev.target.closest?.('#volumeVoiceToggle');
    if(textualBtn){
      ev.preventDefault();
      ev.stopImmediatePropagation();
      localStorage.setItem(CANON_KEY,'textual');
      pref()?.setEnabled?.(false,'miramar-textual-mode');
      syncUI();
      return;
    }
    const musicalBtn=ev.target.closest?.('#volumeSoundToggle');
    if(musicalBtn){
      ev.preventDefault();
      ev.stopImmediatePropagation();
      localStorage.setItem(CANON_KEY,'musical');
      const p=pref();
      p?.setVoiceEnabled?.(false,'miramar-musical-mode');
      p?.setEnabled?.(true,'miramar-musical-mode');
      syncUI();
    }
  },true);

  document.addEventListener('book:state',()=>setTimeout(syncUI,0));
  document.addEventListener('volume:voicechange',()=>setTimeout(syncUI,0));
  document.addEventListener('volume:soundchange',()=>setTimeout(syncUI,0));
  document.addEventListener('miramar:modechange',()=>setTimeout(syncUI,0));

  const ready=()=>{ensureStyle();ensureVoiceControls();aliasSpokenPages();syncUI();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
