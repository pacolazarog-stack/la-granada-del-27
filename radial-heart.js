(()=>{
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const view=$('#radial');
  if(!view)return;

  // H14 · BAJO LA CAL es el eje transversal nuevo. LA VEGA conserva la
  // primacía del centro: ambos estratos comparten exactamente la celda 14×14.
  const row14=()=>window.GRANADA_LAB_BAJO_LA_CAL?.verses||[];
  const center=()=>row14()[13];
  const buried=()=>row14().slice(0,13).reverse();
  const open=()=>row14().slice(14);

  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');

  function measureShared(){
    const all=row14();
    const hosts=[...view.querySelectorAll('.radial-sonnet-lines')];
    if(!hosts.length||!all.length)return;
    const available=Math.max(220,Math.min(...hosts.map(h=>h.clientWidth||480))-4);
    const mobile=window.matchMedia('(max-width:820px)').matches;
    const base=mobile?15:18;
    const min=mobile?11.5:13;
    const family='Georgia, "Times New Roman", serif';
    let maxWidth=0,maxIndex=0;
    if(ctx){
      ctx.font=`${base}px ${family}`;
      all.forEach((v,i)=>{const w=ctx.measureText(v).width;if(w>maxWidth){maxWidth=w;maxIndex=i}});
    }else{
      all.forEach((v,i)=>{if(v.length>(all[maxIndex]||'').length)maxIndex=i});
      maxWidth=(all[maxIndex]||'').length*base*.52;
    }
    const size=Math.max(min,Math.min(base,base*(available/Math.max(1,maxWidth))));
    const width=Math.min(available,maxWidth*(size/base));
    view.style.setProperty('--heart-font-size',`${size.toFixed(2)}px`);
    view.style.setProperty('--heart-measure',`${Math.ceil(width)}px`);
    view.dataset.widestVerse=String(maxIndex+1);
    view.title=`Los dos sonetos comparten la medida del verso más ancho de BAJO LA CAL: verso ${maxIndex+1}, «${all[maxIndex]}»`;
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
    if(row14().length!==27)return;
    view.innerHTML=`
      <section class="radial-heart">
        <div class="radial-heart-head" role="group" aria-label="Introducción a los dos sonetos radiales">
          <div class="radial-heart-kicker">PUNTO DE PARTIDA Y DE REGRESO · LA VEGA</div>
          <h2>LOS DOS SONETOS · MOTOR Y CORAZÓN</h2>
          <p>El verso 14 de <em>LA VEGA</em> fija el centro de simetría de todo el sistema. En esa misma celda 14 × 14, <em>BAJO LA CAL</em> se bifurca y pone en marcha los dos sonetos.</p>
        </div>

        <div class="radial-cycle" aria-label="Recorrido estructural">
          <span>LA VEGA · PARTIDA</span><b>→</b><span>VERSO 14 · CENTRO</span><b>→</b><span>SONETOS · MOTOR / CORAZÓN</span><b>→</b><span>LA VEGA · REGRESO</span>
        </div>

        <div class="radial-vega-band" aria-hidden="true"><span>LA VEGA</span></div>

        <div class="radial-axis-verse">
          <div class="radial-axis-label">CENTRO DE SIMETRÍA · LA VEGA · VERSO 14 · 14 × 14</div>
          <div class="radial-axis-text">${esc(center())}</div>
          <div class="radial-axis-caption">PUNTO FIJO DEL SISTEMA · CELDA COMPARTIDA CON BAJO LA CAL</div>
        </div>

        <div class="radial-sonnet-pair">
          ${branch('HACIA LO ENTERRADO','SONETO I · MOTOR · DESCENSO',buried(),'buried')}
          ${branch('HACIA LO ABIERTO','SONETO II · CORAZÓN · APERTURA',open(),'open')}
        </div>

        <footer class="radial-return">
          <span>REGRESO · LA VEGA</span>
          <strong>El recorrido termina donde comenzó: en el poema que contiene el centro de simetría.</strong>
        </footer>
      </section>`;
    requestAnimationFrame(measureShared);
  }

  window.radial=render;
  window.addEventListener('resize',()=>{if(view&&!view.classList.contains('hidden'))measureShared()});
  document.querySelector('[data-mode="radial"]')?.addEventListener('click',()=>setTimeout(render,0));
  render();
})();
