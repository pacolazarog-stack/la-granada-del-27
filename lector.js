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
    let page=0,codaReady=false;
    const text=$('#readerText'),cover=$('#readerCover'),back=$('#readerBack'),article=$('#readerPage');
    const progress=$('#readerProgress'),jump=$('#readerJump');
    const prev=$('#readerPrev'),next=$('#readerNext');
    const title=$('#readerWork'),sub=$('#readerSub');
    const total=data.pages.length;
    const isPaco=/Paco Olmo de Males/i.test(data.title||'');
    const isMiramar=/terraza del Miramar/i.test(data.title||'');
    const sceneHeading=/^\s*(0[1-9]|[12]\d|30)\s*·\s*\S+/m;

    /* Miramar: la imagen escenográfica pertenece a la escena, no a la página.
       Toda página sin encabezado de escena hereda la última escena ya abierta,
       incluidos divisores de acto e interludios, hasta que aparezca la siguiente. */
    const miramarSceneAt=n=>{
      if(!isMiramar||n<1||n>total)return null;
      for(let i=n-1;i>=0;i--){
        const raw=String(data.pages[i]||'');
        const m=raw.match(sceneHeading);
        if(m)return parseInt(m[1],10);
      }
      return null;
    };

    title.textContent=data.title||title.textContent||'';
    sub.textContent=data.subtitle||data.author||sub.textContent||'';
    jump.min=1;jump.max=Math.max(1,total);

    const emitState=state=>document.dispatchEvent(new CustomEvent('book:state',{detail:{state,page,total,title:data.title||'',scene:state==='text'?miramarSceneAt(page):null}}));

    const clearReturnState=()=>{
      localStorage.removeItem('volumeReturnPending');
      localStorage.removeItem('volumeReturnOrigin');
      localStorage.removeItem('volumeResumeBook');
      const id=(document.body.dataset.bookId||'').trim();
      if(id)localStorage.removeItem(`bookMusicState:${id}`);
      try{sessionStorage.removeItem('volumeReturnReady');sessionStorage.removeItem('volumeReturnPlaybackDone');}catch(_){}
      try{window.speechSynthesis?.cancel?.();}catch(_){}
    };

    const restartBook=()=>{
      clearReturnState();
      const u=new URL(location.href);
      u.searchParams.set('restartBook',String(Date.now()));
      u.hash='portada';
      location.replace(u.href);
    };

    const goVolume=()=>{
      if(window.BOOK_AUDIO_GATE&&typeof window.BOOK_AUDIO_GATE.requestExit==='function'){
        window.BOOK_AUDIO_GATE.requestExit();
        return;
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
      if(!headerMatch){text.textContent=source;return;}

      let i=first+1;
      while(i<lines.length&&!lines[i].trim())i++;
      if(i<lines.length&&/^\d+$/.test(lines[i].trim())){i++;while(i<lines.length&&!lines[i].trim())i++;}

      const titleLines=[];
      while(i<lines.length&&lines[i].trim()){titleLines.push(lines[i].trim());i++;}
      while(i<lines.length&&!lines[i].trim())i++;
      if(!titleLines.length){text.textContent=source;return;}

      const head=document.createElement('div');head.className='paco-page-head';
      const kicker=document.createElement('div');kicker.className='paco-page-kicker';kicker.textContent=`${headerMatch[1]} · ${headerMatch[2].toUpperCase()}`;
      const pieceTitle=document.createElement('h2');pieceTitle.className='paco-piece-title';pieceTitle.textContent=titleLines.join(' ');
      head.append(kicker,pieceTitle);
      const body=document.createElement('div');body.className='paco-page-body';body.textContent=lines.slice(i).join('\n').replace(/^\s+/, '');
      text.classList.add('paco-structured');text.append(head,body);
    }

    function translatedWorkPage(raw,index){
      const lang=window.POETICA_LANGUAGE?.current?.()||localStorage.getItem('poeticaLanguage')||'es';
      const translated=window.WORK_PAGE_TRANSLATIONS?.[lang]?.[index];
      if(lang!=='es'&&typeof translated==='string'){
        text.setAttribute('data-lang-skip','1');
        return translated;
      }
      text.removeAttribute('data-lang-skip');
      return raw;
    }

    function renderWorkPage(raw,index){
      const chosen=translatedWorkPage(raw,index);
      if(isPaco) renderPacoPage(chosen);
      else {text.classList.remove('paco-structured');text.textContent=chosen||'';}
    }

    function renderCodaPage(){
      text.classList.remove('paco-structured');
      text.replaceChildren();
      const wrap=document.createElement('div');
      wrap.style.cssText='min-height:65vh;display:grid;place-items:center;text-align:center;white-space:normal;padding:8vh 8vw;box-sizing:border-box';
      const inner=document.createElement('div');
      inner.innerHTML='<div style="font-size:11px;letter-spacing:.18em;margin-bottom:18px">CODA</div><div style="font-family:Georgia,serif;font-size:clamp(24px,4vw,44px);line-height:1.15;margin-bottom:22px">La obra termina.<br>La música continúa.</div><div style="max-width:620px;margin:auto;line-height:1.65;opacity:.78">La coda comienza en esta estancia, nunca en la contraportada. Al completar un ciclo se abren dos salidas: volver limpiamente al inicio del libro o regresar al volumen total con su contrapunto.</div>';
      if(codaReady){
        const actions=document.createElement('div');
        actions.className='reader-coda-actions';
        actions.style.cssText='display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:28px';
        const restart=document.createElement('button');
        restart.type='button';restart.className='reader-btn';restart.textContent='⟪ Inicio del libro';restart.title='Reiniciar este libro sin bucle ni contrapunto de retorno';restart.onclick=restartBook;
        const volume=document.createElement('button');
        volume.type='button';volume.className='reader-btn';volume.textContent='Inicio del volumen →';volume.title='Volver al volumen total con contrapunto de retorno';volume.onclick=goVolume;
        actions.append(restart,volume);inner.append(actions);
      }
      wrap.append(inner);text.appendChild(wrap);
    }

    function render(){
      page=Math.max(0,Math.min(total+2,page));
      prev.hidden=false;next.hidden=false;
      if(page===0){
        article.classList.add('cover-mode');showOnly('cover');
        progress.textContent=`PORTADA · ${total} PÁGINAS`;
        jump.hidden=true;prev.disabled=true;prev.textContent='← Anterior';
        next.disabled=total===0;next.textContent='Abrir libro →';
        history.replaceState(null,'','#portada');emitState('cover');return;
      }
      if(page===total+1){
        article.classList.add('cover-mode');showOnly('back');
        progress.textContent='CONTRAPORTADA';jump.hidden=true;
        prev.disabled=false;prev.textContent='← Última página';
        next.hidden=false;next.disabled=false;next.textContent='Coda →';
        history.replaceState(null,'','#contraportada');emitState('back');return;
      }
      if(page===total+2){
        article.classList.remove('cover-mode');showOnly('text');renderCodaPage();article.scrollTop=0;
        progress.textContent='CODA';jump.hidden=true;
        prev.disabled=false;prev.textContent='← Contraportada';
        next.hidden=!codaReady;next.disabled=!codaReady;next.textContent='Inicio del volumen →';
        history.replaceState(null,'','#coda');emitState('coda');return;
      }
      article.classList.remove('cover-mode');showOnly('text');
      renderWorkPage(data.pages[page-1]||'',page-1);article.scrollTop=0;
      progress.textContent=`${page} / ${total}`;
      jump.hidden=false;jump.value=page;
      prev.disabled=false;prev.textContent=page===1?'← Portada':'← Anterior';
      next.disabled=false;next.textContent=page===total?'Contraportada →':'Siguiente →';
      history.replaceState(null,'',`#p${page}`);emitState('text');
    }

    prev.onclick=()=>{if(page>0){page--;render();}};
    next.onclick=()=>{
      if(page===total+2){if(codaReady)goVolume();return;}
      if(page<total+2){page++;render();}
    };
    jump.onchange=()=>{const n=parseInt(jump.value,10);if(Number.isFinite(n)){page=n;render();}};
    $('#readerFull').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
    addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'&&page>0){page--;render();}
      else if(e.key==='ArrowRight'){
        if(page===total+2){if(codaReady)goVolume();}
        else if(page<total+2){page++;render();}
      }else if(e.key==='Home'){page=0;render();}
      else if(e.key==='End'){page=total+2;render();}
    });
    document.addEventListener('book:restart-request',restartBook);
    document.addEventListener('volume:languagechange',()=>{if(page>=1&&page<=total)render();});
    document.addEventListener('coda:complete',()=>{codaReady=true;if(page===total+2)render();});
    window.BOOK_READER={restart:restartBook,toVolume:goVolume,getPage:()=>page,getTotal:()=>total};

    if(location.hash==='#coda') page=total+2;
    else if(location.hash==='#contraportada') page=total+1;
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