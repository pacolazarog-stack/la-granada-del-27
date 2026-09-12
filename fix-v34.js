(()=>{
  const LOA_I_V34=[
    'Granada abre la mesa:',
    'agua y música despiertan',
    'juventud, amistad;',
    'agosto deja silencio.',
    'VEINTISIETE devuelven voces,',
    'nombres, manos, luz, hilo, canto;',
    'agua abre otra mesa.',
    'Granada responde.'
  ];
  const LOA_II_V34=[
    'Granada guarda lo que falta',
    'bajo la cal;',
    'agua nombra ausencias,',
    'sangre vuelve memoria.',
    'VEINTISIETE escuchan:',
    'silencio abre voces,',
    'devuelve nombres;',
    'agua sube, rompe cal;',
    'Granada vuelve, canta.'
  ];

  if(typeof items!=='undefined' && !items.some(x=>x.k==='c')){
    items.push({k:'c',t:'LAS DOS LOAS',sub:'Lectura plena del coro doble',v1:LOA_I_V34,v2:LOA_II_V34});
  }

  if(typeof items!=='undefined'){
    const other=items.find(x=>x.k==='s'&&x.t==='OTRA MANERA DE LEER');
    if(other){
      other.sub='56 poemas matriciales · 58 piezas poéticas';
      other.body='Los acrósticos radiales se descubren en la lectura. Las dos loas secretas se reúnen completas en la última página.';
    }
  }

  function renderCleanBranch(el,title,verses){
    el.innerHTML='';
    const h=document.createElement('div');
    h.className='btitle';
    h.textContent=title;
    el.appendChild(h);
    const poem=document.createElement('div');
    poem.className='radial-clean-poem';
    verses.forEach(z=>{
      const d=document.createElement('div');
      d.className='radial-clean-line';
      d.textContent=z;
      poem.appendChild(d);
    });
    el.appendChild(poem);
  }

  function cleanRadial(){
    const v=GRANADA_ROWS[13].verses;
    renderCleanBranch($('#rl'),'I · HACIA LO ENTERRADO',[v[13],...v.slice(0,13).reverse()]);
    renderCleanBranch($('#rr'),'II · HACIA LO ABIERTO',[v[13],...v.slice(14)]);
  }

  const radialBtn=document.querySelector('.mode[data-mode="radial"]');
  if(radialBtn){
    radialBtn.onclick=()=>{
      document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
      $('#radial').classList.remove('hidden');
      document.querySelectorAll('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode==='radial'));
      cleanRadial();
      history.replaceState(null,'','#radial');
    };
  }

  if(!$('#radial').classList.contains('hidden')) cleanRadial();
  if(!$('#bookview').classList.contains('hidden') && typeof book==='function') book();
  window.cleanRadialV34=cleanRadial;
})();