(()=>{
  const page=document.querySelector('#page');
  const prev=document.querySelector('#bp');
  const next=document.querySelector('#bn');
  const progress=document.querySelector('#prog');
  if(!page||!prev||!next||!progress||typeof window.book!=='function'||typeof items==='undefined')return;

  const baseBook=window.book;
  let backCover=false;

  if(items.length){
    items[0]={k:'cover',t:'LA GRANADA DEL 27',sub:'UN SIGLO DESPUÉS'};
  }

  function renderFront(){
    page.className='page cover-page';
    page.scrollTop=0;
    page.innerHTML=`
      <div class="book-cover" aria-label="Portada de La Granada del 27. Un siglo después">
        <div class="cover-top"><span>GRANADA · 2027</span><span class="cover-axis">14 × 14</span></div>
        <div class="cover-center"><h1 class="cover-title"><span>LA GRANADA</span><span>DEL 27</span></h1><div class="cover-subtitle">UN SIGLO DESPUÉS</div><div class="cover-rule"></div><p class="cover-motto">Dos Granadas se miran.<br>Al fondo permanece la Vega.</p></div>
        <div class="cover-bottom"><div class="cover-author">Francisco Javier Lázaro Guil</div><div class="cover-hinge">LA VEGA · PARTIDA Y REGRESO</div></div>
      </div>`;
    progress.textContent=`PORTADA · ${items.length} PIEZAS`;
    prev.disabled=true;prev.textContent='← Anterior';
    next.disabled=false;next.textContent='Abrir libro →';
  }

  function renderBack(){
    page.className='page back-cover-page';
    page.scrollTop=0;
    page.innerHTML=`
      <div class="book-back" aria-label="Contraportada de La Granada del 27. Un siglo después">
        <div class="back-copy">
          <div class="back-kicker">GRANADA · 2027</div>
          <h2>Un siglo después,<br>Granada vuelve a mirarse.</h2>
          <p>Este libro no vuelve a 1927 para reconstruirlo. Lo coloca frente a 2027. Entre ambas fechas se abre una puerta.</p>
          <p>A través de ella, los poemas se miran, se cruzan y se responden. La lectura vertical encuentra su reflejo horizontal; las diagonales atraviesan el centro; otras voces permanecen escondidas en el principio, el interior y el final de los versos.</p>
          <p>En el centro de simetría late una sola línea:</p>
          <p class="back-axis-line">«Late bajo la cal la acequia hundida.»</p>
          <p>Es el verso 14 de <strong>LA VEGA</strong>. De ese punto nace el movimiento del libro. <strong>BAJO LA CAL</strong> lo atraviesa, dos sonetos se abren en direcciones contrarias y la lectura vuelve finalmente al lugar del que partió: la Vega.</p>
          <div class="back-questions"><p>¿Qué ve de nosotros la Granada de 1927?</p><p>¿Qué Granada estamos dejando a quienes miren hacia 2127?</p></div>
          <p class="back-final">La ciudad cambia.<br>La Vega permanece.</p>
          <div class="back-credit">Francisco Javier Lázaro Guil · 2027</div>
        </div>
      </div>`;
    progress.textContent=`CONTRAPORTADA · ${items.length} / ${items.length}`;
    prev.disabled=false;prev.textContent='← Libro';
    next.disabled=false;next.textContent='Inicio →';
  }

  window.book=function(){
    if(backCover){renderBack();return;}
    if(bi===0){renderFront();return;}
    page.className='page';
    baseBook();
    prev.textContent='← Anterior';
    next.textContent=bi===items.length-1?'Contraportada →':'Siguiente →';
    next.disabled=false;
  };

  prev.onclick=()=>{
    if(backCover){backCover=false;bi=items.length-1;}
    else{bi=Math.max(0,bi-1);}
    window.book();
  };

  next.onclick=()=>{
    if(backCover){location.href='index.html';return;}
    if(bi===items.length-1){backCover=true;}
    else{bi=Math.min(items.length-1,bi+1);}
    window.book();
  };

  window.GRANADA_BOOK_COVER={open:()=>{backCover=false;bi=0;window.book();},close:()=>{backCover=true;window.book();}};
  window.book();
})();