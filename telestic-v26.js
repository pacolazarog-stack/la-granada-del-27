(()=>{
  const wordLetters=w=>Array.from((w||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-zÑñ]/g,''));
  const terminal=line=>{const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);return m?m[1]:''};
  const markTerminalReadable=(line,on)=>{
    if(!on)return line;
    const m=line.match(/(\p{L}+)([^\p{L}]*)$/u);
    if(!m)return line;
    return line.slice(0,m.index)+`<span class="tel-word">${m[1]}</span>${m[2]}`;
  };

  vert=function(){
    pi=(pi+27)%27;
    $('#vi').textContent=`${String(pi+1).padStart(2,'0')} / 27`;
    $('#vt').textContent=GRANADA_TITLES[pi];
    const host=$('#vl');
    host.innerHTML='';
    const key=`P${String(pi+1).padStart(2,'0')}`;
    const meta=GRANADA_TELESTIC[key];
    const verses=pv(pi);

    if(meta&&meta.rows){
      const selected=new Map(meta.rows.map((r,i)=>[r,i]));
      const letters=wordLetters(meta.word);
      verses.forEach((z,i)=>{
        const row=i+1, idx=selected.has(row)?selected.get(row):-1;
        const d=document.createElement('div');
        d.className='vline'+(idx>=0?' tel-line':'');
        if(idx>=0){
          d.innerHTML=`<span>${markTerminalReadable(z,true)}</span><span class="tel-margin">${letters[idx]||''}</span>`;
        }else{
          d.innerHTML=`<span>${z}</span><span class="tel-margin">·</span>`;
        }
        host.appendChild(d);
      });

      const terminals=meta.rows.map(r=>terminal(verses[r-1]));
      const chain=terminals.map(w=>w?`<span class="tel-token"><b>${w[0]}</b>${w.slice(1)}</span>`:'').join('');
      const box=document.createElement('div');
      box.className='telestic-reading';
      box.innerHTML=`<div class="tel-label">TELÉSTICO · lectura vertical</div><strong class="tel-word-full">${meta.word}</strong><div class="tel-chain">${chain}</div>`;
      host.appendChild(box);
    }else{
      verses.forEach(z=>{let d=document.createElement('div');d.className='vline';d.textContent=z;host.appendChild(d)});
      if(meta&&meta.word){
        const box=document.createElement('div');
        box.className='telestic-reading';
        box.innerHTML=`<div class="tel-label">EJE CENTRAL</div><div class="tel-axis">${meta.word}</div>`;
        host.appendChild(box);
      }
    }
  };

  if(!$('#verticalreader').classList.contains('hidden')) vert();
})();