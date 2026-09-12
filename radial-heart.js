(()=>{
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const view=$('#radial');
  if(!view)return;

  const row14=()=>GRANADA_ROWS[13].verses;
  const center=()=>row14()[13];
  const buried=()=>row14().slice(0,13).reverse();
  const open=()=>row14().slice(14);

  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');

  function measureShared(){
    const all=row14();
    const hosts=[...view.querySelectorAll('.radial-sonnet-lines')];
    if(!hosts.length)return;
    const available=Math.max(220,Math.min(...hosts.map(h=>h.clientWidth||480))-4);
    const mobile=window.matchMedia('(max-width:820px)').matches;
    const base=mobile?15:18;
    const min=mobile?11.5:13;
    const family='Georgia, "Times New Roman", serif';
    let maxWidth=0,maxIndex=0;
    if(ctx){
      ctx.font=`${base}px ${family}`;
      all.forEach((v,i)=>{
        const w=ctx.measureText(v).width;
        if(w>maxWidth){maxWidth=w;maxIndex=i;}
      });
    }else{
      all.forEach((v,i)=>{if(v.length>(all[maxIndex]||'').length)maxIndex=i;});
      maxWidth=(all[maxIndex]||'').length*base*.52;
    }
    const size=Math.max(min,Math.min(base,base*(available/Math.max(1,maxWidth))));
    const width=Math.min(available,maxWidth*(size/base));
    view.style.setProperty('--heart-font-size',`${size.toFixed(2)}px`);
    view.style.setProperty('--heart-measure',`${Math.ceil(width)}px`);
    view.dataset.widestVerse=String(maxIndex+1);
    view.title=`Los dos sonetos comparten la medida del verso más ancho de H14: verso ${maxIndex+1}, «${all[maxIndex]}»`;
  }

  function branch(title,subtitle,lines,kind){
    return `
      <article class="radial-sonnet radial-sonnet-${kind}">
        <div class="radial-sonnet-kicker">${subtitle}</div>
        <h3>${title}</h3>
        <div class="radial-sonnet-lines">
          ${lines.map((z,i)=>`<div class="radial-sonnet-line"><span class="radial-sonnet-no">${String(i+2).padStart(2,'0')}</span><span class="radial-sonnet-text">${esc(z)}</span></div>`).join('')}
        </div>
      </article>`;
  }

  function render(){
    view.innerHTML=`
      <section class="radial-heart">
        <header class="radial-heart-head">
          <div class="radial-heart-kicker">CORAZÓN DEL SISTEMA · 14 × 14</div>
          <h2>DOS SONETOS AXIALES</h2>
          <p>Un mismo verso abre dos direcciones contrarias. La Vega permanece detrás del cruce.</p>
        </header>

        <div class="radial-vega-band" aria-hidden="true"><span>LA VEGA</span></div>

        <div class="radial-axis-verse">
          <div class="radial-axis-label">VERSO COMÚN · 01 / 14</div>
          <div class="radial-axis-text">${esc(center())}</div>
          <div class="radial-axis-caption">LA VEGA ↔ BAJO LA CAL</div>
        </div>

        <div class="radial-sonnet-pair">
          ${branch('HACIA LO ENTERRADO','SONETO I · DESCENSO',buried(),'buried')}
          ${branch('HACIA LO ABIERTO','SONETO II · APERTURA',open(),'open')}
        </div>
      </section>`;
    requestAnimationFrame(measureShared);
  }

  window.radial=render;
  window.addEventListener('resize',()=>{
    if(view&&!view.classList.contains('hidden'))measureShared();
  });
  document.querySelector('[data-mode="radial"]')?.addEventListener('click',()=>setTimeout(render,0));
  render();
})();
