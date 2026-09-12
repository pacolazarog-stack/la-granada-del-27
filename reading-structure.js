(()=>{
  const $=s=>document.querySelector(s);
  const voices=window.GRANADA_MESOSTIC_VOICES||{};
  const pSecret=n=>(window.GRANADA_TELESTIC||{})[`P${String(n).padStart(2,'0')}`]||null;
  const hSecret=n=>(window.GRANADA_ACROSTIC||{})[`H${String(n).padStart(2,'0')}`]||null;
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');

  function fitPoem(host,verses){
    if(!host||!verses?.length)return;
    requestAnimationFrame(()=>{
      const mobile=window.matchMedia('(max-width:780px)').matches;
      const base=mobile?14:17;
      const min=mobile?11.5:12.5;
      const family='Georgia, "Times New Roman", serif';
      const available=Math.max(220,host.clientWidth||520);
      let maxWidth=0,maxIndex=0;
      if(ctx){
        ctx.font=`${base}px ${family}`;
        verses.forEach((v,i)=>{
          const w=ctx.measureText(v).width;
          if(w>maxWidth){maxWidth=w;maxIndex=i;}
        });
      }else{
        verses.forEach((v,i)=>{if(v.length>(verses[maxIndex]||'').length)maxIndex=i;});
        maxWidth=(verses[maxIndex]||'').length*base*.52;
      }
      const size=Math.max(min,Math.min(base,base*((available-6)/Math.max(1,maxWidth))));
      if(ctx)ctx.font=`${size}px ${family}`;
      const finalWidth=ctx?Math.max(...verses.map(v=>ctx.measureText(v).width)):Math.min(maxWidth*(size/base),available);
      host.classList.add('fit-poem');
      host.style.setProperty('--poem-font-size',`${size.toFixed(2)}px`);
      host.style.setProperty('--poem-measure',`${Math.ceil(Math.min(finalWidth,available))}px`);
      host.dataset.widestVerse=String(maxIndex+1);
      host.title=`Escala común gobernada por el verso ${maxIndex+1}: «${verses[maxIndex]}»`;
    });
  }

  function addRegister(host,n,side){
    if(!host)return;
    host.querySelector('.structure-register')?.remove();
    const pair=voices[n]||{};
    const current=side==='P'?pair.v:pair.h;
    const mirror=side==='P'?pair.h:pair.v;
    const secret=side==='P'?pSecret(n):hSecret(n);
    const label=side==='P'?'TELÉSTICO':'ACRÓSTICO';
    const here=`${side}${String(n).padStart(2,'0')}`;
    const there=`${side==='P'?'H':'P'}${String(n).padStart(2,'0')}`;
    const details=document.createElement('details');
    details.className='structure-register';
    details.innerHTML=`
      <summary>CAPAS INTERIORES · ${label} · MESÓSTICO</summary>
      <div class="structure-register-body">
        <div class="structure-row"><span>${label}</span><strong>${secret?.word||'—'}</strong></div>
        <div class="structure-dialogue">
          <div><span>${here} · MESÓSTICO</span><strong>${current||'—'}</strong></div>
          <div class="structure-mirror">↕ ESPEJO ↕</div>
          <div><span>${there} · RESPUESTA</span><strong>${mirror||'—'}</strong></div>
        </div>
      </div>`;
    host.appendChild(details);
  }

  function enhanceVertical(){
    const n=((typeof pi==='number'?pi:0)+27)%27+1;
    const verses=typeof pv==='function'?pv(n-1):[];
    fitPoem($('#vl'),verses);
    addRegister($('#vl'),n,'P');
  }

  function enhanceHorizontal(){
    const idx=((typeof row==='number'?row:0)+27)%27;
    const verses=window.GRANADA_ROWS?.[idx]?.verses||[];
    fitPoem($('#hl'),verses);
    addRegister($('#hl'),idx+1,'H');
  }

  function enhanceBook(){
    const list=typeof items!=='undefined'?items:null;
    const index=typeof bi==='number'?bi:null;
    const x=list&&index!==null?list[index]:null;
    if(!x||x.k!=='p'||!Array.isArray(x.l))return;
    const host=$('#page .lines');
    fitPoem(host,x.l);
  }

  if(typeof window.vert==='function'){
    const base=window.vert;
    window.vert=function(){base();enhanceVertical();};
  }
  if(typeof window.horiz==='function'){
    const base=window.horiz;
    window.horiz=function(){base();enhanceHorizontal();};
  }
  if(typeof window.book==='function'){
    const base=window.book;
    window.book=function(){base();enhanceBook();};
  }

  window.addEventListener('resize',()=>{
    const v=$('#verticalreader');
    const h=$('#horizontal');
    if(v&&!v.classList.contains('hidden'))enhanceVertical();
    if(h&&!h.classList.contains('hidden'))enhanceHorizontal();
    if($('#bookview')&&!$('#bookview').classList.contains('hidden'))enhanceBook();
  });

  enhanceVertical();
  enhanceHorizontal();
  enhanceBook();
})();