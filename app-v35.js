(()=>{
  const norm=s=>Array.from((s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,'')).map(x=>x.toUpperCase());
  const radialLetters=code=>norm(code);

  function cleanRadial(){
    const v=GRANADA_ROWS[13].verses;
    const render=(el,title,verses)=>{
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
    };
    render($('#rl'),'I · HACIA LO ENTERRADO',[v[13],...v.slice(0,13).reverse()]);
    render($('#rr'),'II · HACIA LO ABIERTO',[v[13],...v.slice(14)]);
  }

  window.vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27 · v2.5 CANDIDATA`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl'); host.innerHTML='';
    const verses=pv(pi);

    const guide=document.createElement('div');
    guide.className='rv-guide';
    guide.innerHTML='<div>↖ V14→V01</div><div>LECTURA VERTICAL</div><div>V14→V27 ↘</div>';
    host.appendChild(guide);

    if(pNo===14){
      verses.forEach((z,i)=>{
        const d=document.createElement('div');
        d.className='vline rv-line'+(i===13?' rv-center':'');
        d.innerHTML=`<span class="rv-margin"></span><span class="rv-verse">${z}</span><span class="rv-margin"></span>`;
        host.appendChild(d);
      });
      return;
    }

    const key=GRANADA_RADIAL_VERTICAL_KEYS[`P${String(pNo).padStart(2,'0')}`];
    const letters=radialLetters(key);

    verses.forEach((z,i)=>{
      const verseNo=i+1;
      let left='',right='';
      if(verseNo<=14) left=letters[14-verseNo]||'';
      if(verseNo>=14) right=letters[verseNo-14]||'';
      const d=document.createElement('div');
      d.className='vline rv-line'+(verseNo===14?' rv-center':'');
      d.innerHTML=`<span class="rv-margin rv-left">${left}</span><span class="rv-verse">${z}</span><span class="rv-margin rv-right">${right}</span>`;
      host.appendChild(d);
    });
  };

  window.horiz=function(){
    const r=GRANADA_ROWS[row];
    hp=(hp+27)%27;
    $('#hr').textContent=`H${String(r.row).padStart(2,'0')} / 27`;
    $('#ht').textContent=GRANADA_H_TITLES[row];
    $('#hc').textContent=r.verses[hp];
    $('#hp').textContent=`${String(hp+1).padStart(2,'0')} / 27 · ${GRANADA_TITLES[hp]} · v2.5 candidata`;
  };

  window.radial=cleanRadial;

  if(typeof items!=='undefined'){
    const hasCoda=items.some(x=>x.k==='c');
    if(!hasCoda && typeof LOA_I!=='undefined' && typeof LOA_II!=='undefined'){
      items.push({k:'c',t:'LAS DOS LOAS',sub:'Lectura plena del coro doble',v1:LOA_I,v2:LOA_II});
    }
    const cover=items.find(x=>x.k==='s'&&x.t==='LA GRANADA DEL 27 · UN SIGLO DESPUÉS');
    if(cover) cover.sub='Edición candidata v2.5 · 58 piezas poéticas';
    const other=items.find(x=>x.k==='s'&&x.t==='OTRA MANERA DE LEER');
    if(other){
      other.sub='56 poemas matriciales · 58 piezas poéticas';
      other.body='Los acrósticos radiales se descubren en la lectura vertical y radial. Las dos loas secretas se reúnen completas en la última página.';
    }
  }

  function mode35(id){
    $$('.view').forEach(v=>v.classList.add('hidden'));
    $('#'+id).classList.remove('hidden');
    $$('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===id));
    if(id==='bookview')book();
    if(id==='verticalreader')vert();
    if(id==='horizontal')horiz();
    if(id==='radial')cleanRadial();
    history.replaceState(null,'','#'+id);
  }

  $$('.mode').forEach(b=>b.onclick=()=>mode35(b.dataset.mode));
  $('#vp').onclick=()=>{pi--;vert()};
  $('#vn').onclick=()=>{pi++;vert()};
  $('#hrp').onclick=()=>{row=(row+26)%27;hp=0;horiz()};
  $('#hrn').onclick=()=>{row=(row+1)%27;hp=0;horiz()};
  $('#hvp').onclick=()=>{hp--;horiz()};
  $('#hvn').onclick=()=>{hp++;horiz()};

  const brand=document.querySelector('.brand small');
  if(brand) brand.textContent='Un siglo después · v2.5 candidata radial · 58 piezas';

  const h=location.hash.slice(1);
  if(['bookview','verticalreader','horizontal','radial'].includes(h)) mode35(h);
  else if(!$('#bookview').classList.contains('hidden')) book();
})();