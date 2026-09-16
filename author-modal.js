(()=>{
  let modal=null,lastFocus=null;

  const flagText=`<div class="author-fragment"><p><span class="author-twin">Fli</span> era un espejo fiel y deformante, capaz de absorber la hipocresía, la crueldad, la estupidez y toda la mierda humana, exagerarla hasta hacerla comprensible y devolverla convertida en risa.</p><p>Esa deformación era mi cura: mostraba la herida, mostraba el ridículo, lo compartía y, por un instante, lo hacía soportable.</p><p>Era el loco que decía la verdad para que los demás pudiéramos seguir viviendo con ella.</p><p class="author-rhythm">Flic. Flac.<br>Flip. Flap.<br><span class="author-twin">Fli</span>. <span class="author-twin">Flag</span>.</p><p class="author-rhythm">Perdido sin ti.</p><p class="author-rhythm">Sin más.</p><p class="author-rhythm">Como estas palabras sin ti: igual.</p></div>`;

  const fliText=`<div class="fli-memorial"><div class="fli-pages"><section class="fli-sheet" data-fli-page="1"><div class="fli-name">Friedhelm Erwin Grube Groth</div><div class="fli-subtitle">in memoriam</div><div class="fli-image-wrap"><img class="fli-image" src="images/Dyl_Ulenspiegel.jpg" width="522" height="800" alt="Dyl Ulenspiegel, grabado de 1515"></div></section><section class="fli-sheet" data-fli-page="2" hidden><div class="fli-gallery-wrap"><img class="fli-gallery" src="images/fli_pagina_2.png" width="1055" height="1491" alt="Segunda página visual del homenaje a Fli con fotografías escénicas y dibujo"></div></section></div><div class="fli-nav" aria-label="Navegación del memorial"><button type="button" data-fli-prev disabled>← Anterior</button><span data-fli-count>1 / 2</span><button type="button" data-fli-next>Siguiente →</button></div></div>`;

  const ensureStyles=()=>{
    if(document.querySelector('#fliModalStyles'))return;
    const s=document.createElement('style');
    s.id='fliModalStyles';
    s.textContent=`.fli-name{font-family:Georgia,serif;font-size:clamp(27px,4.5vw,48px);font-weight:400;line-height:1.08;letter-spacing:.015em;color:#f4ede5;text-align:center;margin:0 0 4px}.fli-subtitle{text-align:center;margin:0 0 24px;font:italic 15px Georgia,serif;letter-spacing:.08em;color:#b7aa9d}.fli-sheet[hidden]{display:none!important}.fli-image-wrap,.fli-gallery-wrap{display:flex;justify-content:center;margin:0 auto}.fli-image{display:block;width:min(300px,68vw);height:auto;border:1px solid rgba(255,255,255,.18);background:#eee8df;box-shadow:0 18px 48px rgba(0,0,0,.38)}.fli-gallery{display:block;width:min(720px,78vw);height:auto;border:1px solid rgba(255,255,255,.16);background:#15120f;box-shadow:0 18px 48px rgba(0,0,0,.38)}.fli-nav{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:18px}.fli-nav button{border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(22,19,16,.9);color:#f4ede5;padding:7px 12px;font:11px Georgia,serif;letter-spacing:.06em;cursor:pointer}.fli-nav button:disabled{opacity:.28;cursor:default}.fli-nav span{min-width:50px;text-align:center;font:10px Georgia,serif;letter-spacing:.12em;color:#a99b8c}@media(max-width:600px){.fli-image{width:min(260px,74vw)}.fli-gallery{width:min(82vw,620px)}}`;
    document.head.appendChild(s);
  };

  const bindFliPager=content=>{
    const pages=[...content.querySelectorAll('[data-fli-page]')];
    const prev=content.querySelector('[data-fli-prev]');
    const next=content.querySelector('[data-fli-next]');
    const count=content.querySelector('[data-fli-count]');
    let i=0;
    const render=()=>{
      pages.forEach((p,n)=>p.hidden=n!==i);
      if(prev)prev.disabled=i===0;
      if(next)next.disabled=i===pages.length-1;
      if(count)count.textContent=`${i+1} / ${pages.length}`;
      document.dispatchEvent(new CustomEvent('book:state',{detail:{state:'fli',page:i+1,total:pages.length}}));
    };
    if(prev)prev.onclick=()=>{if(i>0){i--;render();}};
    if(next)next.onclick=()=>{if(i<pages.length-1){i++;render();}};
    render();
  };

  const build=()=>{
    if(modal)return modal;
    ensureStyles();
    modal=document.createElement('div');
    modal.className='author-modal';
    modal.hidden=true;
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML=`<div class="author-modal-card" tabindex="-1"><button class="author-modal-close" type="button" aria-label="Cerrar">×</button><div class="author-modal-content"></div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.author-modal-close').addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
    return modal;
  };

  function open(kind,trigger){
    const m=build();
    lastFocus=trigger||document.activeElement;
    const content=m.querySelector('.author-modal-content');
    if(kind==='fli'){
      m.setAttribute('aria-label','Friedhelm Erwin Grube Groth, in memoriam');
      content.innerHTML=fliText;
      bindFliPager(content);
    }else{
      m.setAttribute('aria-label','flag');
      content.innerHTML=`<div class="author-sign">flag</div>${flagText}`;
    }
    m.hidden=false;
    m.querySelector('.author-modal-card').focus({preventScroll:true});
    document.dispatchEvent(new CustomEvent('author:open',{detail:{kind}}));
  }

  function close(){
    if(!modal||modal.hidden)return;
    modal.hidden=true;
    document.dispatchEvent(new CustomEvent('author:close'));
    if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus({preventScroll:true});
  }

  document.addEventListener('click',e=>{
    const fli=e.target.closest&&e.target.closest('[data-fli]');
    if(fli){
      e.preventDefault();
      e.stopImmediatePropagation();
      open('fli',fli);
      return;
    }
    const flag=e.target.closest&&e.target.closest('a[href="autor.html"],[data-author="flag"]');
    if(!flag)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open('flag',flag);
  },true);

  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal&&!modal.hidden){e.preventDefault();close();}});
  window.FLAG_AUTHOR={open:()=>open('flag',document.activeElement),close};
  window.FLI_MEMORIAL={open:()=>open('fli',document.activeElement),close};
})();