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

  function render(){
    const r=rand(27)+1,c=rand(27)+1,p=perspectives[rand(3)];
    const same=r===c;
    const center=r===14&&c===14;
    const first=cell(r,c);
    const reflected=cell(c,r);
    const centerVerse=cell(14,14);
    const host=$('#chance-body');
    if(!host)return;

    host.innerHTML=`
      <div class="chance-kicker">ÚLTIMA CAPA · EL AZAR</div>
      <div class="chance-coords">${coord(r,c)}${same?' · ESPEJO SOBRE SÍ MISMO':` ↔ ${coord(c,r)}`}</div>
      <div class="chance-grid">
        <section class="chance-card">
          <div class="chance-step">I · AZAR</div>
          <blockquote>${esc(first)}</blockquote>
          <div class="chance-meta">VERTICAL ${String(c).padStart(2,'0')} · ${esc(vTitle(c))}</div>
          <div class="chance-meta">HORIZONTAL ${String(r).padStart(2,'0')} · ${esc(hTitle(r))}</div>
        </section>
        <section class="chance-card ${same?'chance-self':''}">
          <div class="chance-step">II · ESPEJO</div>
          <blockquote>${esc(reflected)}</blockquote>
          <div class="chance-meta">VERTICAL ${String(r).padStart(2,'0')} · ${esc(vTitle(r))}</div>
          <div class="chance-meta">HORIZONTAL ${String(c).padStart(2,'0')} · ${esc(hTitle(c))}</div>
        </section>
        <section class="chance-card chance-door">
          <div class="chance-step">III · PUERTA · ${esc(p.name)}</div>
          <p class="chance-question">${esc(p.question)}</p>
          <div class="chance-center-label">IV · CENTRO · 14 × 14</div>
          <blockquote class="chance-center">${esc(centerVerse)}</blockquote>
          <div class="chance-axis">LA VEGA ↔ BAJO LA CAL</div>
        </section>
      </div>
      ${center?'<div class="chance-stop">El azar ha llegado al gozne. La coordenada 14 × 14 es su propio espejo: la secuencia se detiene aquí.</div>':''}
    `;
    $('#chance-seed').textContent=`AZAR → ESPEJO → PUERTA → CENTRO · perspectiva: ${p.name}`;
  }

  const btn=$('#chance-roll');
  if(btn)btn.addEventListener('click',render);
  render();

  const h=location.hash.slice(1);
  if(h==='chance'&&typeof mode==='function')mode('chance');
})();
