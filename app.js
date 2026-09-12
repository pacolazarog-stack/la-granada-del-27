(()=>{
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
  const hMeta=n=>GRANADA_ACROSTIC[`H${String(n).padStart(2,'0')}`]||null;
  const pMeta=n=>GRANADA_TELESTIC[`P${String(n).padStart(2,'0')}`]||null;
  const mMeta=(side,n)=>(window.GRANADA_MESOSTIC||{})[`${side}${String(n).padStart(2,'0')}`]||null;
  let diagDirection='down';

  function bounds(line){
    const chars=Array.from(line);
    const idx=[];
    chars.forEach((c,i)=>{if(alpha.test(c))idx.push(i)});
    return idx.length?{first:idx[0],last:idx[idx.length-1]}:{first:-1,last:-1};
  }

  function composite(line,{hMark=null,vMark=null,mMark=null,mText='',structure=true}={}){
    const slots=Array.from({length:line.length},()=>({classes:new Set(),titles:[]}));
    const add=(i,cls,title)=>{
      if(!Number.isInteger(i)||i<0||i>=slots.length)return;
      slots[i].classes.add(cls);
      if(title)slots[i].titles.push(title);
    };
    if(structure){
      const b=bounds(line);
      if(b.first>=0)add(b.first,'acrostic-letter','ACRÓSTICO · primera letra');
      if(b.last>=0&&b.last!==b.first)add(b.last,'telestic-letter','TELÉSTICO · última letra');
    }
    if(hMark){
      const i=Number(hMark.offset);
      add(i,'loa1-letter',`LOA I · ${hMark.key||line[i]||''}`);
    }
    if(vMark){
      const a=Number(vMark.start),b=Number(vMark.end),k=Number(vMark.keyOffset||0);
      if(Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>a&&b<=line.length){
        for(let i=a;i<b;i++)add(i,'loa2-word','LOA II');
        const kk=Math.max(0,Math.min(b-a-1,k));
        add(a+kk,'loa2-key',`LOA II · ${vMark.key||line[a+kk]||''}`);
      }
    }
    if(mMark){
      const i=Number(mMark.offset);
      if(i>=0)add(i,'mesostic-letter',`MESÓSTICO · ${mText}`);
    }
    return Array.from(line).map((ch,i)=>{
      const s=slots[i];
      if(!s||!s.classes.size)return esc(ch);
      const cls=[...s.classes].join(' ');
      const title=s.titles.length?` title="${esc([...new Set(s.titles)].join(' · '))}"`:'';
      return `<span class="${cls}"${title}>${esc(ch)}</span>`;
    }).join('');
  }

  const markHorizontal=(line,loaMark,mesoMark,mesoText)=>composite(line,{hMark:loaMark,mMark:mesoMark,mText:mesoText});
  const markVertical=(line,loaMark,mesoMark,mesoText)=>composite(line,{vMark:loaMark,mMark:mesoMark,mText:mesoText});

  function legend(label){
    return `<div class="poem-guide-title">${label}</div><div class="structure-legend"><span class="acrostic-letter">A</span><span>ACRÓSTICO</span><span class="mesostic-letter">M</span><span>MESÓSTICO</span><span class="telestic-letter">T</span><span>TELÉSTICO</span></div>`;
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

  function ensureDiagonalControls(){
    const view=$('#diagonal');
    if(!view)return;
    let bar=view.querySelector('.diag-direction');
    if(!bar){
      bar=document.createElement('div');
      bar.className='diag-direction';
      bar.innerHTML='<button type="button" data-dir="down">DESCENDENTE</button><button type="button" data-dir="up">ASCENDENTE</button>';
      view.prepend(bar);
      bar.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
        diagDirection=btn.dataset.dir;
        cleanDiagonal();
      }));
    }
    bar.querySelectorAll('button').forEach(btn=>btn.classList.toggle('active',btn.dataset.dir===diagDirection));
  }

  function cleanDiagonal(){
    ensureDiagonalControls();
    const principal=GRANADA_ROWS.map((r,i)=>r.verses[i]);
    const secondary=GRANADA_ROWS.map((r,i)=>r.verses[26-i]);
    const ascending=diagDirection==='up';
    const down=ascending?[...principal].reverse():principal;
    const cross=ascending?[...secondary].reverse():secondary;
    const render=(el,title,verses)=>{
      el.innerHTML='';
      const h=document.createElement('div');h.className='btitle';h.textContent=title;el.appendChild(h);
      const poem=document.createElement('div');poem.className='radial-clean-poem';
      verses.forEach((z,i)=>{
        const d=document.createElement('div');d.className='radial-clean-line'+(i===13?' diag-center':'');
        d.innerHTML=i===13?`<span class="loa-center-origin" title="Centro">${esc(z)}</span>`:esc(z);
        poem.appendChild(d);
      });
      el.appendChild(poem);
    };
    render($('#dl'),ascending?'I · PRINCIPAL ASCENDENTE ↖':'I · PRINCIPAL DESCENDENTE ↘',down);
    render($('#dr'),ascending?'II · SECUNDARIA ASCENDENTE ↗':'II · SECUNDARIA DESCENDENTE ↙',cross);
  }

  window.vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');host.innerHTML='';
    const verses=pv(pi);
    const tel=pMeta(pNo),tmarks=new Map((tel&&tel.marks||[]).map(m=>[m.row,m]));
    const mes=mMeta('P',pNo),mmarks=new Map((mes&&mes.valid&&mes.marks||[]).map(m=>[m.row,m]));
    const guide=document.createElement('div');guide.className='poem-guide';guide.innerHTML=legend('LECTURA VERTICAL');host.appendChild(guide);
    verses.forEach((z,i)=>{
      const verseNo=i+1;
      let text=markVertical(z,tmarks.get(verseNo),mmarks.get(verseNo),mes&&mes.text||'');
      if(pNo===14&&verseNo===14)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
      const d=document.createElement('div');
      d.className='poem-line vline'+(verseNo===14?' poem-center':'');
      d.innerHTML=`<span class="poem-verse">${text}</span>`;
      host.appendChild(d);
    });
  };

  window.horiz=function(){
    row=(row+27)%27;
    const r=GRANADA_ROWS[row],hNo=r.row;
    $('#hi').textContent=`H${String(hNo).padStart(2,'0')} / 27`;
    $('#ht').textContent=GRANADA_H_TITLES[row];
    const host=$('#hl');host.innerHTML='';
    const loa=hMeta(hNo),lmarks=new Map((loa&&loa.marks||[]).map(m=>[m.position,m]));
    const mes=mMeta('H',hNo),mmarks=new Map((mes&&mes.valid&&mes.marks||[]).map(m=>[m.position,m]));
    const guide=document.createElement('div');guide.className='poem-guide';guide.innerHTML=legend('LECTURA HORIZONTAL');host.appendChild(guide);
    r.verses.forEach((z,i)=>{
      const pos=i+1;
      let text=markHorizontal(z,lmarks.get(pos),mmarks.get(pos),mes&&mes.text||'');
      if(hNo===14&&pos===14)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
      const d=document.createElement('div');
      d.className='poem-line hline'+(pos===14?' poem-center':'');
      d.innerHTML=`<span class="poem-verse">${text}</span>`;
      host.appendChild(d);
    });
  };

  window.radial=cleanRadial;
  window.diagonal=cleanDiagonal;

  const baseBook=window.book;
  window.book=function(){
    baseBook();
    const x=items[bi];if(!x||x.k!=='p')return;
    const els=[...document.querySelectorAll('#page .line')];
    let m=x.e&&x.e.match(/^(\d{2}) · VERTICAL$/);
    if(m){
      const pNo=Number(m[1]),tel=pMeta(pNo),tmarks=new Map((tel&&tel.marks||[]).map(z=>[z.row,z]));
      const mes=mMeta('P',pNo),mmarks=new Map((mes&&mes.valid&&mes.marks||[]).map(z=>[z.row,z]));
      els.forEach((el,i)=>{
        let text=markVertical(x.l[i],tmarks.get(i+1),mmarks.get(i+1),mes&&mes.text||'');
        if(pNo===14&&i===13)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
        el.innerHTML=text;
      });
      return;
    }
    m=x.e&&x.e.match(/^H(\d{2}) · HORIZONTAL$/);
    if(m){
      const hNo=Number(m[1]),loa=hMeta(hNo),lmarks=new Map((loa&&loa.marks||[]).map(z=>[z.position,z]));
      const mes=mMeta('H',hNo),mmarks=new Map((mes&&mes.valid&&mes.marks||[]).map(z=>[z.position,z]));
      els.forEach((el,i)=>{
        let text=markHorizontal(x.l[i],lmarks.get(i+1),mmarks.get(i+1),mes&&mes.text||'');
        if(hNo===14&&i===13)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
        el.innerHTML=text;
      });
      return;
    }
    if(x.e&&/DIAGONAL CENTRAL/.test(x.e)){
      els.forEach((el,i)=>{
        el.classList.toggle('diag-center',i===13);
        el.innerHTML=i===13?`<span class="loa-center-origin" title="Centro">${esc(x.l[i])}</span>`:esc(x.l[i]);
      });
    }
  };

  $('#vp').onclick=()=>{pi--;vert()};
  $('#vn').onclick=()=>{pi++;vert()};
  $('#hrp').onclick=()=>{row=(row+26)%27;horiz()};
  $('#hrn').onclick=()=>{row=(row+1)%27;horiz()};

  const brand=document.querySelector('.brand small');if(brand)brand.textContent='Un siglo después';
  vert();horiz();cleanDiagonal();cleanRadial();book();
  const h=location.hash.slice(1);if(['bookview','verticalreader','horizontal','diagonal','radial'].includes(h))mode(h);
})();