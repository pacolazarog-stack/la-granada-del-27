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

  if(items.length){items[0]={k:'cover',t:'LA GRANADA DEL 27',sub:'UN SIGLO DESPUÉS'};}
  const vegaIndex=items.findIndex(x=>x&&x.k==='v'&&Number(x.n)===14);
  const emitState=state=>document.dispatchEvent(new CustomEvent('book:state',{detail:{state,page:bi,total:items.length,title:'La Granada del 27'}}));

  function syncVegaState(){
    document.documentElement.classList.toggle('vega-trip',vegaTrip);
    if(!vegaButton)return;
    vegaButton.classList.toggle('active',vegaTrip);
    vegaButton.setAttribute('aria-pressed',vegaTrip?'true':'false');
    vegaButton.setAttribute('aria-label',vegaTrip?'Volver desde La Vega a la portada':'Ir directamente al poema La Vega y volver obligatoriamente a la portada');
    vegaButton.title=vegaTrip?'Volver a la portada':'Ir a LA VEGA · ida y vuelta';
  }

  function renderFront(){
    page.className='page cover-page';page.scrollTop=0;
    page.innerHTML=`<div class="book-cover" aria-label="Portada de La Granada del 27. Un siglo después"><div class="cover-top"><span>GRANADA · 2027</span><span class="cover-axis">14 × 14</span></div><div class="cover-center"><h1 class="cover-title"><span>LA GRANADA</span><span>DEL 27</span></h1><div class="cover-subtitle">UN SIGLO DESPUÉS</div><div class="cover-rule"></div><p class="cover-motto">Dos Granadas se miran.<br>Al fondo permanece la Vega.</p></div><div class="cover-bottom"><a class="cover-author" href="autor.html" aria-label="Autor: flag">flag</a><button class="cover-hinge cover-hinge-button" type="button" data-vega-direct aria-label="Ir directamente al poema La Vega">LA VEGA · PARTIDA Y REGRESO ↔</button></div></div>`;
    progress.textContent=`PORTADA · ${items.length} PIEZAS`;
    prev.hidden=false;next.hidden=false;
    prev.disabled=true;prev.textContent='← Anterior';
    next.disabled=false;next.textContent='Abrir libro →';
    emitState('cover');
    syncVegaState();
  }

  function renderBack(){
    page.className='page back-cover-page';page.scrollTop=0;
    page.innerHTML=`<div class="book-back" aria-label="Contraportada de La Granada del 27. Un siglo después"><div class="back-copy"><div class="back-kicker">GRANADA · 2027</div><h2>Un siglo después,<br>Granada vuelve a mirarse.</h2><p>Este libro no vuelve a 1927 para reconstruirlo. Lo coloca frente a 2027. Entre ambas fechas se abre una puerta.</p><p>A través de ella, los poemas se miran, se cruzan y se responden. La lectura vertical encuentra su reflejo horizontal; las diagonales atraviesan el centro; otras voces permanecen escondidas en el principio, el interior y el final de los versos.</p><p>En el centro de simetría late una sola línea:</p><p class="back-axis-line">«Late bajo la cal la acequia hundida.»</p><p>Es el verso 14 de <strong>LA VEGA</strong>. De ese punto nace el movimiento del libro. <strong>BAJO LA CAL</strong> lo atraviesa, dos sonetos se abren en direcciones contrarias y la lectura vuelve finalmente al lugar del que partió: la Vega.</p><div class="back-questions"><p>¿Qué ve de nosotros la Granada de 1927?</p><p>¿Qué Granada estamos dejando a quienes miren hacia 2127?</p></div><p class="back-final">La ciudad cambia.<br>La Vega permanece.</p><div class="back-credit"><a href="autor.html" aria-label="Autor: flag">flag</a> · 2027</div></div></div>`;
    progress.textContent=`CONTRAPORTADA · ${items.length} / ${items.length}`;
    prev.hidden=false;prev.disabled=false;prev.textContent='← Última página';
    next.hidden=false;next.disabled=false;next.textContent='AZAR · CODA →';
    emitState('back');
    syncVegaState();
  }

  function returnToFront(){
    vegaTrip=false;backCover=false;bi=0;
    if(typeof window.mode==='function')window.mode('bookview');
    else window.book();
    history.replaceState(null,'','#bookview');
    syncVegaState();
  }

  function openVegaTrip(){
    if(vegaIndex<0)return;
    backCover=false;vegaTrip=true;bi=vegaIndex;
    if(typeof window.mode==='function')window.mode('bookview');
    else window.book();
    history.replaceState(null,'','#la-vega');
    syncVegaState();
  }

  window.book=function(){
    if(vegaTrip){
      backCover=false;
      page.className='page';
      baseBook();
      prev.hidden=false;prev.disabled=false;prev.textContent='← Volver a portada';
      next.hidden=true;
      progress.textContent='LA VEGA · IDA Y VUELTA';
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
    if(vegaTrip){returnToFront();return;}
    if(backCover){backCover=false;bi=items.length-1;window.book();return;}
    bi=Math.max(0,bi-1);window.book();
  };
  next.onclick=()=>{
    if(vegaTrip){returnToFront();return;}
    if(backCover){if(typeof window.mode==='function')window.mode('chance');return;}
    if(bi===items.length-1){backCover=true;window.book();return;}
    bi=Math.min(items.length-1,bi+1);window.book();
  };

  document.addEventListener('click',ev=>{
    const trigger=ev.target.closest?.('[data-vega-direct]');
    if(trigger){
      ev.preventDefault();
      if(vegaTrip)returnToFront();else openVegaTrip();
      return;
    }
    if(vegaTrip&&ev.target.closest?.('.brand')){
      ev.preventDefault();
      returnToFront();
    }
  });

  window.GRANADA_VEGA_TRIP={open:openVegaTrip,close:returnToFront,isActive:()=>vegaTrip};
  window.GRANADA_BOOK_COVER={open:()=>{vegaTrip=false;backCover=false;bi=0;window.book();},close:()=>{vegaTrip=false;backCover=true;window.book();}};

  if(location.hash==='#la-vega')openVegaTrip();
  else window.book();
})();