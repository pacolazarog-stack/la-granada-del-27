(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const isMusical=()=>document.documentElement.dataset.mediaMode==='musical';
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
  document.addEventListener('volume:soundchange',schedule);
  document.addEventListener('volume:voicechange',schedule);
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
