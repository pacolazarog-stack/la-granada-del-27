(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  /* Este módulo ya no crea ni sustituye el corpus musical.
     El canon se construye antes, en miramar-musical-canon.js y sus suplementos.
     Aquí se aplica la selección vigente del corpus, se conserva una copia activa,
     se actualiza la interfaz y se fuerza la lectura ilustrada en musical. */
  const activeCanon=()=>window.MIRAMAR_ACTIVE_CANON||localStorage.getItem('miramarCanonMode')||'';
  const isMusical=()=>activeCanon()==='musical'||document.documentElement.dataset.mediaMode==='musical';

  if(window.WORK_DATA&&Array.isArray(window.WORK_DATA.pages)){
    if(isMusical()){
      /* Versión musical vigente: se quitan de la lectura las 16 primeras páginas.
         Los textos fuente permanecen intactos en sus módulos para poder revertirlos. */
      if(window.WORK_DATA.pages.length>=30){
        window.WORK_DATA={
          ...window.WORK_DATA,
          subtitle:'Tragicomedia multimedia · Canon musical · escenas 17–30',
          pages:[...window.WORK_DATA.pages].slice(16)
        };
        window.MIRAMAR_CANON={
          version:'musical-2026-09-17-17-30',
          pages:window.WORK_DATA.pages.length,
          validated:true
        };
        const m=location.hash.match(/^#p(\d+)$/);
        if(m&&Number(m[1])>window.WORK_DATA.pages.length)history.replaceState(null,'','#p1');
      }
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

  /* El cambio de canon se resuelve recargando: así cada cadena de scripts
     reconstruye su corpus completo antes de que lector.js calcule páginas. */
  let reloadPending=false;
  const reloadForCanonChange=()=>{
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