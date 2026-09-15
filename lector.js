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
  function decodeWork(){
    const bytes=b64ToBytes(window.WORK_B64||'');
    if(!window.pako||typeof window.pako.ungzip!=='function') throw new Error('No está disponible el descompresor del libro.');
    let raw;
    try{raw=window.pako.ungzip(bytes,{to:'string'});}catch(e){console.error(e);throw new Error('No se han podido descomprimir los datos locales de la obra.');}
    let data;
    try{data=JSON.parse(raw);}catch(e){throw new Error('Los datos descomprimidos no forman una obra válida.');}
    if(!Array.isArray(data.pages)) throw new Error('Formato de páginas inválido.');
    while(data.pages.length&&!String(data.pages[data.pages.length-1]??'').trim()) data.pages.pop();
    return data;
  }

  const $=s=>document.querySelector(s);
  try{
    const data=decodeWork();
    let page=0; // 0 portada · 1..N interior · N+1 contraportada
    const text=$('#readerText'),cover=$('#readerCover'),back=$('#readerBack'),article=$('#readerPage');
    const progress=$('#readerProgress'),jump=$('#readerJump');
    const prev=$('#readerPrev'),next=$('#readerNext');
    const title=$('#readerWork'),sub=$('#readerSub');
    const total=data.pages.length;
    title.textContent=data.title||title.textContent||'';
    sub.textContent=data.subtitle||data.author||sub.textContent||'';
    jump.min=1;jump.max=Math.max(1,total);
    const goStart=()=>{location.href='index.html';};

    function showOnly(which){
      if(cover)cover.hidden=which!=='cover';
      text.hidden=which!=='text';
      if(back)back.hidden=which!=='back';
    }
    function render(){
      page=Math.max(0,Math.min(total+1,page));
      if(page===0){
        article.classList.add('cover-mode');showOnly('cover');
        progress.textContent=`PORTADA · ${total} PÁGINAS`;
        jump.hidden=true;prev.disabled=true;prev.textContent='← Anterior';
        next.disabled=total===0;next.textContent='Abrir libro →';
        history.replaceState(null,'','#portada');return;
      }
      if(page===total+1){
        article.classList.add('cover-mode');showOnly('back');
        progress.textContent='CONTRAPORTADA';
        jump.hidden=true;prev.disabled=false;prev.textContent='← Libro';
        next.disabled=false;next.textContent='Inicio →';
        history.replaceState(null,'','#contraportada');return;
      }
      article.classList.remove('cover-mode');showOnly('text');
      text.textContent=data.pages[page-1]||'';article.scrollTop=0;
      progress.textContent=`${page} / ${total}`;
      jump.hidden=false;jump.value=page;
      prev.disabled=false;prev.textContent=page===1?'← Portada':'← Anterior';
      next.disabled=false;next.textContent=page===total?'Contraportada →':'Siguiente →';
      history.replaceState(null,'',`#p${page}`);
    }

    prev.onclick=()=>{if(page>0){page--;render();}};
    next.onclick=()=>{if(page===total+1){goStart();return;}page++;render();};
    jump.onchange=()=>{const n=parseInt(jump.value,10);if(Number.isFinite(n)){page=n;render();}};
    $('#readerFull').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
    addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'&&page>0){page--;render();}
      else if(e.key==='ArrowRight'){if(page===total+1)goStart();else{page++;render();}}
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
    const prev=$('#readerPrev'),next=$('#readerNext');prev.disabled=true;next.disabled=false;next.textContent='Inicio →';next.onclick=()=>{location.href='index.html';};
  }
})();