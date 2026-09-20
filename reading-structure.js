(()=>{
  const $=s=>document.querySelector(s);
  const voices=window.GRANADA_STONE_MESOSTIC_VOICES||window.GRANADA_MESOSTIC_VOICES||{};
  const pSecret=n=>(window.GRANADA_STONE_TELESTIC||{})[`P${String(n).padStart(2,'0')}`]||null;
  const hSecret=n=>(window.GRANADA_STONE_ACROSTIC||{})[`H${String(n).padStart(2,'0')}`]||null;
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');

  function renderedNodes(host){
    const poem=[...host.querySelectorAll('.poem-line > .poem-verse')];
    if(poem.length)return poem;
    return [...host.children].filter(n=>n.classList&&n.classList.contains('line'));
  }

  function measureRendered(host,verses,base){
    const nodes=renderedNodes(host);
    if(nodes.length===verses.length&&nodes.length){
      const probe=document.createElement('div');
      Object.assign(probe.style,{position:'fixed',left:'-10000px',top:'-10000px',visibility:'hidden',whiteSpace:'nowrap',width:'max-content',zIndex:'-1'});
      document.body.appendChild(probe);
      const widths=[];
      nodes.forEach(node=>{
        const clone=node.cloneNode(true);
        const cs=getComputedStyle(node);
        Object.assign(clone.style,{display:'inline-block',width:'auto',maxWidth:'none',whiteSpace:'nowrap',fontSize:`${base}px`,fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,letterSpacing:cs.letterSpacing,textAlign:'left',textAlignLast:'auto'});
        probe.appendChild(clone);
        widths.push(clone.getBoundingClientRect().width);
        clone.remove();
      });
      probe.remove();
      return widths;
    }
    const family='Georgia, "Times New Roman", serif';
    if(ctx){ctx.font=`${base}px ${family}`;return verses.map(v=>ctx.measureText(v).width)}
    return verses.map(v=>v.length*base*.52);
  }

  function fitPoem(host,displayVerses,measureVerses=displayVerses){
    if(!host||!displayVerses?.length||!measureVerses?.length)return;
    requestAnimationFrame(()=>{
      const mobile=window.matchMedia('(max-width:780px)').matches;
      const base=mobile?14:17,min=mobile?11.5:12.5;
      const available=Math.max(220,(host.clientWidth||520)-8);
      const widths=measureRendered(host,measureVerses,base);
      let maxWidth=0,maxIndex=0;
      widths.forEach((w,i)=>{if(w>maxWidth){maxWidth=w;maxIndex=i;}});
      const size=Math.max(min,Math.min(base,base*(available/Math.max(1,maxWidth))));
      const finalWidth=Math.min(available,maxWidth*(size/base));
      host.classList.add('fit-poem');
      host.classList.remove('poem-justified');
      host.style.setProperty('--poem-font-size',`${size.toFixed(2)}px`);
      host.style.setProperty('--poem-measure',`${Math.ceil(finalWidth)}px`);
      host.dataset.widestVerse=String(maxIndex+1);
      host.title=`Escala común gobernada por el verso ${maxIndex+1}: «${measureVerses[maxIndex]}»`;
    });
  }

  function structuralRole(n,side){
    if(n!==14)return '';
    if(side==='P')return `<div class="structure-role structure-role-origin"><span>PUNTO DE PARTIDA Y DE REGRESO</span><strong>LA VEGA · su verso central fija el centro de simetría 14 × 14</strong></div>`;
    return `<div class="structure-role structure-role-axis"><span>EJE TRANSVERSAL</span><strong>BAJO LA CAL · en 14 × 14 se bifurca y genera los dos sonetos</strong></div>`;
  }

  function addSurfaceRegister(host,n){
    if(!host)return;
    host.querySelector('.structure-register')?.remove();
    const pair=voices[n]||{},secret=pSecret(n);
    const details=document.createElement('details');
    details.className='structure-register';
    details.innerHTML=`
      <summary>BAJO EL POEMA · MATRIZ PROFUNDA</summary>
      <div class="structure-register-body">
        ${structuralRole(n,'P')}
        <div class="structure-row"><span>P${String(n).padStart(2,'0')} · CLAVE TELÉSTICA</span><strong>${secret?.word||'—'}</strong></div>
        <div class="structure-row"><span>P${String(n).padStart(2,'0')} · MESÓSTICO</span><strong>${pair.v||'—'}</strong></div>
        <div class="structure-row"><span>JUNTA</span><strong>Estas claves pertenecen a la columna pétrea; no se fuerzan sobre el poema visible.</strong></div>
      </div>`;
    host.appendChild(details);
  }

  function addStoneRegister(host,n){
    if(!host)return;
    host.querySelector('.structure-register')?.remove();
    const pair=voices[n]||{},secret=hSecret(n);
    const details=document.createElement('details');
    details.className='structure-register';
    details.innerHTML=`
      <summary>CAPAS INTERIORES · ACRÓSTICO · MESÓSTICO · TELÉSTICO</summary>
      <div class="structure-register-body">
        ${structuralRole(n,'H')}
        <div class="structure-row"><span>H${String(n).padStart(2,'0')} · CLAVE ACRÓSTICA</span><strong>${secret?.word||'—'}</strong></div>
        <div class="structure-dialogue">
          <div><span>H${String(n).padStart(2,'0')} · MESÓSTICO</span><strong>${pair.h||'—'}</strong></div>
          <div class="structure-mirror">↕ ESPEJO ↕</div>
          <div><span>P${String(n).padStart(2,'0')} · RESPUESTA</span><strong>${pair.v||'—'}</strong></div>
        </div>
      </div>`;
    host.appendChild(details);
  }

  function enhanceVertical(){
    const n=((typeof pi==='number'?pi:0)+27)%27+1;
    const verses=window.GRANADA_SURFACE_POEMS?.[n-1]?.verses||[];
    fitPoem($('#vl'),verses);
    addSurfaceRegister($('#vl'),n);
  }

  function enhanceHorizontal(){
    const idx=((typeof row==='number'?row:0)+27)%27;
    const verses=window.GRANADA_STONE_ROWS?.[idx]?.verses||[];
    fitPoem($('#hl'),verses);
    addStoneRegister($('#hl'),idx+1);
  }

  function resetStructuralBook(page){
    if(!page)return;
    page.classList.remove('heart-book-page','heart-book-buried','heart-book-open','origin-book-page','axis-book-page');
    page.querySelector('.book-heart-kicker')?.remove();
    page.querySelector('.book-origin-kicker')?.remove();
  }

  function markStructuralBook(page,x){
    if(!page||!x)return {heart:false};
    if(x.k==='v'&&x.n===14){
      page.classList.add('origin-book-page');
      const h2=page.querySelector('h2');
      if(h2){const k=document.createElement('div');k.className='book-origin-kicker';k.textContent='PUNTO DE PARTIDA Y DE REGRESO · VERSO CENTRAL = CENTRO DE SIMETRÍA';h2.before(k)}
      return {heart:false};
    }
    if(x.e==='H14 · HORIZONTAL'){
      page.classList.add('axis-book-page');
      const h2=page.querySelector('h2');
      if(h2){const k=document.createElement('div');k.className='book-origin-kicker';k.textContent='EJE TRANSVERSAL · EN 14 × 14 NACEN LOS DOS SONETOS';h2.before(k)}
      return {heart:false};
    }
    const buried=x.e==='III · RADIAL',open=x.e==='IV · RADIAL';
    if(!buried&&!open)return {heart:false};
    page.classList.add('heart-book-page',buried?'heart-book-buried':'heart-book-open');
    const h2=page.querySelector('h2');
    if(h2){const k=document.createElement('div');k.className='book-heart-kicker';k.textContent=buried?'MOTOR / CORAZÓN · SONETO I':'MOTOR / CORAZÓN · SONETO II';h2.before(k)}
    return {heart:true};
  }

  function enhanceBook(){
    const page=$('#page');resetStructuralBook(page);
    const list=typeof items!=='undefined'?items:null,index=typeof bi==='number'?bi:null;
    const x=list&&index!==null?list[index]:null;
    if(!x||!['v','p'].includes(x.k)||!Array.isArray(x.l))return;
    const host=$('#page .lines');
    markStructuralBook(page,x);
    fitPoem(host,x.l);
  }

  if(typeof window.vert==='function'){const base=window.vert;window.vert=function(){base();enhanceVertical()}}
  if(typeof window.horiz==='function'){const base=window.horiz;window.horiz=function(){base();enhanceHorizontal()}}
  if(typeof window.book==='function'){const base=window.book;window.book=function(){base();enhanceBook()}}

  window.addEventListener('resize',()=>{
    const v=$('#verticalreader'),h=$('#horizontal');
    if(v&&!v.classList.contains('hidden'))enhanceVertical();
    if(h&&!h.classList.contains('hidden'))enhanceHorizontal();
    if($('#bookview')&&!$('#bookview').classList.contains('hidden'))enhanceBook();
  });

  enhanceVertical();enhanceHorizontal();enhanceBook();
})();
