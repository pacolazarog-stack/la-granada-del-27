(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  const MODE_KEY='miramarCanonMode';
  const activeCanon=()=>window.MIRAMAR_ACTIVE_CANON||localStorage.getItem(MODE_KEY)||'';

  /* La elección MUSICAL/TEXTUAL del encabezado manda también sobre el canon.
     Esto evita que una preferencia textual antigua deje cargadas las páginas
     preliminares de la edición impresa mientras la interfaz muestra MUSICAL. */
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

    /* Si venimos del canon impreso al musical, la lectura debe comenzar en
       la escena 01, no conservar un número de página de los preliminares. */
    if(wanted==='musical')history.replaceState(null,'','#p1');
    location.reload();
    return true;
  }

  if(syncCanonBeforeReader())return;

  const isMusical=()=>activeCanon()==='musical';

  /* Aquí ya debe estar cargado el corpus correcto. No se recortan escenas:
     el canon musical conserva íntegramente 01–30. Las páginas preliminares
     de la edición impresa pertenecen sólo al canon textual. */
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
    if(sub)sub.textContent=musical?'Tragicomedia multimedia · Canon musical':'Tragicomedia visual · Canon 1.7';
    const badge=document.querySelector('#readerCover .cover-badge');
    if(badge)badge.textContent=musical?'CANON MUSICAL':'30 ESCENAS';
  }
  applyLabels();

  /* En MUSICAL no se muestra ningún vestigio editorial de la edición impresa:
     ni numeración de página, ni título/número de escena, ni pies de imagen. */
  const cleanStyle=document.createElement('style');
  cleanStyle.id='miramar-musical-clean-style';
  cleanStyle.textContent=`
    html[data-media-mode="musical"] #readerProgress,
    html[data-media-mode="musical"] #readerJump,
    html[data-media-mode="musical"] .miramar-scene-caption{display:none!important}
    html[data-media-mode="musical"] #readerText.miramar-musical-clean{white-space:normal!important}
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-body{display:block}
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-line{margin:.31em 0;min-height:1em}
    html[data-media-mode="musical"] #readerText.miramar-musical-clean .miramar-script-line.rhythm{margin:.9em 0;font-style:italic;letter-spacing:.045em;word-spacing:.06em}
  `;
  document.head.appendChild(cleanStyle);

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

  function cleanBlocks(raw){
    const blocks=String(raw||'').replace(/\r/g,'').split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
    const sceneIndex=blocks.findIndex(b=>sceneRE.test(b));
    const source=sceneIndex>=0?blocks.slice(sceneIndex+1):blocks;
    const out=[];
    for(let block of source){
      if(!block||sceneRE.test(block)||sectionRE.test(block)||pageRE.test(block)||directionRE.test(block)||speakerOnlyRE.test(block))continue;
      const pref=block.match(speakerPrefixRE);
      if(pref)block=pref[1].trim();
      if(!block)continue;
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

  /* Se captura el texto bruto antes de que otros formateadores lo transformen.
     Después, en la misma vuelta, esta limpieza es la última que se aplica. */
  document.addEventListener('book:state',ev=>{
    if(!isMusical()||ev.detail?.state!=='text')return;
    const text=document.querySelector('#readerText');
    const raw=String(text?.textContent||'');
    queueMicrotask(()=>renderCleanMusical(raw));
  });

  /* Cada cambio de modo actualiza primero la clave de canon y después recarga,
     para que miramar-musical-canon.js construya el corpus adecuado antes de
     que lector.js cuente páginas. */
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

  /* En musical, la lectura es necesariamente ilustrada. */
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
  const schedule=()=>setTimeout(forceIllustrated,0);
  document.addEventListener('book:state',schedule);
  document.addEventListener('click',ev=>{
    if(!isMusical())return;
    const btn=ev.target.closest?.('.miramar-mode-btn,.miramar-cover-choice-btn');
    if(btn&&/TEXTO|TEXTUAL/i.test((btn.textContent||'').trim()))schedule();
  },true);
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode']});
  new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['data-miramar-mode']});
  setTimeout(forceIllustrated,0);
})();