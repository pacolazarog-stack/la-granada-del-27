(()=>{
  const view=document.querySelector('#diagonal');
  if(!view)return;

  const state={axis:'principal',mode:'bifurcated',direction:'down'};
  const center=13;
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');

  const range=(a,b,step=1)=>{
    const out=[];
    if(step>0){for(let i=a;i<=b;i+=step)out.push(i)}
    else{for(let i=a;i>=b;i+=step)out.push(i)}
    return out;
  };

  function axisData(){
    const principal=GRANADA_ROWS.map((r,i)=>r.verses[i]);
    const secondary=GRANADA_ROWS.map((r,i)=>r.verses[26-i]);
    const isPrincipal=state.axis==='principal';
    return {
      verses:isPrincipal?principal:secondary,
      name:isPrincipal?'PRINCIPAL':'SECUNDARIA',
      equation:isPrincipal?'r = c':'r + c = 28',
      up:isPrincipal?'↖':'↗',
      down:isPrincipal?'↘':'↙'
    };
  }

  function shell(){
    if(view.querySelector('.diag-reader'))return;
    view.innerHTML=`
      <div class="diag-reader">
        <div class="diag-toolbar">
          <div class="diag-control" data-control="axis">
            <span class="diag-control-label">EJE</span>
            <button type="button" data-axis="principal">PRINCIPAL</button>
            <button type="button" data-axis="secondary">SECUNDARIA</button>
          </div>
          <div class="diag-control diag-control-wide" data-control="mode">
            <span class="diag-control-label">LECTURA</span>
            <button type="button" data-mode="complete">COMPLETA</button>
            <button type="button" data-mode="toward">HACIA EL CENTRO</button>
            <button type="button" data-mode="from">DESDE EL CENTRO</button>
            <button type="button" data-mode="bifurcated">BIFURCADA</button>
          </div>
          <div class="diag-control" data-control="direction">
            <span class="diag-control-label">SENTIDO</span>
            <button type="button" data-direction="up">↑ ARRIBA</button>
            <button type="button" data-direction="down">↓ ABAJO</button>
            <span class="diag-double">↑ DOS BRAZOS ↓</span>
          </div>
        </div>
        <div class="diag-reading" id="diag-reading"></div>
      </div>`;

    view.querySelectorAll('[data-axis]').forEach(b=>b.addEventListener('click',()=>{state.axis=b.dataset.axis;render()}));
    view.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{state.mode=b.dataset.mode;render()}));
    view.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>{state.direction=b.dataset.direction;render()}));
  }

  function line(verse,i,isCenter=false){
    return `<div class="diag-line${isCenter?' diag-cross':''}"><span class="diag-line-no">${String(i+1).padStart(2,'0')}</span><span>${esc(verse)}</span></div>`;
  }

  function sequence(indices,title,note){
    const a=axisData();
    return `
      <article class="diag-sheet">
        <div class="diag-sheet-kicker">${a.name} · ${a.equation}</div>
        <h2>${title}</h2>
        <div class="diag-sheet-note">${note}</div>
        <div class="diag-sequence">
          ${indices.map(i=>line(a.verses[i],i,i===center)).join('')}
        </div>
      </article>`;
  }

  function renderBifurcated(){
    const a=axisData();
    const upper=range(center-1,0,-1);
    const lower=range(center+1,26,1);
    return `
      <article class="diag-sheet diag-sheet-bifurcated">
        <div class="diag-sheet-kicker">${a.name} · ${a.equation}</div>
        <h2>LECTURA BIFURCADA</h2>
        <div class="diag-sheet-note">El 14 × 14 aparece una sola vez y abre simultáneamente los dos brazos del eje.</div>
        <div class="diag-junction">
          <div class="diag-junction-label">CRUCE · 14 × 14</div>
          <div class="diag-junction-verse">${esc(a.verses[center])}</div>
          <div class="diag-junction-axis">LA VEGA ↔ BAJO LA CAL</div>
        </div>
        <div class="diag-branches">
          <section class="diag-branch">
            <div class="diag-branch-title"><span class="diag-arrow">${a.up}</span> DESDE EL CRUCE · HACIA ARRIBA</div>
            <div class="diag-sequence">${upper.map(i=>line(a.verses[i],i,false)).join('')}</div>
          </section>
          <section class="diag-branch">
            <div class="diag-branch-title">DESDE EL CRUCE · HACIA ABAJO <span class="diag-arrow">${a.down}</span></div>
            <div class="diag-sequence">${lower.map(i=>line(a.verses[i],i,false)).join('')}</div>
          </section>
        </div>
      </article>`;
  }

  function renderReading(){
    const a=axisData();
    if(state.mode==='bifurcated')return renderBifurcated();

    if(state.mode==='complete'){
      const down=state.direction==='down';
      const idx=down?range(0,26,1):range(26,0,-1);
      const arrow=down?a.down:a.up;
      return sequence(idx,`RECORRIDO COMPLETO ${arrow}`,`27 versos · el recorrido atraviesa el cruce 14 × 14 y continúa hasta el extremo opuesto.`);
    }

    if(state.mode==='toward'){
      const down=state.direction==='down';
      const idx=down?range(0,center,1):range(26,center,-1);
      const arrow=down?a.down:a.up;
      const origin=down?'DESDE ARRIBA':'DESDE ABAJO';
      return sequence(idx,`${origin} ${arrow} · HACIA EL CENTRO`,`14 versos · el cruce 14 × 14 es el destino de esta media diagonal.`);
    }

    const down=state.direction==='down';
    const idx=down?range(center,26,1):range(center,0,-1);
    const arrow=down?a.down:a.up;
    const destination=down?'HACIA ABAJO':'HACIA ARRIBA';
    return sequence(idx,`DESDE EL CENTRO ${arrow} · ${destination}`,`14 versos · el cruce 14 × 14 actúa como origen y la lectura se abre hacia un extremo.`);
  }

  function syncControls(){
    view.querySelectorAll('[data-axis]').forEach(b=>b.classList.toggle('active',b.dataset.axis===state.axis));
    view.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===state.mode));
    view.querySelectorAll('[data-direction]').forEach(b=>b.classList.toggle('active',b.dataset.direction===state.direction));
    const direction=view.querySelector('[data-control="direction"]');
    direction?.classList.toggle('is-double',state.mode==='bifurcated');
  }

  function render(){
    shell();
    syncControls();
    const host=view.querySelector('#diag-reading');
    if(host)host.innerHTML=renderReading();
  }

  window.diagonal=render;
  window.GRANADA_DIAGONAL_READER_STATE=state;
  render();
})();