(()=>{
  let modal=null,lastFocus=null;
  const build=()=>{
    if(modal)return modal;
    modal=document.createElement('div');
    modal.className='author-modal';
    modal.hidden=true;
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','flag');
    modal.innerHTML=`<div class="author-modal-card" tabindex="-1"><button class="author-modal-close" type="button" aria-label="Cerrar">×</button><div class="author-sign">flag</div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.author-modal-close').addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
    return modal;
  };
  function open(trigger){
    const m=build();
    lastFocus=trigger||document.activeElement;
    m.hidden=false;
    m.querySelector('.author-modal-card').focus({preventScroll:true});
  }
  function close(){
    if(!modal||modal.hidden)return;
    modal.hidden=true;
    if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus({preventScroll:true});
  }
  document.addEventListener('click',e=>{
    const trigger=e.target.closest&&e.target.closest('a[href="autor.html"],[data-author="flag"]');
    if(!trigger)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open(trigger);
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal&&!modal.hidden){e.preventDefault();close();}});
  window.FLAG_AUTHOR={open:()=>open(document.activeElement),close};
})();