(()=>{
  if(typeof items==='undefined'||!Array.isArray(items))return;
  const poems=window.GRANADA_SURFACE_POEMS||[];
  if(poems.length!==27)return;

  const radialVerses=()=>{
    const lines=[];
    const center=13;
    const verseIndex=13;
    const push=i=>{
      const line=poems[i]?.verses?.[verseIndex];
      if(typeof line==='string'&&line.length)lines.push(line);
    };
    push(center);
    for(let d=1;d<=13;d++){
      push(center-d);
      push(center+d);
    }
    return lines;
  };

  const revealIndex=items.findIndex(x=>x&&x.k==='r'&&x.t==='LA GRANADA DEL DOS SIETE');
  if(revealIndex<0)return;

  /* La revelación conserva su portadilla, pero deja de explicarse a sí misma. */
  items[revealIndex]={...items[revealIndex],body:''};

  const lines=radialVerses();
  if(lines.length===27&&!items.some(x=>x&&x.k==='rv'&&x.t==='LA GRANADA DEL DOS SIETE')){
    items.splice(revealIndex+1,0,{
      k:'rv',
      e:'REVELACIÓN · LECTURA RADIAL · VERSOS 14',
      t:'LA GRANADA DEL DOS SIETE',
      sub:'LA GRANADA DEL 27',
      l:lines
    });
  }

  const baseBook=window.book;
  if(typeof baseBook!=='function')return;

  window.book=function(){
    const x=items[bi];
    if(!x||x.k!=='rv'){
      baseBook();
      return;
    }

    const el=document.querySelector('#page');
    if(!el)return;
    el.innerHTML='';
    el.scrollTop=0;
    el.innerHTML=`<div class="eyebrow">${x.e}</div><h2 class="reveal">${x.t}</h2><div class="eyebrow" style="margin-top:-.35rem;margin-bottom:1.2rem">${x.sub}</div><div class="lines reveal-poem-lines"></div>`;
    const host=el.querySelector('.reveal-poem-lines');
    x.l.forEach((z,i)=>{
      const d=document.createElement('div');
      d.className='line reveal-poem-line'+(i===0?' reveal-poem-center':'');
      d.textContent=z;
      host.appendChild(d);
    });
    const prog=document.querySelector('#prog');
    if(prog)prog.textContent=`${bi+1} / ${items.length}`;
    const prev=document.querySelector('#bp');
    const next=document.querySelector('#bn');
    if(prev)prev.disabled=bi===0;
    if(next)next.disabled=bi===items.length-1;
  };
})();
