(()=>{
  const norm=s=>Array.from((s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,'')).map(x=>x.toUpperCase());
  const radialLetters=code=>norm(code);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const hMeta=n=>GRANADA_ACROSTIC[`H${String(n).padStart(2,'0')}`]||null;
  const pMeta=n=>GRANADA_TELESTIC[`P${String(n).padStart(2,'0')}`]||null;
  const mMeta=(side,n)=>(window.GRANADA_MESOSTIC||{})[`${side}${String(n).padStart(2,'0')}`]||null;

  function composite(line,{hMark=null,vMark=null,mMark=null,mText=''}={}){
    const slots=Array.from({length:line.length},()=>({classes:new Set(),titles:[]}));
    const add=(i,cls,title)=>{
      if(!Number.isInteger(i)||i<0||i>=slots.length)return;
      slots[i].classes.add(cls);
      if(title)slots[i].titles.push(title);
    };
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

  function cleanDiagonal(){
    const down=GRANADA_ROWS.map((r,i)=>r.verses[i]);
    const up=GRANADA_ROWS.map((r,i)=>r.verses[26-i]);
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
    render($('#dl'),'I · DIAGONAL CENTRAL ↘',down);
    render($('#dr'),'II · DIAGONAL CENTRAL ↗',up);
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
    const guide=document.createElement('div');
    guide.className='rv-guide';
    guide.innerHTML='<div>↖ V14→V01</div><div>LECTURA VERTICAL</div><div>V14→V27 ↘</div>';
    host.appendChild(guide);

    const letters=pNo===14?[]:radialLetters(GRANADA_RADIAL_VERTICAL_KEYS[`P${String(pNo).padStart(2,'0')}`]);
    verses.forEach((z,i)=>{
      const verseNo=i+1;
      let left='',right='';
      if(pNo!==14){
        if(verseNo<=14)left=letters[14-verseNo]||'';
        if(verseNo>=14)right=letters[verseNo-14]||'';
      }
      let text=markVertical(z,tmarks.get(verseNo),mmarks.get(verseNo),mes&&mes.text||'');
      if(pNo===14&&verseNo===14)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
      const d=document.createElement('div');
      d.className='vline rv-line'+(verseNo===14?' rv-center':'');
      d.innerHTML=`<span class="rv-margin rv-left">${left}</span><span class="rv-verse">${text}</span><span class="rv-margin rv-right">${right}</span>`;
      host.appendChild(d);
    });
  };

  window.horiz=function(){
    const r=GRANADA_ROWS[row];hp=(hp+27)%27;
    const hNo=r.row,pos=hp+1;
    const loa=hMeta(hNo),loaMark=(loa&&loa.marks||[]).find(m=>m.position===pos);
    const mes=mMeta('H',hNo),mesMark=(mes&&mes.valid&&mes.marks||[]).find(m=>m.position===pos);
    $('#hr').textContent=`H${String(hNo).padStart(2,'0')} / 27`;
    $('#ht').textContent=GRANADA_H_TITLES[row];
    let text=markHorizontal(r.verses[hp],loaMark,mesMark,mes&&mes.text||'');
    if(hNo===14&&pos===14)text=`<span class="loa-center-origin" title="VEINTISIETE">${text}</span>`;
    $('#hc').innerHTML=text;
    $('#hp').textContent=`${String(pos).padStart(2,'0')} / 27 · ${GRANADA_TITLES[hp]}`;
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
  $('#hrp').onclick=()=>{row=(row+26)%27;hp=0;horiz()};
  $('#hrn').onclick=()=>{row=(row+1)%27;hp=0;horiz()};
  $('#hvp').onclick=()=>{hp--;horiz()};
  $('#hvn').onclick=()=>{hp++;horiz()};

  const brand=document.querySelector('.brand small');if(brand)brand.textContent='Un siglo después';
  vert();horiz();cleanDiagonal();cleanRadial();book();
  const h=location.hash.slice(1);if(['bookview','verticalreader','horizontal','diagonal','radial'].includes(h))mode(h);
})();