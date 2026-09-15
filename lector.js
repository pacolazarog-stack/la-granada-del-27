(async()=>{
  async function streamToText(stream){
    const reader=stream.getReader();
    const decoder=new TextDecoder('utf-8');
    let out='';
    for(;;){
      const {value,done}=await reader.read();
      if(done) break;
      out+=decoder.decode(value,{stream:true});
    }
    out+=decoder.decode();
    return out;
  }

  async function decodeWork(){
    const b64=(window.WORK_B64||'').replace(/\s+/g,'');
    if(!b64) throw new Error('No hay datos de obra.');
    let bin;
    try{bin=atob(b64)}catch(e){throw new Error('Los datos de la obra no tienen una codificación válida.');}
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    if(typeof DecompressionStream==='undefined') throw new Error('Este navegador no admite la descompresión local necesaria.');
    try{
      const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      const raw=await streamToText(stream);
      const data=JSON.parse(raw);
      if(!Array.isArray(data.pages)) throw new Error('Formato de páginas inválido.');
      while(data.pages.length && !String(data.pages[data.pages.length-1]??'').trim()) data.pages.pop();
      return data;
    }catch(e){
      console.error('Error al abrir la obra:',e);
      throw new Error('No se han podido descomprimir los datos locales de la obra.');
    }
  }

  const $=s=>document.querySelector(s);
  try{
    const data=await decodeWork();
    let page=0;
    const text=$('#readerText'),cover=$('#readerCover'),article=$('#readerPage');
    const progress=$('#readerProgress'),jump=$('#readerJump');
    const prev=$('#readerPrev'),next=$('#readerNext');
    const title=$('#readerWork'),sub=$('#readerSub');
    const total=data.pages.length;
    title.textContent=data.title||title.textContent||'';
    sub.textContent=data.subtitle||data.author||sub.textContent||'';
    jump.min=1;jump.max=Math.max(1,total);

    function goStart(){location.href='index.html';}
    function render(){
      page=Math.max(0,Math.min(total,page));
      if(page===0){
        article.classList.add('cover-mode');
        if(cover)cover.hidden=false;
        text.hidden=true;
        progress.textContent=`PORTADA · ${total} PÁGINAS`;
        jump.hidden=true;
        prev.disabled=true;
        prev.textContent='← Anterior';
        next.disabled=total===0;
        next.textContent='Abrir libro →';
        history.replaceState(null,'','#portada');
        return;
      }
      article.classList.remove('cover-mode');
      if(cover)cover.hidden=true;
      text.hidden=false;
      text.textContent=data.pages[page-1]||'';
      article.scrollTop=0;
      progress.textContent=`${page} / ${total}`;
      jump.hidden=false;
      jump.value=page;
      prev.disabled=false;
      prev.textContent=page===1?'← Portada':'← Anterior';
      next.disabled=false;
      next.textContent=page===total?'Inicio →':'Siguiente →';
      history.replaceState(null,'',`#p${page}`);
    }

    prev.onclick=()=>{if(page>0){page--;render();}};
    next.onclick=()=>{if(page===total){goStart();return;} page++;render();};
    jump.onchange=()=>{const n=parseInt(jump.value,10);if(Number.isFinite(n)){page=n;render();}};
    $('#readerFull').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
    addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'&&page>0){page--;render();}
      else if(e.key==='ArrowRight'&&page<total){page++;render();}
      else if(e.key==='Home'){page=0;render();}
      else if(e.key==='End'){page=total;render();}
    });
    const m=location.hash.match(/^#p(\d+)$/);
    if(m)page=Math.max(1,Math.min(total,parseInt(m[1],10)||1));
    render();
  }catch(err){
    const cover=$('#readerCover');if(cover)cover.hidden=true;
    const article=$('#readerPage');if(article)article.classList.remove('cover-mode');
    const text=$('#readerText');text.hidden=false;
    text.textContent='No se ha podido cargar esta obra.\n\n'+err.message;
    $('#readerProgress').textContent='';
    $('#readerJump').hidden=true;
    const prev=$('#readerPrev'),next=$('#readerNext');
    prev.disabled=true;
    next.disabled=false;
    next.textContent='Inicio →';
    next.onclick=()=>{location.href='index.html';};
  }
})();
