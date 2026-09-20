(()=>{
  const page=document.querySelector('#page');
  const prev=document.querySelector('#bp');
  const next=document.querySelector('#bn');
  const progress=document.querySelector('#prog');
  const vegaButton=document.querySelector('#vega-direct');
  if(!page||!prev||!next||!progress||typeof window.book!=='function'||typeof items==='undefined')return;

  const baseBook=window.book;
  let backCover=false;
  let vegaTrip=false;
  let vegaSource=null;
  let vegaReturn=null;

  if(items.length){items[0]={k:'cover',t:'LA GRANADA DEL 27',sub:'UN SIGLO DESPUÉS'};}
  const vegaIndex=items.findIndex(x=>x&&x.k==='v'&&Number(x.n)===14);
  const emitState=state=>document.dispatchEvent(new CustomEvent('book:state',{detail:{state,page:bi,total:items.length,title:'La Granada del 27'}}));

  function activeViewId(){
    return [...document.querySelectorAll('.view')].find(v=>!v.classList.contains('hidden'))?.id||'bookview';
  }

  function captureOrigin(){
    return {
      mode:activeViewId(),
      bi,
      backCover,
      hash:location.hash||'#bookview'
    };
  }

  function coverOrigin(){
    return {mode:'bookview',bi:0,backCover:false,hash:'#bookview'};
  }

  function activateBookView(){
    document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
    document.querySelector('#bookview')?.classList.remove('hidden');
    document.querySelectorAll('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode==='bookview'));
    document.dispatchEvent(new CustomEvent('view:mode',{detail:{id:'bookview'}}));
  }

  function syncVegaState(){
    document.documentElement.classList.toggle('vega-trip',vegaTrip);
    if(!vegaButton)return;
    vegaButton.classList.toggle('active',vegaTrip);
    vegaButton.setAttribute('aria-pressed',vegaTrip?'true':'false');
    if(vegaTrip&&vegaSource==='cover'){
      vegaButton.setAttribute('aria-label','Volver desde La Vega a la portada');
      vegaButton.title='Volver a la portada';
    }else if(vegaTrip){
      vegaButton.setAttribute('aria-label','Volver desde La Vega a la página desde la que se accedió');
      vegaButton.title='Volver exactamente a la página de origen';
    }else{
      vegaButton.setAttribute('aria-label','Ir directamente al poema La Vega y volver a la misma página');
      vegaButton.title='Ir a LA VEGA y regresar a esta misma página';
    }
  }

  function renderFront(){
    page.className='page cover-page';page.scrollTop=0;
    page.innerHTML=`<div class="book-cover" aria-label="Portada de La Granada del 27. Un siglo después"><div class="cover-top"><span>GRANADA · 2027</span><span class="cover-axis">14 × 14</span></div><div class="cover-center"><h1 class="cover-title"><span>LA GRANADA</span><span>DEL 27</span></h1><div class="cover-subtitle">UN SIGLO DESPUÉS</div><div class="cover-rule"></div><p class="cover-motto">Dos Granadas se miran.<br>Al fondo permanece la Vega.</p></div><div class="cover-bottom"><button class="cover-hinge cover-hinge-button" type="button" data-vega-cover aria-label="Ir a La Vega y regresar a la portada">LA VEGA · PARTIDA Y REGRESO ↔</button><a class="cover-author" href="autor.html" aria-label="Autor: flag">flag</a></div></div>`;
    progress.textContent=`PORTADA · ${items.length} PIEZAS`;
    prev.hidden=false;next.hidden=false;
    prev.disabled=true;prev.textContent='← Anterior';
    next.disabled=false;next.textContent='Abrir libro →';
    emitState('cover');
    syncVegaState();
  }

  function renderBack(){
    page.className='page back-cover-page';page.scrollTop=0;
    page.innerHTML=`<div class="book-back" aria-label="Contraportada de La Granada del 27. Un siglo después"><div class="back-copy"><div class="back-kicker">GRANADA · 2027</div><h2>Un siglo después,<br>Granada vuelve a mirarse.</h2><p>Este libro no vuelve a 1927 para reconstruirlo. Lo coloca frente a 2027. Entre ambas fechas se abre una puerta.</p><p>A través de ella, los poemas se miran, se cruzan y se responden. La lectura vertical encuentra su reflejo horizontal; las diagonales atraviesan el centro; otras voces permanecen escondidas en el principio, el interior y el final de los versos.</p><p>En el centro de simetría late una sola línea:</p><p class="back-axis-line">[verso retirado temporalmente de la edición pública]</p><p>Es el verso axial de <strong>LA VEGA</strong> y el centro único 14 × 14 × 14 del sistema. En la obra visible aparece como umbral y cierre de un tríptico de tres sonetos: el final devuelve al comienzo. <strong>BAJO LA CAL</strong> lo atraviesa en la piedra, mientras la lectura literaria conserva su autonomía.</p><div class="back-questions"><p>¿Qué ve de nosotros la Granada de 1927?</p><p>¿Qué Granada estamos dejando a quienes miren hacia 2127?</p></div><p class="back-final">La ciudad cambia.<br>La Vega permanece.</p><div class="back-credit"><a href="autor.html" aria-label="Autor: flag">flag</a> · 2027</div></div></div>`;
    progress.textContent=`CONTRAPORTADA · ${items.length} / ${items.length}`;
    prev.hidden=false;prev.disabled=false;prev.textContent='← Última página';
    next.hidden=false;next.disabled=false;next.textContent='AZAR · CODA →';
    emitState('back');
    syncVegaState();
  }

  function closeVegaTrip(){
    const destination=vegaReturn||coverOrigin();
    vegaTrip=false;
    vegaSource=null;
    vegaReturn=null;
    bi=Math.max(0,Math.min(items.length-1,Number(destination.bi)||0));
    backCover=!!destination.backCover;

    if(destination.mode==='bookview'){
      activateBookView();
      window.book();
    }else if(typeof window.mode==='function'){
      window.mode(destination.mode);
    }else{
      activateBookView();
      window.book();
    }

    if(destination.hash)history.replaceState(null,'',destination.hash);
    syncVegaState();
  }

  function openVegaTrip(source='toolbar'){
    if(vegaIndex<0)return;
    vegaReturn=source==='cover'?coverOrigin():captureOrigin();
    vegaSource=source;
    backCover=false;
    vegaTrip=true;
    bi=vegaIndex;
    activateBookView();
    window.book();
    history.replaceState(null,'','#la-vega');
    syncVegaState();
  }

  window.book=function(){
    if(vegaTrip){
      backCover=false;
      page.className='page';
      baseBook();
      prev.hidden=false;next.hidden=false;

      if(vegaSource==='cover'){
        prev.disabled=false;next.disabled=false;
        prev.textContent='← Volver a portada';
        next.textContent='Volver a portada →';
        progress.textContent='LA VEGA · PARTIDA Y REGRESO';
      }else{
        prev.disabled=bi<=1;
        next.disabled=bi>=items.length-1;
        prev.textContent='← Anterior';
        next.textContent='Siguiente →';
        progress.textContent=`${bi+1} / ${items.length} · LA VEGA ↔ vuelve al origen`;
      }

      emitState('text');
      syncVegaState();
      return;
    }
    if(backCover){renderBack();return;}
    if(bi===0){renderFront();return;}
    prev.hidden=false;next.hidden=false;
    page.className='page';baseBook();
    prev.textContent='← Anterior';
    next.textContent=bi===items.length-1?'Contraportada →':'Siguiente →';
    next.disabled=false;
    emitState('text');
    syncVegaState();
  };

  prev.onclick=()=>{
    if(vegaTrip){
      if(vegaSource==='cover'){closeVegaTrip();return;}
      bi=Math.max(1,bi-1);window.book();return;
    }
    if(backCover){backCover=false;bi=items.length-1;window.book();return;}
    bi=Math.max(0,bi-1);window.book();
  };
  next.onclick=()=>{
    if(vegaTrip){
      if(vegaSource==='cover'){closeVegaTrip();return;}
      bi=Math.min(items.length-1,bi+1);window.book();return;
    }
    if(backCover){if(typeof window.mode==='function')window.mode('chance');return;}
    if(bi===items.length-1){backCover=true;window.book();return;}
    bi=Math.min(items.length-1,bi+1);window.book();
  };

  if(vegaButton){
    vegaButton.onclick=ev=>{
      ev.preventDefault();ev.stopPropagation();
      if(vegaTrip)closeVegaTrip();else openVegaTrip('toolbar');
    };
  }

  document.addEventListener('click',ev=>{
    const coverTrigger=ev.target.closest?.('[data-vega-cover]');
    if(coverTrigger){
      ev.preventDefault();
      if(vegaTrip)closeVegaTrip();else openVegaTrip('cover');
      return;
    }
    if(vegaTrip&&ev.target.closest?.('.brand')){
      ev.preventDefault();
      closeVegaTrip();
    }
  });

  window.GRANADA_VEGA_TRIP={
    open:()=>openVegaTrip('toolbar'),
    openFromCover:()=>openVegaTrip('cover'),
    close:closeVegaTrip,
    isActive:()=>vegaTrip,
    source:()=>vegaSource
  };
  window.GRANADA_BOOK_COVER={open:()=>{vegaTrip=false;vegaSource=null;vegaReturn=null;backCover=false;bi=0;activateBookView();window.book();},close:()=>{vegaTrip=false;vegaSource=null;vegaReturn=null;backCover=true;activateBookView();window.book();}};

  if(location.hash==='#la-vega')openVegaTrip('cover');
  else window.book();
})();