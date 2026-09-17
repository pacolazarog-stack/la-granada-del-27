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