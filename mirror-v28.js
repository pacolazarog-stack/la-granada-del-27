(()=>{
  const norm=w=>Array.from((w||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,''));
  const terminal=line=>{const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);return m?m[1]:''};
  const markInitial=(line,on)=>{if(!on)return line;const m=line.match(/\p{L}/u);if(!m)return line;const i=m.index;return line.slice(0,i)+`<span class="acro-letter">${line[i]}</span>`+line.slice(i+1)};
  const markTerminal=(line,on)=>{if(!on)return line;const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);if(!m)return line;return line.slice(0,m.index)+`<span class="tel-word">${m[1]}</span>${m[2]}`};

  function acroForCell(rowNo,pNo){
    const meta=GRANADA_ACROSTIC[`H${String(rowNo).padStart(2,'0')}`];
    if(!meta||!Array.isArray(meta.positions))return null;
    const idx=meta.positions.indexOf(pNo);
    if(idx<0)return null;
    const letters=norm(meta.word);
    return {letter:letters[idx]||'',word:meta.word,row:rowNo};
  }

  window.vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');
    host.innerHTML='';

    const verses=pv(pi);
    const tmeta=GRANADA_TELESTIC[`P${String(pNo).padStart(2,'0')}`];
    const tSelected=new Map(tmeta&&Array.isArray(tmeta.rows)?tmeta.rows.map((r,i)=>[r,i]):[]);
    const tLetters=norm(tmeta&&tmeta.word?tmeta.word:'');
    const acroTokens=[];

    const guide=document.createElement('div');
    guide.className='mirror28-guide';
    guide.innerHTML='<div class="acro-head">ACRÓSTICO<br>ESPEJO</div><div class="poem-head">LECTURA VERTICAL</div><div class="tel-head">TELÉSTICO</div>';
    host.appendChild(guide);

    verses.forEach((z,i)=>{
      const rowNo=i+1;
      const a=acroForCell(rowNo,pNo);
      const tidx=tSelected.has(rowNo)?tSelected.get(rowNo):-1;
      const hasA=!!a, hasT=tidx>=0;
      let verse=markInitial(z,hasA);
      verse=markTerminal(verse,hasT);

      const d=document.createElement('div');
      d.className='vline mirror28-line'+(hasA?' has-acro':'')+(hasT?' has-tel':'');
      d.innerHTML=`<span class="acro28 ${hasA?'on':'off'}">${hasA?a.letter:'·'}</span><span class="mirror28-verse">${verse}</span><span class="tel28 ${hasT?'on':'off'}">${hasT?(tLetters[tidx]||''):'·'}</span>`;
      host.appendChild(d);
      if(hasA)acroTokens.push({row:rowNo,letter:a.letter,word:a.word});
    });

    if(pNo===14){
      const axis=document.createElement('div');
      axis.className='mirror28-axis';
      axis.innerHTML='<div class="mirror28-label">EJE CENTRAL</div><strong>VEINTISIETE · LA GRANADA DEL 27</strong>';
      host.appendChild(axis);
      return;
    }

    const panels=document.createElement('div');
    panels.className='mirror28-panels';

    const left=document.createElement('section');
    left.className='mirror28-panel acro-panel';
    const leftChain=acroTokens.length?acroTokens.map(x=>`<span><b>${x.letter}</b><small>H${String(x.row).padStart(2,'0')}</small><em>${x.word}</em></span>`).join(''):'<span class="none">—</span>';
    left.innerHTML=`<div class="mirror28-label">ACRÓSTICO ESPEJO · VOZ I</div><div class="mirror28-sub">Aportes de esta vertical a la loa horizontal</div><div class="mirror28-chain">${leftChain}</div>`;

    const right=document.createElement('section');
    right.className='mirror28-panel tel-panel';
    if(tmeta&&Array.isArray(tmeta.rows)){
      const terminals=tmeta.rows.map(r=>terminal(verses[r-1]));
      const chain=terminals.map(w=>w?`<span><b>${w[0]}</b>${w.slice(1)}</span>`:'').join('');
      right.innerHTML=`<div class="mirror28-label">TELÉSTICO · VOZ II</div><strong class="mirror28-word">${tmeta.word}</strong><div class="mirror28-chain tel-chain">${chain}</div>`;
    }else{
      right.innerHTML='<div class="mirror28-label">TELÉSTICO · VOZ II</div><strong class="mirror28-word">—</strong>';
    }

    panels.appendChild(left);
    panels.appendChild(right);
    host.appendChild(panels);
  };

  if(!$('#verticalreader').classList.contains('hidden')) window.vert();
})();