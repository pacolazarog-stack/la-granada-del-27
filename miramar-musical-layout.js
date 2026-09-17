(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  const MODE_KEY='miramarCanonMode';
  const activeCanon=()=>window.MIRAMAR_ACTIVE_CANON||localStorage.getItem(MODE_KEY)||'';

  function resolvedMode(){
    const voice=localStorage.getItem('volumeVoiceMode');
    const sound=localStorage.getItem('volumeSoundMode');
    if(voice==='on')return'textual';
    if(sound!=='off')return'musical';
    const stored=localStorage.getItem(MODE_KEY);
    return stored==='musical'||stored==='textual'?stored:'textual';
  }

  function syncCanonBeforeReader(){
    const wanted=resolvedMode();
    const current=activeCanon();
    if(current===wanted)return false;
    localStorage.setItem(MODE_KEY,wanted);
    window.MIRAMAR_ACTIVE_CANON=wanted;
    if(wanted==='musical')history.replaceState(null,'','#p1');
    location.reload();
    return true;
  }

  if(syncCanonBeforeReader())return;

  const isMusical=()=>activeCanon()==='musical';
  const isTextual=()=>activeCanon()==='textual';

  if(window.WORK_DATA&&Array.isArray(window.WORK_DATA.pages)){
    if(isMusical()){
      window.MIRAMAR_MUSICAL_DATA={...window.WORK_DATA,pages:[...window.WORK_DATA.pages]};
      document.documentElement.dataset.miramarCanon='musical';
    }else{
      window.MIRAMAR_TEXTUAL_DATA={...window.WORK_DATA,pages:[...window.WORK_DATA.pages]};
      document.documentElement.dataset.miramarCanon='textual';
    }
  }

  function applyLabels(){
    const musical=isMusical();
    const sub=document.querySelector('#readerSub');
    if(sub)sub.textContent=musical?'Tragicomedia multimedia · Canon musical · escenas 01–30':'Tragicomedia visual · Canon 1.7';
    const badge=document.querySelector('#readerCover .cover-badge');
    if(badge)badge.textContent=musical?'CANON MUSICAL':'30 ESCENAS';
  }
  applyLabels();

  /* MUSICAL: texto limpio + imagen escenográfica.
     TEXTUAL: exclusivamente canon textual A5, sin imágenes aparejadas. */
  const cleanStyle=document.createElement('style');
  cleanStyle.id='miramar-musical-clean-style';
  cleanStyle.textContent=`
    html[data-media-mode="musical"] #readerProgress,
    html[data-media-mode="musical"] #readerJump,
    html[data-media-mode="musical"] .miramar-scene-caption{display:none!important}

    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page{
      width:min(1600px,99vw)!important;
      height:min(80vh,900px)!important;
      min-height:0!important;
      aspect-ratio:auto!important;
      padding:0!important;
      display:grid!important;
      grid-template-columns:minmax(0,1fr) minmax(0,2fr)!important;
      grid-template-rows:1fr!important;
      overflow:hidden!important;
      transform:none!important;
      background:#f7f1e8!important;
      box-shadow:0 18px 48px rgba(0,0,0,.34)!important;
    }

    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page .reader-text{
      grid-column:1!important;
      grid-row:1!important;
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      max-height:none!important;
      overflow:auto!important;
      box-sizing:border-box!important;
      padding:28px 30px 34px 32px!important;
      margin:0!important;
      background:#f7f1e8!important;
      color:#211b17!important;
      scrollbar-width:thin;
      scrollbar-color:#8f877d transparent;
    }

    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page .miramar-illustration{
      grid-column:2!important;
      grid-row:1!important;
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      min-height:0!important;
      padding:0!important;
      margin:0!important;
      display:flex!important;
      background:#090c10!important;
      overflow:hidden!important;
    }

    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page .miramar-scene-image{
      width:100%!important;
      height:100%!important;
      max-width:none!important;
      aspect-ratio:auto!important;
      background-size:contain!important;
      background-position:center!important;
      background-repeat:no-repeat!important;
      background-color:#090c10!important;
      box-shadow:none!important;
    }

    html[data-media-mode="musical"] #readerText.miramar-musical-clean{
      white-space:normal!important;
      max-width:none!important;
      padding-top:0!important;
      font-family:Georgia,'Times New Roman',serif!important;
      font-size:clamp(12px,.86vw,15px)!important;
      line-height:1.42!important;
      font-weight:400!important;
      letter-spacing:0!important;
      color:#211b17!important;
    }
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-body{display:block!important}
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-line{
      margin:.48em 0!important;
      min-height:0!important;
      color:#211b17!important;
      font:inherit!important;
    }
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-line.rhythm{
      margin:.72em 0!important;
      color:#7c211d!important;
      font-style:italic!important;
      font-size:.96em!important;
      letter-spacing:.025em!important;
      word-spacing:.035em!important;
    }

    /* TEXTUAL: una sola página A5 vertical, sólo texto canónico. */
    html[data-media-mode="textual"] body[data-book-id="miramar"] #miramarIllustration,
    html[data-media-mode="textual"] body[data-book-id="miramar"] .miramar-mode-switch,
    html[data-media-mode="textual"] body[data-book-id="miramar"] .miramar-cover-choice,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] #miramarIllustration,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .miramar-mode-switch,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .miramar-cover-choice{
      display:none!important;
    }
    html[data-media-mode="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode),
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode){
      width:min(92vw,620px,calc((100vh - 148px) * 148 / 210))!important;
      height:min(calc(100vh - 148px),880px,calc(92vw * 210 / 148))!important;
      aspect-ratio:148/210!important;
      display:block!important;
      overflow:auto!important;
      padding:42px 48px!important;
      background:var(--paper)!important;
      color:var(--ink)!important;
      box-shadow:0 18px 42px #0008!important;
    }
    html[data-media-mode="textual"] body[data-book-id="miramar"] #readerText,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] #readerText{
      width:100%!important;
      max-width:none!important;
      margin:0!important;
      background:transparent!important;
    }

    @media(max-width:900px){
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page{
        width:min(96vw,760px)!important;
        height:auto!important;
        min-height:100%!important;
        display:flex!important;
        flex-direction:column!important;
        overflow:visible!important;
      }
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page .miramar-illustration{
        order:0!important;
        width:100%!important;
        height:min(62vw,520px)!important;
        min-height:320px!important;
        flex:none!important;
      }
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page .reader-text{
        order:1!important;
        width:100%!important;
        height:auto!important;
        overflow:visible!important;
        flex:none!important;
        padding:22px 20px 30px!important;
      }
      html[data-media-mode="musical"] #readerText.miramar-musical-clean{
        font-size:14px!important;
        line-height:1.42!important;
      }
      html[data-media-mode="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode),
      html[data-miramar-canon="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode){
        width:min(94vw,560px)!important;
        height:min(calc(100vh - 130px),calc(94vw * 210 / 148))!important;
        padding:28px 24px!important;
      }
    }
  `;
  document.head.appendChild(cleanStyle);

  function enforceTextualA5(){
    if(!isTextual())return;
    const page=document.querySelector('#readerPage');
    const figure=document.querySelector('#miramarIllustration');
    const switcher=document.querySelector('.miramar-mode-switch');
    const chooser=document.querySelector('.miramar-cover-choice');
    page?.classList.remove('miramar-illustrated-page','miramar-domestica-musical');
    if(page)delete page.dataset.domesticaScene;
    if(figure)figure.hidden=true;
    if(switcher)switcher.hidden=true;
    if(chooser)chooser.hidden=true;
    document.body.dataset.miramarMode='text';
    try{sessionStorage.setItem('miramarReaderMode','text');}catch(_){}
  }

  function releaseTextualLock(){
    if(isTextual())return;
    const switcher=document.querySelector('.miramar-mode-switch');
    const chooser=document.querySelector('.miramar-cover-choice');
    if(switcher)switcher.hidden=false;
    if(chooser)chooser.hidden=false;
  }

  const sceneRE=/^(?:ESCENA\s*)?(0?[1-9]|[12]\d|30)\s*[·.:-]\s*.+$/i;
  const sectionRE=/^(?:ACTO\s+)?(?:I{1,3}|IV)\s*[·.:-]\s*.+$/i;
  const pageRE=/^(?:(?:P[ÁA]GINA|P[ÁA]G\.?|PAGE)\s*)?[-–—]?\s*\d{1,3}(?:\s*\/\s*\d{1,3})?\s*[-–—]?$/i;
  const directionRE=/^(?:\([^\n]*\)|\[[^\n]*\]|\{[^\n]*\}|ACOTACI[ÓO]N\s*:.*)$/i;
  const speakerNames='FRANCISCA|VICENTE(?:\\s*\\/\\s*MENSAJE)?|COMUNIDAD|PRESIDENCIA|PRESIDENTE|VECINA|VECINO|VOCES?|CORO|MENSAJE|WHATSAPP|CAROCA\\s*\\d+|MANIQU[IÍ](?:ES)?(?:\\s*\\d+)?';
  const speakerOnlyRE=new RegExp(`^(?:${speakerNames})\\s*:?$`,'i');
  const speakerPrefixRE=new RegExp(`^(?:${speakerNames})\\s*:\\s*(.+)$`,'i');
  const rhythmWords=new Set(['mmm','mar','ram','rrr','ah','oh','eh','tum','ta','tan','ka','pa','ra','du','ba','ts','tik','ya','clac','bum','lum','sha','pam','pum','cha-ca','pa-ra-pam','tra-ca-ta']);

  function isRhythm(line){
    const words=line.toLowerCase().replace(/[.,;:!?…"“”«»()]/g,' ').split(/\s+/).filter(Boolean);
    return words.length>0&&words.length<=28&&words.every(w=>rhythmWords.has(w));
  }

  function stripInlineDirections(block){
    return String(block||'')
      .replace(/\([^()\n]*\)/g,' ')
      .replace(/\[[^\[\]\n]*\]/g,' ')
      .replace(/\{[^{}\n]*\}/g,' ')
      .replace(/[ \t]{2,}/g,' ')
      .replace(/\s+([,.;:!?])/g,'$1')
      .trim();
  }

  function cleanBlocks(raw){
    const blocks=String(raw||'').replace(/\r/g,'').split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
    const sceneIndex=blocks.findIndex(b=>sceneRE.test(b));
    const source=sceneIndex>=0?blocks.slice(sceneIndex+1):blocks;
    const out=[];
    for(let block of source){
      if(!block||sceneRE.test(block)||sectionRE.test(block)||pageRE.test(block)||directionRE.test(block)||speakerOnlyRE.test(block))continue;
      const pref=block.match(speakerPrefixRE);
      if(pref)block=pref[1].trim();
      block=stripInlineDirections(block);
      if(!block||sceneRE.test(block)||sectionRE.test(block)||pageRE.test(block)||directionRE.test(block))continue;
      out.push(block);
    }
    return out;
  }

  function renderCleanMusical(raw){
    if(!isMusical())return;
    const text=document.querySelector('#readerText');
    if(!text||text.hidden)return;
    const blocks=cleanBlocks(raw);
    text.replaceChildren();
    text.classList.remove('paco-structured');
    text.classList.add('miramar-script','miramar-musical-script','miramar-musical-clean');
    const body=document.createElement('div');
    body.className='miramar-script-body';
    for(const block of blocks){
      const p=document.createElement('div');
      p.className='miramar-script-line';
      p.textContent=block;
      if(isRhythm(block))p.classList.add('rhythm');
      body.appendChild(p);
    }
    text.appendChild(body);
    const progress=document.querySelector('#readerProgress');
    const jump=document.querySelector('#readerJump');
    const cap=document.querySelector('#miramarIllustration .miramar-scene-caption');
    if(progress)progress.textContent='';
    if(jump)jump.hidden=true;
    if(cap)cap.textContent='';
  }

  document.addEventListener('book:state',ev=>{
    if(isTextual())queueMicrotask(enforceTextualA5);
    if(!isMusical()||ev.detail?.state!=='text')return;
    const text=document.querySelector('#readerText');
    const raw=String(text?.textContent||'');
    queueMicrotask(()=>renderCleanMusical(raw));
  });
  document.addEventListener('miramar:modechange',()=>queueMicrotask(()=>isTextual()?enforceTextualA5():releaseTextualLock()));

  let reloadPending=false;
  const reloadForCanonChange=()=>{
    const next=resolvedMode();
    localStorage.setItem(MODE_KEY,next);
    window.MIRAMAR_ACTIVE_CANON=next;
    if(next==='musical')history.replaceState(null,'','#p1');
    if(reloadPending)return;
    reloadPending=true;
    setTimeout(()=>location.reload(),30);
  };
  document.addEventListener('volume:soundchange',reloadForCanonChange);
  document.addEventListener('volume:voicechange',reloadForCanonChange);

  const illustratedButton=()=>[...document.querySelectorAll('.miramar-mode-btn')].find(b=>(b.textContent||'').trim()==='ILUSTRADA');
  let forcing=false;
  const forceIllustrated=()=>{
    if(forcing||!isMusical())return;
    const btn=illustratedButton();
    if(!btn||btn.classList.contains('is-active'))return;
    forcing=true;
    try{sessionStorage.setItem('miramarReaderMode','illustrated');}catch(_){}
    btn.click();
    forcing=false;
  };
  const schedule=()=>setTimeout(()=>isMusical()?forceIllustrated():enforceTextualA5(),0);
  document.addEventListener('book:state',schedule);
  document.addEventListener('click',ev=>{
    if(!isMusical())return;
    const btn=ev.target.closest?.('.miramar-mode-btn,.miramar-cover-choice-btn');
    if(btn&&/TEXTO|TEXTUAL/i.test((btn.textContent||'').trim()))schedule();
  },true);
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode','data-miramar-canon']});
  new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['data-miramar-mode']});
  setTimeout(schedule,0);
})();