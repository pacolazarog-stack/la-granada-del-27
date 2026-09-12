(()=>{
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const rand=n=>{
    if(window.crypto&&crypto.getRandomValues){
      const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n;
    }
    return Math.floor(Math.random()*n);
  };
  const perspectives=[
    {name:'1927',question:'¿Qué llegará a ser aquello que estamos viendo?'},
    {name:'2027',question:'¿Qué queda todavía de aquello que ocurrió?'},
    {name:'LA VEGA',question:'¿Qué permanece debajo de los dos tiempos?'}
  ];
  const cell=(r,c)=>GRANADA_ROWS[r-1].verses[c-1];
  const vTitle=c=>GRANADA_TITLES[c-1];
  const hTitle=r=>GRANADA_H_TITLES[r-1];
  const coord=(r,c)=>`(${String(r).padStart(2,'0')}, ${String(c).padStart(2,'0')})`;
  const meta=(r,c)=>`VERTICAL ${String(c).padStart(2,'0')} · ${vTitle(c)} · HORIZONTAL ${String(r).padStart(2,'0')} · ${hTitle(r)}`;

  function half(label,r,c,origin){
    return `
      <section class="chance-half ${origin?'chance-origin':''}">
        <div class="chance-half-head">
          <span>${label}</span>
          <span>${coord(r,c)}${origin?' · GOLPE':''}</span>
        </div>
        <blockquote>${esc(cell(r,c))}</blockquote>
        <div class="chance-meta">${esc(meta(r,c))}</div>
      </section>`;
  }

  function render(){
    const r=rand(27)+1,c=rand(27)+1,p=perspectives[rand(3)];
    const diagonal=r===c;
    const center=r===14&&c===14;
    const originSide=center?'GOZNE':diagonal?'DIAGONAL':r<c?'ESPEJO SUPERIOR':'ESPEJO INFERIOR';
    const centerVerse=cell(14,14);
    const host=$('#chance-body');
    if(!host)return;

    if(center){
      host.innerHTML=`
        <div class="chance-kicker">ÚLTIMA CAPA · EL AZAR</div>
        <div class="chance-center-hit">
          <div class="chance-center-hit-label">14 × 14 · GOZNE · ESPEJO SOBRE SÍ MISMO</div>
          <blockquote>${esc(centerVerse)}</blockquote>
          <div class="chance-axis">LA VEGA ↔ BAJO LA CAL</div>
          <p>El golpe ha caído en el único punto que es a la vez diagonal, centro y bisagra temporal. La secuencia se detiene aquí.</p>
        </div>`;
      $('#chance-seed').textContent='GOLPE: GOZNE · 14 × 14';
      return;
    }

    let mirror;
    if(diagonal){
      mirror=`
        <div class="chance-mirror chance-mirror-diagonal">
          <section class="chance-half chance-origin chance-diagonal-half">
            <div class="chance-half-head"><span>DIAGONAL AUTORREFLEXIVA</span><span>${coord(r,c)} · GOLPE</span></div>
            <blockquote>${esc(cell(r,c))}</blockquote>
            <div class="chance-meta">${esc(meta(r,c))}</div>
          </section>
          <div class="chance-mirror-axis">r = c · EL PUNTO SE REFLEJA SOBRE SÍ MISMO</div>
        </div>`;
    }else{
      const upper=r<c?[r,c]:[c,r];
      const lower=r<c?[c,r]:[r,c];
      const originUpper=r<c;
      mirror=`
        <div class="chance-mirror">
          ${half('ESPEJO SUPERIOR',upper[0],upper[1],originUpper)}
          <div class="chance-mirror-axis">EJE DE TRANSPOSICIÓN · (r,c) ↔ (c,r)</div>
          ${half('ESPEJO INFERIOR',lower[0],lower[1],!originUpper)}
        </div>`;
    }

    host.innerHTML=`
      <div class="chance-kicker">ÚLTIMA CAPA · EL AZAR</div>
      <div class="chance-layout">
        ${mirror}
        <aside class="chance-context">
          <section class="chance-door-panel">
            <div class="chance-step">PUERTA · ${esc(p.name)}</div>
            <p class="chance-question">${esc(p.question)}</p>
            <p class="chance-note">La perspectiva no mueve los versos: decide desde qué tiempo se contempla el par.</p>
          </section>
          <section class="chance-reference">
            <div class="chance-step">REFERENCIA AXIAL · 14 × 14</div>
            <blockquote>${esc(centerVerse)}</blockquote>
            <div class="chance-axis">LA VEGA ↔ BAJO LA CAL</div>
            <p class="chance-note">El centro organiza el sistema, pero no es el destino obligatorio del golpe.</p>
          </section>
        </aside>
      </div>`;
    $('#chance-seed').textContent=`GOLPE: ${originSide} · perspectiva: ${p.name}`;
  }

  const btn=$('#chance-roll');
  if(btn)btn.addEventListener('click',render);
  render();

  const h=location.hash.slice(1);
  if(h==='chance'&&typeof mode==='function')mode('chance');
})();
