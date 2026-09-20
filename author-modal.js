(()=>{
  let modal=null,lastFocus=null;
  const tribute=`<div class="author-fragment"><p><span class="author-twin">Fli</span> era un espejo fiel y deformante, capaz de absorber la hipocresía, la crueldad, la estupidez y toda la mierda humana, exagerarla hasta hacerla comprensible y devolverla convertida en risa.</p><p>Esa deformación era mi cura: mostraba la herida, mostraba el ridículo, lo compartía y, por un instante, lo hacía soportable.</p><p>Era el loco que decía la verdad para que los demás pudiéramos seguir viviendo con ella.</p><p class="author-rhythm">Flic. Flac.<br>Flip. Flap.<br><span class="author-twin">Fli</span>. <span class="author-twin">Flag</span>.</p><p class="author-rhythm">Perdido sin ti.</p><p class="author-rhythm">Sin más.</p><p class="author-rhythm">Como estas palabras sin ti: igual.</p></div>`;
  const build=()=>{
    if(modal)return modal;
    modal=document.createElement('div');
    modal.className='author-modal';
    modal.hidden=true;
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','flag');
    modal.innerHTML=`<div class="author-modal-card" tabindex="-1"><button class="author-modal-close" type="button" aria-label="Cerrar">×</button><div class="author-sign">flag</div>${tribute}</div>`;
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
    const a=e.target.closest&&e.target.closest('a[href="autor.html"],a[data-author="flag"]');
    if(!a)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open(a);
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal&&!modal.hidden){e.preventDefault();close();}});
  window.FLAG_AUTHOR={open:()=>open(document.activeElement),close};
})();