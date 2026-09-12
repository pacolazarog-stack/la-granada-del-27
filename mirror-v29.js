(()=>{
  const norm=w=>Array.from((w||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,''));
  const terminal=line=>{const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);return m?m[1]:''};
  const markTerminal=(line,on)=>{if(!on)return line;const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);if(!m)return line;return line.slice(0,m.index)+`<span class="tel-word">${m[1]}</span>${m[2]}`};

  /*
    Espejo geométrico respecto del centro H14/P14 (LA VEGA, v.14):
    un punto Hh/Pq se refleja en H(28-q)/P(28-h).
    Por tanto, la horizontal Hh se convierte en la vertical P(28-h),
    y las posiciones q de su acróstico aparecen en las filas 28-q.
    La palabra espejo se lee de ABAJO ARRIBA.
  */
  function mirrorAcrosticForVertical(pNo){
    const sourceH=28-pNo;
    const key=`H${String(sourceH).padStart(2,'0')}`;
    const meta=GRANADA_ACROSTIC[key];
    if(!meta||!Array.isArray(meta.positions)) return null;
    const letters=norm(meta.word);
    const rowMap=new Map();
    meta.positions.forEach((q,i)=>{
      const mirrorRow=28-q;
      rowMap.set(mirrorRow,{letter:letters[i]||'',sourcePos:q,index:i});
    });
    return {sourceH,word:meta.word,positions:meta.positions,rowMap,letters};
  }

  window.vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');
    host.innerHTML='';

    const verses=pv(pi);
    const mirror=mirrorAcrosticForVertical(pNo);
    const tmeta=GRANADA_TELESTIC[`P${String(pNo).padStart(2,'0')}`];
    const tSelected=new Map(tmeta&&Array.isArray(tmeta.rows)?tmeta.rows.map((r,i)=>[r,i]):[]);
    const tLetters=norm(tmeta&&tmeta.word?tmeta.word:'');

    const guide=document.createElement('div');
    guide.className='mirror29-guide';
    if(pNo===14){
      guide.innerHTML='<div class="acro-head">ESPEJO</div><div class="poem-head">EJE CENTRAL · H14/P14</div><div class="tel-head">TELÉSTICO</div>';
    }else{
      const hLabel=mirror?`H${String(mirror.sourceH).padStart(2,'0')} → P${String(pNo).padStart(2,'0')}`:'—';
      guide.innerHTML=`<div class="acro-head">ACRÓSTICO ESPEJO<br><span>${hLabel}</span><br><b>LECTURA ↑</b></div><div class="poem-head">LECTURA VERTICAL<br><span>simetría respecto de LA VEGA · verso 14</span></div><div class="tel-head">TELÉSTICO<br><b>LECTURA ↓</b></div>`;
    }
    host.appendChild(guide);

    verses.forEach((z,i)=>{
      const rowNo=i+1;
      const a=mirror&&mirror.rowMap.has(rowNo)?mirror.rowMap.get(rowNo):null;
      const tidx=tSelected.has(rowNo)?tSelected.get(rowNo):-1;
      const hasA=!!a, hasT=tidx>=0;
      const verse=markTerminal(z,hasT);
      const d=document.createElement('div');
      d.className='vline mirror29-line'+(hasA?' has-acro':'')+(hasT?' has-tel':'')+(rowNo===14?' center-row':'');
      d.innerHTML=`<span class="acro29 ${hasA?'on':'off'}">${hasA?a.letter:'·'}</span><span class="mirror29-verse">${verse}</span><span class="tel29 ${hasT?'on':'off'}">${hasT?(tLetters[tidx]||''):'·'}</span>`;
      host.appendChild(d);
    });

    if(pNo===14){
      const axis=document.createElement('div');
      axis.className='mirror29-axis';
      axis.innerHTML='<div class="mirror29-label">CENTRO ABSOLUTO DE LA MATRIZ</div><strong>H14/P14 · «Late bajo la cal la acequia hundida.»</strong><div>VEINTISIETE · LA GRANADA DEL 27</div>';
      host.appendChild(axis);
      return;
    }

    const panels=document.createElement('div');
    panels.className='mirror29-panels';

    const left=document.createElement('section');
    left.className='mirror29-panel acro-panel';
    if(mirror){
      const mapped=[...mirror.rowMap.entries()].sort((a,b)=>b[0]-a[0]); // bottom -> top = lectura correcta
      const chain=mapped.map(([r,x])=>`<span><b>${x.letter}</b><small>v${String(r).padStart(2,'0')}</small></span>`).join('');
      left.innerHTML=`<div class="mirror29-label">ACRÓSTICO ESPEJO · VOZ I</div><strong class="mirror29-word acro-word">${mirror.word}</strong><div class="mirror29-sub">H${String(mirror.sourceH).padStart(2,'0')} reflejada en P${String(pNo).padStart(2,'0')} · lectura de abajo arriba ↑</div><div class="mirror29-chain">${chain}</div>`;
    }else{
      left.innerHTML='<div class="mirror29-label">ACRÓSTICO ESPEJO · VOZ I</div><strong class="mirror29-word acro-word">—</strong>';
    }

    const right=document.createElement('section');
    right.className='mirror29-panel tel-panel';
    if(tmeta&&Array.isArray(tmeta.rows)){
      const terminals=tmeta.rows.map(r=>terminal(verses[r-1]));
      const chain=terminals.map(w=>w?`<span><b>${w[0]}</b>${w.slice(1)}</span>`:'').join('');
      right.innerHTML=`<div class="mirror29-label">TELÉSTICO · VOZ II</div><strong class="mirror29-word">${tmeta.word}</strong><div class="mirror29-sub">P${String(pNo).padStart(2,'0')} · lectura de arriba abajo ↓</div><div class="mirror29-chain tel-chain">${chain}</div>`;
    }else{
      right.innerHTML='<div class="mirror29-label">TELÉSTICO · VOZ II</div><strong class="mirror29-word">—</strong>';
    }

    panels.appendChild(left);
    panels.appendChild(right);
    host.appendChild(panels);
  };

  if(!$('#verticalreader').classList.contains('hidden')) window.vert();
})();