(()=>{
  const norm=s=>Array.from((s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,'')).map(x=>x.toUpperCase());
  const radialLetters=code=>norm(code);

  if(typeof items!=='undefined'){
    items = items.filter(x=>x.k!=='c');
    const other=items.find(x=>x.k==='s'&&x.t==='OTRA MANERA DE LEER');
    if(other){
      other.sub='56 poemas matriciales · 58 piezas poéticas';
      other.body='Candidata v2.5: 26 poemas verticales reproducen el modelo radial alrededor de su verso 14. LA VEGA permanece como centro inmóvil; H14 conserva la revelación LA GRANADA DEL DOS SIETE.';
    }
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
      const box=document.createElement('div');
      box.className='rv-axis';
      box.innerHTML='<div class="rv-label">CENTRO DEL SISTEMA</div><strong>LA VEGA · P14 / V14</strong><div>Late bajo la cal la acequia hundida.</div>';
      host.appendChild(box);
      return;
    }

    const key=GRANADA_RADIAL_VERTICAL_KEYS[`P${String(pNo).padStart(2,'0')}`];
    const letters=radialLetters(key);

    verses.forEach((z,i)=>{
      const verseNo=i+1;
      let left='', right='';
      if(verseNo<=14) left=letters[14-verseNo]||'';
      if(verseNo>=14) right=letters[verseNo-14]||'';
      const d=document.createElement('div');
      d.className='vline rv-line'+(verseNo===14?' rv-center':'');
      d.innerHTML=`<span class="rv-margin rv-left">${left}</span><span class="rv-verse">${z}</span><span class="rv-margin rv-right">${right}</span>`;
      host.appendChild(d);
    });
  };

  window.horiz=function(){
    let r=GRANADA_ROWS[row];
    hp=(hp+27)%27;
    $('#hr').textContent=`H${String(r.row).padStart(2,'0')} / 27`;
    $('#ht').textContent=GRANADA_H_TITLES[row];
    $('#hc').textContent=r.verses[hp];
    $('#hp').textContent=`${String(hp+1).padStart(2,'0')} / 27 · ${GRANADA_TITLES[hp]} · v2.5 candidata`;
  };

  const brand=document.querySelector('.brand small');
  if(brand)brand.textContent='Un siglo después · v2.5 candidata radial · 58 piezas';

  if(!$('#verticalreader').classList.contains('hidden')) window.vert();
  if(!$('#horizontal').classList.contains('hidden')) window.horiz();
  if(!$('#bookview').classList.contains('hidden')) book();
})();