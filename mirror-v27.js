(()=>{
  const norm=w=>Array.from((w||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,''));
  const terminal=line=>{const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);return m?m[1]:''};
  const markInitial=(line,on)=>{if(!on)return line;const m=line.match(/\p{L}/u);if(!m)return line;const i=m.index;return line.slice(0,i)+`<span class="acro-letter">${line[i]}</span>`+line.slice(i+1)};
  const markTerminal=(line,on)=>{if(!on)return line;const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);if(!m)return line;return line.slice(0,m.index)+`<span class="tel-word">${m[1]}</span>${m[2]}`};

  function acroForCell(rowNo,pNo){
    const key=`H${String(rowNo).padStart(2,'0')}`;
    const meta=GRANADA_ACROSTIC[key];
    if(!meta||!meta.positions)return null;
    const idx=meta.positions.indexOf(pNo);
    if(idx<0)return null;
    const letters=norm(meta.word);
    return {letter:letters[idx]||'',word:meta.word,row:rowNo};
  }

  vert=function(){
    pi=(pi+27)%27;
    const pNo=pi+1;
    $('#vi').textContent=`${String(pNo).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');
    host.innerHTML='';

    const guide=document.createElement('div');
    guide.className='mirror-guide';
    guide.innerHTML='<div class="left">ACR.</div><div class="mid">lectura vertical</div><div class="right">TEL.</div>';
    host.appendChild(guide);

    const tkey=`P${String(pNo).padStart(2,'0')}`;
    const tmeta=GRANADA_TELESTIC[tkey];
    const tSelected=new Map(tmeta&&tmeta.rows?tmeta.rows.map((r,i)=>[r,i]):[]);
    const tLetters=norm(tmeta&&tmeta.word?tmeta.word:'');
    const verses=pv(pi);
    const acroTokens=[];

    verses.forEach((z,i)=>{
      const rowNo=i+1;
      const a=acroForCell(rowNo,pNo);
      const tidx=tSelected.has(rowNo)?tSelected.get(rowNo):-1;
      const hasA=!!a, hasT=tidx>=0;
      let verse=markInitial(z,hasA);
      verse=markTerminal(verse,hasT);

      const d=document.createElement('div');
      d.className='vline mirror-line'+(hasA?' acro-line':'')+(hasT?' tel-line':'');
      d.innerHTML=`<span class="acro-margin ${hasA?'':'empty'}">${hasA?a.letter:'·'}</span><span class="mirror-verse">${verse}</span><span class="tel-margin ${hasT?'':'empty'}">${hasT?(tLetters[tidx]||''):'·'}</span>`;
      host.appendChild(d);
      if(hasA)acroTokens.push({row:rowNo,letter:a.letter,word:a.word});
    });

    if(pNo===14){
      const box=document.createElement('div');
      box.className='axis-panel';
      box.innerHTML='<div class="secret-label">EJE CENTRAL</div><div class="axis">VEINTISIETE · LA GRANADA DEL 27</div>';
      host.appendChild(box);
      return;
    }

    const panels=document.createElement('div');
    panels.className='secret-panels';

    const acro=document.createElement('div');
    acro.className='secret-panel';
    const achain=acroTokens.length?acroTokens.map(x=>`<span class="secret-token acro"><b>${x.letter}</b> · H${String(x.row).padStart(2,'0')} <em>${x.word}</em></span>`).join(''): '<span class="secret-token">—</span>';
    acro.innerHTML=`<div class="secret-label">ACRÓSTICO ESPEJO · aportes de esta vertical</div><strong class="secret-title acro">VOZ I</strong><div class="secret-chain">${achain}</div>`;
    panels.appendChild(acro);

    const tel=document.createElement('div');
    tel.className='secret-panel';
    if(tmeta&&tmeta.rows){
      const terminals=tmeta.rows.map(r=>terminal(verses[r-1]));
      const chain=terminals.map(w=>w?`<span class="secret-token tel"><b>${w[0]}</b>${w.slice(1)}</span>`:'').join('');
      tel.innerHTML=`<div class="secret-label">TELÉSTICO · lectura vertical</div><strong class="secret-title">${tmeta.word}</strong><div class="secret-chain">${chain}</div>`;
    }else{
      tel.innerHTML='<div class="secret-label">TELÉSTICO · lectura vertical</div><strong class="secret-title">—</strong>';
    }
    panels.appendChild(tel);
    host.appendChild(panels);
  };

  if(!$('#verticalreader').classList.contains('hidden')) vert();
})();