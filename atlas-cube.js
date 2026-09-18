/* Atlas 27³ · lectura geométrica + traza POEMA exacta */
(()=>{
  const C=window.GRANADA_CUBE_27,$=s=>document.querySelector(s);
  if(!C)return;
  const rows=()=>window.GRANADA_STONE_ROWS||window.GRANADA_ROWS||[];
  const cell=(r,c)=>rows()?.[r-1]?.verses?.[c-1]||'';
  const title=c=>window.GRANADA_TITLES?.[c-1]||`P${String(c).padStart(2,'0')}`;
  const hTitle=r=>window.GRANADA_H_TITLES?.[r-1]||`H${String(r).padStart(2,'0')}`;
  const state={x:14,y:14,z:14};
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');

  function svg(meta){
    const n=27,g=9,p=12,w=p*2+n*g,h=w;
    const pts=Array.from({length:27},(_,i)=>C.poemPoint(i+1));
    const gx=x=>p+(x-1)*g+g/2,gy=y=>p+(27-y)*g+g/2;
    let s=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Proyección XY del cubo 27 por 27 por 27">`;
    for(let i=0;i<=27;i++){const q=p+i*g;s+=`<path d="M${p} ${q}H${p+27*g} M${q} ${p}V${p+27*g}" class="cube-grid-line"/>`;}
    s+=`<polyline class="cube-poem-path" points="${pts.map(q=>`${gx(q.x)},${gy(q.y)}`).join(' ')}"/>`;
    pts.forEach(q=>{s+=`<circle class="cube-poem-node${q.z===meta.z?' active':''}" cx="${gx(q.x)}" cy="${gy(q.y)}" r="${q.z===14?3.5:2.2}"><title>POEMA · z ${q.z} · ${q.country} ↔ ${q.mirrorCountry}</title></circle>`;});
    s+=`<circle class="cube-center-node" cx="${gx(14)}" cy="${gy(14)}" r="5"/><circle class="cube-current-node" cx="${gx(meta.x)}" cy="${gy(meta.y)}" r="5.5"/>`;
    s+='</svg>';return s;
  }
  function render(){
    const m=C.cubeMeta(state.x,state.y,state.z),p=C.poemPoint(state.z),mp=m.mirror;
    ['x','y','z'].forEach(k=>{const i=$(`#cube-${k}`),o=$(`#cube-${k}-value`);if(i)i.value=state[k];if(o)o.textContent=String(state[k]).padStart(2,'0');});
    $('#cube-coordinate').textContent=`(${String(m.x).padStart(2,'0')}, ${String(m.y).padStart(2,'0')}, ${String(m.z).padStart(2,'0')})`;
    $('#cube-envelope').textContent=m.k===0?'CENTRO · 14·14·14':`ENVOLVENTE k=${m.k} · lado ${m.side}`;
    $('#cube-countries').textContent=`X · ${m.countryX}   /   Y · ${m.countryY}`;
    $('#cube-mirror').textContent=`M(x,y,z) = (${String(mp.x).padStart(2,'0')}, ${String(mp.y).padStart(2,'0')}, ${String(mp.z).padStart(2,'0')})`;
    $('#cube-xy-verse').textContent=cell(m.x,m.y);
    $('#cube-xy-meta').textContent=`H${String(m.x).padStart(2,'0')} · ${hTitle(m.x)} × P${String(m.y).padStart(2,'0')} · ${title(m.y)}`;
    $('#cube-z-verse').textContent=cell(p.x,p.y);
    $('#cube-z-meta').textContent=`POEMA · z=${String(p.z).padStart(2,'0')} · ${p.country} ↔ ${p.mirrorCountry} · proyección (${p.x}, ${p.y})`;
    $('#cube-trace-hit').textContent=m.onPoemTrace?'ESTA COORDENADA CAE EN LA TRAZA POEMA':'LA TRAZA POEMA PASA POR OTRA PROYECCIÓN XY EN ESTA CAPA Z';
    $('#cube-map').innerHTML=svg(m);
  }
  function bind(){
    ['x','y','z'].forEach(k=>$('#cube-'+k)?.addEventListener('input',e=>{state[k]=Number(e.target.value);render();}));
    $('#cube-center')?.addEventListener('click',()=>{state.x=state.y=state.z=14;render();});
    $('#cube-random')?.addEventListener('click',()=>{
      const r=()=>Math.floor(Math.random()*27)+1;state.x=r();state.y=r();state.z=r();render();
    });
    document.addEventListener('view:mode',e=>{if(e.detail?.id==='cube')render();});
  }
  bind();render();
  if(location.hash.slice(1)==='cube'&&typeof window.mode==='function') window.mode('cube');
})();
