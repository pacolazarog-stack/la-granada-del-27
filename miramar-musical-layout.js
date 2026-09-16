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
  document.addEventListener('volume:soundchange',()=>setTimeout(forceIllustrated,0));
  document.addEventListener('volume:voicechange',()=>setTimeout(forceIllustrated,0));
  document.addEventListener('book:state',()=>setTimeout(forceIllustrated,0));
  new MutationObserver(forceIllustrated).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode']});
  setTimeout(forceIllustrated,0);
})();
