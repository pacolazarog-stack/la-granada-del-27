(()=>{
  const norm=s=>Array.from((s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,'')).map(x=>x.toUpperCase());
  const radialLetters=code=>norm(code);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const hMeta=n=>GRANADA_ACROSTIC[`H${String(n).padStart(2,'0')}`]||null;
  const pMeta=n=>GRANADA_TELESTIC[`P${String(n).padStart(2,'0')}`]||null;

  function markHorizontal(line,mark){
    if(!mark)return esc(line);
    const i=Number(mark.offset);
    if(!Number.isInteger(i)||i<0||i>=line.length)return esc(line);
    return esc(line.slice(0,i))+`<span class="loa1-letter" title="LOA I · ${esc(mark.key||line[i])}">${esc(line[i])}</span>`+esc(line.slice(i+1));
  }

  function markVertical(line,mark){
    if(!mark)return esc(line);
    const a=Number(mark.start),b=Number(mark.end),k=Number(mark.keyOffset||0);
    if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<=a||b>line.length)return esc(line);
    const word=line.slice(a,b);
    const kk=Math.max(0,Math.min(word.length-1,k));
    const marked=esc(word.slice(0,kk))+`<span class="loa2-key">${esc(word[kk])}</span>`+esc(word.slice(kk+1));
    return esc(line.slice(0,a))+`<span class="loa2-word" title="LOA II">${marked}</span>`+esc(line.slice(b));
  }

  function cleanRadial(){
    const v=GRANADA_ROWS[13].verses;
    const render=(el,title,verses)=>{
      el.innerHTML='';
      const h=document.createElement('div');h.className='btitle';h.textContent=title;el.appendChild(h);
      const poem=document.createElement('div');poem.className='radial-clean-poem';
      verses.forEach(z=>{const d=document.createElement('div');d.className='radial-clean-line';d.textContent=z;poem.appendChild(d)});
      el.appendChild(poem);
    };
    render($('#rl'),'I · HACIA LO ENTERRADO',[v[13],...v.slice(0,13).reverse()]);
    render($('#rr'),'II · HACIA LO ABIERTO',[v[13],...v.slice(14)]);
  }

  window.vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');host.innerHTML='';
    const verses=pv(pi),meta=pMeta(pNo),marks=new Map((meta&&meta.marks||[]).map(m=>[m.row,m]));
    const guide=document.createElement('div');guide.className='rv-guide';guide.innerHTML='<div>↖ V14→V01</div><div>LECTURA VERTICAL</div><div>V14→V27 ↘</div>';host.appendChild(guide);
    if(pNo===14){
      verses.forEach((z,i)=>{const d=document.createElement('div');d.className='vline rv-line'+(i===13?' rv-center':'');const text=i===13?`<span class="loa-center-origin" title="VEINTISIETE">${esc(z)}</span>`:esc(z);d.innerHTML=`<span class="rv-margin"></span><span class="rv-verse">${text}</span><span class="rv-margin"></span>`;host.appendChild(d)});
      return;
    }
    const letters=radialLetters(GRANADA_RADIAL_VERTICAL_KEYS[`P${String(pNo).padStart(2,'0')}`]);
    verses.forEach((z,i)=>{const verseNo=i+1;let left='',right='';if(verseNo<=14)left=letters[14-verseNo]||'';if(verseNo>=14)right=letters[verseNo-14]||'';const d=document.createElement('div');d.className='vline rv-line'+(verseNo===14?' rv-center':'');d.innerHTML=`<span class="rv-margin rv-left">${left}</span><span class="rv-verse">${markVertical(z,marks.get(verseNo))}</span><span class="rv-margin rv-right">${right}</span>`;host.appendChild(d)});
  };

  window.horiz=function(){
    const r=GRANADA_ROWS[row];hp=(hp+27)%27;
    const hNo=r.row,pos=hp+1,meta=hMeta(hNo),mark=(meta&&meta.marks||[]).find(m=>m.position===pos);
    $('#hr').textContent=`H${String(hNo).padStart(2,'0')} / 27`;
    $('#ht').textContent=GRANADA_H_TITLES[row];
    $('#hc').innerHTML=hNo===14&&pos===14?`<span class="loa-center-origin" title="VEINTISIETE">${esc(r.verses[hp])}</span>`:markHorizontal(r.verses[hp],mark);
    $('#hp').textContent=`${String(pos).padStart(2,'0')} / 27 · ${GRANADA_TITLES[hp]}`;
  };

  window.radial=cleanRadial;

  const baseBook=window.book;
  window.book=function(){
    baseBook();
    const x=items[bi];if(!x||x.k!=='p')return;
    const els=[...document.querySelectorAll('#page .line')];
    let m=x.e&&x.e.match(/^(\d{2}) · VERTICAL$/);
    if(m){
      const pNo=Number(m[1]),meta=pMeta(pNo),marks=new Map((meta&&meta.marks||[]).map(z=>[z.row,z]));
      els.forEach((el,i)=>{el.innerHTML=pNo===14&&i===13?`<span class="loa-center-origin" title="VEINTISIETE">${esc(x.l[i])}</span>`:markVertical(x.l[i],marks.get(i+1))});
      return;
    }
    m=x.e&&x.e.match(/^H(\d{2}) · HORIZONTAL$/);
    if(m){
      const hNo=Number(m[1]),meta=hMeta(hNo),marks=new Map((meta&&meta.marks||[]).map(z=>[z.position,z]));
      els.forEach((el,i)=>{el.innerHTML=hNo===14&&i===13?`<span class="loa-center-origin" title="VEINTISIETE">${esc(x.l[i])}</span>`:markHorizontal(x.l[i],marks.get(i+1))});
    }
  };

  $('#vp').onclick=()=>{pi--;vert()};
  $('#vn').onclick=()=>{pi++;vert()};
  $('#hrp').onclick=()=>{row=(row+26)%27;hp=0;horiz()};
  $('#hrn').onclick=()=>{row=(row+1)%27;hp=0;horiz()};
  $('#hvp').onclick=()=>{hp--;horiz()};
  $('#hvn').onclick=()=>{hp++;horiz()};

  const brand=document.querySelector('.brand small');if(brand)brand.textContent='Un siglo después';
  vert();horiz();cleanRadial();book();
  const h=location.hash.slice(1);if(['bookview','verticalreader','horizontal','radial'].includes(h))mode(h);
})();