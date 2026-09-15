(()=>{
  function b64ToBytes(b64){
    const clean=String(b64||'').replace(/\s+/g,'');
    if(!clean) throw new Error('No hay datos de obra.');
    let bin;
    try{bin=atob(clean)}catch(e){throw new Error('Los datos de la obra no tienen una codificación válida.');}
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    return bytes;
  }
  function normalizeData(data){
    if(!data||!Array.isArray(data.pages)) throw new Error('Formato de páginas inválido.');
    while(data.pages.length&&!String(data.pages[data.pages.length-1]??'').trim()) data.pages.pop();
    return data;
  }
  function decodeWork(){
    if(window.WORK_DATA) return normalizeData(window.WORK_DATA);
    const bytes=b64ToBytes(window.WORK_B64||'');
    if(!window.pako||typeof window.pako.ungzip!=='function') throw new Error('No está disponible el descompresor del libro.');
    let raw;
    try{raw=window.pako.ungzip(bytes,{to:'string'});}catch(e){console.error(e);throw new Error('No se han podido descomprimir los datos locales de la obra.');}
    let data;
    try{data=JSON.parse(raw);}catch(e){throw new Error('Los datos descomprimidos no forman una obra válida.');}
    return normalizeData(data);
  }

  const $=s=>document.querySelector(s);
  try{
    const data=decodeWork();
    let page=0;
    const text=$('#readerText'),cover=$('#readerCover'),back=$('#readerBack'),article=$('#readerPage');
    const progress=$('#readerProgress'),jump=$('#readerJump');
    const prev=$('#readerPrev'),next=$('#readerNext');
    const title=$('#readerWork'),sub=$('#readerSub');
    const total=data.pages.length;
    const isPaco=/Paco Olmo de Males/i.test(data.title||'');
    title.textContent=data.title||title.textContent||'';
    sub.textContent=data.subtitle||data.author||sub.textContent||'';
    jump.min=1;jump.max=Math.max(1,total);

    const emitState=state=>document.dispatchEvent(new CustomEvent('book:state',{detail:{state,page,total,title:data.title||''}}));
    const goStart=()=>{
      if(window.BOOK_AUDIO_GATE&&typeof window.BOOK_AUDIO_GATE.requestExit==='function'){
        if(!window.BOOK_AUDIO_GATE.requestExit())return;
      }
      location.href='index.html';
    };

    function showOnly(which){
      if(cover)cover.hidden=which!=='cover';
      text.hidden=which!=='text';
      if(back)back.hidden=which!=='back';
    }

    function renderPacoPage(raw){
      const source=String(raw||'').replace(/\r/g,'');
      const lines=source.split('\n');
      const first=lines.findIndex(line=>line.trim());
      const header=first>=0?lines[first].trim():'';
      const headerMatch=header.match(/^(\d+)\s*[·.]\s*(PACO|SUPERPACO|DEAMBULAR)\s*$/i);

      text.classList.remove('paco-structured');
      text.replaceChildren();
      if(!headerMatch){
        text.textContent=source;
        return;
      }

      let i=first+1;
      while(i<lines.length&&!lines[i].trim())i++;

      if(i<lines.length&&/^\d+$/.test(lines[i].trim())){
        i++;
        while(i<lines.length&&!lines[i].trim())i++;
      }

      const titleLines=[];
      while(i<lines.length&&lines[i].trim()){
        titleLines.push(lines[i].trim());
        i++;
      }
      while(i<lines.length&&!lines[i].trim())i++;

      if(!titleLines.length){
        text.textContent=source;
        return;
      }

      const head=document.createElement('div');
      head.className='paco-page-head';
      const kicker=document.createElement('div');
      kicker.className='paco-page-kicker';
      kicker.textContent=`${headerMatch[1]} · ${headerMatch[2].toUpperCase()}`;
      const pieceTitle=document.createElement('h2');
      pieceTitle.className='paco-piece-title';
      pieceTitle.textContent=titleLines.join(' ');
      head.append(kicker,pieceTitle);

      const body=document.createElement('div');
      body.className='paco-page-body';
      body.textContent=lines.slice(i).join('\n').replace(/^\s+/, '');

      text.classList.add('paco-structured');
      text.append(head,body);
    }

    function renderWorkPage(raw){
      if(isPaco) renderPacoPage(raw);
      else {
        text.classList.remove('paco-structured');
        text.textContent=raw||'';
      }
    }

    function render(){
      page=Math.max(0,Math.min(total+1,page));
      prev.hidden=false;next.hidden=false;
      if(page===0){
        article.classList.add('cover-mode');showOnly('cover');
        progress.textContent=`PORTADA · ${total} PÁGINAS`;
        jump.hidden=true;prev.disabled=true;prev.textContent='← Anterior';
        next.disabled=total===0;next.textContent='Abrir libro →';
        history.replaceState(null,'','#portada');
        emitState('cover');
        return;
      }
      if(page===total+1){
        article.classList.add('cover-mode');showOnly('back');
        progress.textContent='CONTRAPORTADA';
        jump.hidden=true;
        prev.disabled=false;prev.textContent='← Inicio';
        next.hidden=true;
        history.replaceState(null,'','#contraportada');
        emitState('back');
        return;
      }
      article.classList.remove('cover-mode');showOnly('text');
      renderWorkPage(data.pages[page-1]||'');article.scrollTop=0;
      progress.textContent=`${page} / ${total}`;
      jump.hidden=false;jump.value=page;
      prev.disabled=false;prev.textContent=page===1?'← Portada':'← Anterior';
      next.disabled=false;next.textContent=page===total?'Contraportada →':'Siguiente →';
      history.replaceState(null,'',`#p${page}`);
      emitState('text');
    }

    prev.onclick=()=>{if(page===total+1){goStart();return;}if(page>0){page--;render();}};
    next.onclick=()=>{if(page<total+1){page++;render();}};
    jump.onchange=()=>{const n=parseInt(jump.value,10);if(Number.isFinite(n)){page=n;render();}};
    $('#readerFull').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
    addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'){if(page===total+1)goStart();else if(page>0){page--;render();}}
      else if(e.key==='ArrowRight'&&page<total+1){page++;render();}
      else if(e.key==='Home'){page=0;render();}
      else if(e.key==='End'){page=total+1;render();}
    });
    if(location.hash==='#contraportada') page=total+1;
    else {const m=location.hash.match(/^#p(\d+)$/);if(m)page=Math.max(1,Math.min(total,parseInt(m[1],10)||1));}
    render();
  }catch(err){
    const cover=$('#readerCover');if(cover)cover.hidden=true;
    const back=$('#readerBack');if(back)back.hidden=true;
    const article=$('#readerPage');if(article)article.classList.remove('cover-mode');
    const text=$('#readerText');text.hidden=false;text.textContent='No se ha podido cargar esta obra.\n\n'+err.message;
    $('#readerProgress').textContent='';$('#readerJump').hidden=true;
    const prev=$('#readerPrev'),next=$('#readerNext');
    prev.hidden=false;prev.disabled=false;prev.textContent='← Inicio';prev.onclick=()=>{location.href='index.html';};
    next.hidden=true;
  }
})();